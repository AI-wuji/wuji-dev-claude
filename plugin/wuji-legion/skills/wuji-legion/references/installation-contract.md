# 5.0 安装与状态契约（Claude 版，插件形式）

检查清单，不授予权限，不要求当前任务修改用户目录。

## 状态含义

三者分开记录，互不替代：文件已写入、被会话发现、行为已观察。

- **项目内可用**：已通过本地市场 `wuji-local` 在项目范围安装（`.claude/settings.json` 的 `extraKnownMarketplaces` 与 `enabledPlugins`），在本项目开新会话会自动加载，不需要 `--plugin-dir`。市场清单在 `plugin/.claude-plugin/marketplace.json`。安装会把插件复制到 `~/.claude/plugins/cache/wuji-local/wuji-legion/<版本>/`，并按 `plugin.json` 的 `version` 固定。改了插件内容必须同时改 version，再执行 `claude plugin marketplace update wuji-local` 和 `claude plugin update wuji-legion@wuji-local --scope project`，新会话才会读到新内容。回退：`claude plugin uninstall wuji-legion@wuji-local --scope project`，再 `claude plugin marketplace remove wuji-local`。
- **全局已安装**：插件已装入用户目录。只有部署并回读确认后才能这样说。

## 项目文件清单

- `CLAUDE.md`：项目规则
- `.claude/settings.json`：硬权限边界（deny 规则）
- `.mcp.json`：项目级 MCP（目前只有 context7，首次使用需用户批准）
- `plugin/wuji-legion/.claude-plugin/plugin.json`
- `plugin/wuji-legion/skills/wuji-legion/SKILL.md`
- `plugin/wuji-legion/skills/wuji-legion/references/`：`multi-source-research.md`、`expert-capability-index.md`、`recipes.md`、`dispatch-and-verify.md`、`context-continuity.md`、`installation-contract.md`
- `plugin/wuji-legion/agents/`：`wuji-researcher.md`、`wuji-engineer.md`、`wuji-code-reviewer.md`、`wuji-document.md`

插件加载后，专家的调用名带前缀：`wuji-legion:wuji-researcher` 等。

## 部署到全局（仅在用户明确要求后）

1. 经用户批准并留回退后，才可写 `~/.claude`。
2. 通过插件机制安装（如 marketplace 或 `--plugin-dir`），不手工散拷文件。
3. 全局 `CLAUDE.md` 已存在时只合并军团通用规则，不整文件替换。
4. 不覆盖无关的 `settings.json`、模型设置、凭据、其他插件、MCP、Skill 和子代理。

## 最低验收（部署后回读）

1. `claude plugin validate` 退出码 0。
2. `plugin.json` 可解析，四个 agent 文件 frontmatter 含 `name`、`description`。
3. SKILL.md 的 references 全部存在，相对路径未越界，文件为 UTF-8。
4. 新会话中 Agent 工具能列出 `wuji-legion:*` 四个专家，并实际调用一次。第 4 项是行为观察，文件存在不能代替它。

任何一步失败，保留失败状态，不把待部署写成已安装，不自动重试有副作用的安装动作。
