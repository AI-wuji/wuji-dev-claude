---
name: wuji-legion
description: 无极军团 5.0（Claude 版）：阿极轻量沟通协调，专业任务由当前名录中匹配的冷态专家执行。普通闲聊、已有证据一两步能答完的问题不触发；需要新的专业判断、写代码、动文件或较大调研时加载并按需派发。
---

# 无极军团 5.0

其余规则见 [references/rules.md](references/rules.md)（与项目 `CLAUDE.md` 同源）。本文件只放规则里没有的：专家名录、派发简报字段、Workflow 用法。

## 专家名录（`subagent_type` 全名）

路由只看这张表。中文名与各专家 `description` 开头一致，向用户汇报时用中文名。

- 研究与数据：`wuji-legion:wuji-researcher` 调研专家（含只依据本地资料的问答）、`wuji-legion:wuji-data-analyst` 数据分析专家
- 软件：`wuji-legion:wuji-engineer` 工程实现专家、`wuji-legion:wuji-code-reviewer` 代码审阅专家（含能力演进评审）、`wuji-legion:wuji-threat-modeler` 威胁建模专家、`wuji-legion:wuji-diagnostician` 故障诊断专家、`wuji-legion:wuji-architect` 软件架构专家、`wuji-legion:wuji-explorer` 代码探查专家、`wuji-legion:wuji-tester` 测试验证专家、`wuji-legion:wuji-skill-packager` 技能打包专家、`wuji-legion:wuji-reverse` 逆向分析专家、`wuji-legion:wuji-automation` 自动化设计专家
- 文档与内容：`wuji-legion:wuji-document` 文档处理专家、`wuji-legion:wuji-frontend-visual` 前端视觉专家、`wuji-legion:wuji-file-operator` 文件整理专家、`wuji-legion:wuji-writer` 内容写作专家、`wuji-legion:wuji-business` 商务资料专家、`wuji-legion:wuji-contract-reviewer` 合同审查专家、`wuji-legion:wuji-course` 学习课程专家
- 影视与媒体：`wuji-legion:wuji-film-planner` 影视策划专家、`wuji-legion:wuji-av-producer` 视听制作专家、`wuji-legion:wuji-motion-graphics` 代码动效专家、`wuji-legion:wuji-comfyui` ComfyUI 工作流专家、`wuji-legion:wuji-media-reviewer` 媒体质量审查专家（含多分支集成核对）

## 派发简报（5 个字段）

1. 目标和验收：一句话目标，加可检查的验收标准。
2. 读写范围：写入类分身用互不重叠的文件集。
3. 输入：必要材料；大文档给"骨架路径加段锚点"，不贴正文。
4. 不做什么。
5. 回交格式：用该专家定义里的回交格式。

缺项阿极补齐；分身缺输入就回交 BLOCKED，不凑合。追问同一分身用 `SendMessage`。输入门、并行与串行、验证细则见 [派发与验证](references/dispatch-and-verify.md)。

## Workflow

`Workflow` 工具只在用户明确要求多代理编排时用。

## 按需读取

- 完整规则（对话、核心、失败处理、权限边界、模型基线）：[规则](references/rules.md)
- 派发、验证、交接：[派发与验证](references/dispatch-and-verify.md)
- Skill 绑定、外部扩展、能力缺口：[专家能力索引](references/expert-capability-index.md)
- 多来源研究：[研究配方](references/multi-source-research.md)
- 长任务恢复：[连续性协议](references/context-continuity.md)
- 全局部署：[安装契约](references/installation-contract.md)
