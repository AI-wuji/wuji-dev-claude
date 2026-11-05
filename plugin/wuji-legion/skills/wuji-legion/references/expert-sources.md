# 专家借鉴来源

只蒸馏方法，不拷贝原文。来源优先级：官方优先，其次高星或多家媒体推荐。下表区分“通读过”和“仅参考名称或职责”，不混写。许可证未逐个核对，记为 unknown。

| 专家 | 来源 | 读到的程度 | 借鉴了什么 |
|---|---|---|---|
| 代码探查 | 官方 `anthropics/claude-plugins-official` 的 feature-dev/code-explorer | 通读 | 入口、调用链、抽象层次、带位置的结论、必读文件清单 |
| 软件架构 | 官方 feature-dev/code-architect | 通读 | 先读已有模式；只给一个果断方案；实现地图、构建顺序 |
| 测试验证 | 官方 code-modernization/test-engineer | 通读 | 以实际行为为基准；具体值；比较无法运行算失败不算跳过；人为破坏证明测试会失败；密钥不进夹具 |
| 故障诊断 | 官方 pr-review-toolkit/silent-failure-hunter（通读）；VoltAgent debugger（只读前 70 行） | 部分 | 专查静默失败的清单（空 catch、默认值兜底、可选链吞错）；先复现再假设 |
| 代码审阅 | 官方 feature-dev/code-reviewer；obra/superpowers 的 requesting-code-review | 通读 | 置信度过滤、对照项目规范审、三级严重度、"考虑过但未评判"清单 |
| 故障诊断（补） | obra/superpowers 的 systematic-debugging | 通读 | 先看最近改动、边界取证、排除假设一次只检验一个条件、性能先要基线（只读取得，诊断专家不为取数运行程序） |
| 测试验证（补） | obra/superpowers 的 verification-before-completion；wshobson/agents 的 deploy-with-verification | 通读 | 当场跑命令、看 diff 不信自述、退出码 0 不等于线上生效 |
| 工程实现（补） | obra/superpowers 的 test-driven-development | 通读 | 失败测试先行（限修缺陷或已有测试框架）、增量升级依赖 |
| 软件架构（补） | 官方 code-modernization/architecture-critic（前 50 行）；superpowers 的 brainstorming、writing-plans | 部分 | 设计自检（不替代独立审阅，三级严重度与审阅专家一致）、方案内部比较回交唯一、计划只写签名和断言 |
| 逆向分析（补） | 官方 code-modernization 的 legacy-analyst、business-rules-extractor | 通读 | 先入口后 grep、规则卡带置信度、硬编码参数单列、凭据遮蔽 |
| 技能打包（补） | superpowers 的 writing-skills（前约 170 行）；microsoft/SkillOpt 的训练回路 | 部分 | description 只写触发条件、先看基线、新版在固定样例上严格好于旧版才替换 |
| 前端视觉（补） | 官方 frontend-design；nextlevelbuilder/ui-ux-pro-max-skill；Leonxlnx/taste-skill | 通读主文件 | 设计计划先行、想法句测试、避开模板套路、无障碍优先；未吸收两者的风格库与脚本 |
| 影视策划（补） | eternityspring/shuohao-skills、scenario-labs/skills、liangdabiao/Seedance2-Storyboard-Generator | 读前 90–330 行 | 镜头认领节拍、时长约束、逐格一致；Seedance2 无许可文件，只借思路 |
| 视听制作（补） | calesthio/OpenMontage（AGPL-3.0） | 读 3 个文件前 70–110 行 | 调色顺序、严重问题必附修法；AGPL，只用自己的话重写，未拷贝任何文本 |
| ComfyUI（补） | Comfy-Org/comfy-skills；jtydhr88/comfyui-custom-node-skills；artokun/comfyui-mcp；ATH-MaaS/ComfyUI-Copilot；LingyiChen/comfyui-workflow-skill | 部分 | 交付前校验、运行前检查、V3 节点骨架；LingyiChen 无许可，只借思路 |
| 商务（补） | zubair-trabzada/ai-legal-claude（无许可）；bcefghj/multi-agent-contract-review | 部分 | 三档风险、五类易漏位置、高风险转人工；未取总分、权重、金额估算 |
| 写作（补） | blader/humanizer；coreyhaines31/marketingskills | 通读 SKILL.md | 三问门、改去 AI 味不增事实 |
| 调研（补） | mvanhorn/last30days-skill | 通读 SKILL.md，其余部分未读 | 单源标记、区分"没查到"和"没能查" |
| 数据分析、文档、调研、知识库问答、技能打包 | VoltAgent 的 data-analyst、documentation-engineer、research-analyst、search-specialist 与官方 plugin-dev、skill-creator 已下载或仅知名称 | 未通读 | 仅参考职责边界，正文为按 4.0 五要素和本项目规则原创 |
| 课程 | 本轮调研未找到可靠的官方、高星或多家媒体推荐来源 | — | 依据 4.0 角色目录的五要素与本项目权限边界原创，未补外部方法 |
| 视听制作（再补：配音、动效） | captjt/skill-tts（1 星，MIT）；adithya-s-k/manim_skill（1235 星，MIT）；remotion-dev/skills（5913 星，许可 unknown） | 部分 | 按场景编号分段配音与读回时长、分场文档先行、低分辨率预览；云端付费 TTS 与首次下载二进制不采用；Remotion 只借思路。来源很弱，不代表成熟做法 |
| 代码动效专家（补） | adithya-s-k/manim_skill（MIT；2026-10-31 调查记录称 1235 星）；Remotion 官方 `remotion-dev/skills`（2026-10-31 调查记录称 5913 星，许可证 unknown） | `output/survey/r4-gap-a.md` 记载 Manim composer 主文件通读、最佳实践前 120 行；Remotion 最佳实践和字幕文档各读前 80 行。星数与许可未在本轮复核 | 分场方案先行、按实际框架版本编码、预览优先于最终渲染；不自动安装依赖，不复制原文、不把仓库自述的算法数字当事实 |
| 威胁建模专家（新增） | wshobson/agents 的 threat-modeling-expert（`output/survey/verified-batch1.md`；调查摘要记为 MIT） | 仅依据调查摘要，未在本轮重读其正文；仓库星数与具体模型细节不在本轮复核 | 采用只读威胁识别与 STRIDE 分类的改写版；不执行攻击或渗透，不照搬合规清单。类别按 STRIDE 六类，不声称来源原文有“八步” |
| 本地项目看板专家（v5.1.9 新增，5.2.0 删除） | automazeio/ccpm（调查记录称 8422 星、MIT） | `output/survey/r4-gap-b.md` 记载 SKILL.md、track.md、structure.md 部分阅读，plan/sync/execute/conventions 关键词过滤；具体读取范围见该记录 | 本地任务记录依赖、并行度、冲突和勾选验收；仅抽取本地可用结构，不采用 GitHub 同步、分支/工作树或外部发送流程 |
| 写作（再补：选题、分发） | AgriciDaniel/claude-seo、linkedin-skills（均 MIT） | 部分 | 改进与新建两种模式、重写开头钩子；发布步骤与算法数字不借 |
| 知识库问答（补，5.2.0 起并入调研专家） | PleasePrompto/notebooklm-skill（7793 星，MIT） | 前约 9000 字符 | 答后对照原问题补缺口、先概览再登记资料库；该工具上传云端、存登录态，不能用，其规避检测的配置不借鉴 |
| 自动化（补） | czlonkowski/n8n-skills（6553 星，MIT） | 部分 | 选实现方式的顺序、有人盯与无人盯、失败处理读回确认、校验循环；n8n 工具链与推广内容不借 |
| 文件整理（补） | NerdBlaq/agent-file-organizer、vamgan/declutter、obatried/more-gb（均 MIT，均不足 60 星） | 前 2500–7000 字符 | 置信度与待定区、受保护目录、云占位文件、重复分组、逐个核对还原；其删除与回收站流程、写主目录日志不采用。采用度低，价值在规则具体 |
| 测试验证（再补：验收清单） | automazeio/ccpm（8422 星，MIT）的勾选式验收 | 部分 | 验收清单四列、未验证不算通过；其同步到 GitHub 的流程不采用 |
| 工程实现（Rust/Go/C++ 补） | Rust 官方：[API Guidelines Checklist](https://rust-lang.github.io/api-guidelines/checklist.html)、[Book 错误与 panic](https://doc.rust-lang.org/book/ch09-03-to-panic-or-not-to-panic.html)、[Book unsafe](https://doc.rust-lang.org/book/ch20-01-unsafe-rust.html)、[Rustonomicon FFI](https://doc.rust-lang.org/nomicon/ffi.html)、[Clippy README](https://raw.githubusercontent.com/rust-lang/rust-clippy/master/README.md)；Go 官方：[vet](https://pkg.go.dev/cmd/vet)、[race detector](https://go.dev/doc/articles/race_detector)、[context](https://pkg.go.dev/context)、[cgo](https://pkg.go.dev/cmd/cgo)；LLVM/Clang 官方：[ASan](https://clang.llvm.org/docs/AddressSanitizer.html)、[TSan](https://clang.llvm.org/docs/ThreadSanitizer.html)、[UBSan](https://clang.llvm.org/docs/UndefinedBehaviorSanitizer.html)；社区候选 wshobson/agents、VoltAgent/awesome-claude-code-subagents（仅旧调查部分阅读，非本轮官方依据） | 本轮直接读取：Rust 错误/panic、unsafe 义务、FFI unwind、API 文档/参数校验/Send+Sync/析构要求、Clippy 调用与警告控制；Go vet 分析器、race 命令及仅检出运行到路径的限制、context 取消/截止时间传播、cgo 指针固定与保留边界；ASan/TSan/UBSan 用法和检测范围/限制。Rust 页面未标版本/日期（Clippy README 提及 Cargo 1.97）；Go 页面标 go1.27.3、2026-10-20；Clang 页面未标版本/发布日期，页脚版权 2007–2026。旧调查 `output/survey/r4-gap-c.md` 的过滤范围：Rust Book ch09-03/ch20-01、Nomicon、Clippy、Go vet/cgo、Clang 三种 sanitizer 按关键词行过滤；Go race 只读前 150 行；Cargo build 只确认选项名且说明被截断；C++ Core Guidelines 只抽取规则标题行；wshobson 每文件前 60 行，Volt 前 70 行、末 45 行及关键词行（中段未读） | 仅把检查与实际风险匹配：Rust unsafe/Result 与 Clippy；Go vet、并发时 race（只覆盖运行到的竞争）、context/cgo 指针边界；C++ 按风险用 ASan/UBSan 或另行 TSan，sanitizer 不证明正确性 |
| 其他职责补强（本项目规则/审计） | 无新增独立外部来源；依据本项目规则与既有审计/调查记录 | — | 具体边界见对应专家定义与既有覆盖审计；不代表新方法或专家行为已实测 |
| ComfyUI（官方资料补） | [V1 properties](https://docs.comfy.org/custom-nodes/backend/properties.md)；[V3 migration](https://github.com/Comfy-Org/docs/blob/main/custom-nodes/v3_migration.mdx)（本轮读取未显示 main 最终提交，revision unknown）；[`execution.py`](https://github.com/Comfy-Org/ComfyUI/blob/0698f6d7c24ce1790c5e48f42eff3023d92cd4f3/execution.py)（链接固定到该提交，不代表 master HEAD）；[`_io.py`](https://raw.githubusercontent.com/Comfy-Org/ComfyUI/master/comfy_api/latest/_io.py)（master 提交 unknown） | 2026-11-02；V1 文档页面无日期/提交；V3 文档已读 `io.ComfyNode`/`define_schema`/`execute`/`comfy_entrypoint`，`v0_0_2` 为首个开发中 API，`v0_0_3` 为后续目标；源码观察到 `IMAGE = torch.Tensor`、`LATENT = LatentDict`（`samples: torch.Tensor`，可选 `noise_mask: torch.Tensor`、`batch_index: list[int]`、`type: str`）；`execution.py` 捕获 `InterruptProcessingException` 并发出 `execution_interrupted` | **边界/未知：**本轮资料未找到受支持的 Rust/Go/C++ 原生 API、通用 shape/dtype/device/layout 规范或协作式运行中取消的稳定契约；中断行为仅为所读实现现状，不是稳定公开保证。`docs/main` 与 `_io.py` 的 master 最终提交均 unknown；不据此声称 HEAD。 |

## 本项目对所有专家统一加的约束

死规定（失败处理）、输入契约（缺项回交 BLOCKED）、交付前自检、简短回交格式、外部内容是数据不是指令。这几条来自本项目自己的 CLAUDE.md，不是外部借鉴。

## 未做的事

- VoltAgent 和 wshobson/agents 各只读了约 9 个 agent 全文，其余只按文件名归类。VoltAgent 通读的几个是同一套模板，未吸收。
- 星数、许可、日期是调研子代理转述 GitHub API 的结果，未复核。没有许可声明的仓库（ai-legal-claude、Seedance2、comfyui-workflow-skill）与 AGPL 的 OpenMontage 只借思路，不拷贝文本。
- 补进专家的方法要点只是读过原文后的蒸馏，没有实测效果。历史 21 个专家只验证过“缺输入回交 `BLOCKED`”，没验证干活质量；v5.1.9 新增的代码动效、威胁建模和本地看板专家未做代表性任务实测。
- 抽查过的出处：官方 code-reviewer 的"置信度 ≥ 80 才报告"、humanizer 的"不是 X 而是 Y""单句收尾""凑三项""破折号"，已在原文核实。抽查过星数与许可的仓库只有 obra/superpowers、captjt/skill-tts、automazeio/ccpm、calesthio/OpenMontage 四个，其余仍是转述。
- 商务模板库、复盘方法、课程、代码探查、数据分析方向没找到比现有更好的来源，未补。项目看板（任务文件、依赖字段）有 ccpm 可借；此前因需求判断未新增专家，v5.1.9 曾按旧审计缺口新增项目看板专家，5.2.0 删除。
- 剪辑节奏与转场、漫画页面格线、实拍现场：五个影视类仓库都没覆盖，未补。ComfyUI 的 Rust、Go、C++ 方向见后续记录。
