# 无极军团 5.0（Claude 版）

**轻量协调入口 + 按需冷态激活的专业专家。** 专家数量随实际职责演进，不设固定目标；职责和行为状态见专家名录与更新日志。

📺 [在线介绍](https://ai-wuji.github.io/wuji-dev-claude/) | [更新日志](CHANGELOG.md) | 关联项目：[无极军团 Codex 版](https://github.com/AI-wuji/wuji-legion-codex)

---

## 这是什么

无极军团 5.0 是从 Codex 版改造过来的 Claude 版。它不造调度平台，也不建第二记忆库：阿极是轻量用户入口，负责沟通、最低限度澄清、派发、进度/阻塞跟进和交付证据完整性核对；调研、设计、实现、专业集成和验收由按需冷态激活的匹配专家承担。无匹配专家时明确记录能力缺口，不由阿极兜底。

旧的"无极开发系统 v3.1"（单个 Skill）没有删除，原样放在 [`legacy/v3.1/`](legacy/v3.1/)。

## 安装

```
/plugin marketplace add AI-wuji/wuji-dev-claude
/plugin install wuji-legion@wuji-dev-claude
```

装完重启 Claude Code，专家以 `wuji-legion:wuji-*` 的名字出现。守卫钩子是可选的，见下文"仓库结构"。

## 专家

| 专家 | 做什么 |
|---|---|
| 代码探查专家 `wuji-explorer` | 只读梳理功能怎么运作：入口、调用链、数据流，结论带行号 |
| 软件架构专家 `wuji-architect` | 读现有模式，给唯一方案、实现地图和构建顺序 |
| 工程实现专家 `wuji-engineer` | 在限定文件范围内实现、修复、重构 |
| 代码审阅专家 `wuji-code-reviewer` | 只读审阅正确性、安全、边界和回归风险；含能力演进评审（消费者、版本、撤销、恢复） |
| 测试验证专家 `wuji-tester` | 补测试、固定行为、按验收标准逐条验收 |
| 故障诊断专家 `wuji-diagnostician` | 只读定位根因，回交证据链和建议修复点 |
| 逆向分析专家 `wuji-reverse` | 对已授权目标做只读静态分析，不运行目标程序 |
| 威胁建模专家 `wuji-threat-modeler` | 对授权系统做只读 STRIDE 建模，不执行攻击或渗透 |
| 前端视觉专家 `wuji-frontend-visual` | 在限定范围内实现或改造界面，审查视觉问题 |
| 技能打包专家 `wuji-skill-packager` | 把流程整理成 Skill 或插件，写触发描述并校验 |
| 自动化设计专家 `wuji-automation` | 设计并实现本地脚本和小型工作流，定时与常驻交用户批准 |
| ComfyUI 工作流专家 `wuji-comfyui` | 设计调试工作流，写 Python 自定义节点，不擅自下载安装 |
| 影视策划专家 `wuji-film-planner` | 剧本、分镜表、美术方案、制作排期，只产出文本 |
| 视听制作专家 `wuji-av-producer` | 用本机命令行工具处理音视频，读回成品规格 |
| 代码动效专家 `wuji-motion-graphics` | 用已有工具制作可编辑程序化动画，先预览再导出 |
| 内容写作专家 `wuji-writer` | 文章、文案、选题、多平台改写，事实带来源，只出草稿 |
| 媒体质量审查专家 `wuji-media-reviewer` | 独立只读检查媒体规格；多分支交付时锁定版本、核对一致性并写集成清单 |
| 商务资料专家 `wuji-business` | 客户方案、报价、商务定位与资料；不做合同风险审查 |
| 合同审查专家 `wuji-contract-reviewer` | 独立审查条款风险与修改建议，不提供法律意见 |
| 文档处理专家 `wuji-document` | 解析、创建、编辑 Word、PDF、表格、演示 |
| 数据分析专家 `wuji-data-analyst` | 分析数据，结论带样本量和方法 |
| 调研专家 `wuji-researcher` | 在指定来源范围内调研，回交来源、反证和缺口；本地资料只依据资料作答，没有就说没有 |
| 学习课程专家 `wuji-course` | 学习路径、课程大纲、练习，可当陪练 |
| 文件整理专家 `wuji-file-operator` | 先出映射表再整理，绝不删除 |

## 它怎么工作

- **缺输入就回交**：每个专家都有输入契约，缺项回交 `BLOCKED` 并列出缺什么，不猜。
- **失败先绕开**：换工具、换写法；仍失败就查根因；实在修不了才停下，报告错误原文。同一方式最多重试两次。
- **验证看产物**：不采信分身自述；作者不验自己。
- **权限边界**：不付费、不外发私有资料、不删除用户文件、不强杀进程、不写全局 `~/.claude`。
- **按需路由**：已有证据够、一两步能答完的，阿极直接答；需要新的专业判断、写代码、动文件或较大调研时，才交匹配的冷态专家执行，独立分支并发。无匹配专家时记录能力缺口，不用通用代理兜底。
- **阿极对话**：先给结论；用户前提有错当场指出并附证据；不因坚持改口，只因新证据改口；事实、推断、unknown 分开标。

如有职责、方法、工具或验收边界实质不同且存在真实任务消费者，可独立新增专家；不设专家数量目标；职责重叠的会合并（5.2.0 由 28 个合并删减为 24 个）。

规则全文见 [`CLAUDE.md`](CLAUDE.md) 和 [`plugin/wuji-legion/skills/wuji-legion/SKILL.md`](plugin/wuji-legion/skills/wuji-legion/SKILL.md)。

## 仓库结构

```
.claude-plugin/marketplace.json   插件市场清单
plugin/wuji-legion/               插件本体：主 Skill、references、按需激活的专业专家
CLAUDE.md                         项目规则
scripts/                          守卫钩子（guard.js、failtrack.js）与校验脚本
.claude/settings.example.json     钩子配置示例，<本仓库的绝对路径> 需自行替换
legacy/v3.1/                      旧版 无极开发系统 v3.1，原样保留
```

守卫钩子强制执行硬边界（例如拦截批量删除），需要自己把示例配置合进 `.claude/settings.json`。校验：`node scripts/check-facts.js`、`node scripts/test-guard.js`。

## 状态与局限

- 专家定义清单是当前职责路由，不表示旧版 58 项能力已全部覆盖；当前专家的行为执行与专业验收尚未系统验证。
- 各专家新增的方法要点来自官方和开源项目的读后蒸馏，来源、读到的程度和许可见 [`expert-sources.md`](plugin/wuji-legion/skills/wuji-legion/references/expert-sources.md)。星数和许可大多是转述，只有少数仓库做过抽查。
- 有些方向没找到可靠来源，已在上面那份文件里列出，没有硬补。
- 许可：沿用旧版的 MIT 声明；仓库里目前没有单独的 LICENSE 文件。

---

**☯️ 阿极在此。**
