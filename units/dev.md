# 💻 第四师 — 软件开发师 SOP

## 技术栈

| 需求 | 首选 | 备选 | 说明 |
|------|------|------|------|
| 打包 | Electron (electron-builder) | Tauri (更小更安全) | Tauri=Rust原生编译，破解难度高 |
| 图表 | ECharts (66k⭐) | Chart.js | ECharts 功能最全，中文友好 |
| Excel | SheetJS (xlsx) | — | 读写 .xlsx/.xls |
| 仪表盘 | Tabler (39k⭐) | CoreUI | Bootstrap 5 管理面板 |
| 展牌 | ECharts + 全屏模式 | Plotly.js | 全屏+自动轮播 |
| UI框架 | Tailwind CSS | Bootstrap 5 | 原子化CSS，灵活度最高 |
| 图标 | Lucide Icons | Phosphor Icons | 简洁现代 |

## 打包加密流程

```
HTML/CSS/JS 开发完成
    ↓
SheetJS 读取 Excel 数据（如有）
    ↓
ECharts 渲染图表 / Tabler 布局
    ↓
Electron 打包 (asar 加密)
    ↓
UPX 加壳压缩
    ↓
✅ 最终加密 EXE
```

## 反编译同类软件

### 被动分析（不执行代码）
先用 `file` / `strings` / `hexdump` 查看文件类型和特征字符串，确定打包方式后再选工具。

| 类型 | 识别特征 | 工具 | 效果 |
|------|---------|------|------|
| Electron (asar) | `resources/app.asar` | `npx asar extract app.asar dest/` | 完整源码 |
| .NET (C#) | PE头有.NET元数据 | dnSpy | 近乎源码级 |
| .NET 加壳 | 入口代码异常 | de4dot → dnSpy | 脱壳后还原 |
| UPX | `UPX!` 特征头 | `upx -d` | 直接解压 |
| PyInstaller | `MEIPASS` 字符串 | pyinstxtractor + uncompyle6 | Python 源码 |
| NSIS/Inno | 安装包结构 | 7-Zip 解包 | 提取安装文件 |

### 主动分析（沙盒中运行）
- Process Monitor：监控文件/注册表/网络
- API Monitor：拦截 API 调用
- Wireshark：抓包分析网络通信

## 保护自己的软件

| 级别 | 措施 | 难度 | 工具 |
|------|------|------|------|
| L1 | asar 加密 + UPX 压缩壳 | ★ | electron-builder, upx |
| L2 | 代码混淆（JS Obfuscator） | ★★ | javascript-obfuscator |
| L3 | 关键逻辑 Native 化（C++ Addon） | ★★★ | node-addon-api |
| L4 | 反调试 + 完整性校验 | ★★★★ | 自实现 |
| L5 | VMProtect / Themida 商业加壳 | ★★★★★ | 商业方案 |
| L5+ | Tauri (Rust 原生编译) | ★★★★★ | 编译型语言，逆向难度极大 |

### 防护建议
- 普通产品 L1+L2 足够
- 商业软件加 L3+L4
- 核心知识产权走 L5+
- 没有绝对安全，目标是提高逆向成本

## 开发流程

```
需求明确
    ↓
设计先行（想清楚布局、交互、数据流）
    ↓
技术选型（参考上方技术栈表）
    ↓
搭建骨架（目录结构、路由、基础组件）
    ↓
逐步实现（一次一个功能模块，小步验证）
    ↓
测试验证（功能、兼容性、性能）
    ↓
打包加密（按上方加密流程）
    ↓
交付
```

## 图表类开发速查

```
数据源(Excel/CSV/JSON)
    ↓ SheetJS 读取
JavaScript 数据对象
    ↓ ECharts setOption()
交互式图表
    ↓ Tabler/Bootstrap 布局
仪表盘页面
    ↓ Electron 打包
桌面应用
```
