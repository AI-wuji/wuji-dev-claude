// 模型：能不问就不问。顺序：deny 规则 → ask 规则；都不命中返回 null，交给正常权限流程。deny 永远优先。
// Agent/Task：subagent_type 不以 wuji-legion: 开头则 ask；Workflow 一律 ask。
// 已知漏洞：规则靠正则不解析 shell，字符串拼接/变量执行、rundll32、未列出的包装命令等可绕过；
// iex/eval 里含危险词时降为 ask，其余漏网命令交给正常权限流程。
const fs = require('fs'), os = require('os'), path = require('path')
const wrapper = /^(cmd(\.exe)?\s+\/c\b|(powershell|pwsh)(\.exe)?\b.*\s-(c|command)\b|(bash|sh|zsh)\s+-c\b|wsl(\.exe)?\s+(?!--shutdown))/i
const homeClaude = /(~|\$HOME\b|\$\{HOME\}|\$env:(USERPROFILE|HOME)\b|%USERPROFILE%|[A-Za-z]:[\\/]Users[\\/][^\\/\s'"]+|\/(mnt\/)?[a-z]\/Users\/[^\\/\s'"]+)[\\/]\.claude\b/i
// 引号里的 /.claude 路径配合 USERPROFILE/HOME/homedir()/expanduser 也算家目录
const homeEnv = /\b(USERPROFILE|HOME|expanduser)\b|\bhomedir\s*\(/i, quotedClaude = /['"`][\\/]?\.claude\b/
const memoryDir = /\.claude[\\/]projects[\\/][^\\/\s'"]+[\\/]memory[\\/]/i
const redirect = /(^|[^2&<])>>?\s*\S/
const DEL_WHY = '递归或批量删除被禁止，不清理用户文件'
const DECISIONS = [
  ['deny', ['(shutdown(\\.exe)?|poweroff|halt|reboot)\\b', 'wsl(\\.exe)?\\s+--shutdown', '(Stop|Restart)-Computer\\b'], '关机或重启须有用户新的明确请求'],
  ['deny', ['(Stop-Process|spps|kill)\\b.*\\s-Force\\b', 'taskkill\\b.*\\/f', 'kill\\b.*\\s-(9|KILL|SIGKILL|[sn]\\s+(9|KILL|SIGKILL))\\b', 'killall\\b', 'pkill\\b'], '不强杀进程'],
  ['deny', ['(Remove-Item|ri|del|erase|rd|rmdir)\\b.*\\s-r[a-z]*\\b', '(rd|rmdir|del|erase)\\b.*\\s\\/s\\b', 'find\\b.*-delete', 'find\\b.*\\s-exec(dir)?\\s+(\\S*[\\\\/])?rm\\s+(.*\\s)?(-[a-z]*r[a-z]*|--recursive)\\b','git\\s+clean\\b.*\\s-[a-z]*f'], DEL_WHY],
  ['deny', ['pnputil(\\.exe)?\\b', 'devcon(\\.exe)?\\b', '(Disable|Enable)-PnpDevice\\b', 'sc(\\.exe)?\\s+(stop|config|delete)\\b', '(Stop|Set)-Service\\b'], '不改设备、驱动、服务'],
]
// 外发、全局安装、强制 add、删单个文件：ask
const OUT_ASK = [
  [['gh\\s+(pr|issue|release|gist)\\s+create\\b', '(curl|Invoke-WebRequest|iwr|Invoke-RestMethod|irm)\\b.*(\\s-X\\s*(POST|PUT)\\b|\\s-Method\\s+(POST|PUT)\\b|\\s--data\\S*|\\s-d(?=[\\s\'"]|$)|\\s-Body\\b|\\s-F\\b|\\s--form\\b)'], '外发内容需用户确认'],
  [['npm\\s+(i|install|add)\\b.*\\s(-g|--global)\\b', '(pip[0-9.]*|python[0-9.]*\\s+-m\\s+pip)\\s+install\\b', '(winget|choco|scoop|cargo)\\s+install\\b'], '安装依赖需确认（不装全局、不全量装）'],
  [['(Remove-Item|ri|rm|del|erase)(?=\\s|$)'], '删除文件需确认，不删除用户文件'],
]
const GIT_ADD_F = /^(?:\S*[\\/])?git\s+add\b.*\s(-[a-zA-Z]*f[a-zA-Z]*|--force)\b/ // 区分大小写
const DYN = /^(eval|iex|Invoke-Expression)\b|\|\s*(iex|Invoke-Expression)\b/i
const DYN_DANGER = /Stop|Restart|Remove|Kill|shutdown|reboot|Format|Delete|Clear|taskkill|Service|Pnp|rm\b|del\b|rd\b|rmdir/i
const DEL_NESTED = /([{(&`]|\$\()\s*(?:\S*[\\/])?(Remove-Item|ri|rm|del|erase)(?=\s|$)|\.Delete\s*\(/i // $(rm x)、{ Remove-Item $_ }、.Delete()
// 不在段首也查；非包装命令先抹掉引号内容再查
const ANYWHERE = [
  [['\\.Kill\\s*\\('], '不强杀进程'],
  [['\\[(System\\.)?IO\\.Directory\\]::Delete\\b', '(^|[\\s{(&])(Remove-Item|ri)\\s[^|;}]*\\s-r[a-z]*\\b', '(^|[\\s{(&])(Remove-Item|ri|rm|del|erase|rd|rmdir)\\b[^|;}]*\\s@\\w'], DEL_WHY],
]
const DEL_ANY = /(^|[\s{(&])(?:\S*[\\/])?(Remove-Item|ri|rm|del|erase|rd|rmdir)\b/i
const RECURSE = /\s-r(e(c(u(r(s(e)?)?)?)?)?)?\b/i
// rm：unix 短选项簇（≤4 个字母，含 r/R，大小写均可：-rf/-RF/-fr）、--recursive，PowerShell 只认 -Recurse 的前缀；-Force/-ReadOnly 不算
const RM = /^(?:\S*[\\/])?rm\b/i, RM_UNIX = /\s(-(?=[a-zA-Z]{0,3}[rR])[a-zA-Z]{1,4}(?![\w-])|--recursive\b)/
// 脚本语言 -c/-e 内联代码里的递归删除
const SCRIPT_RUN = /^(?:\S*[\\/])?(python[0-9.]*|py|node|perl|ruby)(\.exe)?\b.*\s-(c|e|-eval)\b/i
const SCRIPT_RMTREE = /\b(rmtree|rimraf|rm_rf|rm_r|remove_dir|removedirs)\b|\b(rmSync|rmdirSync|rm|rmdir)\s*\([^)]*recursive/i
const GIT_ASK = ['git\\s+push\\b.*(--force|\\s-f\\b|\\s\\+\\S|\\s:\\S|--delete\\b|\\s-d\\b)', 'git\\s+reset\\s+--hard',
  'git\\s+checkout\\b.*\\s--(\\s|$)', 'git\\s+checkout\\s+\\.(\\s|$)', 'git\\s+restore\\b(?!.*\\s--staged\\b)', 'git\\s+restore\\b.*\\s(--worktree|-W)\\b',
  'git\\s+stash\\s+(drop|clear)\\b', 'git\\s+checkout\\b.*\\s(-f|--force)\\b']
const GIT_BRANCH_D = /^(?:\S*[\\/])?git\s+branch\b.*\s(-[a-zA-Z]*D[a-zA-Z]*|--delete\s+--force|--force\s+--delete)\b/ // 区分大小写：-d 放行
const WRITE = 'Set-Content|Add-Content|Out-File|Copy-Item|Move-Item|Remove-Item|New-Item|Rename-Item|Clear-Content|tee|cp|mv|rm|ln|sed\\s+-i'
const SCRIPT_WRITE = /\b(python[0-9.]*|node|perl|ruby)\b|\b(WriteAll|AppendAll)\w*|::(Copy|Move|Delete|Create|Replace)\b/i
const CODEX_MUT = 'Remove-Item|Set-Content|Add-Content|Out-File|Move-Item|Rename-Item|Clear-Content|New-Item|rm|del|mv|python|node|cargo|npm|npx|sed\\s+-i'
const CODEX_RUN = '\\S*\\.(ps1|py|js|mjs|sh|bat|cmd|exe)\\b|(pwsh|powershell|bash|sh|cmd|make|cargo|go|npm|npx|node|python)\\b|git\\s+(?!(status|log|diff|show|branch)\\b)'
// 复制：codex 只能作来源。目标（-Destination/-t、robocopy/xcopy 第 2 个位置参数、cp/Copy-Item 最后一个位置参数）在 codex 下，
// robocopy/xcopy 带 /MOV(E)，或 cd 进 codex 后目标是相对路径，都算写 codex
const COPY = /^(?:\S*[\\/])?(cp|copy|cpi|Copy-Item|robocopy|xcopy)(\.exe)?(?=\s|$)/i
const copyIntoCodex = (seg, inCodex) => {
  const m = seg.match(COPY); if (!m) return false
  const win = /^(robocopy|xcopy)$/i.test(m[1]), codex = /wuji-legion-codex-4\.0/i
  const t = (seg.slice(m[0].length).match(/"[^"]*"|'[^']*'|\S+/g) || []).map(x => x.replace(/^(["'])(.*)\1$/, '$2'))
  if (win && t.some(x => /^\/MOVE?$/i.test(x))) return codex.test(seg) || inCodex
  let dest = null; const pos = []
  for (let i = 0; i < t.length; i++) {
    const kv = t[i].match(/^(-Destination|--target-directory)[:=](.+)$/i)
    if (kv) dest = kv[2]
    else if (/^(-Destination|-t|--target-directory)$/i.test(t[i])) dest = t[++i] || ''
    else if (!/^-/.test(t[i]) && !(win && /^\/[A-Za-z]/.test(t[i]))) pos.push(t[i])
  }
  if (dest === null) dest = win ? pos[1] : pos.length > 1 ? pos[pos.length - 1] : null
  if (dest == null) return false
  return codex.test(dest) || (inCodex && !/^([A-Za-z]:|[\\/~$])/.test(dest))
}
const CODEX_CD =/^(cd|chdir|Set-Location|sl|Push-Location|pushd)\b.*wuji-legion-codex-4\.0/i

const at = (src, seg, loose) => new RegExp((loose ? '' : '^(?:\\S*[\\\\/])?') + '(?:' + src + ')', 'i').test(seg)
const any = (list, seg, loose) => list.some(s => at(s, seg, loose))
const blank = s => s.replace(/"(?:[^"\\`]|[\\`].)*"|'[^']*'/g, m => m[0] + ' '.repeat(Math.max(m.length - 2, 0)) + m[0])

// 按 && || ; | 换行拆段，引号内的分隔符不拆；记下每段前的分隔符
function split(cmd) {
  const out = []
  let cur = '', q = '', sep = ''
  for (let i = 0; i < cmd.length; i++) {
    const c = cmd[i], two = cmd.slice(i, i + 2)
    if (q) { cur += c; if (q === '"' && (c === '\\' || c === '`') && i + 1 < cmd.length) cur += cmd[++i]; else if (c === q) q = ''; continue }
    if (c === '"' || c === "'") { q = c; cur += c; continue }
    const s = two === '&&' || two === '||' ? two : ';|\n'.includes(c) ? c : ''
    if (!s) { cur += c; continue }
    out.push({ s: cur, sep }); cur = ''; sep = s; i += s.length - 1
  }
  out.push({ s: cur, sep })
  return out
}

// 剥前缀：& ( { $( 引号、sudo/env/xargs 等及其选项、VAR=val、Start-Process
function norm(seg) {
  let prev
  do {
    prev = seg
    seg = seg.trim().replace(/^(\$\(|[&({])\s*/, '').replace(/^["']/, '')
      .replace(/^((?:sudo|doas|xargs)\b(?:\s+-{1,2}\S+)*?)\s+(?:-[ugCDIU]|--(?:user|group|chdir))\s+[^-\s]\S*/, '$1')
      .replace(/^((?:timeout|nice|ionice)\b(?:\s+-{1,2}\S+)*?)\s+-[sknc]\s+[^-\s]\S*/i, '$1') // timeout -s KILL、-k 3、nice -n 5
      .replace(/^wsl(\.exe)?((\s+(-d|--distribution|-u|--user|--cd)\s+\S+)|(\s+(-e|--exec|--)(?=\s)))*\s+(?!-)/i, '')
      .replace(/^(sudo|doas|busybox|call|command|exec|time|nohup|env|xargs|nice|ionice|timeout|strace|ltrace|stdbuf)((\s+-{1,2}\S+(\s+\d+\b)?)*)(\s+\d+(\.\d+)?[smhd]?(?=\s))?\s+/i, '')
      .replace(/^[A-Za-z_]\w*=\S*\s+/, '')
      .replace(/^(Start-Process|saps|start)(\s+-FilePath)?\s+/i, '')
  } while (seg !== prev)
  return seg
}
// git -C x / -c k=v / --git-dir=x 等全局参数剥掉，子命令贴回 git 后
const gitNorm = seg => seg.replace(/^((?:\S*[\\/])?git(?:\.exe)?)((?:\s+(?:-[Cc]\s+\S+|-{1,2}[\w-]+(?:=\S+)?))+)(?=\s)/i, '$1')
// eval / iex / 包装命令里的字符串按命令再判一次
const inner = seg => {
  const m = seg.match(/^(?:eval|iex|Invoke-Expression|cmd(?:\.exe)?\s+\/c|(?:powershell|pwsh)(?:\.exe)?\b.*?\s-(?:c|command)|(?:bash|sh|zsh)\s+-c)\s+(?:-Command\s+)?([\s\S]+)$/i)
  return m && m[1].trim().replace(/^(["'])([\s\S]*)\1$/, '$2')
}

function decide(cmd, repeated, depth = 0) {
  let inCodex = false, recursed = false, ask = null
  for (const { s: raw, sep } of split(cmd)) {
    const seg = norm(raw), loose = wrapper.test(seg), g = gitNorm(seg), text = loose ? seg : blank(seg)
    const sub = depth < 3 && inner(seg)
    if (sub) { const r = decide(sub, false, depth + 1); if (r && r[0] === 'deny') return r; if (r && !ask) ask = r }
    // $( ... ) 和反引号里的命令按顶层再判（单引号内不执行，先抹掉）
    if (depth < 3) for (const m of raw.replace(/'[^']*'/g, "''").matchAll(/\$\(([^()]*)\)?|`([^`]*)`?/g)) {
      const body = (m[1] ?? m[2] ?? '').trim(); if (!body) continue
      const r = decide(body, false, depth + 1); if (r && r[0] === 'deny') return r; if (r && !ask) ask = r
    }
    const ue = g.replace(/^\S+/, t => t.replace(/\\(?=\w)/g, '').replace(/''|""/g, '')) // r\m、r''m -> rm；原形也照查，不影响 C:\...\x.exe
    for (const c of [g, ue]) {
      if (RM.test(c) && (RM_UNIX.test(c) || RECURSE.test(c))) return ['deny', DEL_WHY]
      for (const [d, list, why] of DECISIONS) if (any(list, c, loose)) return [d, why]
    }
    if (SCRIPT_RUN.test(seg) && SCRIPT_RMTREE.test(seg)) return ['deny', DEL_WHY]
    for (const [list, why] of ANYWHERE) if (any(list, text, true)) return ['deny', why]
    const chain = sep === '|' && recursed
    if (chain && DEL_ANY.test(text)) return ['deny', DEL_WHY]
    recursed = chain || RECURSE.test(text)
    const codexBefore = inCodex
    if (CODEX_CD.test(seg)) inCodex = true
    if ((/wuji-legion-codex-4\.0/i.test(seg) || codexBefore) && copyIntoCodex(seg, codexBefore))
      return ['deny', 'wuji-legion-codex-4.0 只读，不改、不执行']
    if ((/wuji-legion-codex-4\.0/i.test(seg) && (at(CODEX_MUT, seg, loose) || redirect.test(seg) || /^[&'"]*\s*['"]?\S*wuji-legion-codex-4\.0/i.test(seg)))
      || (codexBefore && (at(CODEX_MUT, seg, loose) || at(CODEX_RUN, g, loose) || redirect.test(seg))))
      return ['deny', 'wuji-legion-codex-4.0 只读，不改、不执行']
    if (!ask && (homeClaude.test(seg) || (homeEnv.test(seg) && quotedClaude.test(seg))) && !memoryDir.test(seg) && (at(WRITE, seg, loose) || redirect.test(seg) || SCRIPT_WRITE.test(seg)))
      ask = ['ask', '写 ~/.claude 须先获用户批准并留回退']
    if (!ask && (any(GIT_ASK, g, loose) || GIT_BRANCH_D.test(g))) ask = ['ask', '破坏性 git 操作需确认']
    if (!ask && /^(?:\S*[\\/])?git\s+push\b/i.test(g)) ask = ['ask', '外发内容需用户确认']
    if (!ask && GIT_ADD_F.test(g)) ask = ['ask', 'git add -f 可能提交被忽略的私有文件，需确认']
    if (!ask) for (const [list, why] of OUT_ASK) if ([g, ue].some(c => any(list, c, false))) { ask = ['ask', why]; break }
    if (!ask && DEL_NESTED.test(text)) ask = ['ask', '删除文件需确认，不删除用户文件']
    if (!ask && DYN.test(seg) && DYN_DANGER.test(cmd)) ask = ['ask', '动态执行含危险词，需确认']
  }
  if (repeated) return ['deny', '同一命令已失败 2 次：换方法或先修根因，不要原样重试']
  if (ask) return ask
  return null
}

module.exports = { decide }
if (require.main === module) {
  let s = ''
  process.stdin.on('data', c => { s += c }).on('end', () => {
    let p, cmd = ''
    try { p = JSON.parse(s.replace(/^﻿/, '')); cmd = String(p.tool_input.command || '') } catch (e) { process.exit(0) }
    const out = hit => { if (hit) process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: hit[0], permissionDecisionReason: hit[1] } })); process.exit(0) }
    if (p.tool_name === 'Workflow') out(['ask', '工作流调用需用户确认'])
    if (p.tool_name === 'Agent' || p.tool_name === 'Task')
      out(/^wuji-legion:/.test(String(p.tool_input.subagent_type || '')) ? null : ['ask', '非无极军团专家，确认是否作为能力缺口兜底'])
    let repeated = false
    try {
      const f = path.join(os.tmpdir(), 'wuji-fail-' + String(p.session_id || 'x').replace(/[^\w-]/g, '') + '.json')
      const e = JSON.parse(fs.readFileSync(f, 'utf8'))[cmd.trim().slice(0, 300)]
      repeated = !!e && e.n >= 2 && Date.now() - e.t < 10 * 60 * 1000
    } catch (e) {}
    out(decide(cmd, repeated))
  })
  setTimeout(() => process.exit(0), 1500)
}
