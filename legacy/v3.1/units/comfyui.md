# ⚙️ 第三师 — ComfyUI 插件作战师 SOP

## 插件分析流程

收到一个插件（GitHub链接/本地目录/pip包）后：

```
1. 获取源码
   ├─ GitHub → git clone 或 API 下载
   ├─ pip 安装目录 → Lib/site-packages/
   └─ 手动下载 → 解压到临时目录

2. 定位核心入口
   ├─ 找 __init__.py → 搜索 NODE_CLASS_MAPPINGS
   ├─ 找 NODE_DISPLAY_NAME_MAPPINGS（节点显示名）
   └─ 找 js/ 目录（前端UI组件）

3. 列出所有节点
   ├─ 节点类名
   ├─ 输入类型（IMAGE, LATENT, CLIP, CONDITIONING...）
   ├─ 输出类型
   ├─ 参数（widget定义：INT, FLOAT, STRING, BOOLEAN, COMBO）
   └─ 隐藏输入（HIDDEN类型，通常不需要连）

4. 分析依赖
   ├─ requirements.txt / install.py
   ├─ 依赖的其他插件
   └─ 依赖的外部库（torch, opencv, PIL...）

5. 生成 API 地图
   └─ 节点名 → 输入 → 输出 → 依赖 的完整映射表
```

## 插件合并

将多个插件的功能合并到一个新插件中：

```
1. 创建新项目
   ├─ cookiecutter 脚手架（或手动创建）
   ├─ __init__.py + pyproject.toml
   └─ 按功能分文件（nodes_xxx.py）

2. 复制节点类
   ├─ 逐个迁移节点类 → 保持原逻辑不变
   ├─ 处理命名冲突 → 同名节点加前缀区分
   ├─ 处理导入冲突 → 统一 import 路径
   └─ 处理函数重名 → 内联或重命名

3. 合并依赖
   ├─ 取所有依赖的并集
   ├─ 检查版本兼容性
   └─ 去掉冗余依赖

4. 统一代码风格
   ├─ 遵循原插件中占主导地位的风格
   ├─ 不强制统一不同来源的代码
   └─ 只在必要的地方做适配

5. 注册所有节点
   ├─ __init__.py 中导入所有节点类
   ├─ 更新 NODE_CLASS_MAPPINGS
   └─ 更新 NODE_DISPLAY_NAME_MAPPINGS

6. 测试加载
   ├─ ComfyUI 启动不报错
   ├─ 所有节点出现在节点列表
   └─ 基础连线能跑通
```

## 反向工程

### 90% 插件是纯 Python → 直接读源码
- 优先看 `__init__.py` 和核心节点文件
- 搜索 `class.*Node` 定位节点定义
- 关注 `INPUT_TYPES`, `RETURN_TYPES`, `FUNCTION` 属性

### .pyc 文件 → uncompyle6
```
uncompyle6 -o output_dir/ target.pyc
```
注意：Python 3.9+ 的 pyc 可能反编译不完整

### PyInstaller 打包 → pyinstxtractor + uncompyle6
```
python pyinstxtractor.py target.exe
uncompyle6 extracted/xxx.pyc
```
注意：入口文件的 pyc 需要修复 magic number

### ⚠️ 关键原则
- 提取功能思想，重写实现，不直接复制代码
- 尊重原项目许可证（GPL/MIT/Apache...）
- 开源项目检查 LICENSE 文件

## 关键陷阱（必查）

### 1. 导入生命周期
`__init__.py` 中的 import 顺序影响节点加载。如果某个节点依赖另一个模块的初始化，import 顺序错会导致节点加载失败。

### 2. VRAM 管理
- 大模型（SDXL/Flux）的中间结果不要长时间持有
- 用完的 tensor 及时 `del` 或移到 CPU
- 避免在 `IS_CHANGED` 中创建大 tensor

### 3. 序列化兼容
- 节点状态需要可保存/恢复（workflow JSON）
- widget 值类型变更（比如 STRING→COMBO）会破坏旧 workflow
- 加版本参数处理向后兼容

### 4. 同名冲突
- 多个原插件可能有同名节点类
- 合并时加前缀或命名空间：`SourceA_NodeName`, `SourceB_NodeName`
- `NODE_DISPLAY_NAME_MAPPINGS` 中也要相应调整

### 5. 前端 JS 兼容
- 有些节点的前端 UI 在 `js/` 目录
- 合并后需要更新 web 注册路径
- 前端 JS 冲突通常比 Python 更难排查

## 调试技巧

```
ComfyUI 启动时看控制台：
  - Import times: 哪个模块加载慢
  - Failed to load: 哪个节点没注册上
  - Missing nodes: workflow 里引用了不存在的节点

节点开发时：
  - 用 ComfyUI-Manager 的 "Try install missing nodes"
  - 用 dev mode 看节点加载日志
  - 最简单的 workflow (LoadImage → YourNode → PreviewImage) 测试
```
