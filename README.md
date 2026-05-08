# ⚡ 无极开发系统 / Wuji Dev System v3.0

**一句话 / One Sentence**:
Claude Code 专属智能开发 Skill — 静默联动，全程自主，你只需要看结果

**适配平台 / Platform**:
Claude Code (Anthropic) · 全局 Skill · 关键词自动触发

📺 [在线介绍页 / Landing Page](https://ai-wuji.github.io/wuji-dev-claude/) | 📋 [更新日志 / Changelog](./CHANGELOG.md)

---

## 🎯 这是什么？ / What is this?

⚡ **无极开发系统 / Wuji Dev System** 是为 **Claude Code** 打造的全局开发 Skill。

融合 **17 个来源**精华——从龙虾军团的安全调度、女娲的思维蒸馏、Impeccable 的 UI 审查体系，到社区最佳实践——全部融入一套静默运行的智能系统。

### 核心理念 / Core Philosophy

> **初期对齐，全程自主。静默联动，无极无感。**

| 理念 | 说明 |
|------|------|
| 🎯 初期对齐 | 需求不清晰时一次性问完，对齐后独立跑到底 |
| 🤫 全程自主 | 搜索→编码→测试→修复→打磨→交付，中间不打扰 |
| 🔗 智能联动 | wuji-dev 做中枢，自动调用 Impeccable/女娲 方法 |
| 🔇 静默运行 | 不宣布"加载XX skill"，无极不需要感知边界 |
| 📦 完整交付 | 给无极的是完整可用成果，不是半成品 |

---

## 🏛️ 技能生态 / Skill Ecosystem

```
CLAUDE.md（常驻规则 · Always Loaded）
    │ 全中文 · 备份保护 · 初期对齐 · Token效率
    ↓
┌─────────────────────────────────────────────┐
│              ⚡ wuji-dev（中枢路由）           │
│           57个触发词 · 静默运行              │
│   开发/设计/UI/优化/重构/审查/动画/品牌...    │
└──────┬──────────────┬──────────────────────┘
       │ 智能联动      │ 智能联动
       ↓              ↓
🧠 huashu-nuwa    🎨 impeccable
女娲 · 思维蒸馏    UI审查 · 20个命令
人物Skill生成        audit/critique/polish/
视角提炼              animate/colorize...
       │              │
       └──────┬───────┘
              ↓
         🎯 阿极 · 统一输出
       无极只看结果，不感知边界
```

---

## 📋 12 模块总览 / 12 Modules

| # | 模块 Module | 核心内容 |
|---|------------|---------|
| 一 | 开发工作流 | 初期对齐→全程自主→交付完整成果 |
| 二 | 需求分析 | 女娲四维分析法 + 决策辅助四步法 |
| 三 | 搜索调研 | 多路并行搜索 + 五维评估 + 融合原则 |
| 四 | 并行执行 | 龙虾军团调度：Explore + Agent 并行 |
| 五 | UI 设计系统 | 9子系统：避坑×排版×色彩×间距×动效×交互×自检×可访问性×进阶 |
| 六 | 代码质量 | 简洁优先 · 命名即文档 · Edit胜过Write |
| 七 | 安全体系 | 四级权限 + 六条红线 |
| 八 | Token 效率 | Prompt Caching · 定期compact · 子代理隔离 |
| 九 | 协作原则 | 七条铁律 |
| 十 | 社区精华 | superpowers · planning-with-files · Matt Pocock |
| 十一 | 汇报格式 | 按复杂度分级 |
| 十二 | 场景速查 | UI · ComfyUI · Bug修复 · 重构 · 选型 · 紧急 · 新项目 |

---

## 🔗 智能联动 / Intelligent Linkage

| 场景 | 自动调用 | 效果 |
|------|---------|------|
| 日常开发 | wuji-dev 本体 | 工作流+安全+Token+代码规范 |
| UI/视觉/交互 | + Impeccable 方法 | 20命令（audit/polish/animate…） |
| 人物思维提炼 | + 女娲蒸馏框架 | 六路采集→心智模型→表达DNA→诚实边界 |
| 技术选型/架构 | + 女娲多角度思维 | 四视角分析 + 决策辅助 |
| 安全审查 | wuji-dev 安全体系 | 四级权限 + 红线检查 |
| 搜索调研 | wuji-dev 搜索策略 | 多路并行 + 五维评估 |

---

## 🎨 UI 八大反模式 / 8 Anti-Patterns

| 🚫 反模式 | ✅ 正确做法 |
|----------|-----------|
| AI 塑料渐变（紫橙/彩虹）| HSL 调色板精确定义，有克制 |
| 默认字体（Inter/Roboto）| Clash Display、Satoshi、Noto Sans SC |
| 灰色地狱（灰底+灰字）| 中性色加色调倾向，拉开明度差 |
| 卡片套娃 | 间距、分割线、背景色差区分层级 |
| 纯黑纯白（#000/#fff）| 暗色用 #0a0a0f 系，亮色用 #fafaf9 系 |
| 弹性缓动（bounce/elastic）| cubic-bezier(0.4, 0, 0.2, 1) |
| 图标+标题+文字网格 | 不对称布局，交错图文关系 |
| 无层级阴影 | 多层阴影叠加，模拟真实光影 |

---

## 🔒 安全红线 / Security Red Lines

| 级别 | 范围 | 处理 |
|------|------|------|
| 🟢 无害 | 读文件、搜索、分析 | 直接执行 |
| 🟡 本地 | 写文件、运行测试 | 直接执行 |
| 🟠 中等 | 安装依赖、改配置、git操作 | 确认后执行 |
| 🔴 高危 | 删文件、force push、改环境变量 | **必须确认** |

**铁律**：不删备份 · 不跳hook · 不force push main · 不硬编码密钥

---

## 📁 仓库结构 / Repo Structure

```
wuji-dev-claude/
├── SKILL.md              # 核心 Skill 文件（12模块）
├── README.md             # 本文件
├── index.html            # GitHub Pages 介绍页
└── CHANGELOG.md          # 版本历史
```

配套文件（在你的本地 `~/.claude/` 目录）：
```
~/.claude/
├── CLAUDE.md             # 全局常驻规则（始终加载）
├── skills/wuji-dev/      # ← 本仓库内容
│   └── SKILL.md
├── skills/huashu-nuwa/   # 女娲（外部依赖）
└── skills/impeccable/    # Impeccable（外部依赖）
```

---

## 🚀 快速安装 / Quick Start

### 1. 安装核心 Skill

```bash
git clone https://github.com/AI-wuji/wuji-dev-claude.git ~/.claude/skills/wuji-dev
```

### 2. 安装联动 Skill（可选但推荐）

```bash
npx skills add alchaincyf/nuwa-skill -g -y    # 女娲 · 思维蒸馏
npx skills add pbakaus/impeccable -g -y        # Impeccable · UI审查
```

### 3. 确认安装

```bash
ls ~/.claude/skills/
# 应该看到: wuji-dev/  huashu-nuwa/  impeccable/
```

### 使用 / Usage

无需手动调用。只要对话中包含这些词，自动激活：

> 开发、设计、UI、重构、优化、修复、审查、动画、排版、色彩、蒸馏、思维方式……

---

## 🌐 融合来源 / Fusion Sources

| # | 来源 | 融合内容 |
|---|------|---------|
| 1 | 🦞 无极龙虾军团 | 并行调度、安全四级权限 |
| 2 | 🧠 女娲.skill | 多角度思维、决策辅助、思维蒸馏 |
| 3 | 🎨 Impeccable | UI反模式(8项)、20命令体系 |
| 4 | 🖥️ frontend-design | 排版/色彩/间距/动效五大支柱 |
| 5 | 🎯 cc-design | 品牌设计系统、设计先行 |
| 6 | 📐 web-design | 规范先行、自检打磨 |
| 7 | 🔬 algorithmic-art | 算法艺术、弹簧物理 |
| 8 | ♿ web-design-guidelines | 可访问性、WCAG |
| 9 | ⚡ Claude Code 缓存 | Prompt Caching 原理 |
| 10 | 💾 DeepSeek Cache-First | 三段式上下文架构 |
| 11 | 🪶 caveman/token-efficient | 精简输出 |
| 12 | ⭐ superpowers (40.9K⭐) | 验证即完成、Plan Mode先行 |
| 13 | 📋 planning-with-files (13.4K⭐) | 持续改进循环 |
| 14 | 🎓 Matt Pocock Skills (23K⭐) | Git习惯、Skill安全审查 |
| 15 | 🔧 awesome-claude-code | 小步快走、及时提交 |
| 16 | 🛡️ 社区安全共识 | Skill安装安全审查 |
| 17 | 🖥️ ComfyUI专家 | 插件开发流程 |

---

## 📊 版本历史 / Version History

| Version | Date | Major Update |
|---------|------|-------------|
| **v3.0** | 2026-05-08 | 智能联动中枢、静默运行、57触发词、GitHub发布 |
| v2.0 | 2026-05-07 | 融合 Impeccable + 女娲外部skill、Token优化深化 |
| v1.0 | 2026-05-06 | 初版、17源融合、12模块 |

---

## 📄 License

MIT License

---

**⚡ 阿极在此。请下达指令，我会静默地把最好的方法用上。**
**⚡ A-Ji here. Give me a task, and I'll silently apply the best approach.**
