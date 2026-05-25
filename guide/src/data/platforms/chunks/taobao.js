export default {
    name: '淘宝直播',
    icon: '🛒',
    color: '#ff5000',
    rtmpSupport: true,
    supportTypes: ['push', 'mobile'],
    requirements: {
        deposit: true,
        fans: 1000,
        mobile: 10000,
        push: 1000
    },
    liveMethods: {
        mobile: {
            name: '手机直播',
            fansRequired: 10000,
            description: '需要1万淘宝粉丝或5万外站粉丝（7天内发文）'
        },
        push: {
            name: 'OBS推流直播',
            fansRequired: 1000,
            description: '需要1000+粉丝或发布5条优质内容（质量分≥20）'
        }
    },
    guide: `
        <div class="platform-guide">
            <div class="platform-guide-header">
                <div class="platform-guide-icon">🛒</div>
                <div class="platform-guide-title">
                    <h3>淘宝直播推流地址获取（2026最新）</h3>
                    <p>通过淘宝主播工作台或辅助工具获取，注意关键操作步骤</p>
                </div>
            </div>
            <div class="guide-steps">
                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>准备工作</h4>
                        <p>确保您已完成以下条件：</p>
                        <ul>
                            <li>✅ 支付宝高级实名认证</li>
                            <li>✅ 年满18周岁</li>
                            <li>✅ <strong>账号粉丝达到1000人以上</strong>（达人账号）或优质内容分≥20</li>
                            <li>✅ 已缴纳保证金（个人5000元，企业可免缴）</li>
                            <li>✅ 账号通过淘宝直播审核</li>
                        </ul>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>重要：</strong>1000粉丝是达人账号使用OBS推流的硬性门槛，不足1000粉丝无法使用推流功能！
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>进入淘宝直播中控台</h4>
                        <p><strong>方法一：通过千牛工作台（推荐）</strong></p>
                        <ol>
                            <li>访问千牛官网：<a href="https://work.taobao.com/" target="_blank">https://work.taobao.com/</a></li>
                            <li>使用淘宝卖家账号登录</li>
                            <li>点击顶部【营销】→【店铺营销工具】</li>
                            <li>找到【淘宝直播】入口点击进入</li>
                        </ol>
                        <p><strong>方法二：通过淘宝直播官网</strong></p>
                        <ol>
                            <li>访问：<a href="https://live.taobao.com" target="_blank">https://live.taobao.com</a></li>
                            <li>使用淘宝/支付宝账号登录</li>
                            <li>点击右上角【进入中控台】</li>
                        </ol>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>创建直播场次</h4>
                        <ol>
                            <li>在中控台中点击【创建直播】或【添加直播】</li>
                            <li>填写直播必填信息：
                                <ul>
                                    <li>直播标题（建议包含商品关键词）</li>
                                    <li>直播封面图（750×750像素）</li>
                                    <li>直播时间（建议2-3小时，最长不超过5小时）</li>
                                    <li>选择频道栏目</li>
                                    <li>添加宝贝口袋商品</li>
                                </ul>
                            </li>
                            <li>点击【创建直播】确认</li>
                        </ol>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>注意：</strong>直播间创建后不支持修改，请仔细核对信息！
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">4</div>
                    <div class="guide-step-content">
                        <h4>获取推流地址（关键步骤）❗</h4>
                        <p><strong>重要：必须按照以下步骤操作，否则推流码无法使用！</strong></p>
                        <ol>
                            <li>在淘宝直播中控台点击【开始直播】或【立即直播】</li>
                            <li><strong>等待约10秒</strong>，让系统生成推流码</li>
                            <li><strong>关键步骤：点击【暂停直播】</strong></li>
                            <li>此时直播显示"暂停中"状态</li>
                            <li>现在可以看到并复制<span class="tooltip" tabindex="0">推流地址<span class="tooltip-icon">?</span><span class="tooltip-content">推流服务器地址（RTMP URL），将其填入OBS推流设置的"服务器"栏。</span></span>和<span class="tooltip" tabindex="0">串流密钥<span class="tooltip-icon">?</span><span class="tooltip-content">推流密钥（Stream Key），与推流地址一起标识您的直播间，有效期30分钟，请勿外泄。</span></span></li>
                        </ol>
                        <div class="tip-box" style="background: #fef3c7; border-left-color: #f59e0b;">
                            <span class="tip-icon">💡</span>
                            <strong>为什么要暂停？</strong>
                            <p>淘宝直播要求使用OBS等第三方工具推流时，必须先在淘宝中控台点击"暂停直播"。这样推流码才能被OBS识别和使用。如果直接使用"正在直播"状态的推流码，OBS可能无法连接。</p>
                        </div>
                        <div class="code-box">
                            <span class="tooltip" tabindex="0">RTMP服务器<span class="tooltip-icon">?</span><span class="tooltip-content">推流目标地址，填入OBS【设置】→【推流】→【服务器】栏。</span></span>：rtmp://xxx.alivecdn.com/live/<br>
                            串流密钥：xxxx-xxxx-xxxx（30分钟有效）
                        </div>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>推流码有效期：</strong>30分钟，请在有效时间内配置OBS并开始推流！
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">5</div>
                    <div class="guide-step-content">
                        <h4>OBS推流参数设置（重要限制）</h4>
                        <p><strong>淘宝直播对推流参数有严格要求，请按以下设置：</strong></p>
                        <ul>
                            <li><strong>分辨率：</strong>最高不超过1080P
                                <ul>
                                    <li>横屏直播：1920×1080</li>
                                    <li>竖屏直播：1080×1920</li>
                                </ul>
                            </li>
                            <li><strong>视频码率：</strong>最高不超过<strong>2500kbps</strong> ❗
                                <ul>
                                    <li>推荐设置：2000-2500kbps</li>
                                    <li>超过2500kbps可能导致推流失败或被平台限流</li>
                                </ul>
                            </li>
                            <li><strong>帧率（FPS）：</strong>25或30，最高不超过30fps</li>
                            <li><strong>关键帧间隔：</strong>2秒</li>
                            <li><strong>音频采样率：</strong>44.1kHz</li>
                            <li><strong>音频比特率：</strong>128kbps</li>
                        </ul>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>重要提醒：</strong>
                            <ul>
                                <li>码率不要超过2500kbps！之前的5000kbps设置已经不适用</li>
                                <li>建议使用<span class="tooltip" tabindex="0">CBR<span class="tooltip-icon">?</span><span class="tooltip-content">恒定码率（Constant Bit Rate），推流时保持稳定码率，适合直播防止画质抖动。</span></span>（恒定码率）模式</li>
                                <li>使用H.264编码器</li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div class="guide-step">
                    <div class="guide-step-number">6</div>
                    <div class="guide-step-content">
                        <h4>开始和结束直播</h4>
                        <p><strong>正确的开播顺序：</strong></p>
                        <ol>
                            <li>确保淘宝中控台处于"暂停直播"状态</li>
                            <li>在OBS中点击【开始推流】</li>
                            <li>检查OBS右下角状态：绿色指示灯且显示上传速度（如2000+ kbps）</li>
                            <li>在淘宝中控台点击【正式开播】</li>
                        </ol>
                        <p><strong>正确的结束顺序：</strong></p>
                        <ol>
                            <li>先在淘宝中控台点击【结束直播】</li>
                            <li>然后在OBS中点击【停止推流】</li>
                        </ol>
                        <div class="tip-box">
                            <span class="tip-icon">💡</span>
                            <strong>提示：</strong>结束直播时请按顺序操作，避免直接停止OBS推流导致直播间异常关闭。
                        </div>
                    </div>
                </div>
            </div>
        </div>
    `
};
