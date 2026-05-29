---
version: 1
owner: "@多平台同步开播操作指南"
review_cadence: weekly
---

# Project Goals

This file is read by `vivify goals decompose` to derive concrete
FeatureRequests on a schedule. Each goal must declare at least one KPI.

## Goal: 提升指南内容覆盖率与时效性

确保文档和交互式指南覆盖所有主流直播平台的最新政策，减少用户因信息过时而操作失败的情况。

- KPI: platform_coverage target=>=5 direction=up unit=platforms
- KPI: policy_update_lag target=<=30 direction=down unit=days
- KPI: document_version target=>=2.1 direction=up unit=version

Deadline: 2026-08-01

Notes: 重点关注抖音、小红书等平台政策频繁变动的情况，建立定期检查更新机制。

## Goal: 提升交互式指南用户体验

优化交互式网页工具的易用性和响应速度，使新手用户能在10分钟内完成方案选择和配置。

- KPI: page_load_time target=<=2 direction=down unit=seconds
- KPI: guide_completion_steps target=<=5 direction=down unit=steps
- KPI: mobile_responsive_score target=>=90 direction=up unit=percent

Deadline: 2026-07-01

Notes: 考虑添加移动端适配，许多主播习惯用手机查看教程同时在电脑上操作。

## Goal: 增强故障排查与社区支持能力

建立常见问题库和故障排查流程，降低用户遇到推流失败时的解决时间。

- KPI: faq_entries target=>=20 direction=up unit=entries
- KPI: troubleshoot_scenarios target=>=10 direction=up unit=scenarios
- KPI: avg_resolution_steps target=<=3 direction=down unit=steps

Deadline: 2026-09-01

Notes: 收集用户反馈的高频问题，优先覆盖OBS推流失败、推流码获取异常等场景。