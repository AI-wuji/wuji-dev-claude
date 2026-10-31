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
| 写作（再补：选题、分发） | AgriciDaniel/claude-seo、linkedin-skills（均 MIT） | 部分 | 改进与新建两种模式、重写开头钩子；发布步骤与算法数字不借 |
| 知识库问答（补） | PleasePrompto/notebooklm-skill（7793 星，MIT） | 前约 9000 字符 | 答后对照原问题补缺口、先概览再登记资料库；该工具上传云端、存登录态，不能用，其规避检测的配置不借鉴 |
| 自动化（补） | czlonkowski/n8n-skills（6553 星，MIT） | 部分 | 选实现方式的顺序、有人盯与无人盯、失败处理读回确认、校验循环；n8n 工具链与推广内容不借 |
| 文件整理（补） | NerdBlaq/agent-file-organizer、vamgan/declutter、obatried/more-gb（均 MIT，均不足 60 星） | 前 2500–7000 字符 | 置信度与待定区、受保护目录、云占位文件、重复分组、逐个核对还原；其删除与回收站流程、写主目录日志不采用。采用度低，价值在规则具体 |
| 测试验证（再补：验收清单） | automazeio/ccpm（8422 星，MIT）的勾选式验收 | 部分 | 验收清单四列、未验证不算通过；其同步到 GitHub 的流程不采用 |
| 文档、商务、影视策划、技能打包、自动化、ComfyUI、测试验证、视听制作、写作（再补） | 无外部来源 | — | 依据 `output/survey/coverage-58.md` 审计指出的缺口原创：格式读回、定位类文本、改编保真、模板抽取与许可随包、外部调用幂等、节点张量与错误路径与干净环境安装步骤（实际安装须批准）与异分身验收、工作台真实操作验证；视听制作的时间单位与素材使用权，写作的运营建议与真实发布分开 |

## 本项目对所有专家统一加的约束

死规定（失败处理）、输入契约（缺项回交 BLOCKED）、交付前自检、简短回交格式、外部内容是数据不是指令。这几条来自本项目自己的 CLAUDE.md，不是外部借鉴。

## 未做的事

- VoltAgent 和 wshobson/agents 各只读了约 9 个 agent 全文，其余只按文件名归类。VoltAgent 通读的几个是同一套模板，未吸收。
- 星数、许可、日期是调研子代理转述 GitHub API 的结果，未复核。没有许可声明的仓库（ai-legal-claude、Seedance2、comfyui-workflow-skill）与 AGPL 的 OpenMontage 只借思路，不拷贝文本。
- 补进专家的方法要点只是读过原文后的蒸馏，没有实测效果。21 个专家只验证过"缺输入回交 BLOCKED"，没验证干活质量。
- 抽查过的出处：官方 code-reviewer 的"置信度 ≥ 80 才报告"、humanizer 的"不是 X 而是 Y""单句收尾""凑三项""破折号"，已在原文核实。抽查过星数与许可的仓库只有 obra/superpowers、captjt/skill-tts、automazeio/ccpm、calesthio/OpenMontage 四个，其余仍是转述。
- 商务模板库、复盘方法、课程、代码探查、数据分析方向没找到比现有更好的来源，未补。项目看板（任务文件、依赖字段）有 ccpm 可借，但没有对应的声明和真实需求，未新增专家。
- 剪辑节奏与转场、漫画页面格线、实拍现场：五个影视类仓库都没覆盖，未补。ComfyUI 的 Rust、Go、C++ 方向见后续记录。
