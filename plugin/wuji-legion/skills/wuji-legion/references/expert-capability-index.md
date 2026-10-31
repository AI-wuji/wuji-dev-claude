# 专家能力索引（按需解析）

本索引把专家职责接到当前会话可用的工具和 Skill。专家是插件 `agents/` 下的子代理定义，插件加载后以 `wuji-legion:` 前缀通过 `Agent` 工具启用。定义文件存在不等于分身已运行，是否执行以调用回执为准。MCP、连接器只有当前会话明确提供并授权时才绑定，本索引不猜测。

## 冷态生命周期（所有专家统一）

阿极是常驻的轻量入口。专家定义保存在磁盘上，不调用就不进上下文、不占并发。任务匹配时启用一个一次性分身，完成后分身结束。宿主不能暂停分身时，只保留最小检查点，后续用 `SendMessage` 续接同一分身或新开分身，不声称原进程仍挂起。这里的 MoE 指外层的角色路由与激活策略，不是对底层模型结构的断言。

## 派发约定

- 同一专家可按互斥来源或对象范围开多个分身。方法、工具、权限或交付物实质不同才拆成不同专家。
- 专家的 `tools` 不含 `Agent`，所以不会再派生子代理（平台默认允许嵌套，这里是有意关闭）。拆解和合并由阿极完成。新增专家时也不要给 `Agent` 工具，除非有明确的嵌套需求。
- 只传任务、必要上下文、读写范围、产物要求和回交格式，不传冗长推理。
- 没有对应专家时，阿极直办，或用通用子代理，并且不阻塞不依赖它的分支。

## 当前专家

共 21 个。中文名写在每个专家 `description` 开头（“无极军团XX专家”），子代理标识（`name`）保持 ASCII，因为文档没有保证中文标识可用。

### 研究与知识

| 中文名 | `subagent_type` | 用途 | 工具边界 | 并发方式 |
|---|---|---|---|---|
| 调研专家 | `wuji-legion:wuji-researcher` | 在指定来源内调研，回交结论、来源、日期、反证、缺口 | 只读：WebSearch、WebFetch、Read、Grep、Glob、Bash | 每个来源范围一个分身 |
| 知识库问答专家 | `wuji-legion:wuji-knowledge-qa` | 只依据给定资料回答，带出处，没有就答没有 | 只读：Read、Grep、Glob、Bash | 每个资料库一个分身 |
| 数据分析专家 | `wuji-legion:wuji-data-analyst` | 分析表格、日志、JSON，出图，审查看板口径 | Read、Write、Edit、Bash、Glob、Grep、Skill | 每个数据集一个分身 |

### 软件

| 中文名 | `subagent_type` | 用途 | 工具边界 | 并发方式 |
|---|---|---|---|---|
| 工程实现专家 | `wuji-legion:wuji-engineer` | 限定范围内实现、修复、重构，覆盖多种语言 | 可写：Read、Edit、Write、Grep、Glob、Bash | 每个互不重叠的文件集一个分身 |
| 代码审阅专家 | `wuji-legion:wuji-code-reviewer` | 审阅代码或改动，找正确性、安全、边界问题 | 只读：Read、Grep、Glob、Bash | 每个模块一个分身 |
| 故障诊断专家 | `wuji-legion:wuji-diagnostician` | 定位报错、崩溃的根因，给证据链，不修 | 只读：Read、Grep、Glob、Bash | 每个故障一个分身 |
| 软件架构专家 | `wuji-legion:wuji-architect` | 为功能或改造给唯一方案、实现地图和构建顺序 | 只读：Read、Grep、Glob、WebFetch、WebSearch | 每个功能一个分身 |
| 代码探查专家 | `wuji-legion:wuji-explorer` | 梳理陌生模块的入口、调用链、必读文件 | 只读：Read、Grep、Glob、Bash | 每个模块一个分身 |
| 测试验证专家 | `wuji-legion:wuji-tester` | 补测试、固定行为、按标准验收，破坏验证 | 只写测试：Read、Edit、Write、Grep、Glob、Bash | 每个模块一个分身 |
| 技能打包专家 | `wuji-legion:wuji-skill-packager` | 把流程整理成 Skill 或插件并校验 | 只写指定项目目录 | 每个技能一个分身 |
| 逆向分析专家 | `wuji-legion:wuji-reverse` | 对获授权目标做只读静态分析 | 只读：Read、Grep、Glob、Bash | 每个目标一个分身 |
| 自动化设计专家 | `wuji-legion:wuji-automation` | 设计并实现本地脚本和工作流；定时、常驻须批准 | Read、Edit、Write、Grep、Glob、Bash | 每个流程一个分身 |

### 文档、界面、内容

