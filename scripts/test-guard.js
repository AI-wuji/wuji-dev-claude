const fs = require('fs'), os = require('os'), path = require('path'), cp = require('child_process')
const run = (script, payload, ...args) => cp.spawnSync(process.execPath, [path.join(__dirname, script), ...args], { input: JSON.stringify(payload), encoding: 'utf8' }).stdout
const sid = 'selftest-' + Date.now()
const dec = cmd => { const o = run('guard.js', { session_id: sid, tool_input: { command: cmd } }); return o ? JSON.parse(o).hookSpecificOutput.permissionDecision : 'allow' }
let fail = 0
const check = (label, want, got) => { if (want !== got) fail++; console.log(`${want === got ? 'OK  ' : 'FAIL'} want ${want.padEnd(5)} got ${got.padEnd(5)} ${label}`) }
for (const [want, cmd] of JSON.parse(fs.readFileSync(path.join(__dirname, 'guard-cases.json'), 'utf8'))) check(cmd, want, dec(cmd))
const fail1 = interrupt => run('failtrack.js', { session_id: sid, tool_input: { command: 'npm test' }, is_interrupt: interrupt })
check('3rd try, no failures yet', 'allow', dec('npm test'))
fail1(false); check('after 1 failure', 'allow', dec('npm test'))
fail1(false); check('after 2 failures', 'deny', dec('npm test'))
check('different command unaffected', 'allow', dec('npm run build'))
run('failtrack.js', { session_id: sid, tool_input: { command: 'npm test' } }, 'ok'); check('after a success', 'allow', dec('npm test'))
fail1(true); fail1(true); check('interrupts are not counted', 'allow', dec('npm test'))
try { fs.unlinkSync(path.join(os.tmpdir(), 'wuji-fail-' + sid + '.json')) } catch (e) {}
console.log(fail ? `failures: ${fail}` : 'all passed')
process.exit(fail ? 1 : 0)
