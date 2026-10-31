const fs = require('fs'), path = require('path')
const root = path.join(__dirname, '..', 'plugin', 'wuji-legion')
const bad = []
const manifest = JSON.parse(fs.readFileSync(path.join(root, '.claude-plugin', 'plugin.json'), 'utf8'))
const agentDir = path.join(root, 'agents')
const agents = fs.readdirSync(agentDir).filter(f => f.endsWith('.md')).map(f => {
  const t = fs.readFileSync(path.join(agentDir, f), 'utf8')
  const m = t.match(/^---\r?\n([\s\S]*?)\r?\n---/)
  const name = m && (m[1].match(/^name:\s*(\S+)/m) || [])[1]
  const desc = m && /^description:\s*\S/m.test(m[1])
  if (!name) bad.push(`${f}: frontmatter 缺 name`)
  else if (name + '.md' !== f) bad.push(`${f}: name(${name}) 与文件名不符`)
  if (m && !desc) bad.push(`${f}: frontmatter 缺 description`)
  return name
}).filter(Boolean)
const skillDir = path.join(root, 'skills', 'wuji-legion')
const docs = [path.join(skillDir, 'SKILL.md'), ...fs.readdirSync(path.join(skillDir, 'references')).map(f => path.join(skillDir, 'references', f))]
const text = {}
for (const d of docs) {
  const t = fs.readFileSync(d, 'utf8')
  text[path.basename(d)] = t
  for (const m of t.matchAll(/\]\(([^)#\s]+\.md)\)/g)) {
    if (/^https?:/.test(m[1])) continue
    if (!fs.existsSync(path.resolve(path.dirname(d), m[1]))) bad.push(`${path.basename(d)}: 链接断 ${m[1]}`)
  }
}
for (const n of agents) {
  const full = `${manifest.name}:${n}`
  for (const f of ['SKILL.md', 'expert-capability-index.md'])
    if (!text[f].includes(full)) bad.push(`${f}: 没写 ${full}`)
}
for (const f of ['SKILL.md', 'expert-capability-index.md', 'recipes.md', 'multi-source-research.md'])
  for (const m of (text[f] || '').matchAll(/wuji-legion:(wuji-[a-z-]+)/g))
    if (!agents.includes(m[1])) bad.push(`${f}: 引用了不存在的专家 ${m[0]}`)
console.log(bad.length ? bad.join('\n') : `OK: ${agents.length} 个专家 (${agents.join(', ')})，链接与引用一致`)
process.exit(bad.length ? 1 : 0)
