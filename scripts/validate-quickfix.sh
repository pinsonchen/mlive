#!/usr/bin/env bash
# validate-quickfix.sh
# 校验 TROUBLESHOOTING.md 中的「快速解决」区块：
#   1) 所有场景（## N. xxx）必须包含「快速解决」blockquote
#   2) 每个 Quick Fix 区块包含 1-3 个步骤项
#   3) 平均步骤数 <= 3
# 用法：bash scripts/validate-quickfix.sh [path-to-TROUBLESHOOTING.md]

set -euo pipefail

FILE="${1:-TROUBLESHOOTING.md}"

if [[ ! -f "$FILE" ]]; then
  echo "ERROR: 找不到文件 $FILE" >&2
  exit 1
fi

awk '
  BEGIN {
    scenario_count = 0
    missing_count = 0
    total_steps = 0
    in_quickfix = 0
    current_steps = 0
    current_scenario = ""
    pending_scenario = ""
  }

  # 顶层场景标题：## N. 名称
  /^##[[:space:]]+[0-9]+\.[[:space:]]+/ {
    # 关闭上一个场景的 Quick Fix 统计
    if (pending_scenario != "") {
      if (!have_quickfix) {
        printf("MISSING: %s 缺少『快速解决』区块\n", pending_scenario)
        missing_count++
      } else {
        if (current_steps < 1 || current_steps > 3) {
          printf("WARN:    %s Quick Fix 步骤数 = %d（应在 1-3）\n", pending_scenario, current_steps)
        }
        total_steps += current_steps
      }
    }
    pending_scenario = $0
    sub(/^##[[:space:]]+/, "", pending_scenario)
    scenario_count++
    have_quickfix = 0
    in_quickfix = 0
    current_steps = 0
    next
  }

  # 进入 Quick Fix 区块
  /^>[[:space:]]+\*\*快速解决/ {
    in_quickfix = 1
    have_quickfix = 1
    current_steps = 0
    next
  }

  # Quick Fix 区块内的有序步骤行：> N. ...
  in_quickfix && /^>[[:space:]]+[0-9]+\.[[:space:]]+/ {
    current_steps++
    next
  }

  # 离开 blockquote (空行或非 > 开头)
  in_quickfix && !/^>/ {
    in_quickfix = 0
  }

  END {
    # 处理最后一个场景
    if (pending_scenario != "") {
      if (!have_quickfix) {
        printf("MISSING: %s 缺少『快速解决』区块\n", pending_scenario)
        missing_count++
      } else {
        if (current_steps < 1 || current_steps > 3) {
          printf("WARN:    %s Quick Fix 步骤数 = %d（应在 1-3）\n", pending_scenario, current_steps)
        }
        total_steps += current_steps
      }
    }

    covered = scenario_count - missing_count
    avg = (covered > 0) ? total_steps / covered : 0

    printf("\n=== Quick Fix 校验报告 ===\n")
    printf("场景总数:         %d\n", scenario_count)
    printf("含 Quick Fix:     %d\n", covered)
    printf("缺失 Quick Fix:   %d\n", missing_count)
    printf("Quick Fix 总步数: %d\n", total_steps)
    printf("平均步数:         %.2f\n", avg)

    fail = 0
    if (scenario_count < 10) {
      printf("FAIL: 场景数 %d < 10\n", scenario_count)
      fail = 1
    }
    if (missing_count > 0) {
      printf("FAIL: 有 %d 个场景缺少 Quick Fix 区块\n", missing_count)
      fail = 1
    }
    if (avg > 3.0) {
      printf("FAIL: 平均步数 %.2f > 3\n", avg)
      fail = 1
    }

    if (fail) {
      printf("\n校验未通过 ✗\n")
      exit 1
    }
    printf("\n校验通过 ✓ 所有场景均含 Quick Fix 且平均步数 ≤ 3\n")
  }
' "$FILE"
