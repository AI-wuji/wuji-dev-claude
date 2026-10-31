# 无极军团 5.0（Claude 版）

**阿极直带专家：一个主 Skill 加 21 个专家子代理，运行在 Claude Code 上。**

📺 [在线介绍](https://ai-wuji.github.io/wuji-dev-claude/) | [更新日志](CHANGELOG.md) | 关联项目：[无极军团 Codex 版](https://github.com/AI-wuji/wuji-legion-codex)

---

## 这是什么

无极军团 5.0 是从 Codex 版改造过来的 Claude 版。它不造调度平台，也不建第二记忆库：阿极（当前的 Claude）是唯一入口，能自己办的自己办，需要专业分工时再调用对应的专家子代理，做完释放。

旧的"无极开发系统 v3.1"（单个 Skill）没有删除，原样放在 [`legacy/v3.1/`](legacy/v3.1/)。

## 安装

```
/plugin marketplace add AI-wuji/wuji-dev-claude
/plugin install wuji-legion@wuji-dev-claude
```

装完重启 Claude Code，专家以 `wuji-legion:wuji-*` 的名字出现。守卫钩子是可选的，见下文"仓库结构"。

## 21 个专家

| 专家 | 做什么 |
|---|---|
| 代码探查 `wuji-explorer` | 只读梳理功能怎么运作：入口、调用链、数据流，结论带行号 |
| 软件架构 `wuji-architect` | 读现有模式，给唯一方案、实现地图和构建顺序 |
| 工程实现 `wuji-engineer` | 在限定文件范围内实现、修复、重构 |
| 代码审阅 `wuji-code-reviewer` | 只读审阅，找正确性、安全、边界和回归风险 |
| 测试验证 `wuji-tester` | 补测试、固定行为、按验收标准逐条验收 |
| 故障诊断 `wuji-diagnostician` | 只读定位根因，回交证据链和建议修复点 |
| 逆向分析 `wuji-reverse` | 对已授权目标做只读静态分析 |
| 前端视觉 `wuji-frontend-visual` | 在限定范围内实现或改造界面 |
| 技能打包 `wuji-skill-packager` | 把流程整理成 Skill 或插件并校验 |
| 自动化设计 `wuji-automation` | 设计并实现本地脚本和小型工作流 |
| ComfyUI 工作流 `wuji-comfyui` | 设计调试工作流，写 Python 自定义节点 |
| 影视策划 `wuji-film-planner` | 剧本、分镜、美术方案、制作排期，只产出文本 |
| 视听制作 `wuji-av-producer` | 用本机命令行工具处理音视频，做成片检查 |
| 内容写作 `wuji-writer` | 文章、文案、选题、多平台改写，事实带来源 |
| 商务与合同 `wuji-business` | 方案、报价、合同风险标注，不是法律意见 |
| 文档 `wuji-document` | 解析、创建、编辑 Word、PDF、表格、演示 |
| 数据分析 `wuji-data-analyst` | 分析数据，结论带样本量和方法 |
| 研究 `wuji-researcher` | 在指定来源范围内调研，回交来源、反证和缺口 |
| 知识库问答 `wuji-knowledge-qa` | 只依据指定资料回答，每条带出处 |
| 学习与课程 `wuji-course` | 学习路径、课程大纲、练习，可当陪练 |
| 文件整理 `wuji-file-operator` | 先出映射表再整理，绝不删除 |

## 它怎么工作

- **缺输入就回交**：每个专家都有输入契约，缺项回交 `BLOCKED` 并列出缺什么，不猜。
- **失败先绕开**：换工具、换写法；仍失败就查根因；实在修不了才停下，报告错误原文。同一方式最多重试两次。
- **验证看产物**：不采信分身自述；作者不验自己。
- **权限边界**：不付费、不外发私有资料、不删除用户文件、不强杀进程、不写全局 `~/.claude`。
- **最短任务链**：能直办就直办，只需一个专家就调一个，有独立分支才并发。

规则全文见 [`CLAUDE.md`](CLAUDE.md) 和 [`plugin/wuji-legion/skills/wuji-legion/SKILL.md`](plugin/wuji-legion/skills/wuji-legion/SKILL.md)。

## 仓库结构

```
.claude-plugin/marketplace.json   插件市场清单
plugin/wuji-legion/               插件本体：主 Skill、references、21 个专家
CLAUDE.md                         项目规则
scripts/                          守卫钩子（guard.js、failtrack.js）与校验脚本
.claude/settings.example.json     钩子配置示例，<本仓库的绝对路径> 需自行替换
legacy/v3.1/                      旧版 无极开发系统 v3.1，原样保留
```

守卫钩子强制执行硬边界（例如拦截批量删除），需要自己把示例配置合进 `.claude/settings.json`。校验：`node scripts/check-facts.js`、`node scripts/test-guard.js`。

## 状态与局限

- 21 个专家只验证过"缺输入时回交 `BLOCKED`"。真正干活的质量没有系统实测。
- 各专家新增的方法要点来自官方和开源项目的读后蒸馏，来源、读到的程度和许可见 [`expert-sources.md`](plugin/wuji-legion/skills/wuji-legion/references/expert-sources.md)。星数和许可大多是转述，只有少数仓库做过抽查。
- 有些方向没找到可靠来源，已在上面那份文件里列出，没有硬补。
- 许可：沿用旧版的 MIT 声明；仓库里目前没有单独的 LICENSE 文件。

---

**☯️ 阿极在此。**
