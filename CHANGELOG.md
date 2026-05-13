# 更新日志

## v3.1 (2026-05-14) — 结构重构 + 无极军团 SOP 内核融合

### 结构重构
- SKILL.md 24KB → 11KB（-54%），精简为入口+总纲，细节下沉到 units/
- 新增 `units/` 目录：5个详细SOP文件，按任务类型按需读取
- 新增 `scripts/` 目录：4个可运行工具脚本

### 新增 units/
| 文件 | 内容 |
|------|------|
| units/staff.md | 参谋本部：完整工作流、调度映射表、并发策略、多轮迭代熔断 |
| units/dev.md | 第四师：技术栈推荐(带Star数)、打包加密流水线、反编译工具链、五级软件防护 |
| units/comfyui.md | 第三师：插件分析/合并/反向工程全流程、5个关键陷阱、调试技巧 |
| units/visual_security.md | 第二师+安全局：UI设计审查(排版/色彩/间距/动效) + 安全攻防(进攻/防御/打靶场) |
| units/qa_intel.md | 质监局+第五师：5项QA验收标准、错误DNA去重(相似度检测)、情报五维评估模板 |

### 新增 scripts/
| 脚本 | 功能 |
|------|------|
| scripts/errors_db.py | 错误DNA数据库：add/check/search/dedup/list，Jaccard相似度检测 |
| scripts/target_range.py | 打靶场沙盒：5类扫描(code/plugin/dependency/config/permission)，百分制评分 |
| scripts/wuji-backup.py | 智能备份：10份轮换，支持 backup/list/restore/clean |
| scripts/beep.ps1 | 提示音：完成/错误 |

### 新增机制
- **调度映射表**：关键词→师团，6条映射规则
- **迭代熔断**：输出重复>85%自动停，≤3轮上限
- **QA验收标准**：5项必检 + 不通过处理流程
- **错误DNA三振规则**：同一模式第3次触发强制根因分析
- **情报报告模板**：标准化五段式输出
- **打靶场评分**：≥80通过，60-79有条件，<60必须修复

---

## v3.0 (2026-05-12)
- 首版发布：融合龙虾军团+女娲+Impeccable+社区精华
- 自动触发机制（30+关键词）
- 静默联动：UI走Impeccable，思维蒸馏走女娲
- 四级权限+八条安全红线
- Token效率体系
- UI设计完整体系（第五章节）
