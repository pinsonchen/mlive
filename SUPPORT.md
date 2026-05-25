# 求助指引 / Support Guide

遇到问题时，请按以下步骤操作，提供完整信息可帮助我们更快定位故障。

---

## 1. 先运行一键诊断脚本

```bash
# 基本运行（彩色终端报告）
bash scripts/diagnose.sh

# 同时输出 JSON 报告文件（提 Issue 时请附上）
bash scripts/diagnose.sh --output=report.json
```

> **系统要求**：bash 4+、curl、nc 或 /dev/tcp、ping。
> macOS / Linux 直接运行；Windows 请在 **Git Bash** 或 **WSL** 中运行。

诊断脚本检测 8 项内容：RTMP 端口连通性、推流地址格式、带宽、OBS 配置、系统资源、网络延迟、防火墙端口、DNS 解析。

---

## 2. 收集日志

### OBS Studio 日志

| 系统 | 日志路径 |
|------|----------|
| macOS | `~/Library/Application Support/obs-studio/logs/` |
| Windows | `%APPDATA%\obs-studio\logs\` |
| Linux | `~/.config/obs-studio/logs/` |

在 OBS 中也可通过 **帮助 → 日志文件 → 当前日志** 直接查看并复制。

### ffmpeg 日志

如果使用 ffmpeg 推流，请加上 `-loglevel verbose` 标志以获取详细输出：

```bash
ffmpeg -loglevel verbose -re -i input.mp4 \
  -c:v libx264 -b:v 2500k -c:a aac -b:a 128k \
  -f flv rtmp://your-platform-url/live/your-key 2>&1 | tee ffmpeg.log
```

---

## 3. 查阅故障排查文档

提问前请先检索现有文档：

- **[推流故障排查手册](docs/troubleshooting/index.md)** — 14 个典型直播故障的决策树式排查流程
- **[docs/](docs/)** — 详细操作文档和 FAQ 索引
- **[在线指南](https://tools.pinsonbot.com/mlive/)** — 交互式故障排查

---

## 4. 提问渠道

| 场景 | 渠道 |
|------|------|
| 推流故障、无法连接平台 | [提交 Issue → 推流故障](https://github.com/pinsonchen/mlive/issues/new?template=streaming-failure.yml) |
| 平台政策变更 | [提交 Issue → 平台政策变更](https://github.com/pinsonchen/mlive/issues/new?template=platform-policy.yml) |
| 文档错误、描述不准确 | [提交 Issue → 文档勘误](https://github.com/pinsonchen/mlive/issues/new?template=doc-correction.yml) |
| 经验分享、方案讨论、一般提问 | [GitHub Discussions](https://github.com/pinsonchen/mlive/discussions) |

> **注**：提交 Issue 时请附上诊断脚本输出（`report.json`）和 OBS 日志，否则可能无法快速定位问题。

---

## 5. 提问模板（Discussions 通用格式）

如在 Discussions 提问，请尽量包含以下内容：

```
【平台】淘宝直播 / 视频号 / 小红书 / 抖音
【OBS版本】xx.xx.xx
【故障现象】（具体描述）
【诊断脚本输出】（粘贴终端输出或上传 report.json）
【OBS日志片段】（关键错误行）
【已尝试的解决方法】
```

---

> 项目主页：<https://github.com/pinsonchen/mlive>
> 在线工具：<https://tools.pinsonbot.com/mlive/>
