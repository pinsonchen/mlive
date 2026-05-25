# 推流故障排查手册（统一入口）

> 本手册是所有推流故障排查的**唯一入口**。根据症状在下方表格中定位场景，点击即可进入对应排查页（≤2 步到达解决方案）。

## 按症状快速定位

| 症状 | 场景 | 快速解决 |
|------|------|---------|
| OBS 提示"连接被拒绝"或"无法连接到服务器" | [01 连接被拒绝](01-connection-refused.md) | 重新复制推流地址 → 测试端口 1935 → 切换备用节点 |
| 码率剧烈波动，画质时好时坏 | [02 码率不稳定](02-bitrate-unstable.md) | 码率 ≤ 上行×0.6 → 启用动态码率 → 关闭高带宽进程 |
| 观众看到黑屏，OBS 预览正常 | [03 黑屏](03-black-screen.md) | 检查来源勾选 → 切换 x264 编码 → 指定独显运行 OBS |
| 声音与画面出现延迟或错位 | [04 音画不同步](04-audio-video-desync.md) | 设置同步偏移 → 编码预设改 veryfast → 换有线麦克风 |
| 推流立即断开，日志 403/401 | [05 RTMP 鉴权失败](05-rtmp-auth-failure.md) | 重新获取密钥 → 核对节点匹配 → 检查账号状态 |
| 同推多平台时部分无信号 | [06 多平台部分推流失败](06-multi-platform-partial-failure.md) | 单独测试失败平台 → 降低单路码率 → 改为直推 |
| CPU 使用率接近 100%、掉帧 | [07 CPU 编码占用过高](07-high-cpu-encoding.md) | 切到硬件编码 → 预设改 veryfast → 精简场景 |
| 推流被平台终止，提示密钥错误 | [08 推流密钥无效](08-stream-key-invalid.md) | 清理空白字符 → 完整复制含参数密钥 → 拆分字段 |
| 目标应用看不到 OBS 虚拟摄像头 | [09 虚拟摄像头未被识别](09-virtual-camera-not-detected.md) | 启动虚拟摄像头 → 重装驱动 → 重启目标应用 |
| 推流后平台显示"格式不支持" | [10 平台编码格式不兼容](10-platform-specific-encoding-rejection.md) | 视频改 H.264 → 音频改 AAC → 匹配分辨率/帧率 |
| 断流后无法自动恢复 | [11 推流中断自动重连失败](11-auto-reconnect-failure.md) | 启用自动重连 → 平台重新开播 → 排查网络中断 |
| 推流成功但画质被压缩/断流 | [12 平台限流](12-platform-throttling.md) | 码率降至平台上限 → 检查推流资质 → 联系客服 |
| 平台显示黑边/画面拉伸变形 | [13 分辨率不匹配](13-resolution-mismatch.md) | 设置正确画布 → 来源适配屏幕 → 同步输出分辨率 |
| 推流画面正常但无声/杂音 | [14 音频设备冲突](14-audio-device-conflict.md) | 指定具体设备 → 检查轨道映射 → 消除冲突源 |

## 按错误码定位

| 错误码/关键词 | 对应场景 |
|--------------|---------|
| `Connection refused` | [01 连接被拒绝](01-connection-refused.md) |
| `HTTP 401` / `HTTP 403` | [05 RTMP 鉴权失败](05-rtmp-auth-failure.md) |
| `Authentication failed` | [05 RTMP 鉴权失败](05-rtmp-auth-failure.md) |
| `Stream Key Invalid` | [08 推流密钥无效](08-stream-key-invalid.md) |
| `编码超载` / `Encoding overloaded` | [07 CPU 编码占用过高](07-high-cpu-encoding.md) |
| `格式不支持` | [10 平台编码格式不兼容](10-platform-specific-encoding-rejection.md) |
| `Generic stream ingestion failed` | [10 平台编码格式不兼容](10-platform-specific-encoding-rejection.md) |

## 使用方式

1. **找症状**：在"按症状快速定位"表格中找到你遇到的现象。
2. **进场景**：点击链接进入对应场景文件，先尝试顶部"快速解决（≤3 步）"。
3. **深入排查**：若快速解决未生效，按"判定步骤"决策树逐步定位问题。

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

## 通用排查技巧

- **查看 OBS 日志**：帮助 → 日志文件 → 上传当前日志，获取详细错误信息。
- **使用自动配置向导**：工具 → 自动配置向导，让 OBS 根据硬件和网络自动推荐设置。
- **测试推流**：先推流至测试平台（如自建 RTMP 服务器或 B 站测试），确认本地无问题后再切换正式平台。
