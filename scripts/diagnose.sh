#!/usr/bin/env bash
# 多平台直播诊断脚本 v1.0
# 用法: bash scripts/diagnose.sh [--json]
# 检查直播推流环境，输出结构化诊断报告

set -euo pipefail

# ---------- 全局变量 ----------
SCRIPT_VERSION="1.0"
OUTPUT_JSON=false
REPORT_FILE=""
PASS=0
FAIL=0
WARN=0
declare -a RESULTS=()

# 各平台RTMP/推流域名
PLATFORM_DOMAINS=(
    "push.xiaohongshu.com"        # 小红书
    "livepush.myqcloud.com"       # 视频号 (腾讯云)
    "alivecdn.com"                # 淘宝直播 CDN
    "pull-rtmp.douyincdn.com"     # 抖音 (仅作DNS检查，不支持OBS直推)
)

RTMP_PORT=1935

FAQ_BASE="https://tools.pinsonbot.com/mlive/#faq"

# ---------- 颜色 ----------
if [[ -t 1 ]]; then
    RED='\033[0;31m'; GREEN='\033[0;32m'; YELLOW='\033[1;33m'
    BLUE='\033[0;34m'; CYAN='\033[0;36m'; BOLD='\033[1m'; RESET='\033[0m'
else
    RED=''; GREEN=''; YELLOW=''; BLUE=''; CYAN=''; BOLD=''; RESET=''
fi

# ---------- 工具函数 ----------
print_header() {
    echo -e "\n${BOLD}${CYAN}============================================================${RESET}"
    echo -e "${BOLD}${CYAN}  多平台直播一键诊断脚本 v${SCRIPT_VERSION}${RESET}"
    echo -e "${BOLD}${CYAN}  $(date '+%Y-%m-%d %H:%M:%S')${RESET}"
    echo -e "${BOLD}${CYAN}============================================================${RESET}\n"
}

record_result() {
    local check_id="$1"
    local status="$2"   # PASS | FAIL | WARN
    local title="$3"
    local detail="$4"
    local faq_id="${5:-}"

    case "$status" in
        PASS) ((PASS++)); icon="${GREEN}[✔ PASS]${RESET}" ;;
        FAIL) ((FAIL++)); icon="${RED}[✘ FAIL]${RESET}" ;;
        WARN) ((WARN++)); icon="${YELLOW}[⚠ WARN]${RESET}" ;;
    esac

    echo -e "  ${icon} ${BOLD}${title}${RESET}"
    echo -e "         ${detail}"
    if [[ -n "$faq_id" ]]; then
        echo -e "         ${BLUE}参考：${FAQ_BASE}-${faq_id}${RESET}"
    fi
    echo ""

    # 追加到 JSON 数组
    RESULTS+=("{\"id\":\"${check_id}\",\"status\":\"${status}\",\"title\":\"${title}\",\"detail\":\"${detail}\",\"faq\":\"${faq_id}\"}")
}

cmd_exists() { command -v "$1" &>/dev/null; }

# ---------- 检测项 ----------

