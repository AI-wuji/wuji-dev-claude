# ⚡ 无极开发系统 / Wuji Dev System v3.0

**一句话 / One Sentence**:
专为 Claude Code 打造的智能开发 Skill — 静默联动，全程自主 / A smart dev skill for Claude Code — silent linkage, full autonomy

**平台 / Platform**: Claude Code (Anthropic) · 全局 Skill / Global Skill · 自动触发 / Auto-triggered

📺 [在线介绍 / Landing Page](https://ai-wuji.github.io/wuji-dev-claude/)

---

## 🎯 这是什么？ / What is this?

⚡ **无极开发系统** 是为 **Claude Code** 打造的全局开发 Skill，融合 **17 个来源**精华。

⚡ **Wuji Dev System** is a global dev skill for **Claude Code**, fusing the best of **17 sources**.

从龙虾军团的安全调度、女娲的思维蒸馏、Impeccable 的 UI 审查，到社区最佳实践——全部融入一套静默运行的智能系统。

From Lobster Legion's security scheduling, Nuwa's thinking distillation, Impeccable's UI critique, to community best practices — all fused into one silently-running intelligent system.

### 核心理念 / Core Philosophy

> **初期对齐，全程自主。静默联动，无极无感。**
> **Align early, run autonomously. Link silently, feel nothing.**

| 理念 / Principle | 中文 | English |
|------|------|---------|
| 🎯 初期对齐 / Align Early | 需求不清晰时一次性问完，对齐后独立跑到底 | Ask all questions at the start, then run independently |
| 🤫 全程自主 / Full Autonomy | 搜索→编码→测试→修复→打磨→交付，中间不打扰 | Search→Code→Test→Fix→Polish→Deliver, zero interruption |
| 🔗 智能联动 / Smart Linkage | wuji-dev 做中枢，自动调用 Impeccable/女娲 方法 | wuji-dev as hub, auto-invokes Impeccable/Nuwa methods |
| 🔇 静默运行 / Silent Ops | 不宣布"加载XX skill"，无极不需要感知边界 | No "loading skill" announcements, transparent to user |
| 📦 完整交付 / Complete Delivery | 给无极的是完整可用成果，不是半成品 | Deliver complete, usable results — not half-baked |

---

## 🏛️ 技能生态 / Skill Ecosystem

```
CLAUDE.md（始终加载 / Always Loaded）
    │ 全中文 · 备份保护 · 初期对齐 · Token效率
    ↓
┌─────────────────────────────────────────────┐
│              ⚡ wuji-dev（中枢路由 / Hub）     │
│           57触发词 / 57 trigger keywords     │
│        静默运行 / Silent operation           │
└──────┬──────────────┬──────────────────────┘
       │ 智能联动      │ 智能联动
       ↓              ↓
🧠 huashu-nuwa    🎨 impeccable
女娲·思维蒸馏      UI审查·20命令
Nuwa·Distillation  Impeccable·20 commands
       │              │
       └──────┬───────┘
              ↓
     🎯 阿极 / A-Ji · 统一输出 / Unified Output
```

---

## 📋 12 模块 / 12 Modules

| # | 模块 / Module | 核心内容 / Core Content |
|---|-------------|----------------------|
| 一 | 开发工作流 / Workflow | 初期对齐→全程自主→交付完整 / Align→Autonomy→Deliver |
| 二 | 需求分析 / Analysis | 女娲四维法 / Nuwa 4-perspective analysis |
| 三 | 搜索调研 / Research | 多路并行 + 五维评估 / Parallel search + 5-dim eval |
| 四 | 并行执行 / Parallelism | 龙虾军团调度 / Lobster Legion scheduling |
| 五 | UI 设计 / UI Design | 9子系统 / 9 subsystems (anti-patterns, typesetting, color, spacing, motion…) |
| 六 | 代码质量 / Code Quality | 简洁优先 · Edit胜Write / Brevity first, Edit over Write |
| 七 | 安全体系 / Security | 四级权限 + 六条红线 / 4-tier perms + 6 red lines |
| 八 | Token 效率 / Token Efficiency | Prompt Caching · compact · Plan Mode 省60%+ |
| 九 | 协作原则 / Collaboration | 七条铁律 / 7 iron rules |
| 十 | 社区精华 / Community | superpowers · planning-with-files · Matt Pocock |
| 十一 | 汇报格式 / Reporting | 按复杂度分级 / Tiered by complexity |
| 十二 | 场景速查 / Quick Ref | UI · ComfyUI · Bug · Refactor · Emergency |

---

## 🔗 智能联动 / Intelligent Linkage

| 场景 / Scenario | 自动调用 / Auto-invoke | 效果 / Effect |
|------|---------|------|
| 日常开发 / Daily Dev | wuji-dev 本体 | 工作流+安全+Token+规范 |
| UI/视觉/交互 / Visual | + Impeccable | 20命令 / 20 commands |
| 人物思维提炼 / Thinking | + 女娲蒸馏 / Nuwa | 心智模型→表达DNA→诚实边界 |
| 技术选型 / Architecture | + 女娲多角度 | 四视角+决策辅助 |
| 安全审查 / Security | wuji-dev 安全 | 四级权限+红线 |
| 搜索调研 / Research | wuji-dev 搜索 | 多路并行+评估 |

---

## 🎨 UI 八大反模式 / 8 Anti-Patterns

| 🚫 反模式 / Anti-Pattern | ✅ 正确做法 / Do This Instead |
|----------|-----------|
| AI 塑料渐变 / AI Plastic Gradients | HSL 调色板 / HSL palette, restrained |
| 默认字体 / Default Fonts (Inter/Roboto) | Clash Display, Satoshi, Noto Sans SC |
| 灰色地狱 / Gray Hell | 中性色加色调倾向 / Warm/cool grays |
| 卡片套娃 / Card Nesting | 间距+分割线+背景色差 / Spacing, dividers, bg contrast |
| 纯黑纯白 / Pure #000/#fff | #0a0a0f 系 / #fafaf9 系 |
| 弹性缓动 / bounce/elastic | cubic-bezier(0.4, 0, 0.2, 1) |
| 图标网格 / Icon Grids | 不对称布局 / Asymmetric layout |
| 无层级阴影 / Flat Shadows | 多层叠加 / Multi-layer shadows |

---

## 🔒 安全红线 / Security Red Lines

| 级别 / Level | 范围 / Scope | 处理 / Handling |
|------|------|------|
| 🟢 无害 / Harmless | 读文件、搜索 / Read, Search | 直接执行 / Auto |
| 🟡 本地 / Local | 写文件、测试 / Write, Test | 直接执行 / Auto |
| 🟠 中等 / Medium | 安装依赖、git / Install, git | 确认后执行 / Confirm |
| 🔴 高危 / High | 删除、force push、环境变量 / Delete, force push, env | **必须确认 / Must Confirm** |

**铁律 / Iron Rules**: 不删备份 / No backup deletion · 不跳hook / No hook skip · 不force push main · 不硬编码密钥 / No hardcoded secrets

---

## 📁 仓库结构 / Repo Structure

```
wuji-dev-claude/
├── SKILL.md              # 核心 Skill / Core skill (12 modules)
├── README.md             # 本文件 / This file
├── index.html            # GitHub Pages 介绍页 / Landing page
└── 赞赏码.jpg            # 微信赞赏码 / Donation QR
```

本地配套 / Local companion:
```
~/.claude/
├── CLAUDE.md             # 全局常驻 / Global resident rules
├── skills/wuji-dev/      # ← 本仓库 / This repo
│   └── SKILL.md
├── skills/huashu-nuwa/   # 女娲 / Nuwa (npm install)
└── skills/impeccable/    # Impeccable (npm install)
```

---

## 🚀 快速安装 / Quick Start

### 1. 安装核心 / Install Core

```bash
git clone https://github.com/AI-wuji/wuji-dev-claude.git ~/.claude/skills/wuji-dev
```

### 2. 安装联动（推荐）/ Install Linkage (Recommended)

```bash
npx skills add alchaincyf/nuwa-skill -g -y    # 女娲 / Nuwa
npx skills add pbakaus/impeccable -g -y        # Impeccable
```

### 3. 确认 / Verify

```bash
ls ~/.claude/skills/
# 应该看到 / Should see: wuji-dev/  huashu-nuwa/  impeccable/
```

### 使用 / Usage

无需手动调用。对话中包含以下词即自动激活 / No manual call needed. Auto-activates on:

> 开发、设计、UI、重构、优化、修复、审查、动画、排版、色彩、蒸馏、思维方式……

---

## 🌐 融合来源 / Fusion Sources

| # | 来源 / Source | 融合内容 / What's Fused |
|---|------|---------|
| 1 | 🦞 无极龙虾军团 / Lobster Legion | 并行调度、安全四级权限 / Parallel ops, security tiers |
| 2 | 🧠 女娲 / Nuwa | 多角度思维、决策辅助、蒸馏 / Multi-angle thinking, distillation |
| 3 | 🎨 Impeccable | UI反模式(8项)、20命令 / 8 anti-patterns, 20 commands |
| 4 | 🖥️ frontend-design | 排版/色彩/间距/动效 / Typesetting, color, spacing, motion |
| 5 | 🎯 cc-design | 品牌设计系统 / Brand design system |
| 6 | 📐 web-design | 规范先行、自检打磨 / Spec-first, self-review |
| 7 | 🔬 algorithmic-art | 算法艺术、弹簧物理 / Algorithmic art, spring physics |
| 8 | ♿ web-design-guidelines | 可访问性、WCAG / Accessibility |
| 9 | ⚡ Claude Code Cache | Prompt Caching 原理 |
| 10 | 💾 DeepSeek Cache-First | 三段式上下文架构 / 3-tier context |
| 11 | 🪶 caveman/token-efficient | 精简输出 / Lean output |
| 12 | ⭐ superpowers (40.9K⭐) | 验证即完成 / Verify = Done |
| 13 | 📋 planning-with-files (13.4K⭐) | 持续改进循环 / Continuous improvement |
| 14 | 🎓 Matt Pocock Skills (23K⭐) | Git习惯、Skill安全 / Git habits, skill safety |
| 15 | 🔧 awesome-claude-code | 小步快走 / Small steps, frequent commits |
| 16 | 🛡️ 社区安全共识 / Community | Skill安装安全审查 / Skill install audit |
| 17 | 🖥️ ComfyUI专家 / ComfyUI Expert | 插件开发流程 / Plugin dev workflow |

---

## 📊 版本历史 / Version History

| Version | Date | 更新内容 / Major Update |
|---------|------|-------------|
| **v3.0** | 2026-05-08 | 智能联动中枢、静默运行、57触发词、GitHub发布 / Smart hub, silent ops, 57 triggers, GitHub release |
| v2.0 | 2026-05-07 | Impeccable + 女娲外部skill、Token优化 / External skills, token optimization |
| v1.0 | 2026-05-06 | 17源融合、12模块 / 17-source fusion, 12 modules |

---

## 📄 License

MIT License

---

**⚡ 阿极在此。请下达指令，我会静默地把最好的方法用上。**
**⚡ A-Ji here. Give me a task, and I'll silently apply the best approach.**
