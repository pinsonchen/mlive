export const platforms = {
    taobao: {
        name: '淘宝直播',
        icon: '🛒',
        color: '#ff5000',
        rtmpSupport: true,
        supportTypes: ['push', 'mobile'],  // 支持OBS推流和手机直播
        requirements: {
            deposit: true,
            fans: 1000,  // 2026年2月更新：需要1000+粉丝才能使用OBS推流（达人）
            mobile: 10000,   // 手机直播：需要1万淘宝粉丝或5万外站粉丝
            push: 1000  // OBS推流：1000+粉丝或优质内容分≥20
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
    },
    douyin: {
        name: '抖音直播',
        icon: '🎵',
        color: '#000000',
        rtmpSupport: false,  // 2023年起已取消OBS推流功能
        supportTypes: ['mobile', 'pc_assistant'],  // 仅支持手机和直播伴侣
        requirements: {
            deposit: true,  // 需要缴纳500元保证金
            fans: 200,  // 2025年12月新规：200有效粉丝
            mobile: 200,   // 手机直播：200有效粉丝
            pc_assistant: 0  // 直播伴侣：无粉丝门槛（配合虚拟摄像头使用）
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
    },
    xiaohongshu: {
        name: '小红书直播',
        icon: '📕',
        color: '#ff2442',
        rtmpSupport: true,
        supportTypes: ['push', 'mobile'],  // 支持推流和手机直播
        requirements: {
            deposit: false,
            fans: 1000,  // OBS推流：1000粉丝（部分资料500粉丝，以App内显示为准）
            mobile: 0,   // 手机直播：无硬性粉丝门槛，但需满足其他条件
            push: 1000  // OBS推流：需要1000粉丝以上（部分情况500粉丝）
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
    },
    shipinhao: {
        name: '视频号直播',
        icon: '💬',
        color: '#07c160',
        rtmpSupport: true,
        supportTypes: ['push', 'pc_wechat', 'mobile'],  // 支持三种直播方式
        requirements: {
            deposit: false,
            fans: 1000,  // OBS推流：需要1000粉丝
            mobile: 0,   // 手机直播：无粉丝要求
            push: 1000,  // OBS推流：需要1000粉丝
            pc_wechat: 200  // Windows微信直播：200粉丝或注册满7天（二选一）
        },
        liveMethods: {
            mobile: {
                name: '手机直播',
                fansRequired: 0,
                description: '通过微信视频号APP直接直播，只需实名认证，无粉丝要求'
            },
            push: {
                name: 'OBS推流直播',
                fansRequired: 1000,
                description: '需要1000粉丝且完成认证，每次开播需人脸识别验证'
            },
            pc_wechat: {
                name: 'Windows微信电脑直播',
                fansRequired: 100,
                description: '需要100粉丝或完成新手任务，使用微信电脑版直接直播'
            }
        },
        guide: `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">💬</div>
                    <div class="platform-guide-title">
                        <h3>视频号直播OBS推流地址获取（2026最新）</h3>
                        <p>从视频号助手获取动态推流地址，每次开播都需要重新获取</p>
                    </div>
                </div>
                <div class="guide-steps">
                    <div class="guide-step">
                        <div class="guide-step-number">1</div>
                        <div class="guide-step-content">
                            <h4>准备工作</h4>
                            <p><strong>确保满足以下条件：</strong></p>
                            <ul>
                                <li>✅ 年满18周岁</li>
                                <li>✅ 完成微信实名认证（个人需绑定银行卡）</li>
                                <li>✅ 视频号粉丝数达到<strong>1000人以上</strong></li>
                                <li>✅ 视频号已完成实名认证或企业认证</li>
                            </ul>
                            <div class="warning-box">
                                <span class="warning-icon">⚠️</span>
                                <strong>重要：</strong>首次使用OBS推流时，需要先用手机摄像头开播几分钟进行人脸识别验证，验证成功后才能正常使用OBS推流功能！
                            </div>
                        </div>
                    </div>

                    <div class="guide-step">
                        <div class="guide-step-number">2</div>
                        <div class="guide-step-content">
                            <h4>访问视频号助手网页版</h4>
                            <p><strong>方法一：从微信进入（推荐）</strong></p>
                            <ol>
                                <li>打开【微信APP】</li>
                                <li>进入【发现】→ 【视频号】</li>
                                <li>点击右上角【...】→ 【发起直播】</li>
                                <li>选择【从电脑开播】</li>
                                <li>系统会提示用电脑浏览器访问视频号助手</li>
                            </ol>
                            <p><strong>方法二：直接访问网页</strong></p>
                            <ol>
                                <li>在电脑浏览器中打开视频号助手：
                                    <div class="code-box" style="margin-top: 10px;">
                                        <a href="https://channels.weixin.qq.com/" target="_blank" style="color: #10b981;">https://channels.weixin.qq.com/</a>
                                    </div>
                                </li>
                                <li>使用微信扫码登录</li>
                            </ol>
                            <div class="tip-box">
                                <span class="tip-icon">💡</span>
                                <strong>提示：</strong>建议使用Chrome、Edge等现代浏览器，避免使用IE浏览器。
                            </div>
                        </div>
                    </div>

                    <div class="guide-step">
                        <div class="guide-step-number">3</div>
                        <div class="guide-step-content">
                            <h4>创建直播间</h4>
                            <ol>
                                <li>登录后进入视频号助手主页</li>
                                <li>点击左侧菜单【直播】或【管理直播】</li>
                                <li>点击【创建直播】或【发起直播】按钮</li>
                                <li>填写直播间信息：
                                    <ul>
                                        <li><strong>直播主题</strong>：输入直播标题（必填）</li>
                                        <li><strong>直播封面</strong>：上传封面图片（建议尺寸：1080×1260像素）</li>
                                        <li><strong>直播分类</strong>：选择直播类型（如：生活、游戏、教学等）</li>
                                        <li><strong>开播时间</strong>：选择立即开播或预约时间</li>
                                    </ul>
                                </li>
                                <li>点击【创建】或【下一步】</li>
                            </ol>
                            <div class="warning-box">
                                <span class="warning-icon">⚠️</span>
                                <strong>注意：</strong>直播间创建后，推流地址会立即生成，但<strong>仅在此场直播有效</strong>，下次开播需要重新获取！
                            </div>
                        </div>
                    </div>

                    <div class="guide-step">
                        <div class="guide-step-number">4</div>
                        <div class="guide-step-content">
                            <h4>获取推流地址（关键步骤）❗</h4>
                            <p><strong>创建直播间后会自动进入推流设置页面：</strong></p>
                            <ol>
                                <li>在直播设置页面找到【推流】或【直播推流】选项卡</li>
                                <li>选择【推流直播】模式（不是摄像头直播）</li>
                                <li>页面会显示推流信息：
                                    <div class="code-box" style="margin-top: 10px;">
                                        <strong>推流服务器（RTMP）：</strong><br>
                                        rtmp://[节点ID].livepush.myqcloud.com/[应用ID]/<br>
                                        <span style="font-size: 0.85rem; color: #6b7280;">（实际示例：rtmp://111583.livepush.myqcloud.com/trtc_1400439699/）</span><br><br>
                                        <strong><span class="tooltip" tabindex="0">串流密钥（Stream Key）<span class="tooltip-icon">?</span><span class="tooltip-content">推流密钥，与推流服务器配合唯一标识您的直播间，视频号每次开播均会更新，请重新获取。</span></span>：</strong><br>
                                        [您的专属密钥，通常包含房间ID和认证参数]
                                    </div>
                                </li>
                                <li><strong>复制推流地址和密钥</strong>：
                                    <ul>
                                        <li>点击推流服务器右侧的【复制】按钮</li>
                                        <li>点击串流密钥右侧的【复制】按钮或【显示】按钮</li>
                                        <li>将这两个信息保存到OBS中</li>
                                    </ul>
                                </li>
                            </ol>
                            <div class="warning-box" style="background: #fef3c7; border-left-color: #f59e0b;">
                                <span class="warning-icon">⚠️</span>
                                <strong>重要：推流地址格式说明</strong>
                                <p>视频号使用腾讯云CDN动态节点，推流地址格式为：</p>
                                <code style="display: block; background: white; padding: 10px; margin-top: 8px; border-radius: 6px;">
                                    rtmp://[动态节点ID].livepush.myqcloud.com/[应用ID]/
                                </code>
                                <ul style="margin-top: 10px;">
                                    <li>✅ 每次创建直播间，节点ID和应用ID都会<strong>动态变化</strong></li>
                                    <li>✅ 必须<strong>直接从视频号助手复制</strong>，不要手动输入</li>
                                    <li>✅ 示例地址仅供参考，实际地址以助手显示为准</li>
                                </ul>
                            </div>
                            <div class="warning-box" style="background: #fef3c7; border-left-color: #f59e0b;">
                                <span class="warning-icon">⚠️</span>
                                <strong>重要提醒：</strong>
                                <ul>
                                    <li>推流地址和密钥<strong>每次创建直播间都会变化</strong>！</li>
                                    <li>旧的推流信息无法重复使用</li>
                                    <li>请勿泄露推流密钥，避免被盗用</li>
                                    <li>推流密钥仅在当前直播场次有效</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="guide-step">
                        <div class="guide-step-number">5</div>
                        <div class="guide-step-content">
                            <h4>配置OBS Studio</h4>
                            <p><strong>将推流信息填入OBS：</strong></p>
                            <ol>
                                <li>打开OBS Studio</li>
                                <li>点击菜单【设置】→ 【推流】</li>
                                <li>在【服务】中选择【自定义...】或【Custom】</li>
                                <li>填写推流信息：
                                    <ul>
                                        <li><strong>服务器</strong>：直接粘贴视频号助手显示的完整RTMP地址<br>
                                            <span style="font-size: 0.85rem; color: #6b7280;">（实际格式：rtmp://[节点ID].livepush.myqcloud.com/[应用ID]/）</span>
                                        </li>
                                        <li><strong>串流密钥</strong>：粘贴刚才复制的密钥（包含房间ID和认证参数）</li>
                                    </ul>
                                </li>
                                <li>点击【确定】保存</li>
                            </ol>
                            <div class="warning-box">
                                <span class="warning-icon">⚠️</span>
                                <strong>重要提醒：</strong>
                                <ul>
                                    <li>请<strong>直接从视频号助手复制粘贴</strong>，不要手动输入</li>
                                    <li>推流地址每次开播都会变化（节点ID和应用ID动态生成）</li>
                                    <li>串流密钥中包含认证参数（txSecret和txTime），复制时务必完整</li>
                                    <li>⚠️ <strong>不要使用示例地址或旧的推流地址</strong></li>
                                </ul>
                            </div>
                            <div class="tip-box">
                                <span class="tip-icon">💡</span>
                                <strong>视频号推流参数建议：</strong>
                                <ul style="margin-left: 20px; margin-top: 8px;">
                                    <li><strong>视频码率</strong>：2000-3000 kbps</li>
                                    <li><strong>分辨率</strong>：1920×1080 (1080P)</li>
                                    <li><strong>帧率</strong>：30 fps</li>
                                    <li><strong>关键帧间隔</strong>：2秒</li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div class="guide-step">
                        <div class="guide-step-number">6</div>
                        <div class="guide-step-content">
                            <h4>开始推流直播</h4>
                            <p><strong>正确的开播顺序（很重要！）：</strong></p>
                            <ol>
                                <li>在OBS中点击【开始推流】</li>
                                <li>观察OBS右下角状态，确认推流正常（显示绿色指示灯和上传速度）</li>
                                <li><strong>返回视频号助手网页</strong></li>
                                <li>点击【开始直播】按钮</li>
                                <li>系统会进行短暂检测，确认有画面后正式开播</li>
                            </ol>
                            <p><strong>⚠️ 重要：开播顺序不能错！</strong></p>
                            <ul>
                                <li>✅ <strong>正确顺序</strong>：先OBS推流 → 再视频号点击开播</li>
                                <li>❌ <strong>错误顺序</strong>：先视频号开播 → 再OBS推流（会导致无法开播）</li>
                            </ul>
                        </div>
                    </div>

                    <div class="guide-step">
                        <div class="guide-step-number">7</div>
                        <div class="guide-step-content">
                            <h4>常见问题处理</h4>
                            <details>
                                <summary style="cursor: pointer; padding: 10px; background: var(--bg-primary); border-radius: 8px; font-weight: 600;">
                                    Q：首次开播提示需要人脸识别验证？
                                </summary>
                                <div style="padding: 15px; margin-top: 10px; background: var(--bg-secondary); border-radius: 8px;">
                                    <p><strong>A：</strong>这是视频号的安全机制，首次使用OBS推流时：</p>
                                    <ol>
                                        <li>先用手机微信进入该视频号</li>
                                        <li>选择【手机直播】开播几分钟</li>
                                        <li>按照提示完成人脸识别验证</li>
                                        <li>验证成功后，以后就可以正常使用OBS推流了</li>
                                    </ol>
                                </div>
                            </details>
                            <details style="margin-top: 10px;">
                                <summary style="cursor: pointer; padding: 10px; background: var(--bg-primary); border-radius: 8px; font-weight: 600;">
                                    Q：OBS显示推流正常，但视频号助手提示"未检测到画面"？
                                </summary>
                                <div style="padding: 15px; margin-top: 10px; background: var(--bg-secondary); border-radius: 8px;">
                                    <p><strong>A：</strong>可能的原因和解决方法：</p>
                                    <ul>
                                        <li><strong>检查OBS场景</strong>：确保场景中已添加来源（游戏捕获、窗口采集等）</li>
                                        <li><strong>检查编码器</strong>：使用x264或NVENC硬件编码</li>
                                        <li><strong>检查码率</strong>：确保码率设置为2000-3000 kbps</li>
                                        <li><strong>重启OBS</strong>：完全关闭OBS后重新启动</li>
                                        <li><strong>更换浏览器</strong>：使用Chrome或Edge浏览器</li>
                                    </ul>
                                </div>
                            </details>
                            <details style="margin-top: 10px;">
                                <summary style="cursor: pointer; padding: 10px; background: var(--bg-primary); border-radius: 8px; font-weight: 600;">
                                    Q：提示"推流地址已过期"或"推流地址无效"？
                                </summary>
                                <div style="padding: 15px; margin-top: 10px; background: var(--bg-secondary); border-radius: 8px;">
                                    <p><strong>A：</strong>这是因为使用了旧的推流地址：</p>
                                    <ul>
                                        <li>每次创建新直播间，推流地址和密钥都会重新生成</li>
                                        <li>旧的推流信息无法重复使用</li>
                                        <li>请回到视频号助手，创建新的直播间，获取新的推流地址</li>
                                        <li>然后在OBS中更新推流信息</li>
                                    </ul>
                                </div>
                            </details>
                            <details style="margin-top: 10px;">
                                <summary style="cursor: pointer; padding: 10px; background: var(--bg-primary); border-radius: 8px; font-weight: 600;">
                                    Q：粉丝不足1000无法获取推流地址怎么办？
                                </summary>
                                <div style="padding: 15px; margin-top: 10px; background: var(--bg-secondary); border-radius: 8px;">
                                    <p><strong>A：</strong>有以下几种方案：</p>
                                    <ul>
                                        <li><strong>方案一</strong>：使用Windows微信电脑直播，只需200粉丝或注册满7天</li>
                                        <li><strong>方案二</strong>：先用手机直播积累粉丝到1000</li>
                                        <li><strong>方案三</strong>：完成企业认证（需营业执照）</li>
                                        <li><strong>方案四</strong>：使用OBS虚拟摄像头 + Windows微信直播</li>
                                    </ul>
                                </div>
                            </details>
                        </div>
                    </div>

                    <div class="guide-step">
                        <div class="guide-step-number">8</div>
                        <div class="guide-step-content">
                            <h4>结束直播</h4>
                            <p><strong>正确的结束顺序：</strong></p>
                            <ol>
                                <li>先在视频号助手点击【结束直播】</li>
                                <li>然后在OBS中点击【停止推流】</li>
                            </ol>
                            <div class="tip-box">
                                <span class="tip-icon">💡</span>
                                <strong>提示：</strong>结束后可以在视频号助手中查看直播数据统计，包括观看人数、互动情况等。
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `
    },
};
