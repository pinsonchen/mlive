#!/usr/bin/env bash
set -euo pipefail

VERSION="1.0.0"
JSON_MODE=false
OS_TYPE="$(uname -s)"

# Colors (disabled in JSON mode)
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

RESULTS=()

usage() {
    cat <<EOF
mlive diagnose v${VERSION} - 一键推流故障诊断工具

用法: $0 [选项] [RTMP_URL]

选项:
  --json        输出结构化 JSON 结果
  --help, -h    显示帮助信息

示例:
  $0 rtmp://live.example.com/stream/key123
  $0 --json rtmp://live.example.com/stream/key123

检测项目:
  1. RTMP 端口 (1935) 连通性
  2. 推流 URL 格式校验
  3. 上行带宽估算
  4. OBS 配置文件码率/编码检查
  5. CPU/内存资源检测
  6. 平台服务器延迟 (ping)
  7. 防火墙出站端口检测
  8. DNS 解析验证

运行后根据提示修复问题，通常 ≤3 步即可定位故障。
EOF
}

print_result() {
    local id="$1" status="$2" message="$3" fix_url="${4:-}"
    if [ "$JSON_MODE" = true ]; then
        return
    fi
    local color="$GREEN"
    local icon="✓"
    if [ "$status" = "FAIL" ]; then
        color="$RED"
        icon="✗"
    elif [ "$status" = "WARN" ]; then
        color="$YELLOW"
        icon="!"
    fi
    printf '%b[%s] 检测%s: %s%b\n' "$color" "$icon" "$id" "$message" "$NC"
    if [ -n "$fix_url" ] && [ "$status" != "PASS" ]; then
        printf '   修复建议: %s\n' "$fix_url"
    fi
}

add_result() {
    local id="$1" status="$2" message="$3" fix_url="${4:-}"
    RESULTS+=("{\"id\":\"${id}\",\"status\":\"${status}\",\"message\":\"${message}\",\"fix_url\":\"${fix_url}\"}")
    print_result "$id" "$status" "$message" "$fix_url"
}

# Check 1: RTMP port connectivity
check_rtmp_port() {
    local host="$1"
    if [ -z "$host" ]; then
        add_result "rtmp_port" "FAIL" "未提供推流地址，无法检测RTMP端口" "https://github.com/chongshan/mlive#rtmp-setup"
        return
    fi
    if command -v nc >/dev/null 2>&1; then
        if nc -z -w 5 "$host" 1935 2>/dev/null; then
            add_result "rtmp_port" "PASS" "RTMP端口1935连接正常 (${host})"
        else
            add_result "rtmp_port" "FAIL" "无法连接 ${host}:1935，RTMP端口不通" "https://github.com/chongshan/mlive#rtmp-port-blocked"
        fi
    else
        if (echo >/dev/tcp/"$host"/1935) 2>/dev/null; then
            add_result "rtmp_port" "PASS" "RTMP端口1935连接正常 (${host})"
        else
            add_result "rtmp_port" "FAIL" "无法连接 ${host}:1935，RTMP端口不通" "https://github.com/chongshan/mlive#rtmp-port-blocked"
        fi
    fi
}

# Check 2: Stream URL format validation
check_url_format() {
    local url="$1"
    if [ -z "$url" ]; then
        add_result "url_format" "FAIL" "未提供推流URL" "https://github.com/chongshan/mlive#stream-url-format"
        return
    fi
    if echo "$url" | grep -qE '^rtmp(s)?://[a-zA-Z0-9._-]+(/[a-zA-Z0-9._/-]+)+$'; then
        add_result "url_format" "PASS" "推流URL格式正确"
    else
        add_result "url_format" "FAIL" "推流URL格式异常，请检查是否包含完整的rtmp://host/app/key" "https://github.com/chongshan/mlive#stream-url-format"
    fi
}

# Check 3: Upload bandwidth estimation
check_bandwidth() {
    if ! command -v curl >/dev/null 2>&1; then
        add_result "bandwidth" "WARN" "curl未安装，无法估算带宽" "https://github.com/chongshan/mlive#install-curl"
        return
    fi
    local speed
    speed=$(curl -s -o /dev/null -w '%{speed_upload}' --max-time 10 \
        -X POST -d "$(dd if=/dev/zero bs=1024 count=512 2>/dev/null)" \
        "https://speed.cloudflare.com/__up" 2>/dev/null || echo "0")
    if [ "$speed" = "0" ] || [ -z "$speed" ]; then
        add_result "bandwidth" "WARN" "无法完成带宽测试，请检查网络连接" "https://github.com/chongshan/mlive#bandwidth-test"
        return
    fi
    local speed_kbps
    speed_kbps=$(echo "$speed" | awk '{printf "%.0f", $1/1024}')
    if [ "$speed_kbps" -ge 500 ]; then
        add_result "bandwidth" "PASS" "上行带宽约 ${speed_kbps} KB/s，满足推流需求"
    elif [ "$speed_kbps" -ge 200 ]; then
        add_result "bandwidth" "WARN" "上行带宽约 ${speed_kbps} KB/s，建议降低码率" "https://github.com/chongshan/mlive#low-bandwidth"
    else
        add_result "bandwidth" "FAIL" "上行带宽仅 ${speed_kbps} KB/s，不满足推流最低要求" "https://github.com/chongshan/mlive#low-bandwidth"
    fi
}

