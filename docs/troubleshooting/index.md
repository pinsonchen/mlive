# 直播故障排查手册

本目录收录了 10 个典型推流故障场景，每个场景包含**快速解决（≤3 步）**、现象描述、判定步骤（决策树）、修复动作和验证方法。建议先尝试 Quick Fix 区块的高命中率动作；若未解决再走完整决策树。

## 场景列表

| # | 场景 | 典型现象 |
|---|------|---------|
| 01 | [连接被拒绝](01-connection-refused.md) | OBS 推流报错"连接被拒绝"或"无法连接到服务器" |
| 02 | [码率不稳定](02-bitrate-unstable.md) | OBS 状态栏码率剧烈波动，画质时好时坏 |
| 03 | [黑屏](03-black-screen.md) | 观众看到黑屏，OBS 预览正常 |
| 04 | [音画不同步](04-audio-video-desync.md) | 声音与画面出现明显延迟或错位 |
| 05 | [RTMP 鉴权失败](05-rtmp-auth-failure.md) | 推流立即断开，日志显示 403/401 |
| 06 | [多平台部分推流失败](06-multi-platform-partial-failure.md) | 同时推多平台时，部分平台无信号 |
| 07 | [CPU 编码占用过高](07-high-cpu-encoding.md) | 直播卡顿、掉帧，CPU 使用率接近 100% |
| 08 | [推流密钥无效](08-stream-key-invalid.md) | 推流被平台立即终止，提示密钥错误 |
| 09 | [虚拟摄像头未被识别](09-virtual-camera-not-detected.md) | 目标应用看不到 OBS 虚拟摄像头 |
| 10 | [平台编码格式不兼容](10-platform-specific-encoding-rejection.md) | 推流后平台显示"格式不支持"或自动断流 |

## 使用方式

1. 根据实际现象在表格中找到对应场景。
2. 按照场景文件中的**判定步骤**逐步排查。
3. 执行**修复动作**后，使用**验证方法**确认问题已解决。

## 通用前置检查

在进入具体场景前，先确认以下基础项：

```bash
# 检查网络连通性（以 Bilibili 为例）
ping live-push.bilivideo.com

# 检查端口 1935 是否可达
nc -zv live-push.bilivideo.com 1935
```

- OBS 版本 ≥ 29.0（`帮助 → 关于 OBS Studio`）
- 推流地址格式：`rtmp://<server>/<app>/<stream-key>`
- 本机防火墙未拦截 OBS 出站连接
