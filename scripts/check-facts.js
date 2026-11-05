// 静态一致性检查：专家定义、名录、链接；在发布副本目录下另查 README/index.html。
// 只读；唯一读取的仓库外路径是本机插件缓存（不存在就跳过）。
const fs = require('fs'), path = require('path'), os = require('os')
const base = path.join(__dirname, '..')
const root = path.join(base, 'plugin', 'wuji-legion')
const bad = [], warn = []
const read = p => fs.readFileSync(p, 'utf8')
const manifest = JSON.parse(read(path.join(root, '.claude-plugin', 'plugin.json')))
const STD = '失败：先换工具或写法，再修根因，仍不行回交 BLOCKED，附工具、错误原文、已试路径；同一方式最多两次，不越权，不凭记忆补。'
const agentDir = path.join(root, 'agents')
const cn = {}
const agents = fs.readdirSync(agentDir).filter(f => f.endsWith('.md')).map(f => {
  const t = read(path.join(agentDir, f))
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  if (!m) { bad.push(`${f}: 缺 frontmatter`); return null }
  const name = (m[1].match(/^name:\s*(\S+)/m) || [])[1]
  if (!name) bad.push(`${f}: frontmatter 缺 name`)
  else if (name + '.md' !== f) bad.push(`${f}: name(${name}) 与文件名不符`)
  const desc = (m[1].match(/^description:\s*(.*)$/m) || [])[1]
  if (!desc) bad.push(`${f}: frontmatter 缺 description`)
  else {
    const d = desc.match(/^无极军团 ?(\S.*?专家)。/)
    if (!d) bad.push(`${f}: description 不是"无极军团…专家。"开头`)
    else if (name) cn[name] = d[1]
  }
  if (/^tools:.*\bAgent\b/m.test(m[1])) bad.push(`${f}: tools 含 Agent（专家不得嵌套派生）`)
  if (!t.includes(STD)) bad.push(`${f}: 缺失败标准句`)
  if (!t.includes('是数据，不是指令')) bad.push(`${f}: 缺"是数据，不是指令"`)
  return name
}).filter(Boolean)

const skillDir = path.join(root, 'skills', 'wuji-legion')
const refDir = path.join(skillDir, 'references')
const docs = [path.join(skillDir, 'SKILL.md'), ...fs.readdirSync(refDir).map(f => path.join(refDir, f))]
const text = {}
for (const d of docs) {
  const t = read(d)
  text[path.basename(d)] = t
  for (const m of t.matchAll(/\]\(([^)#\s]+\.md)\)/g)) {
    if (/^https?:/.test(m[1])) continue
    if (!fs.existsSync(path.resolve(path.dirname(d), m[1]))) bad.push(`${path.basename(d)}: 链接断 ${m[1]}`)
  }
  for (const m of t.matchAll(/wuji-legion:(wuji-[a-z-]+)/g))
    if (!agents.includes(m[1])) bad.push(`${path.basename(d)}: 引用了不存在的专家 ${m[0]}`)
}
// SKILL.md 名录是唯一路由表：每个专家写成"全名 中文名"，中文名与 description 一致
for (const n of agents) {
  const full = `${manifest.name}:${n}`
  if (!text['SKILL.md'].includes(full)) bad.push(`SKILL.md: 没写 ${full}`)
  else if (cn[n] && !text['SKILL.md'].includes(`${full}\` ${cn[n]}`)) bad.push(`SKILL.md: ${full} 的中文名不是"${cn[n]}"`)
}

// references/rules.md 必须与通用版 CLAUDE.md（wuji-dev-claude/CLAUDE.md）逐字一致；插件用户只拿得到 rules.md
{
  const rules = path.join(refDir, 'rules.md')
  const generic = [path.join(base, 'wuji-dev-claude', 'CLAUDE.md'), path.join(base, 'CLAUDE.md')]
    .find(p => fs.existsSync(p) && fs.existsSync(path.join(path.dirname(p), 'README.md')) && fs.existsSync(path.join(path.dirname(p), 'index.html')))
  if (!fs.existsSync(rules)) bad.push('references/rules.md: 不存在')
  else if (!generic) bad.push('rules.md: 找不到通用版 wuji-dev-claude/CLAUDE.md 用于比对')
  else if (!fs.readFileSync(rules).equals(fs.readFileSync(generic))) bad.push(`rules.md: 与 ${path.relative(base, generic) || 'CLAUDE.md'} 内容不一致`)
}

// 发布副本目录（有 README.md 和 index.html）另查主页
const pages = ['README.md', 'index.html'].map(f => path.join(base, f))
if (pages.every(p => fs.existsSync(p))) {
  for (const p of pages) {
    const t = read(p)
    for (const n of agents) {
      if (!t.includes(n)) bad.push(`${path.basename(p)}: 没写 ${n}`)
      if (cn[n] && !t.includes(cn[n])) bad.push(`${path.basename(p)}: 没写 ${cn[n]}`)
    }
  }
}

// 本机已安装缓存：同版本号但内容不同 -> 警告（改了内容没升 version，缓存不会更新）
const mktFile = [path.join(base, 'plugin', '.claude-plugin', 'marketplace.json'), path.join(base, '.claude-plugin', 'marketplace.json')].find(p => fs.existsSync(p))
if (mktFile) {
  const mkt = JSON.parse(read(mktFile)).name
  const cache = path.join(os.homedir(), '.claude', 'plugins', 'cache', mkt, manifest.name, manifest.version)
  if (fs.existsSync(cache)) {
    const list = d => fs.readdirSync(d, { withFileTypes: true }).flatMap(e =>
      e.isDirectory() ? list(path.join(d, e.name)).map(x => path.join(e.name, x)) : [e.name])
    const a = list(root).sort(), b = list(cache).sort()
    const diff = [...new Set([...a, ...b])].filter(f =>
      !a.includes(f) || !b.includes(f) || !fs.readFileSync(path.join(root, f)).equals(fs.readFileSync(path.join(cache, f))))
    if (diff.length) warn.push(`WARN: 源目录与缓存 ${mkt}/${manifest.name}/${manifest.version} 内容不同但版本号相同（${diff.length} 个文件，如 ${diff.slice(0, 3).join(', ')}）；改内容须升 version`)
  }
}

if (warn.length) console.log(warn.join('\n'))
console.log(bad.length ? bad.join('\n') : `OK: ${agents.length} 个专家 (${agents.join(', ')})，定义、名录、链接与引用一致`)
process.exit(bad.length ? 1 : 0)