| 中文名 | `subagent_type` | 用途 | 工具边界 | 并发方式 |
|---|---|---|---|---|
| 文档处理专家 | `wuji-legion:wuji-document` | 解析、创建、编辑 Word、PDF、表格、演示文件 | Read、Edit、Write、Bash、Glob、Grep、Skill | 每个文件一个分身 |
| 前端视觉专家 | `wuji-legion:wuji-frontend-visual` | 实现或审查界面的视觉与可用性 | Read、Edit、Write、Grep、Glob、Bash、Skill | 每个页面一个分身 |
| 文件整理专家 | `wuji-legion:wuji-file-operator` | 批量归类、重命名、复制，留映射表，绝不删除 | Read、Write、Edit、Bash、Glob、Grep | 每个目录一个分身，范围不重叠 |
| 内容写作专家 | `wuji-legion:wuji-writer` | 写作、选题、多平台改写、发布素材，只出草稿 | Read、Write、Edit、Glob、Grep、WebSearch、WebFetch | 每篇一个分身 |
| 商务合同专家 | `wuji-legion:wuji-business` | 客户方案、合同风险标注，非法律意见 | Read、Write、Edit、Glob、Grep | 每份文件一个分身 |
| 学习课程专家 | `wuji-legion:wuji-course` | 学习路径、课程大纲、练习与测验 | Read、Write、Edit、Glob、Grep、WebSearch、WebFetch | 每门课一个分身 |

### 影视、音视频、ComfyUI

| 中文名 | `subagent_type` | 用途 | 工具边界 | 并发方式 |
|---|---|---|---|---|
| 影视策划专家 | `wuji-legion:wuji-film-planner` | 剧本、分镜表、美术方案、制作排期，只出文本 | Read、Write、Edit、Glob、Grep | 每个作品或分集一个分身 |
| 视听制作专家 | `wuji-legion:wuji-av-producer` | 用本机 ffmpeg 等处理音视频图片，成片质量检查 | Read、Write、Edit、Bash、Glob、Grep | 每个素材一个分身 |
| ComfyUI 工作流专家 | `wuji-legion:wuji-comfyui` | 工作流设计调试、Python 节点、性能、打包 | Read、Edit、Write、Grep、Glob、Bash | 每个工作流一个分身 |

## 其余职责

Codex 版 58 个专家、27 个配方的落点（直办或哪个专家）见 [配方与职责落点](recipes.md)，借鉴来源见 [专家借鉴来源](expert-sources.md)。

## 就绪的现有 Skill 绑定

只在任务确实需要且当前会话列出该 Skill 时加载，不预装、不常驻。

| 任务 | 可用 Skill | 说明 |
|---|---|---|
| Word 文档 | `anthropic-skills:docx` | 由 `wuji-legion:wuji-document` 或阿极加载 |
| PDF | `anthropic-skills:pdf`、`anthropic-skills:pdf-reading` | 创建/操作用前者，只读提取用后者 |
| 表格 | `anthropic-skills:xlsx` | 含 CSV、TSV |
| 演示文稿 | `anthropic-skills:pptx` | |
| 图表与看板 | `dataviz` | 写图表代码前先读 |
| 界面设计 | `anthropic-skills:frontend-design` | |
| 代码审阅 | `code-review`、`simplify`、`security-review` | 阿极直接调用，或交给 `wuji-legion:wuji-code-reviewer` |
| Claude API 开发 | `claude-api` | 任务涉及 Anthropic SDK 时加载 |

这些 Skill 的可用性取决于当前会话，调用前以会话中的 Skill 列表为准。

## 外部扩展取舍（2026-10-30 核实）

星数取自 GitHub 接口，会变动。

| 项目 | 决定 | 依据 |
|---|---|---|
| `context7`（Upstash，约 6.4 万星，MIT） | **已接入**，项目根 `.mcp.json`，远程 HTTP，无需 key | 官方市场收录。补"查最新库文档"的缺口。查询会发往 Upstash 托管服务，只传库名和通用问题，不传私有代码和凭据。首次使用需用户批准该 MCP |
| `ponytail`（约 18 万星，MIT） | 作者本机已全局安装（用户授权），本仓库不含它 | 用户要求一切任务和汇报都按它的理念做。钩子已审读，无联网和 eval。回退说明只在作者本机，不随本仓库发布。它的规则同时蒸馏在 `CLAUDE.md` 和 `SKILL.md` 里 |
| `playwright-mcp`、`chrome-devtools-mcp` | 不装 | 桌面应用自带浏览器预览，当前没有端到端测试的需求 |
| `github-mcp-server` | 不装 | 需要个人令牌，属凭据决定，由用户定 |
| `superpowers` | 不整装 | 默认长流程与"最短任务链"冲突，只在有真实任务时取单项并标注来源 |
| `claude-mem` | 不装 | 等于第二个记忆库，违反项目规则 |

媒体端（HN、dev.to）反复出现的问题是 MCP 工具的 token 开销和 CLAUDE.md 过长，所以只接入一个 MCP，规则文件保持精简。

## 能力缺口处理

首次遇到未覆盖的职责且有真实重复需求时，补一张专家卡：职责边界、最窄的工具集、输入与产物、并发与依赖条件、权限限制、失败降级。需要外部新能力时，先查官方文档，只有采用会影响当前交付才绑定。没有消费者的专家不预建。

## 压缩与交接

长任务触发压缩或交接时，按需读 [上下文连续性协议](context-continuity.md)。简单任务不写恢复包。
