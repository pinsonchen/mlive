// 全局状态
let selectedPlatforms = [];
let selectedSolution = 1;
let currentStep = 1;

// 平台配置数据
const platforms = {
    taobao: {
        name: '淘宝直播',
        icon: '🛒',
        color: '#ff5000',
        rtmpSupport: true,
        supportTypes: ['push', 'pc_wechat', 'mobile'],  // 支持多种直播方式
        requirements: {
            deposit: true,
            fans: 200,  // 2026年2月更新：需要200粉丝才能使用OBS推流
            mobile: 0,   // 手机直播：无粉丝要求
            pc_wechat: 0  // Windows微信直播：暂不支持
        },
        liveMethods: {
            mobile: {
                name: '手机直播',
                fansRequired: 0,
                description: '通过手机淘宝主播APP直接直播'
            },
            push: {
                name: 'OBS推流直播',
                fansRequired: 200,
                description: '需要200粉丝以上才能使用OBS推流'
            },
            pc_wechat: {
                name: 'Windows微信直播',
                fansRequired: null,
                description: '暂不支持'
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
                                <li>✅ <strong>账号粉丝达到200人以上</strong>（2026年新增要求）</li>
                                <li>✅ 已缴纳保证金（个人2000-3000元，企业5000元）</li>
                                <li>✅ 账号通过淘宝直播审核</li>
                            </ul>
                            <div class="warning-box">
                                <span class="warning-icon">⚠️</span>
                                <strong>重要：</strong>200粉丝是使用OBS推流的硬性门槛，不足200粉丝无法使用推流功能！
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
                                <li>现在可以看到并复制推流地址和串流密钥</li>
                            </ol>
                            <div class="tip-box" style="background: #fef3c7; border-left-color: #f59e0b;">
                                <span class="tip-icon">💡</span>
                                <strong>为什么要暂停？</strong>
                                <p>淘宝直播要求使用OBS等第三方工具推流时，必须先在淘宝中控台点击"暂停直播"。这样推流码才能被OBS识别和使用。如果直接使用"正在直播"状态的推流码，OBS可能无法连接。</p>
                            </div>
                            <div class="code-box">
                                RTMP服务器：rtmp://xxx.alivecdn.com/live/<br>
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
                                    <li>建议使用CBR（恒定码率）模式</li>
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
        rtmpSupport: false,
        supportTypes: ['mobile', 'pc_assistant'],  // 仅支持手机和直播伴侣
        requirements: {
            deposit: false,
            fans: 1000,  // 1000粉丝以上或企业认证
            mobile: 0,   // 手机直播：无粉丝要求
            push: 1000,  // OBS推流：需要1000粉丝或企业认证
            pc_wechat: null  // Windows微信直播：不支持
        },
        liveMethods: {
            mobile: {
                name: '手机直播',
                fansRequired: 0,
                description: '通过抖音APP直接直播，无粉丝要求'
            },
            push: {
                name: 'OBS推流直播',
                fansRequired: 1000,
                description: '需要1000粉丝以上或企业认证，或使用虚拟摄像头'
            },
            pc_assistant: {
                name: '抖音直播伴侣',
                fansRequired: 0,
                description: '使用直播伴侣软件，支持虚拟摄像头'
            }
        },
        guide: `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">🎵</div>
                    <div class="platform-guide-title">
                        <h3>抖音直播推流方案</h3>
                        <p>使用虚拟摄像头方案（推荐）或获取RTMP地址</p>
                    </div>
                </div>
                <div class="guide-steps">
                    <div class="guide-step">
                        <div class="guide-step-number">⚠️</div>
                        <div class="guide-step-content">
                            <h4>重要说明</h4>
                            <p><strong>抖音对普通用户的RTMP推流权限有限制：</strong></p>
                            <ul>
                                <li>❌ 普通账号通常无法直接获取RTMP推流地址</li>
                                <li>✅ 需要1000粉丝以上才能申请电脑直播权限</li>
                                <li>✅ 或通过企业认证（需营业执照，600元/年）</li>
                            </ul>
                            <div class="tip-box" style="background: #fef3c7; border-color: #f59e0b;">
                                <span class="tip-icon">💡</span>
                                <strong>推荐方案：</strong>使用OBS虚拟摄像头 + 抖音官方直播伴侣，完全安全可靠！
                            </div>
                        </div>
                    </div>
                    <div class="guide-step">
                        <div class="guide-step-number">1</div>
                        <div class="guide-step-content">
                            <h4>推荐方案：虚拟摄像头</h4>
                            <ol>
                                <li>在OBS中制作好您的直播画面</li>
                                <li>点击菜单【工具】→【虚拟摄像头】→【启动】</li>
                                <li>下载并安装【抖音直播伴侣】</li>
                                <li>在直播伴侣的摄像头设置中选择【OBS Virtual Camera】</li>
                                <li>点击【开始直播】</li>
                            </ol>
                            <div class="tip-box">
                                <span class="tip-icon">✅</span>
                                <strong>优势：</strong>使用官方软件，安全可靠，无需特殊权限
                            </div>
                        </div>
                    </div>
                    <div class="guide-step">
                        <div class="guide-step-number">2</div>
                        <div class="guide-step-content">
                            <h4>备选方案：获取RTMP推流地址（需满足条件）</h4>
                            <p><strong>如果您满足以下条件之一：</strong></p>
                            <ul>
                                <li>✅ 粉丝数量达到1000+</li>
                                <li>✅ 已完成企业认证</li>
                            </ul>
                            <p><strong>获取步骤：</strong></p>
                            <ol>
                                <li>下载并安装【抖音直播伴侣】</li>
                                <li>登录抖音账号</li>
                                <li>点击【开始直播】→【推流设置】</li>
                                <li>查看并复制RTMP地址和串流密钥</li>
                            </ol>
                            <div class="code-box">
                                RTMP服务器：rtmp://push.douyin.com/live/<br>
                                串流密钥：[32位字符串]
                            </div>
                        </div>
                    </div>
                    <div class="guide-step">
                        <div class="guide-step-number">3</div>
                        <div class="guide-step-content">
                            <h4>粉丝不足1000怎么办？</h4>
                            <p><strong>方案一：快速积累粉丝</strong></p>
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
            fans: 1000,  // 个人账号：1000粉丝以上
            mobile: 0,   // 手机直播：无粉丝要求（但需要直播权限）
            push: 1000,  // OBS推流：需要1000粉丝以上
            pc_wechat: null  // Windows微信直播：不支持
        },
        liveMethods: {
            mobile: {
                name: '手机直播',
                fansRequired: 0,
                description: '通过小红书APP直接直播，需要先开通直播权限'
            },
            push: {
                name: 'OBS推流直播',
                fansRequired: 1000,
                description: '需要1000粉丝以上才能获取OBS推流权限'
            },
            pc_wechat: {
                name: 'Windows微信直播',
                fansRequired: null,
                description: '不支持'
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
                                <li>点击 <strong>【串流密钥】</strong> 或 <strong>【获取推流码】</strong></li>
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
                                RTMP服务器：rtmp://push.xiaohongshu.com/live/<br>
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
            fans: 100,  // 2026年更新：个人账号需100粉丝或完成新手任务
            mobile: 0,   // 手机直播：无粉丝要求
            push: 100,  // OBS推流：需要100粉丝
            pc_wechat: 100  // Windows微信直播：需要100粉丝
        },
        liveMethods: {
            mobile: {
                name: '手机直播',
                fansRequired: 0,
                description: '通过微信视频号APP直接直播，无粉丝要求'
            },
            push: {
                name: 'OBS推流直播',
                fansRequired: 100,
                description: '需要100粉丝或完成新手任务，从视频号助手获取推流地址'
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
                        <h3>视频号直播操作指南（2026最新）</h3>
                        <p>支持三种直播方式，请根据您的需求选择</p>
                    </div>
                </div>

                <!-- 三种直播方式对比 -->
                <div class="comparison-table" style="background: #f0fdf4; border: 2px solid var(--success-color); border-radius: 12px; padding: 20px; margin-bottom: 25px;">
                    <h4 style="margin-bottom: 15px; color: #065f46;">💬 视频号三种直播方式对比</h4>
                    <table style="width: 100%; border-collapse: collapse; background: white; border-radius: 8px; overflow: hidden;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, var(--primary-color) 0%, var(--secondary-color) 100%); color: white;">
                                <th style="padding: 12px; text-align: left;">对比维度</th>
                                <th style="padding: 12px;">📱 手机直播</th>
                                <th style="padding: 12px;">💻 电脑直播</th>
                                <th style="padding: 12px;">🎬 推流直播(OBS)</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 12px; font-weight: 600;">设备要求</td>
                                <td style="padding: 12px;">仅需手机</td>
                                <td style="padding: 12px;">电脑+Windows微信</td>
                                <td style="padding: 12px;">电脑+OBS等软件</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 12px; font-weight: 600;">画质表现</td>
                                <td style="padding: 12px;">⭐⭐ 一般</td>
                                <td style="padding: 12px;">⭐⭐⭐ 中等</td>
                                <td style="padding: 12px;">⭐⭐⭐⭐⭐ 高清可调</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 12px; font-weight: 600;">操作难度</td>
                                <td style="padding: 12px;">⭐ 简单</td>
                                <td style="padding: 12px;">⭐⭐ 较简单</td>
                                <td style="padding: 12px;">⭐⭐⭐⭐ 较复杂</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 12px; font-weight: 600;">功能丰富度</td>
                                <td style="padding: 12px;">基础功能</td>
                                <td style="padding: 12px;">多画面源</td>
                                <td style="padding: 12px;">专业级功能</td>
                            </tr>
                            <tr style="border-bottom: 1px solid var(--border-color);">
                                <td style="padding: 12px; font-weight: 600;">适合场景</td>
                                <td style="padding: 12px;">户外/Vlog</td>
                                <td style="padding: 12px;">教学/会议</td>
                                <td style="padding: 12px;">专业制作/多平台</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; font-weight: 600;">是否需要推流地址</td>
                                <td style="padding: 12px;">❌ 不需要</td>
                                <td style="padding: 12px;">❌ 不需要</td>
                                <td style="padding: 12px;">✅ 需要（从助手获取）</td>
                            </tr>
                        </tbody>
                    </table>
                    <div class="tip-box" style="margin-top: 15px;">
                        <span class="tip-icon">💡</span>
                        <strong>选择建议：</strong>
                        <ul style="margin-left: 20px; margin-top: 8px;">
                            <li><strong>新手入门</strong>：选择手机直播，最简单</li>
                            <li><strong>电脑直播</strong>：选择Windows微信直播，操作较简单</li>
                            <li><strong>专业需求</strong>：选择OBS推流直播，功能最强大</li>
                        </ul>
                    </div>
                </div>
            </div>
        `
    },
};

// 平台选择监听
document.querySelectorAll('input[name="platform"]').forEach(checkbox => {
    checkbox.addEventListener('change', updatePlatformSelection);
});

// 更新平台选择
function updatePlatformSelection() {
    const checkboxes = document.querySelectorAll('input[name="platform"]:checked');
    selectedPlatforms = Array.from(checkboxes).map(cb => cb.value);

    updateSelectedPlatformsDisplay();
    updateWarnings();
    updateSolutionRecommendations();
}

// 更新已选择平台显示
function updateSelectedPlatformsDisplay() {
    const container = document.getElementById('selectedPlatforms');
    const list = document.getElementById('selectedList');

    if (selectedPlatforms.length > 0) {
        const names = selectedPlatforms.map(p => platforms[p].name).join('、');
        list.textContent = names;
        container.style.display = 'block';
    } else {
        container.style.display = 'none';
    }
}

// 更新警告信息
function updateWarnings() {
    const warningsContainer = document.getElementById('warnings');
    warningsContainer.innerHTML = '';

    selectedPlatforms.forEach(platform => {
        const config = platforms[platform];

        // 保证金警告（仅淘宝）
        if (platform === 'taobao' && config.requirements.deposit) {
            const warning = document.createElement('div');
            warning.className = 'warning-item';
            warning.innerHTML = `
                <div class="icon">💰</div>
                <div class="content">
                    <h4>${config.name}保证金要求</h4>
                    <p>该平台需要缴纳2000-3000元保证金才能开通直播权限。请确保已完成实名认证和保证金缴纳。</p>
                </div>
            `;
            warningsContainer.appendChild(warning);
        }

        // RTMP推流受限警告（仅抖音）
        if (platform === 'douyin' && !config.rtmpSupport) {
            const warning = document.createElement('div');
            warning.className = 'warning-item';
            warning.innerHTML = `
                <div class="icon">🔒</div>
                <div class="content">
                    <h4>${config.name}RTMP推流受限</h4>
                    <p>该平台对普通用户的RTMP推流权限有限制，强烈建议使用虚拟摄像头方案以避免账号风险。</p>
                </div>
            `;
            warningsContainer.appendChild(warning);
        }

        // 粉丝要求警告（根据不同直播方式显示不同粉丝要求）
        if (config.liveMethods && Object.keys(config.liveMethods).length > 0) {
            // 有多种直播方式
            const methodList = Object.entries(config.liveMethods)
                .filter(([_, method]) => method.fansRequired !== null)
                .map(([key, method]) => {
                    const icon = {
                        'mobile': '📱',
                        'push': '🎬',
                        'pc_wechat': '💻',
                        'pc_assistant': '💻'
                    }[key] || '📺';
                    const reqText = method.fansRequired === 0
                        ? '无粉丝要求'
                        : `需要${method.fansRequired}粉丝`;
                    return `${icon} <strong>${method.name}</strong>：${reqText}`;
                })
                .join('<br>');

            const warning = document.createElement('div');
            warning.className = 'warning-item';
            warning.innerHTML = `
                <div class="icon">👥</div>
                <div class="content">
                    <h4>${config.name}不同直播方式的粉丝要求</h4>
                    <p>${methodList}</p>
                </div>
            `;
            warningsContainer.appendChild(warning);
        } else {
            // 只有一种直播方式或使用旧格式
            if (config.requirements.fans > 0) {
                const warning = document.createElement('div');
                warning.className = 'warning-item';
                warning.innerHTML = `
                    <div class="icon">⚠️</div>
                    <div class="content">
                        <h4>${config.name}粉丝要求</h4>
                        <p>该平台需要${config.requirements.fans}粉丝以上才能获取RTMP推流地址。如果粉丝不足，建议使用虚拟摄像头方案。</p>
                    </div>
                `;
                warningsContainer.appendChild(warning);
            }
        }
    });
}

// 更新方案推荐（自动选择）
function updateSolutionRecommendations() {
    const solution1 = document.getElementById('solution1');
    const solution2 = document.getElementById('solution2');
    const solution3 = document.getElementById('solution3');

    // 重置所有方案状态
    solution1.classList.remove('selected');
    solution2.classList.remove('selected');
    solution3.classList.remove('selected');

    // 重置徽章
    solution1.querySelector('.solution-badge').textContent = '推荐';
    solution1.querySelector('.solution-badge').className = 'solution-badge alternative';
    solution2.querySelector('.solution-badge').textContent = '备选';
    solution2.querySelector('.solution-badge').className = 'solution-badge alternative';
    solution3.querySelector('.solution-badge').textContent = '备选';
    solution3.querySelector('.solution-badge').className = 'solution-badge alternative';

    // 如果没有选择平台，不执行自动选择
    if (selectedPlatforms.length === 0) {
        selectedSolution = 1;
        return;
    }

    // 检查平台RTMP支持情况
    const allSupportRTMP = selectedPlatforms.every(p => platforms[p].rtmpSupport);
    const hasLimitedPlatform = selectedPlatforms.some(p => !platforms[p].rtmpSupport);
    const rtmpSupportedPlatforms = selectedPlatforms.filter(p => platforms[p].rtmpSupport);
    const rtmpLimitedPlatforms = selectedPlatforms.filter(p => !platforms[p].rtmpSupport);

    // 方案选择逻辑
    if (allSupportRTMP && selectedPlatforms.length > 0) {
        // 情况1：所有平台都支持RTMP → 推荐方案一
        selectedSolution = 1;
        solution1.classList.add('selected');
        solution1.querySelector('.solution-badge').textContent = '✨ 强烈推荐';
        solution1.querySelector('.solution-badge').className = 'solution-badge recommended';

        // 添加推荐说明
        addRecommendationReason(
            '✨ 系统推荐：方案一（OBS + Multi RTMP）',
            `您选择的 ${selectedPlatforms.map(p => platforms[p].name).join('、')} 都支持RTMP推流，使用方案一可以获得最佳画质和最低的资源占用！`
        );
    } else if (hasLimitedPlatform && rtmpSupportedPlatforms.length > 0) {
        // 情况2：部分平台支持RTMP，部分不支持 → 推荐方案二（混合方案）
        selectedSolution = 2;
        solution2.classList.add('selected');
        solution2.querySelector('.solution-badge').textContent = '✨ 强烈推荐';
        solution2.querySelector('.solution-badge').className = 'solution-badge recommended';

        // 添加推荐说明
        const supportedNames = rtmpSupportedPlatforms.map(p => platforms[p].name).join('、');
        const limitedNames = rtmpLimitedPlatforms.map(p => platforms[p].name).join('、');
        addRecommendationReason(
            '✨ 系统推荐：方案二（混合方案）',
            `${supportedNames} 支持RTMP推流，但 ${limitedNames} 不支持或受限。混合方案可以让您同时享受RTMP的高画质和虚拟摄像头的兼容性！`
        );
    } else {
        // 情况3：所有平台都不支持RTMP或只有单个平台 → 推荐方案三（虚拟摄像头）
        selectedSolution = 3;
        solution3.classList.add('selected');
        solution3.querySelector('.solution-badge').textContent = '✨ 强烈推荐';
        solution3.querySelector('.solution-badge').className = 'solution-badge recommended';

        // 添加推荐说明
        if (selectedPlatforms.length === 1) {
            addRecommendationReason(
                '✨ 系统推荐：方案三（虚拟摄像头）',
                `您只选择了 ${platforms[selectedPlatforms[0]].name} 单个平台，使用虚拟摄像头方案最简单安全，无需安装额外插件！`
            );
        } else {
            addRecommendationReason(
                '✨ 系统推荐：方案三（虚拟摄像头）',
                `您选择的平台都不支持或限制了RTMP推流。虚拟摄像头方案完全使用官方软件，最安全可靠，不用担心封号风险！`
            );
        }
    }
}

// 添加推荐说明
function addRecommendationReason(title, reason) {
    let reasonBox = document.getElementById('recommendationReason');
    if (!reasonBox) {
        // 在第二步section的开头添加推荐说明
        const step2 = document.getElementById('step2');
        const reasonDiv = document.createElement('div');
        reasonDiv.id = 'recommendationReason';
        reasonDiv.className = 'recommendation-reason';
        reasonDiv.innerHTML = `
            <div class="reason-header">${title}</div>
            <div class="reason-content">${reason}</div>
        `;
        step2.insertBefore(reasonDiv, step2.querySelector('.solution-cards'));
    } else {
        reasonBox.querySelector('.reason-header').textContent = title;
        reasonBox.querySelector('.reason-content').textContent = reason;
    }
}

// 方案卡片点击事件（允许手动覆盖自动选择）
document.querySelectorAll('.solution-card').forEach(card => {
    card.addEventListener('click', function() {
        // 移除其他卡片的选中状态
        document.querySelectorAll('.solution-card').forEach(c => c.classList.remove('selected'));

        // 选中当前卡片
        this.classList.add('selected');

        // 更新选中的方案
        if (this.id === 'solution1') selectedSolution = 1;
        else if (this.id === 'solution2') selectedSolution = 2;
        else selectedSolution = 3;

        // 更新推荐说明
        updateManualSelectionMessage();
    });
});

// 更新手动选择消息
function updateManualSelectionMessage() {
    const solutionNames = {
        1: '方案一（OBS + Multi RTMP）',
        2: '方案二（混合方案）',
        3: '方案三（虚拟摄像头）'
    };

    let reasonBox = document.getElementById('recommendationReason');
    if (reasonBox) {
        reasonBox.querySelector('.reason-header').textContent = '📌 您选择了：' + solutionNames[selectedSolution];
        reasonBox.querySelector('.reason-content').innerHTML = `
            系统已更新为您手动选择的方案。<br>
            <strong style="color: var(--warning-color);">提示：</strong>如果您想使用系统推荐的方案，请返回上一步重新选择平台。
        `;
        reasonBox.style.background = 'linear-gradient(135deg, rgba(245, 158, 11, 0.1) 0%, rgba(217, 119, 6, 0.1) 100%)';
        reasonBox.style.borderColor = 'var(--warning-color)';
        reasonBox.querySelector('.reason-header').style.color = 'var(--warning-color)';
    }
}

// 确认方案选择
function confirmSolution() {
    if (selectedPlatforms.length === 0) {
        alert('请先选择要开播的平台！');
        return;
    }

    // 显示确认信息
    const solutionNames = {
        1: 'OBS + Multi RTMP 插件',
        2: '混合方案（Multi RTMP + 虚拟摄像头）',
        3: '虚拟摄像头方案'
    };

    // 根据方案类型决定下一步
    if (selectedSolution === 3) {
        // 虚拟摄像头方案不需要获取RTMP推流地址，直接跳到OBS配置
        const message = `系统已为您推荐：${solutionNames[selectedSolution]}\n\n虚拟摄像头方案不需要获取RTMP推流地址，\n将直接进入OBS虚拟摄像头配置步骤。`;

        if (confirm(message)) {
            goToStep(4);
            generateOBSConfiguration();
        }
    } else {
        // 其他方案需要获取推流地址
        const message = `系统已为您推荐：${solutionNames[selectedSolution]}\n\n点击"确定"继续获取各平台推流地址。`;

        if (confirm(message)) {
            goToStep(3);
            generatePlatformGuides();
        }
    }
}

// 生成平台指南
function generatePlatformGuides() {
    const container = document.getElementById('platformGuides');
    container.innerHTML = '';

    // 更新第三步的标题和描述
    const step3Title = document.querySelector('#step3 h2');
    const step3Desc = document.querySelector('#step3 .step-desc');
    const step3Button = document.querySelector('#step3 .btn-primary');

    // 如果是虚拟摄像头方案，显示特殊说明
    if (selectedSolution === 3) {
        if (step3Title) step3Title.textContent = '第三步：准备各平台直播工具';
        if (step3Desc) step3Desc.textContent = '虚拟摄像头方案不需要获取RTMP推流地址，您需要准备以下内容：';
        if (step3Button) step3Button.textContent = '已准备好，进入OBS配置 →';

        container.innerHTML = `
            <div class="platform-guide" style="background: #d1fae5; border-color: var(--success-color);">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">✅</div>
                    <div class="platform-guide-title">
                        <h3>虚拟摄像头方案无需RTMP推流地址</h3>
                        <p>您选择的方案使用各平台官方直播伴侣，不需要获取推流地址</p>
                    </div>
                </div>
                <div class="guide-steps">
                    <div class="guide-step">
                        <div class="guide-step-number">💡</div>
                        <div class="guide-step-content">
                            <h4>虚拟摄像头方案说明</h4>
                            <p>您选择的是<strong>虚拟摄像头方案</strong>，该方案的工作原理是：</p>
                            <ol>
                                <li>在OBS中制作直播画面</li>
                                <li>启用OBS虚拟摄像头功能</li>
                                <li>在各平台官方直播伴侣中选择"OBS Virtual Camera"</li>
                                <li>通过官方软件进行推流</li>
                            </ol>
                            <div class="success-box">
                                ✅ 优势：完全使用官方软件，安全可靠，无需担心封号风险！
                            </div>
                        </div>
                    </div>
                    <div class="guide-step">
                        <div class="guide-step-number">📋</div>
                        <div class="guide-step-content">
                            <h4>您需要准备的内容</h4>
                            <p>不需要获取RTMP推流地址，但需要准备：</p>
                            <ul>
                                ${selectedPlatforms.map(p => `
                                    <li>
                                        <strong>${platforms[p].icon} ${platforms[p].name}</strong>：
                                        ${getVirtualCameraPreparation(p)}
                                    </li>
                                `).join('')}
                            </ul>
                        </div>
                    </div>
                    <div class="guide-step">
                        <div class="guide-step-number">➡️</div>
                        <div class="guide-step-content">
                            <h4>下一步</h4>
                            <p>点击下方按钮，进入OBS虚拟摄像头配置步骤。</p>
                            <p>我们将指导您：</p>
                            <ol>
                                <li>在OBS中制作直播场景</li>
                                <li>启用OBS虚拟摄像头</li>
                                <li>配置各平台官方直播伴侣</li>
                            </ol>
                        </div>
                    </div>
                </div>
            </div>
        `;
        return;
    }

    // 其他方案使用正常的标题和描述
    if (step3Title) step3Title.textContent = '第三步：获取各平台推流地址';
    if (step3Desc) step3Desc.textContent = '按照以下步骤获取您选中平台的推流地址：';
    if (step3Button) step3Button.textContent = '已获取所有推流地址 →';

    // 显示正常的推流地址获取指南
    selectedPlatforms.forEach(platform => {
        container.innerHTML += platforms[platform].guide;
    });
}

// 获取虚拟摄像头方案的平台准备内容
function getVirtualCameraPreparation(platform) {
    const preparations = {
        taobao: '下载淘宝直播伴侣（淘宝主播APP）',
        douyin: '下载抖音直播伴侣',
        xiaohongshu: '小红书暂无官方直播伴侣，建议使用RTMP推流方式',
        shipinhao: '访问视频号助手网页版'
    };
    return preparations[platform] || '准备该平台的官方直播工具';
}

// 生成OBS配置指南
function generateOBSConfiguration() {
    const container = document.getElementById('obsConfiguration');
    let content = '';

    if (selectedSolution === 1) {
        // 方案一：Multi RTMP
        content = `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">⚙️</div>
                    <div class="platform-guide-title">
                        <h3>配置 OBS Multi RTMP 插件</h3>
                        <p>一次推流，多平台同步</p>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>安装 OBS Multi RTMP 插件</h4>
                        <p>如果尚未安装，点击下方按钮查看详细安装教程：</p>
                        <button class="btn btn-primary" onclick="showPluginModal()">📦 查看插件安装教程</button>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>设置基础推流参数</h4>
                        <ol>
                            <li>打开 OBS → 【设置】→ 【输出】</li>
                            <li>选择【高级】模式</li>
                            <li>配置推流参数：
                                <ul>
                                    <li>音频码率：160 Kbps</li>
                                    <li>编码器：硬件编码 (NVENC H.264) 或 x264</li>
                                    <li>码率控制：CBR</li>
                                    <li>码率：4500 Kbps</li>
                                    <li>关键帧间隔：2秒</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>添加多路推流目标</h4>
                        <ol>
                            <li>在 OBS 菜单找到【多路推流】→ 【设置】</li>
                            <li>点击【+】添加推流目标</li>
                        </ol>
                        ${generatePlatformStreamSettings()}
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">4</div>
                    <div class="guide-step-content">
                        <h4>设置直播场景</h4>
                        <ol>
                            <li>在 OBS 主界面添加【来源】：</li>
                            <ul>
                                <li>显示采集：捕获屏幕或窗口</li>
                                <li>游戏采集：捕获游戏画面（如需要）</li>
                                <li>摄像头：添加主播摄像头</li>
                                <li>麦克风：添加音频输入</li>
                            </ul>
                            <li>调整布局和位置</li>
                            <li>测试画面和声音效果</li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">5</div>
                    <div class="guide-step-content">
                        <h4>开始测试推流</h4>
                        <ol>
                            <li>确保各平台直播间已创建并等待推流</li>
                            <li>点击 OBS 的【多路推流】→ 【开始所有推流】</li>
                            <li>观察各推流目标状态，确保都显示【活动】</li>
                            <li>在各平台确认直播画面正常</li>
                        </ol>
                        <div class="success-box">
                            ✅ 如果所有平台都显示正常画面，说明配置成功！
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else if (selectedSolution === 2) {
        // 方案二：混合方案
        content = `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">🔄</div>
                    <div class="platform-guide-title">
                        <h3>配置混合方案（Multi RTMP + 虚拟摄像头）</h3>
                        <p>兼顾兼容性和画质</p>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>第一步：配置支持RTMP的平台</h4>
                        <p>使用 Multi RTMP 插件推流到以下平台：</p>
                        <ul>
                            ${getRtmpSupportedPlatforms()}
                        </ul>
                        <button class="btn btn-primary" onclick="showPluginModal()">📦 查看 Multi RTMP 插件安装教程</button>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>第二步：启用 OBS 虚拟摄像头</h4>
                        <ol>
                            <li>在 OBS 中制作好直播场景</li>
                            <li>点击菜单【工具】→ 【虚拟摄像头】→ 【启动】</li>
                            <li>虚拟摄像头设备 "OBS Virtual Camera" 将出现在系统中</li>
                        </ol>
                        <div class="tip-box">
                            <span class="tip-icon">💡</span>
                            macOS用户需要安装OBS Camera插件，Windows用户OBS自带此功能
                        </div>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>第三步：配置不支持RTMP的平台</h4>
                        <p>使用虚拟摄像头方案推流到以下平台：</p>
                        <ul>
                            ${getRtmpLimitedPlatforms()}
                        </ul>
                        <ol>
                            <li>下载并安装对应平台的官方直播伴侣</li>
                            <li>在直播伴侣的摄像头设置中选择【OBS Virtual Camera】</li>
                            <li>点击【开始直播】</li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">4</div>
                    <div class="guide-step-content">
                        <h4>第四步：同时启动所有平台</h4>
                        <ol>
                            <li>先启动 OBS 的多路推流（针对支持RTMP的平台）</li>
                            <li>再依次启动各平台直播伴侣（针对不支持RTMP的平台）</li>
                            <li>在各平台确认直播画面正常</li>
                        </ol>
                        <div class="success-box">
                            ✅ 混合方案配置完成！注意：此方案需要同时运行多个软件，确保电脑配置足够。
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        // 方案三：纯虚拟摄像头
        content = `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">📹</div>
                    <div class="platform-guide-title">
                        <h3>配置虚拟摄像头方案</h3>
                        <p>最安全可靠，适合所有平台</p>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>在 OBS 中制作直播场景</h4>
                        <ol>
                            <li>打开 OBS Studio</li>
                            <li>添加您需要的来源：
                                <ul>
                                    <li>显示采集：捕获屏幕或窗口</li>
                                    <li>摄像头：添加主播摄像头</li>
                                    <li>麦克风：添加音频输入</li>
                                    <li>其他：图片、文字、媒体源等</li>
                                </ul>
                            </li>
                            <li>调整好画面布局和效果</li>
                            <li>测试画面和声音</li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>启动 OBS 虚拟摄像头</h4>
                        <p><strong>Windows系统：</strong></p>
                        <ol>
                            <li>点击菜单【工具】</li>
                            <li>选择【虚拟摄像头】</li>
                            <li>点击【启动】</li>
                        </ol>
                        <p><strong>macOS系统：</strong></p>
                        <ol>
                            <li>确保已安装 OBS Camera 插件</li>
                            <li>点击菜单【工具】→ 【启动虚拟摄像机】</li>
                        </ol>
                        <div class="success-box">
                            ✅ 虚拟摄像头启动成功后，系统中将出现 "OBS Virtual Camera" 设备
                        </div>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>配置各平台直播伴侣</h4>
                        ${generateVirtualCameraGuides()}
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">4</div>
                    <div class="guide-step-content">
                        <h4>依次启动各平台直播</h4>
                        <ol>
                            <li>确保 OBS 虚拟摄像头正在运行</li>
                            <li>依次打开各平台直播伴侣</li>
                            <li>在每个直播伴侣中确认选择了 "OBS Virtual Camera"</li>
                            <li>依次点击【开始直播】</li>
                        </ol>
                        <div class="tip-box">
                            <span class="tip-icon">💡</span>
                            <strong>提示：</strong>建议按顺序启动，每次启动后确认画面正常再启动下一个
                        </div>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">5</div>
                    <div class="guide-step-content">
                        <h4>监控和维护</h4>
                        <ul>
                            <li>✅ 确保 OBS 始终保持运行状态</li>
                            <li>✅ 定期检查各平台直播状态</li>
                            <li>✅ 注意电脑CPU和内存占用情况</li>
                            <li>⚠️ 如果OBS崩溃，所有平台直播都会中断</li>
                        </ul>
                        <div class="success-box">
                            ✅ 所有平台配置完成！使用虚拟摄像头方案，安全可靠，无需担心封号风险。
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = content;
}

// 生成平台推流设置
function generatePlatformStreamSettings() {
    let html = '<div style="margin-top: 20px;">';
    selectedPlatforms.forEach(platform => {
        html += `
            <div style="background: var(--bg-secondary); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: ${platforms[platform].color}; margin-bottom: 10px;">${platforms[platform].icon} ${platforms[platform].name}</h4>
                <ul style="margin-left: 20px;">
                    <li>名称：${platforms[platform].name}</li>
                    <li>服务：自定义</li>
                    <li>服务器：[从${platforms[platform].name}获取的RTMP地址]</li>
                    <li>串流密钥：[从${platforms[platform].name}获取的密钥]</li>
                </ul>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

// 获取支持RTMP的平台
function getRtmpSupportedPlatforms() {
    return selectedPlatforms
        .filter(p => platforms[p].rtmpSupport)
        .map(p => `<li>✅ ${platforms[p].icon} ${platforms[p].name}</li>`)
        .join('');
}

// 获取不支持RTMP的平台
function getRtmpLimitedPlatforms() {
    return selectedPlatforms
        .filter(p => !platforms[p].rtmpSupport)
        .map(p => `<li>⚠️ ${platforms[p].icon} ${platforms[p].name}（使用虚拟摄像头）</li>`)
        .join('');
}

// 生成虚拟摄像头指南
function generateVirtualCameraGuides() {
    let html = '';
    selectedPlatforms.forEach(platform => {
        const guideText = getVirtualCameraGuide(platform);
        html += `
            <div style="background: var(--bg-secondary); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: ${platforms[platform].color}; margin-bottom: 10px;">${platforms[platform].icon} ${platforms[platform].name}</h4>
                ${guideText}
            </div>
        `;
    });
    return html;
}

// 获取虚拟摄像头指南
function getVirtualCameraGuide(platform) {
    const guides = {
        taobao: `
            <ol>
                <li>下载并安装【淘宝直播伴侣】</li>
                <li>登录淘宝账号</li>
                <li>在摄像头设置中选择【OBS Virtual Camera】</li>
                <li>点击【开始直播】</li>
            </ol>
        `,
        douyin: `
            <ol>
                <li>下载并安装【抖音直播伴侣】</li>
                <li>登录抖音账号</li>
                <li>在摄像头设置中选择【OBS Virtual Camera】</li>
                <li>点击【开始直播】</li>
            </ol>
            <div class="tip-box">
                <span class="tip-icon">✅</span>
                抖音官方推荐方案，完全安全可靠
            </div>
        `,
        xiaohongshu: `
            <p>小红书暂无官方直播伴侣，建议使用RTMP推流方式</p>
            <div class="tip-box">
                <span class="tip-icon">⚠️</span>
                如果粉丝不足1000无法获取RTMP，建议先积累粉丝再进行直播
            </div>
        `,
        shipinhao: `
            <ol>
                <li>在电脑浏览器中打开视频号助手</li>
                <li>创建直播间并选择【摄像头直播】</li>
                <li>在浏览器弹出的摄像头权限请求中允许</li>
                <li>选择【OBS Virtual Camera】</li>
                <li>点击【开始直播】</li>
            </ol>
        `
    };
    return guides[platform] || '';
}

// 生成最终步骤
function generateFinalSteps() {
    const container = document.getElementById('finalSteps');
    let content = '';

    if (selectedSolution === 1) {
        content = `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">🚀</div>
                    <div class="platform-guide-title">
                        <h3>准备开始直播</h3>
                        <p>使用 Multi RTMP 方案</p>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>在各平台创建直播间</h4>
                        <ol>
                            ${selectedPlatforms.map(p => `<li>打开${platforms[p].name}，创建直播间，设置为【等待推流】状态</li>`).join('')}
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>启动 OBS 多路推流</h4>
                        <ol>
                            <li>在 OBS 中确认直播场景已设置好</li>
                            <li>点击菜单【多路推流】→ 【开始所有推流】</li>
                            <li>观察所有推流目标状态，确保都显示【活动】或【直播中】</li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>在各平台确认开播</h4>
                        <ol>
                            ${selectedPlatforms.map(p => `<li>在${platforms[p].name}确认直播画面正常</li>`).join('')}
                            <li>如有平台需要手机确认（如小红书），在手机APP点击【开始直播】</li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">4</div>
                    <div class="guide-step-content">
                        <h4>开始直播</h4>
                        <div class="success-box">
                            🎉 恭喜！多平台同步直播已开始！
                        </div>
                        <ul>
                            <li>✅ 定期检查 OBS 推流状态（每15分钟）</li>
                            <li>✅ 监控各平台直播间状态</li>
                            <li>✅ 及时回复观众评论和互动</li>
                            <li>✅ 关注网络状况，避免断流</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else if (selectedSolution === 2) {
        content = `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">🔄</div>
                    <div class="platform-guide-title">
                        <h3>准备开始直播</h3>
                        <p>使用混合方案（Multi RTMP + 虚拟摄像头）</p>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>准备RTMP平台</h4>
                        <ol>
                            ${getRtmpSupportedPlatformsList()}
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>准备虚拟摄像头平台</h4>
                        <ol>
                            <li>确保 OBS 虚拟摄像头已启动</li>
                            ${getVirtualCameraPlatformsList()}
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>按顺序启动直播</h4>
                        <ol>
                            <li>先启动 OBS 的【多路推流】</li>
                            <li>再依次启动各平台直播伴侣</li>
                            <li>在每个平台确认画面正常</li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">4</div>
                    <div class="guide-step-content">
                        <h4>开始直播</h4>
                        <div class="success-box">
                            🎉 恭喜！多平台同步直播已开始！
                        </div>
                        <p>⚠️ 注意事项：</p>
                        <ul>
                            <li>混合方案需要同时运行多个软件，注意电脑性能</li>
                            <li>如果OBS崩溃，所有平台直播都会中断</li>
                            <li>定期检查各平台直播状态</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else {
        content = `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">📹</div>
                    <div class="platform-guide-title">
                        <h3>准备开始直播</h3>
                        <p>使用虚拟摄像头方案</p>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>确保 OBS 虚拟摄像头运行中</h4>
                        <ol>
                            <li>打开 OBS Studio</li>
                            <li>确认直播场景已制作完成</li>
                            <li>点击【工具】→ 【虚拟摄像头】→ 【启动】</li>
                            <li>状态栏应显示"虚拟摄像头已启动"</li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>依次启动各平台直播</h4>
                        <ol>
                            ${selectedPlatforms.map((p, i) => `
                                <li>打开${platforms[p].name}直播伴侣/网页
                                    <ul>
                                        <li>在摄像头设置中选择【OBS Virtual Camera】</li>
                                        <li>确认能看到OBS制作的画面</li>
                                        <li>点击【开始直播】</li>
                                        <li>等待确认直播已开始</li>
                                    </ul>
                                </li>
                            `).join('')}
                        </ol>
                        <div class="tip-box">
                            <span class="tip-icon">💡</span>
                            <strong>建议：</strong>每次启动一个平台后，确认画面正常再启动下一个，避免同时启动导致电脑卡顿
                        </div>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>开始直播</h4>
                        <div class="success-box">
                            🎉 恭喜！多平台同步直播已开始！
                        </div>
                        <p>⚠️ 重要提醒：</p>
                        <ul>
                            <li><strong>OBS必须始终保持运行状态</strong></li>
                            <li>如果OBS崩溃或关闭，所有平台直播都会中断</li>
                            <li>建议关闭OBS的自动更新功能，避免直播中途重启</li>
                            <li>定期检查各平台直播状态和电脑性能</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = content;
}

// 获取支持RTMP的平台列表
function getRtmpSupportedPlatformsList() {
    return selectedPlatforms
        .filter(p => platforms[p].rtmpSupport)
        .map(p => `<li>打开${platforms[p].name}，创建直播间，等待推流</li>`)
        .join('');
}

// 获取虚拟摄像头平台列表
function getVirtualCameraPlatformsList() {
    return selectedPlatforms
        .filter(p => !platforms[p].rtmpSupport)
        .map(p => `<li>打开${platforms[p].name}直播伴侣，选择【OBS Virtual Camera】</li>`)
        .join('');
}

// 步骤导航
function goToStep(step) {
    if (step === 2 && selectedPlatforms.length === 0) {
        alert('请先选择要开播的平台！');
        return;
    }

    // 隐藏所有步骤
    document.querySelectorAll('.step-section').forEach(section => {
        section.style.display = 'none';
    });

    // 显示目标步骤
    document.getElementById(`step${step}`).style.display = 'block';

    // 更新步骤指示器
    document.querySelectorAll('.step-item').forEach((item, index) => {
        item.classList.remove('active');
        item.classList.remove('skipped');

        const stepNumber = index + 1;

        // 如果是虚拟摄像头方案，跳过第三步
        if (selectedSolution === 3 && stepNumber === 3) {
            item.classList.add('skipped');
        } else if (stepNumber < step) {
            item.classList.add('completed');
        } else if (stepNumber === step) {
            item.classList.add('active');
        } else {
            item.classList.remove('completed');
        }
    });

    currentStep = step;

    // 特殊步骤处理
    if (step === 3) {
        generatePlatformGuides();
    } else if (step === 4) {
        generateOBSConfiguration();
    } else if (step === 5) {
        generateFinalSteps();
    }

    // 滚动到顶部
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

// 显示插件安装模态框
function showPluginModal() {
    document.getElementById('pluginModal').style.display = 'flex';
}

// 关闭模态框
function closeModal() {
    document.getElementById('pluginModal').style.display = 'none';
}

// 开始直播
function startStreaming() {
    const checkboxes = document.querySelectorAll('.completion-checklist input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);

    if (!allChecked) {
        const confirm = window.confirm('您还没有完成所有检查项，确定要开始直播吗？');
        if (!confirm) return;
    }

    alert('🎉 恭喜！您已准备好开始多平台同步直播！\n\n祝您直播顺利！');

    // 可以在这里添加更多逻辑，比如记录日志、跳转到其他页面等
}

// 点击模态框背景关闭
document.getElementById('pluginModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        closeModal();
    }
});

// ESC键关闭模态框
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        closeModal();
    }
});
