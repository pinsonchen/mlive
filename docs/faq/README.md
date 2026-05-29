# FAQ 知识库贡献指南

## 目录结构

```
docs/faq/
├── index.html            # 可搜索的 FAQ 前端页面
├── faq.css               # 样式文件
├── faq.js                # 搜索和过滤逻辑
├── faq-data.json         # FAQ 数据（前端搜索使用）
├── streaming-config.md   # 推流配置类问题
├── network.md            # 网络类问题
├── obs.md                # OBS 相关问题
├── auth.md               # 鉴权与权限问题
├── bitrate.md            # 码率相关问题
├── platform-policy.md    # 平台政策问题
└── README.md             # 本文件
```

## 条目模板

每条 FAQ 使用以下统一格式：

### Markdown 文件格式

```markdown
## FAQ-XXX: 简短问题标题

**问题**：一句话描述用户遇到的问题。

**症状**：
- 具体表现1
- 具体表现2

**原因**：
- 可能的原因说明

**解决步骤**：
1. 第一步操作
2. 第二步操作
3. ...

**相关链接**：[链接文字](URL)
```

### JSON 数据格式（faq-data.json）

```json
{
  "id": "FAQ-XXX",
  "category": "分类ID",
  "categoryName": "分类中文名",
  "question": "问题标题",
  "symptoms": "症状描述",
  "cause": "原因描述",
  "solution": "解决方案描述"
}
```

## 分类说明

| 分类 ID | 中文名 | 适用范围 |
|---------|--------|----------|
| streaming-config | 推流配置 | 推流地址、连接、推流流程相关 |
| network | 网络 | 带宽、延迟、断流、网络稳定性 |
| obs | OBS | OBS软件操作、插件、编码器 |
| auth | 鉴权 | 平台权限、开通条件、认证 |
| bitrate | 码率 | 码率设置、画质优化 |
| platform-policy | 平台政策 | 平台规则、保证金、封禁 |

## 贡献步骤

1. 在对应分类的 `.md` 文件中添加新条目
2. 在 `faq-data.json` 中添加对应的 JSON 数据
3. FAQ ID 按顺序递增（如 FAQ-024, FAQ-025...）
4. 确保问题、症状、原因、解决步骤四个字段都有内容
5. 提交 PR 时注明新增/修改了哪些条目

## 注意事项

- 条目内容应基于实际用户反馈和真实故障场景
- 平台政策信息需标注时效性（如"2026年X月"）
- 解决步骤应具体可操作，避免模糊表述
- 如果涉及平台具体操作路径，需定期验证是否仍有效
