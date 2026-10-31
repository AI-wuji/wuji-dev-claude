const fs = require('fs'), os = require('os'), path = require('path')
let s = ''
process.stdin.on('data', c => { s += c }).on('end', () => {
  let p
  try { p = JSON.parse(s.replace(/^﻿/, '')) } catch (e) { process.exit(0) }
  const cmd = String((p.tool_input || {}).command || '').trim().slice(0, 300)
  if (!cmd) process.exit(0)
  const f = path.join(os.tmpdir(), 'wuji-fail-' + String(p.session_id || 'x').replace(/[^\w-]/g, '') + '.json')
  let st = {}
  try { st = JSON.parse(fs.readFileSync(f, 'utf8')) } catch (e) {}
  if (process.argv[2] === 'ok') delete st[cmd]
  else {
    if (p.is_interrupt) process.exit(0)
    const e = st[cmd] || { n: 0 }
    st[cmd] = { n: e.n + 1, t: Date.now() }
  }
  try { fs.writeFileSync(f, JSON.stringify(st)) } catch (e) {}
  process.exit(0)
})
setTimeout(() => process.exit(0), 1500)
