export default {
    name: '小红书直播',
    icon: '📕',
    color: '#ff2442',
    rtmpSupport: true,
    supportTypes: ['push', 'mobile'],
    requirements: {
        deposit: false,
        fans: 1000,
        mobile: 0,
        push: 1000
    },
    liveMethods: {
        mobile: {
            name: '手机直播',
            fansRequired: 0,
            description: '需要注册满6个月+实名认证，建议以App内显示为准'
        },
        push: {
            name: 'OBS推流直播',
            fansRequired: 1000,
            description: '需要1000粉丝（部分账号500粉丝），需近半年原创笔记≥10篇'
        }
    },
    guide: `
        <div class="platform-guide">
            <div class="platform-guide-header">
                <div class="platform-guide-icon">📕</div>
                <div class="platform-guide-title">
                    <h3>小红书直播推流地址获取（2026最新）</h3>
                    <p>需要先申请OBS直播权限，通过专用网页获取推流码</p>
                </div>
            </div>
            <div class="guide-steps">
                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>申请OBS直播权限</h4>
                        <p><strong>权限申请条件（2026最新要求）：</strong></p>
                        <ul>
                            <li>✅ 身份证实名认证 + 人脸识别</li>
                            <li>✅ <strong>注册时间满6个月</strong> ❗</li>
                            <li>✅ <strong>个人账号：粉丝数达到1000人及以上</strong></li>
                            <li>✅ 企业账号：需完成企业认证</li>
                            <li>✅ <strong>近3个月内发布原创合规笔记不少于10篇</strong> ❗</li>
                            <li>✅ <strong>单篇阅读量建议不低于2000</strong></li>
                            <li>✅ 年满18周岁</li>
                            <li>✅ 手机号与邮箱地址有效绑定</li>
                        </ul>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>注意：</strong>账号注册时间必须满6个月，且近3个月要有活跃的原创内容发布记录！
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>电脑端操作</h4>
                        <ol>
                            <li>在电脑浏览器中访问小红书OBS专用页面：</li>
                        </ol>
                        <div class="code-box">
                            <a href="https://www.xiaohongshu.com/zhibo/obs" target="_blank" style="color: #10b981;">https://www.xiaohongshu.com/zhibo/obs</a><br>
                            <span style="font-size: 0.85rem; color: #6b7280;">（备选：http://www.xiaohongshu.com/zhibo/obs）</span>
                        </div>
                        <ol start="2">
                            <li>页面会显示一个<strong>6位数字验证码</strong></li>
                            <li>保持此页面打开，不要关闭</li>
                        </ol>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>手机端操作（2026最新路径）❗</h4>
                        <p><strong>准确的操作路径：</strong></p>
                        <ol>
                            <li>打开【小红书APP】</li>
                            <li>点击右下角 <strong>【我】</strong></li>
                            <li>点击左上角的 <strong>【菜单】</strong>（三道杠图标）</li>
                            <li>选择 <strong>【创作中心】</strong></li>
                            <li>点击 <strong>【+】</strong> 号</li>
                            <li>选择 <strong>【直播】</strong></li>
                            <li>选择 <strong>【电脑】</strong></li>
                            <li>输入电脑上显示的6位验证码</li>
                            <li>点击 <strong><span class="tooltip" tabindex="0">【串流密钥】<span class="tooltip-icon">?</span><span class="tooltip-content">推流密钥（Stream Key），与RTMP服务器地址配合，在OBS推流设置中填写"串流密钥"栏。</span></span></strong> 或 <strong>【获取推流码】</strong></li>
                        </ol>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>重要变化：</strong>
                            <p>2025-2026年小红书APP界面更新，操作路径改为"我 → 菜单 → 创作中心"。</p>
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">4</div>
                    <div class="guide-step-content">
                        <h4>记录推流信息</h4>
                        <p>系统将显示以下信息，请复制保存：</p>
                        <div class="code-box">
                            <span class="tooltip" tabindex="0">RTMP服务器<span class="tooltip-icon">?</span><span class="tooltip-content">推流目标地址，填入OBS【设置】→【推流】→【服务器】栏，单次直播有效。</span></span>：rtmp://push.xiaohongshu.com/live/<br>
                            串流密钥：[显示的密钥]
                        </div>
                        <div class="tip-box">
                            <span class="tip-icon">💡</span>
                            <strong>重要提示：</strong>
                            <ul>
                                <li>推流地址<strong>单次直播有效</strong></li>
                                <li>推流后<strong>必须在手机APP上点击"开始直播"</strong></li>
                                <li>电脑开播后，手机APP无法查看画面</li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};
