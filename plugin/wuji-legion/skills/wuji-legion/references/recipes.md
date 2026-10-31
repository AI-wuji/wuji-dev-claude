# 配方与职责落点（Codex 版 58 专家、27 配方的 Claude 版归并）

配方是知识，不是代理或审批链。阿极按任务查此表，决定直办、调哪个专家、哪些分支可并发。主帅、参谋层不再存在，其拆解、路由、汇总由阿极承担。

落点只有两种：**直办**（阿极自己做）和**专家**（`wuji-legion:` 下的 21 个，中文名与用途见 [专家能力索引](expert-capability-index.md)）。

## 软件

| 原职责 | 落点 | 做法 |
|---|---|---|
| incident-diagnosis | `wuji-diagnostician` 故障诊断 | 先复现，再逐个排除假设，只读不修。修复交 `wuji-engineer` |
| code-repair、code-implementation、python/rust/go/cpp 工程师 | `wuji-engineer` 工程实现 | 一个专家覆盖多语言，语言写进任务，不分设专家 |
| code-review | `wuji-code-reviewer` 代码审阅 | 按模块或文件集并发多个分身 |
| software-architecture | `wuji-architect` 软件架构 | 只给一个明确方案和实现地图 |
| （新增）代码探查 | `wuji-explorer` 代码探查 | 接手陌生代码前先梳理调用链与必读文件 |
| delivery-acceptance、测试 | `wuji-tester` 测试验证 | 作者不验自己，不与实现用同一分身 |
| skill-packager、comfyui-packaging | `wuji-skill-packager` 技能打包 | 只写项目目录，装全局须先获批准 |
| software-reverse | `wuji-reverse` 逆向分析 | 只限用户有权分析的对象，无授权说明不开始 |
| ai-workflow-engineer、automation-design、workbench-builder | `wuji-automation` 自动化设计 | 设计和本地脚本可做；定时、常驻、对外发送须用户批准 |

## 研究、知识、数据

| 原职责 | 落点 | 做法 |
|---|---|---|
| research | `wuji-researcher` 调研 | 多来源并发见 [研究配方](multi-source-research.md) |
| knowledge-base-qa | `wuji-knowledge-qa` 知识库问答 | 只依据给定资料，找不到就答没有 |
| data-analysis、dashboard-review | `wuji-data-analyst` 数据分析 | 先看数据质量，再算，再出图 |
| file-operations | `wuji-file-operator` 文件整理 | 先出映射表再动，绝不删除 |
| 研究决策回交 | 直办 | 结论、来源、日期、反证、缺口，事实与推断分开 |

## 文档与界面

| 原职责 | 落点 | 做法 |
|---|---|---|
| document-deck、template-curator | `wuji-document` 文档处理 | 每个文件一个分身，按需加载对应 Skill |
| frontend-visual | `wuji-frontend-visual` 前端视觉 | 用 `frontend-design` Skill。看不到真实渲染就如实声明 |

## 内容、商务、学习

| 原职责 | 落点 | 做法 |
|---|---|---|
| writing、content-operations、topic-selection、multi-platform-distribution、video-copywriter、publication-delivery | `wuji-writer` 内容写作 | 只写草稿，不发布。发布须用户逐次授权 |
| client-proposal、contract-risk、business-library | `wuji-business` 商务合同 | 只做风险提示，不当法律意见，不签不发 |
| course-design、learning-coach | `wuji-course` 学习课程 | 事实带来源 |

## 影视、音视频、ComfyUI

| 原职责 | 落点 | 做法 |
|---|---|---|
| screenwriter、visual-storyboard、comic-storyboard、art-director、studio-producer、studio-owner | `wuji-film-planner` 影视策划 | 只产出文本方案 |
| video-production、motion-graphics、post-production、voice-audio、image-creation、media-quality-review | `wuji-av-producer` 视听制作 | 只用本机命令行工具，输出写新文件；无生成工具就只写提示词并声明未生成；不碰音频设备与驱动 |
| comfyui 系列（reverse、workflow、python-node、debug-performance、test-verification、distillation、packaging） | `wuji-comfyui` ComfyUI 工作流 | 不改本体，不擅自下载模型或装依赖。rust/go/cpp 扩展交 `wuji-engineer`，只读逆向交 `wuji-reverse` |

## 直办（不设专家）

- requirement-decomposition、evolution-review：阿极自己做。经验晋升与复盘规则见 [派发与验证](dispatch-and-verify.md)。
- 元指令的设计、改写、治理：直办。改动 `~/.claude` 或全局规则，须先获批准并留回退。

## 冷态参考库（只指路径，不复制）

DSH 版有 67 个专家的角色正文，统一框架为我负责/不负责、输入契约、约束、输出、自检、诚实标注。某类职责需要加深时，先读对应正文再改专家，不预装。

- 本机 `dsh-wuji-legion-mode` 目录（未随本仓库发布）下的 `preset/roles/`（公共段 `_common.md`）
- 同目录下 `docs/` 里的 `角色格式规范.md`、`ROLE-FRAMEWORK.md`
- 本机 `wuji-legion-codex-4.0`（未随本仓库发布，只读）下的 `catalog/p3/experts.json`（五要素原文）

专家数在不同文档里是 57、58、67，随时间和统计口径漂移，以读取时的目录为准。借鉴来源见 [专家借鉴来源](expert-sources.md)。

## 高风险改动的盲审

并发 2 个以上 `wuji-legion:wuji-code-reviewer`，首轮互不可见，阿极合并发现。细则见 [派发与验证](dispatch-and-verify.md)。

## 未迁移的部分

- Python/Rust/SQLite 直派执行器、CLI、app-server：由 `Agent` 工具取代，不迁。
- 27 位人物视角专家、128 个原子、95 项验收账：不迁。
- 58 个原角色按上表合并为 17 个新专家加原有 4 个。21 个专家的实际效果仅做过部分实测，见 [专家能力索引](expert-capability-index.md)。