# Check 4: OBS config file check
check_obs_config() {
    local obs_profile=""
    if [ "$OS_TYPE" = "Darwin" ]; then
        obs_profile="$HOME/Library/Application Support/obs-studio/basic/profiles"
    else
        obs_profile="$HOME/.config/obs-studio/basic/profiles"
    fi

    if [ ! -d "$obs_profile" ]; then
        add_result "obs_config" "WARN" "未找到OBS配置目录，跳过检测" "https://github.com/chongshan/mlive#obs-install"
        return
    fi

    local found=false
    local issues=""
    while IFS= read -r -d '' ini_file; do
        found=true
        local bitrate encoder
        bitrate=$(grep -i "^VBitrate" "$ini_file" 2>/dev/null | head -1 | cut -d= -f2 | tr -d ' ')
        encoder=$(grep -i "^Encoder" "$ini_file" 2>/dev/null | head -1 | cut -d= -f2 | tr -d ' ')

        if [ -n "$bitrate" ] && [ "$bitrate" -gt 6000 ] 2>/dev/null; then
            issues="${issues}码率过高(${bitrate}kbps); "
        fi
        if [ -n "$encoder" ] && echo "$encoder" | grep -qi "software\|x264"; then
            local cpu_cores
            cpu_cores=$(nproc 2>/dev/null || sysctl -n hw.ncpu 2>/dev/null || echo "4")
            if [ "$cpu_cores" -lt 6 ]; then
                issues="${issues}软件编码(${encoder})可能导致卡顿; "
            fi
        fi
    done < <(find "$obs_profile" -name "*.ini" -print0 2>/dev/null)

    if [ "$found" = false ]; then
        add_result "obs_config" "WARN" "OBS配置目录存在但无配置文件" "https://github.com/chongshan/mlive#obs-setup"
    elif [ -n "$issues" ]; then
        add_result "obs_config" "WARN" "OBS配置问题: ${issues}" "https://github.com/chongshan/mlive#obs-settings"
    else
        add_result "obs_config" "PASS" "OBS配置检查通过"
    fi
}

# Check 5: CPU/Memory resources
check_resources() {
    local cpu_usage mem_percent
    if [ "$OS_TYPE" = "Darwin" ]; then
        cpu_usage=$(ps -A -o %cpu | awk '{s+=$1} END {printf "%.0f", s}')
        local mem_used mem_total
        mem_used=$(vm_stat | awk '/Pages active/ {gsub(/\./,"",$3); print $3}')
        mem_total=$(sysctl -n hw.memsize 2>/dev/null)
        if [ -n "$mem_used" ] && [ -n "$mem_total" ]; then
            mem_percent=$(echo "$mem_used $mem_total" | awk '{printf "%.0f", ($1*4096/$2)*100}')
        else
            mem_percent=0
        fi
    else
        cpu_usage=$(grep 'cpu ' /proc/stat 2>/dev/null | awk '{usage=($2+$4)*100/($2+$4+$5)} END {printf "%.0f", usage}')
        if [ -z "$cpu_usage" ]; then cpu_usage=0; fi
        mem_percent=$(free 2>/dev/null | awk '/Mem:/ {printf "%.0f", $3/$2*100}')
        if [ -z "$mem_percent" ]; then mem_percent=0; fi
    fi

    local status="PASS"
    local msg="CPU使用率约${cpu_usage}%，内存使用率约${mem_percent}%"

    if [ "$cpu_usage" -gt 90 ] 2>/dev/null || [ "$mem_percent" -gt 90 ] 2>/dev/null; then
        status="FAIL"
        msg="${msg}，系统资源严重不足"
    elif [ "$cpu_usage" -gt 70 ] 2>/dev/null || [ "$mem_percent" -gt 80 ] 2>/dev/null; then
        status="WARN"
        msg="${msg}，系统资源偏高"
    fi
    add_result "resources" "$status" "$msg" "https://github.com/chongshan/mlive#resource-optimization"
}

