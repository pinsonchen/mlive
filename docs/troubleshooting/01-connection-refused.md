---
symptoms:
  - 连接被拒绝
  - 无法连接到服务器
  - Failed to connect to server
error_codes:
  - Connection refused
platforms:
  - Bilibili
  - 抖音
---

# 场景 01：连接被拒绝

## 快速解决（≤3 步）

> 1. **重新复制推流地址**：登录平台后台获取最新地址，确认末尾不含推流码（推流码独立填写）。
> 2. **测试 1935 端口**：执行 `nc -zv <host> 1935`；超时则切换到 RTMPS（443 端口）节点。
> 3. **切换备用推流节点**：使用平台提供的备用 CDN 节点（如 `live-push-cn-gotcha01.bilivideo.com`）。

若以上 3 步未解决，再阅读下方完整判定流程。

## 现象描述

OBS 点击"开始推流"后立即报错，日志或状态栏出现以下信息之一：

- `连接被拒绝 (Connection refused)`
- `无法连接到服务器`
- `Failed to connect to server`

## 判定步骤

```
开始推流 → 立即报错"连接被拒绝"
│
├─ 步骤 1：确认推流地址填写是否正确
│   OBS → 设置 → 推流 → 服务器 URL
│   检查格式：rtmp://<host>/<app>
│   └─ 地址有误 → 修复动作 A
│
├─ 步骤 2：测试端口 1935 是否可达
│   执行：nc -zv <host> 1935
│   └─ 超时/拒绝 → 修复动作 B（防火墙或 ISP 限制）
│
└─ 步骤 3：确认平台推流服务器状态
    访问平台状态页或搜索"<平台名> 直播 故障"
    └─ 服务器异常 → 等待平台恢复，修复动作 C（切换备用节点）
```

## 修复动作

### 动作 A：修正推流地址

1. 登录直播平台后台，复制最新推流地址。
2. 在 OBS 中：`设置 → 推流 → 服务器`，粘贴完整地址。
3. 确认地址末尾**不含**推流码（推流码填在"推流码"字段）。

```
正确示例：
  服务器：rtmp://live-push.bilivideo.com/live-bvc/
  推流码：?streamname=live_xxx&key=yyy

错误示例（把推流码混入地址）：
  服务器：rtmp://live-push.bilivideo.com/live-bvc/?streamname=live_xxx
```

### 动作 B：处理防火墙/端口封锁

```bash
# 检测 1935 端口是否可达
nc -zv live-push.bilivideo.com 1935

# 若被封锁，尝试 RTMPS（443 端口）
nc -zv live-push.bilivideo.com 443
```

在 OBS 中切换到 RTMPS：`设置 → 推流 → 服务器` 将 `rtmp://` 改为 `rtmps://`，并选择支持 443 端口的节点。

### 动作 C：切换备用推流节点

各平台通常提供多个推流节点：

| 平台 | 主节点 | 备用节点 |
|------|--------|---------|
| Bilibili | `live-push.bilivideo.com` | `live-push-cn-gotcha01.bilivideo.com` |
| 抖音 | `vs-push.douyucdn.cn` | `vs-push2.douyucdn.cn` |

## 验证方法

1. 执行 `nc -zv <新节点> 1935`，返回 `succeeded` 表示端口可达。
2. 在 OBS 中点击"开始推流"，状态栏显示绿色圆点且码率稳定（如 4000 kbps）。
3. 用手机浏览器访问直播间，确认画面正常播放。
