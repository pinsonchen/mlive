---
symptoms:
  - 推流密钥无效
  - 推流码错误
  - Stream Key Invalid
error_codes:
  - Stream Key Invalid
platforms:
  - Bilibili
  - 抖音
  - YouTube
  - Twitch
---

# 场景 08：推流密钥无效

## 快速解决（≤3 步）

> 1. **清理密钥首尾空白/换行**：在文本编辑器粘贴后检查 `^M`、空格，重新无空格粘贴到推流码字段。
> 2. **完整复制含参数密钥**：B站等密钥含 `?streamname=xxx&key=yyy`，确保不被截断。
> 3. **拆分服务器与推流码**：服务器 URL 与推流码必须分别填入对应字段，不要混合。

若以上 3 步未解决，再阅读下方完整判定流程。

<details>
<summary>🔍 完整诊断流程（Advanced Diagnosis）</summary>

## 现象描述

推流连接建立后，平台立即返回错误，日志显示"Stream Key Invalid"或"推流码错误"，推流在 5 秒内停止。与场景 05 不同，此问题明确指向密钥格式或内容错误，而非鉴权权限问题。

## 判定步骤

```
平台提示"推流码错误/无效"
│
├─ 步骤 1：检查密钥是否包含多余字符
│   复制密钥到文本编辑器，检查首尾是否有空格、换行符
│   └─ 有多余字符 → 修复动作 A（清理密钥）
│
├─ 步骤 2：确认密钥未被截断
│   部分密钥含 "?" 和参数（如 B站），确认完整复制
│   └─ 密钥不完整 → 修复动作 B（重新完整复制）
│
└─ 步骤 3：检查 OBS 服务类型与密钥格式是否匹配
    部分平台要求密钥填写位置不同（服务器 vs 推流码字段）
    └─ 填错位置 → 修复动作 C（按平台规范拆分填写）
```

## 修复动作

### 动作 A：清理密钥中的多余字符

```bash
# 在终端检查剪贴板内容（macOS）
pbpaste | cat -A
# 若末尾显示 ^M 或 $ 以外的字符，说明含有非预期字符
```

在 OBS 推流码字段中：选中全部内容后重新粘贴，确保无前导/尾随空格。

### 动作 B：完整复制 Bilibili 推流码

Bilibili 推流码格式较长，包含查询参数，**必须完整复制**：

```
# 正确（完整推流码）：
?streamname=live_123456789&key=abc123def456&schedule=rtmp&pflag=1

# 错误（仅复制了 streamname 部分）：
?streamname=live_123456789
```

操作步骤：

1. 在 B站直播中心点击"复制"按钮（不要手动选中复制，避免遗漏）。
2. 先粘贴到记事本确认完整性，再复制到 OBS。

### 动作 C：按平台规范拆分推流地址与密钥

各平台填写规范：

| 平台 | 服务器字段 | 推流码字段 |
|------|----------|---------|
| Bilibili | `rtmp://live-push.bilivideo.com/live-bvc/` | `?streamname=live_xxx&key=yyy...` |
| 抖音 | `rtmp://vs-push.douyucdn.cn/live/` | `<stream-key>` |
| YouTube | `rtmp://a.rtmp.youtube.com/live2` | `<16位密钥>` |
| Twitch | `rtmp://live.twitch.tv/app` | `live_<channel>_<token>` |

在 OBS 中，`设置 → 推流 → 服务`选择对应平台后，密钥字段通常由平台模板自动提示。

## 验证方法

1. 将密钥粘贴到 OBS 后，点击推流码字段旁的"显示"按钮确认内容完整。
2. 推流后等待 10 秒，确认连接保持稳定（绿灯不闪烁）。
3. 在平台直播后台确认"当前状态：直播中"。

</details>