# Check 6: Platform server latency
check_latency() {
    local host="$1"
    if [ -z "$host" ]; then
        add_result "latency" "FAIL" "未提供推流地址，无法检测延迟" "https://github.com/chongshan/mlive#latency"
        return
    fi
    local ping_result
    if [ "$OS_TYPE" = "Darwin" ]; then
        ping_result=$(ping -c 3 -W 5000 "$host" 2>/dev/null | tail -1 | awk -F'/' '{print $5}')
    else
        ping_result=$(ping -c 3 -W 5 "$host" 2>/dev/null | tail -1 | awk -F'/' '{print $5}')
    fi

    if [ -z "$ping_result" ]; then
        add_result "latency" "FAIL" "无法ping通 ${host}" "https://github.com/chongshan/mlive#server-unreachable"
        return
    fi

    local latency_int
    latency_int=$(echo "$ping_result" | awk '{printf "%.0f", $1}')
    if [ "$latency_int" -le 50 ]; then
        add_result "latency" "PASS" "服务器延迟 ${ping_result}ms，状态良好"
    elif [ "$latency_int" -le 150 ]; then
        add_result "latency" "WARN" "服务器延迟 ${ping_result}ms，偏高" "https://github.com/chongshan/mlive#high-latency"
    else
        add_result "latency" "FAIL" "服务器延迟 ${ping_result}ms，严重过高" "https://github.com/chongshan/mlive#high-latency"
    fi
}

# Check 7: Firewall outbound port check
check_firewall() {
    local ports=(1935 443 80)
    local test_host="live-push.bilivideo.com"
    local blocked=()

    for port in "${ports[@]}"; do
        if command -v nc >/dev/null 2>&1; then
            if ! nc -z -w 3 "$test_host" "$port" 2>/dev/null; then
                blocked+=("$port")
            fi
        else
            if ! (echo >/dev/tcp/"$test_host"/"$port") 2>/dev/null; then
                blocked+=("$port")
            fi
        fi
    done

    if [ ${#blocked[@]} -eq 0 ]; then
        add_result "firewall" "PASS" "出站端口(1935/443/80)均可连通"
    else
        add_result "firewall" "FAIL" "以下端口被阻断: ${blocked[*]}" "https://github.com/chongshan/mlive#firewall-ports"
    fi
}

# Check 8: DNS resolution
check_dns() {
    local host="$1"
    if [ -z "$host" ]; then
        add_result "dns" "FAIL" "未提供推流地址，无法检测DNS" "https://github.com/chongshan/mlive#dns-resolution"
        return
    fi

    local resolved=""
    if command -v dig >/dev/null 2>&1; then
        resolved=$(dig +short "$host" 2>/dev/null | head -1)
    elif command -v nslookup >/dev/null 2>&1; then
        resolved=$(nslookup "$host" 2>/dev/null | awk '/^Address: / {print $2}' | head -1)
    elif command -v host >/dev/null 2>&1; then
        resolved=$(host "$host" 2>/dev/null | awk '/has address/ {print $4}' | head -1)
    fi

    if [ -n "$resolved" ]; then
        add_result "dns" "PASS" "${host} 解析正常 -> ${resolved}"
    else
        add_result "dns" "FAIL" "无法解析 ${host}，DNS可能异常" "https://github.com/chongshan/mlive#dns-resolution"
    fi
}

extract_host() {
    echo "$1" | sed -E 's|^rtmps?://([^/:]+).*|\1|'
}

output_json() {
    printf '{"version":"%s","timestamp":"%s","results":[' "$VERSION" "$(date -u +%Y-%m-%dT%H:%M:%SZ)"
    local first=true
    for r in "${RESULTS[@]}"; do
        if [ "$first" = true ]; then
            first=false
        else
            printf ","
        fi
        printf '%s' "$r"
    done
    printf ']}\n'
}

# --- Main ---
STREAM_URL=""

while [ $# -gt 0 ]; do
    case "$1" in
        --json)
            JSON_MODE=true
            shift
            ;;
        --help|-h)
            usage
            exit 0
            ;;
        -*)
            echo "未知选项: $1" >&2
            usage
            exit 1
            ;;
        *)
            STREAM_URL="$1"
            shift
            ;;
    esac
done

STREAM_HOST=""
if [ -n "$STREAM_URL" ]; then
    STREAM_HOST=$(extract_host "$STREAM_URL")
fi

if [ "$JSON_MODE" = false ]; then
    echo "======================================"
    echo " mlive 推流故障诊断工具 v${VERSION}"
    echo "======================================"
    echo ""
fi

check_rtmp_port "$STREAM_HOST"
check_url_format "$STREAM_URL"
check_bandwidth
check_obs_config
check_resources
check_latency "$STREAM_HOST"
check_firewall
check_dns "$STREAM_HOST"

if [ "$JSON_MODE" = true ]; then
    output_json
else
    echo ""
    echo "======================================"
    local_fails=0
    for r in "${RESULTS[@]}"; do
        if echo "$r" | grep -q '"status":"FAIL"'; then
            local_fails=$((local_fails + 1))
        fi
    done
    if [ "$local_fails" -eq 0 ]; then
        printf '%b所有检测通过！推流环境正常。%b\n' "$GREEN" "$NC"
    else
        printf '%b发现 %d 项问题，请根据上方修复建议逐一排查。%b\n' "$RED" "$local_fails" "$NC"
    fi
    echo "======================================"
fi
