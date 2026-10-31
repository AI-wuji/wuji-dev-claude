const fs = require('fs'), os = require('os'), path = require('path')
const wrapper = /^(cmd(\.exe)?\s+\/c\b|(powershell|pwsh)(\.exe)?\b.*\s-(c|command)\b|(bash|sh|zsh)\s+-c\b|wsl(\.exe)?\s+(?!--shutdown))/i
const homeClaude = /(~|\$env:USERPROFILE|%USERPROFILE%|[A-Za-z]:[\\/]Users[\\/][^\\/\s'"]+)[\\/]\.claude\b/i
const memoryDir = /\.claude[\\/]projects[\\/][^\\/\s'"]+[\\/]memory[\\/]/i
const redirect = /(^|[^2&<])>>?\s*\S/
const DECISIONS = [
  ['deny', ['(shutdown(\\.exe)?|poweroff|halt|reboot)\\b', 'wsl(\\.exe)?\\s+--shutdown', '(Stop|Restart)-Computer\\b'], '关机或重启须有用户新的明确请求'],
  ['deny', ['Stop-Process\\b.*-Force', 'taskkill\\b.*\\/f', 'kill\\s+-9\\b', 'killall\\b', 'pkill\\b'], '不强杀进程'],
  ['deny', ['rm\\s+(-[a-zA-Z]*[rR][a-zA-Z]*|--recursive)\\b', '(Remove-Item|ri|del|erase|rd|rmdir)\\b.*\\s-r[a-z]*\\b', '(rd|rmdir|del|erase)\\b.*\\s\\/s\\b', 'find\\b.*-delete', 'git\\s+clean\\b.*\\s-[a-z]*f'], '递归或批量删除被禁止，不清理用户文件'],
]
const GIT_ASK = ['git\\s+push\\b.*(--force|\\s-f\\b)', 'git\\s+reset\\s+--hard']
const WRITE = 'Set-Content|Add-Content|Out-File|Copy-Item|Move-Item|Remove-Item|New-Item|Rename-Item|Clear-Content|tee|cp|mv|rm|ln|sed\\s+-i'
const CODEX_MUT = 'Remove-Item|Set-Content|Add-Content|Out-File|Move-Item|Rename-Item|Clear-Content|New-Item|rm|del|mv|python|node|cargo|npm|npx|sed\\s+-i'

const at = (src, seg, loose) => new RegExp((loose ? '' : '^(?:\\S*[\\\\/])?') + '(?:' + src + ')', 'i').test(seg)
const any = (list, seg, loose) => list.some(s => at(s, seg, loose))

function decide(cmd, repeated) {
  const segs = cmd.split(/&&|\|\||[;|\n]/).map(x => x.trim().replace(/^[&(]\s*/, '').replace(/^["']/, '').replace(/^(sudo|call|command|exec|time)\s+/i, ''))
  for (const seg of segs) {
    const loose = wrapper.test(seg)
    for (const [d, list, why] of DECISIONS) if (any(list, seg, loose)) return [d, why]
    if (/wuji-legion-codex-4\.0/i.test(seg) && (at(CODEX_MUT, seg, loose) || redirect.test(seg) || /^[&'"]*\s*['"]?\S*wuji-legion-codex-4\.0/i.test(seg)))
      return ['deny', 'wuji-legion-codex-4.0 只读，不改、不执行']
    if (homeClaude.test(seg) && !memoryDir.test(seg) && (at(WRITE, seg, loose) || redirect.test(seg)))
      return ['ask', '写 ~/.claude 须先获用户批准并留回退']
    if (any(GIT_ASK, seg, loose)) return ['ask', '破坏性 git 操作需确认']
  }
  if (repeated) return ['deny', '同一命令已失败 2 次：换方法或先修根因，不要原样重试']
  return null
}

module.exports = { decide }
if (require.main === module) {
  let s = ''
  process.stdin.on('data', c => { s += c }).on('end', () => {
    let p, cmd = ''
    try { p = JSON.parse(s.replace(/^﻿/, '')); cmd = String(p.tool_input.command || '') } catch (e) { process.exit(0) }
    let repeated = false
    try {
      const f = path.join(os.tmpdir(), 'wuji-fail-' + String(p.session_id || 'x').replace(/[^\w-]/g, '') + '.json')
      const e = JSON.parse(fs.readFileSync(f, 'utf8'))[cmd.trim().slice(0, 300)]
      repeated = !!e && e.n >= 2 && Date.now() - e.t < 10 * 60 * 1000
    } catch (e) {}
    const hit = decide(cmd, repeated)
    if (!hit) process.exit(0)
    process.stdout.write(JSON.stringify({ hookSpecificOutput: { hookEventName: 'PreToolUse', permissionDecision: hit[0], permissionDecisionReason: hit[1] } }))
    process.exit(0)
  })
  setTimeout(() => process.exit(0), 1500)
}
