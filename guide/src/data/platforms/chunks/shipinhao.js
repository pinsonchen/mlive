export default {
    name: '视频号直播',
    icon: '💬',
    color: '#07c160',
    rtmpSupport: true,
    supportTypes: ['push', 'pc_wechat', 'mobile'],
    requirements: {
        deposit: false,
        fans: 1000,
        mobile: 0,
        push: 1000,
        pc_wechat: 200
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
};