# CHECK-01: RTMP 端口连通性
check_rtmp_port() {
    echo -e "${BOLD}[CHECK-01] RTMP 端口连通性 (port 1935)${RESET}"
    local failed=()
    local passed=()

    for domain in "${PLATFORM_DOMAINS[@]}"; do
        local host="${domain}"
        local result=false
        if cmd_exists nc; then
            nc -z -w 5 "$host" $RTMP_PORT 2>/dev/null && result=true || true
        elif cmd_exists timeout && cmd_exists bash; then
            timeout 5 bash -c "echo >/dev/tcp/${host}/${RTMP_PORT}" 2>/dev/null && result=true || true
        fi
        if $result; then
            passed+=("$host")
        else
            failed+=("$host")
        fi
    done

    if [[ ${#failed[@]} -eq 0 ]]; then
        record_result "CHECK-01" "PASS" "RTMP端口1935全部可达" \
            "所有平台推流服务器端口1935均可连接：${passed[*]}" "rtmp-port"
    elif [[ ${#passed[@]} -gt 0 ]]; then
        record_result "CHECK-01" "WARN" "RTMP端口部分不可达" \
            "不可达：${failed[*]}；可达：${passed[*]}。请检查防火墙或ISP限制。" "rtmp-port"
    else
        record_result "CHECK-01" "FAIL" "RTMP端口1935全部不可达" \
            "所有平台RTMP服务器不可连接。运营商或防火墙可能屏蔽了1935端口，推流将失败。" "rtmp-port"
    fi
}

# CHECK-02: 推流地址格式校验
check_rtmp_url_format() {
    echo -e "${BOLD}[CHECK-02] 推流地址格式校验${RESET}"
    local urls_to_check=()
    local invalid=()

    # 从环境变量或命令行读取用户提供的推流地址
    [[ -n "${RTMP_URL_TAOBAO:-}" ]] && urls_to_check+=("taobao:$RTMP_URL_TAOBAO")
    [[ -n "${RTMP_URL_XIAOHONGSHU:-}" ]] && urls_to_check+=("xiaohongshu:$RTMP_URL_XIAOHONGSHU")
    [[ -n "${RTMP_URL_WEIXIN:-}" ]] && urls_to_check+=("weixin:$RTMP_URL_WEIXIN")

    if [[ ${#urls_to_check[@]} -eq 0 ]]; then
        record_result "CHECK-02" "WARN" "未提供推流地址" \
            "请设置环境变量 RTMP_URL_TAOBAO / RTMP_URL_XIAOHONGSHU / RTMP_URL_WEIXIN 后重新运行以校验地址格式。" "url-format"
        return
    fi

    # 各平台期望的URL模式
    for entry in "${urls_to_check[@]}"; do
        local platform="${entry%%:*}"
        local url="${entry#*:}"
        local valid=false
        case "$platform" in
            taobao)
                [[ "$url" =~ ^rtmp://[^/]+\.alivecdn\.com/live/.+ ]] && valid=true ;;
            xiaohongshu)
                [[ "$url" =~ ^rtmp://push\.xiaohongshu\.com/live/.+ ]] && valid=true ;;
            weixin)
                [[ "$url" =~ ^rtmp://[0-9]+\.livepush\.myqcloud\.com/.+ ]] && valid=true ;;
        esac
        if ! $valid; then
            invalid+=("$platform")
            echo -e "    ${RED}✘${RESET} $platform 地址格式不匹配：$url"
        else
            echo -e "    ${GREEN}✔${RESET} $platform 地址格式正确"
        fi
    done

    if [[ ${#invalid[@]} -eq 0 ]]; then
        record_result "CHECK-02" "PASS" "推流地址格式全部正确" \
            "已检查 ${#urls_to_check[@]} 个推流地址，格式均符合平台规范。" "url-format"
    else
        record_result "CHECK-02" "FAIL" "推流地址格式异常" \
            "以下平台地址格式不匹配：${invalid[*]}。请重新从平台获取最新推流地址。" "url-format"
    fi
}

# CHECK-03: 本地上行带宽估算
check_bandwidth() {
    echo -e "${BOLD}[CHECK-03] 上行带宽估算${RESET}"

    if ! cmd_exists curl; then
        record_result "CHECK-03" "WARN" "无法估算带宽（curl不存在）" \
            "请安装 curl 后重新运行。建议上行带宽：单平台≥5Mbps，多平台≥20Mbps。" "bandwidth"
        return
    fi

    # 使用 curl 下载10MB文件测量近似带宽（仅下行，上行无法直接测）
    local test_url="https://speed.cloudflare.com/__down?bytes=5000000"
    local start end elapsed_ms size_bytes bw_mbps

    start=$(date +%s%3N 2>/dev/null || python3 -c "import time; print(int(time.time()*1000))")
    size_bytes=$(curl -s -o /dev/null -w "%{size_download}" --max-time 15 "$test_url" 2>/dev/null || echo 0)
    end=$(date +%s%3N 2>/dev/null || python3 -c "import time; print(int(time.time()*1000))")

    local elapsed=$(( end - start ))
    if [[ "$size_bytes" -gt 0 && "$elapsed" -gt 0 ]]; then
        # bits per second -> Mbps
        bw_mbps=$(awk "BEGIN {printf \"%.1f\", ($size_bytes * 8) / ($elapsed / 1000) / 1000000}")
        if awk "BEGIN {exit ($bw_mbps >= 20) ? 0 : 1}" 2>/dev/null; then
            record_result "CHECK-03" "PASS" "带宽充足（约 ${bw_mbps} Mbps）" \
                "当前带宽约 ${bw_mbps} Mbps，满足多平台同步推流（≥20Mbps）需求。" "bandwidth"
        elif awk "BEGIN {exit ($bw_mbps >= 10) ? 0 : 1}" 2>/dev/null; then
            record_result "CHECK-03" "WARN" "带宽一般（约 ${bw_mbps} Mbps）" \
                "当前带宽约 ${bw_mbps} Mbps，建议限制同时推流平台数量（≤2个），或降低码率至2500kbps以下。" "bandwidth"
        else
            record_result "CHECK-03" "FAIL" "带宽不足（约 ${bw_mbps} Mbps）" \
                "当前带宽约 ${bw_mbps} Mbps，不建议进行多平台推流。建议使用有线网络或升级带宽。" "bandwidth"
        fi
    else
        record_result "CHECK-03" "WARN" "带宽测试失败" \
            "无法连接测速服务器，请手动检查网络连接。建议上行带宽：单平台≥5Mbps，多平台≥20Mbps。" "bandwidth"
    fi
}

# CHECK-04: OBS 配置文件检查
check_obs_config() {
    echo -e "${BOLD}[CHECK-04] OBS 配置文件检查${RESET}"

    local obs_dirs=()
    # macOS
    obs_dirs+=("$HOME/Library/Application Support/obs-studio")
    # Linux
    obs_dirs+=("$HOME/.config/obs-studio")
    # Windows (Git Bash / WSL)
    if [[ -n "${APPDATA:-}" ]]; then
        obs_dirs+=("$APPDATA/obs-studio")
    fi

    local obs_dir=""
    for d in "${obs_dirs[@]}"; do
        [[ -d "$d" ]] && obs_dir="$d" && break
    done

    if [[ -z "$obs_dir" ]]; then
        record_result "CHECK-04" "WARN" "未找到OBS配置目录" \
            "请确认OBS Studio已安装。预期路径（macOS）：~/Library/Application Support/obs-studio" "obs-config"
        return
    fi

    echo -e "    ${GREEN}找到OBS配置目录：$obs_dir${RESET}"

    local issues=()
    local basic_ini="$obs_dir/basic/profiles"

    # 遍历所有profile的basic.ini
    if [[ -d "$basic_ini" ]]; then
        while IFS= read -r -d '' ini_file; do
            local bitrate encoder vbr
            bitrate=$(grep -i "^VideoBitrate=" "$ini_file" 2>/dev/null | head -1 | cut -d= -f2 || echo "")
            encoder=$(grep -i "^StreamEncoder=" "$ini_file" 2>/dev/null | head -1 | cut -d= -f2 || echo "")
            vbr=$(grep -i "^RateControl=" "$ini_file" 2>/dev/null | head -1 | cut -d= -f2 || echo "")

            local profile_name
            profile_name=$(basename "$(dirname "$ini_file")")

            if [[ -n "$bitrate" ]] && [[ "$bitrate" -gt 2500 ]] 2>/dev/null; then
                issues+=("配置文件「${profile_name}」码率为 ${bitrate}kbps，超过淘宝直播上限(2500kbps)")
            fi
            if [[ -n "$vbr" ]] && [[ "$vbr" == "VBR" ]]; then
                issues+=("配置文件「${profile_name}」使用VBR模式，推流平台要求CBR")
            fi
        done < <(find "$basic_ini" -name "basic.ini" -print0 2>/dev/null)
    fi

    # 检查Multi RTMP插件是否存在
    local plugin_found=false
    local plugin_dirs=(
        "$obs_dir/../obs-plugins/64bit/obs-multi-rtmp.dll"
        "/Library/Application Support/obs-studio/plugins/obs-multi-rtmp.plugin"
        "$HOME/.config/obs-studio/plugins/obs-multi-rtmp"
    )
    for p in "${plugin_dirs[@]}"; do
        [[ -e "$p" ]] && plugin_found=true && break
    done
    if ! $plugin_found; then
        issues+=("未检测到obs-multi-rtmp插件，多平台推流需要此插件")
    fi

    if [[ ${#issues[@]} -eq 0 ]]; then
        record_result "CHECK-04" "PASS" "OBS配置检查通过" \
            "未发现常见配置问题（码率、编码模式、插件）。" "obs-config"
    else
        local detail
        detail=$(printf "• %s\n" "${issues[@]}")
        record_result "CHECK-04" "WARN" "OBS配置存在潜在问题" \
            "发现 ${#issues[@]} 项问题：${issues[*]}" "obs-config"
        for issue in "${issues[@]}"; do
            echo -e "    ${YELLOW}• ${issue}${RESET}"
        done
    fi
}

# CHECK-05: 系统资源检查
check_system_resources() {
    echo -e "${BOLD}[CHECK-05] 系统CPU/RAM资源检查${RESET}"

    local issues=()

    # 内存检查
    local mem_gb=0
    if [[ "$(uname)" == "Darwin" ]]; then
        local mem_bytes
        mem_bytes=$(sysctl -n hw.memsize 2>/dev/null || echo 0)
        mem_gb=$(awk "BEGIN {printf \"%d\", $mem_bytes / 1024^3}")
    elif [[ -f /proc/meminfo ]]; then
        local mem_kb
        mem_kb=$(grep MemTotal /proc/meminfo | awk '{print $2}')
        mem_gb=$(awk "BEGIN {printf \"%d\", $mem_kb / 1024^2}")
    fi

    if [[ "$mem_gb" -lt 8 ]]; then
        issues+=("内存 ${mem_gb}GB，低于推荐值8GB，多平台推流时可能卡顿")
    fi

    # CPU 核心数
    local cpu_cores=0
    if [[ "$(uname)" == "Darwin" ]]; then
        cpu_cores=$(sysctl -n hw.logicalcpu 2>/dev/null || echo 0)
    elif [[ -f /proc/cpuinfo ]]; then
        cpu_cores=$(grep -c "^processor" /proc/cpuinfo)
    fi

    # CPU负载（1分钟平均）
    local load_avg=""
    if cmd_exists uptime; then
        load_avg=$(uptime | awk -F'[,:]' '{print $(NF-2)}' | tr -d ' ')
    fi

    local summary="内存：${mem_gb}GB，CPU核心：${cpu_cores}"
    [[ -n "$load_avg" ]] && summary="${summary}，1分钟负载：${load_avg}"

    if [[ ${#issues[@]} -eq 0 ]]; then
        record_result "CHECK-05" "PASS" "系统资源满足要求" \
            "$summary" "system"
    else
        record_result "CHECK-05" "WARN" "系统资源可能不足" \
            "$summary。问题：${issues[*]}" "system"
    fi
}

# CHECK-06: 网络延迟检查
check_network_latency() {
    echo -e "${BOLD}[CHECK-06] 平台服务器网络延迟${RESET}"

    if ! cmd_exists ping; then
        record_result "CHECK-06" "WARN" "ping命令不可用" \
            "无法测量网络延迟。请手动检查到各平台服务器的网络质量。" "latency"
        return
    fi

    local high_latency=()
    local results_text=""

    for domain in "${PLATFORM_DOMAINS[@]}"; do
        local latency_ms=""
        if [[ "$(uname)" == "Darwin" ]]; then
            latency_ms=$(ping -c 3 -W 3000 "$domain" 2>/dev/null | grep 'avg' | awk -F'/' '{print $5}' || echo "")
        else
            latency_ms=$(ping -c 3 -W 3 "$domain" 2>/dev/null | grep 'rtt' | awk -F'/' '{print $5}' || echo "")
        fi

        if [[ -n "$latency_ms" ]]; then
            results_text="${results_text}${domain}: ${latency_ms}ms  "
            if awk "BEGIN {exit ($latency_ms > 100) ? 0 : 1}" 2>/dev/null; then
                high_latency+=("$domain(${latency_ms}ms)")
            fi
        else
            results_text="${results_text}${domain}: 超时  "
            high_latency+=("${domain}(超时)")
        fi
    done

    if [[ ${#high_latency[@]} -eq 0 ]]; then
        record_result "CHECK-06" "PASS" "平台服务器延迟正常" \
            "$results_text" "latency"
    else
        record_result "CHECK-06" "WARN" "部分平台延迟偏高（>100ms）" \
            "${results_text}高延迟将导致推流不稳定，建议切换至有线网络或更换DNS。高延迟：${high_latency[*]}" "latency"
    fi
}

# CHECK-07: 本地防火墙/端口封锁检测
check_firewall() {
    echo -e "${BOLD}[CHECK-07] 本地防火墙/出站端口检测${RESET}"

    local blocked=()

    # 检测常用端口：1935(RTMP), 443(HTTPS), 80(HTTP)
    local test_host="push.xiaohongshu.com"
    port_label() {
        case "$1" in 1935) echo "RTMP" ;; 443) echo "HTTPS" ;; 80) echo "HTTP" ;; *) echo "unknown" ;; esac
    }

    for port in 80 443 1935; do
        local open=false
        if cmd_exists nc; then
            nc -z -w 5 "$test_host" "$port" 2>/dev/null && open=true || true
        elif cmd_exists timeout; then
            timeout 5 bash -c "echo >/dev/tcp/${test_host}/${port}" 2>/dev/null && open=true || true
        fi
        if ! $open; then
            blocked+=("端口${port}($(port_label "$port"))")
        fi
    done

    # macOS 防火墙状态
    local fw_status=""
    if [[ "$(uname)" == "Darwin" ]]; then
        if cmd_exists /usr/libexec/ApplicationFirewall/socketfilterfw; then
            fw_status=$(/usr/libexec/ApplicationFirewall/socketfilterfw --getglobalstate 2>/dev/null | head -1 || echo "")
        fi
    fi

    local detail="测试主机：${test_host}"
    [[ -n "$fw_status" ]] && detail="${detail}；macOS防火墙：${fw_status}"

    if [[ ${#blocked[@]} -eq 0 ]]; then
        record_result "CHECK-07" "PASS" "出站端口未被封锁" \
            "$detail — 端口80/443/1935均可访问。" "firewall"
    else
        record_result "CHECK-07" "WARN" "部分端口可能被封锁" \
            "$detail — 被封锁：${blocked[*]}。请检查本地防火墙或路由器设置。" "firewall"
    fi
}

# CHECK-08: DNS解析检查
check_dns() {
    echo -e "${BOLD}[CHECK-08] 平台域名DNS解析${RESET}"

    local failed=()
    local results_text=""

    if ! cmd_exists host && ! cmd_exists nslookup && ! cmd_exists dig; then
        record_result "CHECK-08" "WARN" "DNS工具不可用" \
            "请安装 bind-utils 或 dnsutils 后重新运行 DNS 检查。" "dns"
        return
    fi

    for domain in "${PLATFORM_DOMAINS[@]}"; do
        local resolved=false
        if cmd_exists host; then
            host "$domain" &>/dev/null 2>&1 && resolved=true || true
        elif cmd_exists nslookup; then
            nslookup "$domain" &>/dev/null 2>&1 && resolved=true || true
        elif cmd_exists dig; then
            [[ -n "$(dig +short "$domain" 2>/dev/null)" ]] && resolved=true || true
        fi

        if $resolved; then
            results_text="${results_text}${domain}: ✔  "
        else
            results_text="${results_text}${domain}: ✘  "
            failed+=("$domain")
        fi
    done

    if [[ ${#failed[@]} -eq 0 ]]; then
        record_result "CHECK-08" "PASS" "所有平台域名DNS解析正常" \
            "$results_text" "dns"
    else
        record_result "CHECK-08" "FAIL" "部分域名DNS解析失败" \
            "${results_text}解析失败：${failed[*]}。请检查DNS配置，建议尝试 8.8.8.8 或 114.114.114.114。" "dns"
    fi
}

# ---------- 报告汇总 ----------
print_summary() {
    local total=$(( PASS + FAIL + WARN ))
    echo -e "${BOLD}${CYAN}============================================================${RESET}"
    echo -e "${BOLD}  诊断报告汇总${RESET}"
    echo -e "${BOLD}${CYAN}============================================================${RESET}"
    echo -e "  总检测项：${total}   ${GREEN}通过：${PASS}${RESET}   ${YELLOW}警告：${WARN}${RESET}   ${RED}失败：${FAIL}${RESET}"
    echo ""

    if [[ $FAIL -eq 0 && $WARN -eq 0 ]]; then
        echo -e "  ${GREEN}${BOLD}✔ 环境检查全部通过，可以开始直播！${RESET}"
    elif [[ $FAIL -eq 0 ]]; then
        echo -e "  ${YELLOW}${BOLD}⚠ 存在 ${WARN} 项警告，建议处理后再开播。${RESET}"
    else
        echo -e "  ${RED}${BOLD}✘ 存在 ${FAIL} 项故障，请参考上方FAQ链接修复后再开播。${RESET}"
    fi

    echo ""
    echo -e "  完整FAQ：${BLUE}${FAQ_BASE}${RESET}"
    echo -e "${BOLD}${CYAN}============================================================${RESET}\n"
}

print_json_report() {
    local ts
    ts=$(date -u +"%Y-%m-%dT%H:%M:%SZ" 2>/dev/null || date +"%Y-%m-%dT%H:%M:%SZ")
    local joined
    joined=$(IFS=','; echo "${RESULTS[*]}")
    cat <<EOF
{
  "tool": "mlive-diagnose",
  "version": "${SCRIPT_VERSION}",
  "timestamp": "${ts}",
  "summary": {
    "total": $(( PASS + FAIL + WARN )),
    "pass": ${PASS},
    "warn": ${WARN},
    "fail": ${FAIL}
  },
  "checks": [${joined}]
}
EOF
}

# ---------- 参数解析 ----------
for arg in "$@"; do
    case "$arg" in
        --json) OUTPUT_JSON=true ;;
        --output=*) REPORT_FILE="${arg#*=}" ;;
    esac
done

# ---------- 主流程 ----------
if ! $OUTPUT_JSON; then
    print_header
fi

check_rtmp_port
check_rtmp_url_format
check_bandwidth
check_obs_config
check_system_resources
check_network_latency
check_firewall
check_dns

if $OUTPUT_JSON; then
    if [[ -n "$REPORT_FILE" ]]; then
        print_json_report > "$REPORT_FILE"
        echo "JSON报告已写入：$REPORT_FILE"
    else
        print_json_report
    fi
else
    print_summary
    if [[ -n "$REPORT_FILE" ]]; then
        print_json_report > "$REPORT_FILE"
        echo -e "  ${BLUE}JSON报告已保存至：$REPORT_FILE${RESET}\n"
    fi
fi
