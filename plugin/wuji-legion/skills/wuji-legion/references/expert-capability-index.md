# 专家能力索引（按需解析）

专家名录只在 `SKILL.md`，本文件不重复。这里只放 Skill 绑定、外部扩展取舍和能力缺口处理。借鉴来源见 [专家借鉴来源](expert-sources.md)。

## 就绪的现有 Skill 绑定

只在任务确实需要且当前会话列出该 Skill 时加载，不预装、不常驻。

| 任务 | 可用 Skill | 说明 |
|---|---|---|
| Word 文档 | `anthropic-skills:docx` | 由 `wuji-legion:wuji-document` 按需加载 |
| PDF | `anthropic-skills:pdf`、`anthropic-skills:pdf-reading` | 创建/操作用前者，只读提取用后者，由文档专家按需加载 |
| 表格 | `anthropic-skills:xlsx` | 含 CSV、TSV；由文档或数据分析专家按职责加载 |
| 演示文稿 | `anthropic-skills:pptx` | 由文档处理专家按需加载 |
| 图表与看板 | `dataviz` | 数据分析专家写图表代码前先读 |
| 界面设计 | `anthropic-skills:frontend-design` | 前端视觉专家按需加载 |
| 代码审阅 | `code-review`、`simplify`、`security-review` | 交 `wuji-legion:wuji-code-reviewer` 按需执行 |
| Claude API 开发 | `claude-api` | 由架构或工程专家按职责加载

这些 Skill 的可用性取决于当前会话，调用前以会话中的 Skill 列表为准。

## 外部扩展取舍（2026-10-30 核实）

星数取自 GitHub 接口，会变动。

| 项目 | 决定 | 依据 |
|---|---|---|
| `context7`（Upstash，约 6.4 万星，MIT） | **已接入**，项目根 `.mcp.json`，远程 HTTP，无需 key | 官方市场收录。补"查最新库文档"的缺口。查询会发往 Upstash 托管服务，只传库名和通用问题，不传私有代码和凭据。首次使用需用户批准该 MCP |
| `ponytail`（约 18 万星，MIT） | 作者本机已全局安装（用户授权），本仓库不含它 | 用户要求一切任务和汇报都按它的理念做。钩子行为（读 5.3.3 源码核对）：`hooks/band/register.tsx` 在 `webhookUrl` 非空时会联网（`fetch`）；`hooks/ponytail-subagent.js` 用 `vm` 沙箱跑用户配置的正则（超时 100ms）；band 每轮读会话记录，并在 `~/.config/ponytail/band` 写状态。回退说明只在作者本机，不随本仓库发布。它的规则蒸馏在 `CLAUDE.md` 里 |
| `playwright-mcp`、`chrome-devtools-mcp` | 不装 | 桌面应用自带浏览器预览，当前没有端到端测试的需求 |
| `github-mcp-server` | 不装 | 需要个人令牌，属凭据决定，由用户定 |
| `superpowers` | 不整装 | 默认长流程与"最短任务链"冲突，只在有真实任务时取单项并标注来源 |
| `claude-mem` | 不装 | 等于第二个记忆库，违反项目规则 |

媒体端（HN、dev.to）反复出现的问题是 MCP 工具的 token 开销和 CLAUDE.md 过长，所以只接入一个 MCP，规则文件保持精简。

## 能力缺口处理

首次遇到未覆盖的职责且有真实重复需求时，补一张专家卡：职责边界、最窄的工具集、输入与产物、并发与依赖条件、权限限制、失败降级。需要外部新能力时，先查官方文档，只有采用会影响当前交付才绑定。没有消费者的专家不预建。
