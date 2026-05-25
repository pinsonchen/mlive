export default {
    name: '抖音直播',
    icon: '🎵',
    color: '#000000',
    rtmpSupport: false,
    supportTypes: ['mobile', 'pc_assistant'],
    requirements: {
        deposit: true,
        fans: 200,
        mobile: 200,
        pc_assistant: 0
    },
    liveMethods: {
        mobile: {
            name: '手机直播',
            fansRequired: 200,
            description: '需要200有效粉丝（2025年12月新规，非互关）'
        },
        pc_assistant: {
            name: '抖音直播伴侣+虚拟摄像头',
            fansRequired: 0,
            description: '推荐方案：OBS虚拟摄像头→抖音直播伴侣'
        }
    },
    guide: `
        <div class="platform-guide">
            <div class="platform-guide-header">
                <div class="platform-guide-icon">🎵</div>
                <div class="platform-guide-title">
                    <h3>抖音直播方案说明（2026最新）</h3>
                    <p>推荐使用虚拟摄像头方案，安全可靠</p>
                </div>
            </div>
            <div class="guide-steps">
                <div class="guide-step">
                    <div class="guide-step-number">⚠️</div>
                    <div class="guide-step-content">
                        <h4>重要说明：OBS推流已取消</h4>
                        <p><strong>抖音于2023年起取消了OBS直接推流功能！</strong></p>
                        <ul>
                            <li>❌ <strong>已取消</strong>：不再支持OBS直接RTMP推流</li>
                            <li>⚠️ <strong>违规使用</strong>：强制使用OBS推流将面临账号封禁</li>
                            <li>✅ <strong>官方方案</strong>：使用抖音直播伴侣 + 虚拟摄像头</li>
                        </ul>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>重要提醒：</strong>
                            <p>抖音官方严格执行"一律封号处理，绝不姑息"的政策。请勿尝试使用第三方OBS推流工具！</p>
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>推荐方案：<span class="tooltip" tabindex="0">虚拟摄像头<span class="tooltip-icon">?</span><span class="tooltip-content">OBS内置功能，将直播画面虚拟成系统摄像头，抖音直播伴侣可将其作为画面来源使用。</span></span> + 抖音<span class="tooltip" tabindex="0">直播伴侣<span class="tooltip-icon">?</span><span class="tooltip-content">抖音官方提供的PC直播软件，与OBS虚拟摄像头配合是抖音唯一安全的OBS直播方式。</span></span></h4>
                        <p><strong>这是唯一安全可靠的官方方案！</strong></p>
                        <ol>
                            <li>在OBS中制作好您的直播画面</li>
                            <li>点击菜单【工具】→【虚拟摄像头】→【启动】</li>
                            <li>下载并安装【抖音直播伴侣】官方软件</li>
                            <li>在直播伴侣的摄像头设置中选择【OBS Virtual Camera】</li>
                            <li>点击【开始直播】</li>
                        </ol>
                        <div class="success-box">
                            <span class="success-icon">✅</span>
                            <strong>优势：</strong>
                            <ul>
                                <li>完全使用官方软件，安全可靠</li>
                                <li>无需特殊权限和粉丝门槛</li>
                                <li>画质清晰，功能完整</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>手机直播条件（2025年12月新规）</h4>
                        <p><strong>直播带货权限要求：</strong></p>
                        <ul>
                            <li>✅ <strong>有效粉丝数≥200</strong>（2025年12月30日起实施）</li>
                            <li>✅ 实名认证（含人脸识别）</li>
                            <li>✅ 原创视频≥10条</li>
                            <li>✅ 缴纳500元保证金</li>
                        </ul>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>注意：</strong>
                            <p>"有效粉丝"不是简单的粉丝总数，需要真实互动（点赞、评论、转发）。互相关注等"刷粉"行为不计入有效粉丝！</p>
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>粉丝不足200怎么办？</h4>
                        <p><strong>方案一：快速积累有效粉丝</strong></p>
                        <ul>
                            <li>发布优质短视频内容</li>
                            <li>参与热门话题和挑战</li>
                            <li>保持账号活跃度</li>
                            <li>通常1-3个月可达到1000粉丝</li>
                        </ul>
                        <p><strong>方案二：申请企业认证</strong></p>
                        <ul>
                            <li>准备营业执照</li>
                            <li>缴纳600元/年认证费</li>
                            <li>获得蓝V标识和更多权限</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    `
};
