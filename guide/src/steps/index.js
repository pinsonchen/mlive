import { platforms } from '../data/platforms.js';

export function generatePlatformGuides(selectedPlatforms, selectedSolution) {
    const container = document.getElementById('platformGuides');
    container.innerHTML = '';

    const step3Title = document.querySelector('#step3 h2');
    const step3Desc = document.querySelector('#step3 .step-desc');
    const step3Button = document.querySelector('#step3 .btn-primary');

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

    if (step3Title) step3Title.textContent = '第三步：获取各平台推流地址';
    if (step3Desc) step3Desc.textContent = '按照以下步骤获取您选中平台的推流地址：';
    if (step3Button) step3Button.textContent = '已获取所有推流地址 →';

    selectedPlatforms.forEach(platform => {
        container.innerHTML += platforms[platform].guide;
    });
}

function getVirtualCameraPreparation(platform) {
    const preparations = {
        taobao: '下载淘宝直播伴侣（淘宝主播APP）',
        douyin: '下载抖音直播伴侣',
        xiaohongshu: '小红书暂无官方直播伴侣，建议使用RTMP推流方式',
        shipinhao: '访问视频号助手网页版'
    };
    return preparations[platform] || '准备该平台的官方直播工具';
}

export function generateOBSConfiguration(selectedPlatforms, selectedSolution) {
    const container = document.getElementById('obsConfiguration');
    let content = '';

    if (selectedSolution === 1) {
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
                                    <li>编码器：硬件编码 (<span class="tooltip" tabindex="0">NVENC H.264<span class="tooltip-icon">?</span><span class="tooltip-content">NVIDIA显卡的硬件视频编码器，比软件编码（x264）更快、占用CPU更少，画质相当。无NVIDIA显卡可选x264。</span></span>) 或 x264</li>
                                    <li>码率控制：<span class="tooltip" tabindex="0">CBR<span class="tooltip-icon">?</span><span class="tooltip-content">恒定码率（Constant Bit Rate），保持推流码率稳定，适合直播推流，可避免网络波动导致画质忽好忽坏。</span></span></li>
                                    <li>码率：4500 Kbps（⚠️ 淘宝限制2500kbps）</li>
                                    <li>关键帧间隔：2秒</li>
                                </ul>
                            </li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2.5</div>
                    <div class="guide-step-content">
                        <h4>⚠️ 设置主推流地址（重要）</h4>
                        <p><strong>OBS Multi RTMP 插件需要与OBS主推流同步工作！</strong></p>
                        <p>首先需要在OBS主界面设置一个默认的推流地址（主推流）：</p>
                        <ol>
                            <li>打开 OBS → 【设置】→ 【推流】</li>
                            <li>在【服务】中选择一个平台（建议选择最重要的平台，如视频号或淘宝）</li>
                            <li>填写该平台的【服务器】和【串流密钥】</li>
                            <li>点击【确定】保存</li>
                        </ol>
                        <div class="warning-box">
                            <span class="warning-icon">⚠️</span>
                            <strong>重要提示：</strong>
                            <p>这个主推流地址是必需的！Multi RTMP插件会监听OBS主推流的状态：</p>
                            <ul>
                                <li>✅ 当主推流开始时，所有多平台推流自动开始</li>
                                <li>✅ 当主推流停止时，所有多平台推流自动停止</li>
                            </ul>
                            <p>如果不设置主推流，Multi RTMP插件将无法正常工作！</p>
                        </div>
                        <div class="tip-box">
                            <span class="tip-icon">💡</span>
                            <strong>建议：</strong>选择网络最稳定或最重要的平台作为主推流目标。
                        </div>
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
                        ${generatePlatformStreamSettings(selectedPlatforms)}
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
                            <li>在 Multi RTMP 设置中，勾选 <strong>"同步开始"</strong> 和 <strong>"同步停止"</strong></li>
                            <li>点击 OBS 主界面的【开始推流】按钮</li>
                            <li>Multi RTMP 会自动开始所有平台推流</li>
                            <li>观察各推流目标状态，确保都显示【活动】</li>
                            <li>在各平台确认直播画面正常</li>
                        </ol>
                        <div class="success-box">
                            ✅ 如果所有平台都显示正常画面，说明配置成功！
                        </div>
                        <div class="tip-box">
                            <span class="tip-icon">💡</span>
                            <strong>工作原理：</strong>
                            <ul>
                                <li>OBS主推流开始 → Multi RTMP自动开始所有平台</li>
                                <li>OBS主推流停止 → Multi RTMP自动停止所有平台</li>
                                <li>只需控制OBS主推流，无需单独操作每个平台</li>
                            </ul>
                        </div>
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
                            ${getRtmpSupportedPlatforms(selectedPlatforms)}
                        </ul>
                        <button class="btn btn-primary" onclick="showPluginModal()">📦 查看 Multi RTMP 插件安装教程</button>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>第二步：启用 OBS <span class="tooltip" tabindex="0">虚拟摄像头<span class="tooltip-icon">?</span><span class="tooltip-content">OBS内置功能，将直播画面虚拟成系统摄像头，平台直播伴侣可像真实摄像头一样调用它。</span></span></h4>
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
                            ${getRtmpLimitedPlatforms(selectedPlatforms)}
                        </ul>
                        <ol>
                            <li>下载并安装对应平台的官方<span class="tooltip" tabindex="0">直播伴侣<span class="tooltip-icon">?</span><span class="tooltip-content">各平台官方提供的PC直播软件，安全合规，支持将OBS虚拟摄像头作为画面来源。</span></span></li>
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
                        ${generateVirtualCameraGuides(selectedPlatforms)}
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

function generatePlatformStreamSettings(selectedPlatforms) {
    let html = '<div style="margin-top: 20px;">';
    selectedPlatforms.forEach(platform => {
        html += `
            <div style="background: var(--bg-secondary); padding: 15px; border-radius: 8px; margin-bottom: 15px;">
                <h4 style="color: ${platforms[platform].color}; margin-bottom: 10px;">${platforms[platform].icon} ${platforms[platform].name}</h4>
                <ul style="margin-left: 20px;">
                    <li>名称：${platforms[platform].name}</li>
                    <li>服务：自定义</li>
                    <li>服务器：[从${platforms[platform].name}获取的<span class="tooltip" tabindex="0">RTMP地址<span class="tooltip-icon">?</span><span class="tooltip-content">推流服务器地址，格式如 rtmp://live.example.com/live/，填入OBS推流设置的"服务器"栏。</span></span>]</li>
                    <li><span class="tooltip" tabindex="0">串流密钥<span class="tooltip-icon">?</span><span class="tooltip-content">推流密钥（Stream Key），与推流地址配合标识您的直播间，请勿分享给他人，有效期有限。</span></span>：[从${platforms[platform].name}获取的密钥]</li>
                </ul>
            </div>
        `;
    });
    html += '</div>';
    return html;
}

function getRtmpSupportedPlatforms(selectedPlatforms) {
    return selectedPlatforms
        .filter(p => platforms[p].rtmpSupport)
        .map(p => `<li>✅ ${platforms[p].icon} ${platforms[p].name}</li>`)
        .join('');
}

function getRtmpLimitedPlatforms(selectedPlatforms) {
    return selectedPlatforms
        .filter(p => !platforms[p].rtmpSupport)
        .map(p => `<li>⚠️ ${platforms[p].icon} ${platforms[p].name}（使用虚拟摄像头）</li>`)
        .join('');
}

function generateVirtualCameraGuides(selectedPlatforms) {
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

export function generateFinalSteps(selectedPlatforms, selectedSolution) {
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
                            ${getRtmpSupportedPlatformsList(selectedPlatforms)}
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>准备虚拟摄像头平台</h4>
                        <ol>
                            <li>确保 OBS 虚拟摄像头已启动</li>
                            ${getVirtualCameraPlatformsList(selectedPlatforms)}
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
    } else if (selectedSolution === 3) {
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
                        <h4>启动 OBS 虚拟摄像头</h4>
                        <ol>
                            <li>确保 OBS 直播场景已设置好</li>
                            <li>点击【工具】→ 【虚拟摄像头】→ 【启动】</li>
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>依次启动各平台直播</h4>
                        <ol>
                            ${selectedPlatforms.map(p => `<li>打开${platforms[p].name}直播伴侣，选择【OBS Virtual Camera】，点击开播</li>`).join('')}
                        </ol>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>开始直播</h4>
                        <div class="success-box">
                            🎉 恭喜！多平台同步直播已开始！
                        </div>
                        <ul>
                            <li>✅ 确保 OBS 始终运行（不要关闭）</li>
                            <li>✅ 定期检查各平台直播状态</li>
                            <li>✅ 注意电脑CPU占用（多个直播伴侣同时运行）</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    } else if (selectedSolution === 4) {
        content = `
            <div class="platform-guide">
                <div class="platform-guide-header">
                    <div class="platform-guide-icon">📱</div>
                    <div class="platform-guide-title">
                        <h3>准备开始直播</h3>
                        <p>使用全手机直播方案</p>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">1</div>
                    <div class="guide-step-content">
                        <h4>准备直播设备</h4>
                        <ul>
                            <li>📱 主力手机（用于开播画面最好的平台）</li>
                            <li>📱 备用手机/平板（每个平台一台设备）</li>
                            <li>🔌 充电器和电源（长时间直播必备）</li>
                            <li>📶 稳定的WiFi连接</li>
                        </ul>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">2</div>
                    <div class="guide-step-content">
                        <h4>在各平台开播</h4>
                        <ol>
                            ${selectedPlatforms.map(p => `<li>在${platforms[p].name}APP中创建直播间并开播</li>`).join('')}
                        </ol>
                        <div class="tip-box">
                            <span class="tip-icon">💡</span>
                            每个平台使用独立设备，确保画面流畅
                        </div>
                    </div>
                </div>

                <div class="guide-step">
                    <div class="guide-step-number">3</div>
                    <div class="guide-step-content">
                        <h4>开始直播</h4>
                        <div class="success-box">
                            🎉 开始手机多平台直播！
                        </div>
                        <ul>
                            <li>⚠️ 注意各设备的电量和发热情况</li>
                            <li>⚠️ 每个平台画面可能略有不同（不同设备/角度）</li>
                            <li>✅ 适合简单直播场景（带货、聊天等）</li>
                        </ul>
                    </div>
                </div>
            </div>
        `;
    }

    container.innerHTML = content;
    updateCompletionChecklist(selectedPlatforms, selectedSolution);
}

export function updateCompletionChecklist(selectedPlatforms, selectedSolution) {
    const checklistContainer = document.querySelector('.completion-checklist');
    if (!checklistContainer) return;

    let items = [
        { text: '直播场景已设置', checked: false },
        { text: '所有平台直播间已创建', checked: false },
    ];

    if (selectedSolution === 1 || selectedSolution === 2) {
        items.push({ text: 'OBS推流参数已配置', checked: false });
        items.push({ text: '多路推流目标已添加', checked: false });
    }
    if (selectedSolution === 2 || selectedSolution === 3) {
        items.push({ text: 'OBS虚拟摄像头已启动', checked: false });
    }
    if (selectedSolution === 4) {
        items.push({ text: '所有手机设备已准备', checked: false });
        items.push({ text: '设备电量充足', checked: false });
    }
    items.push({ text: '网络连接正常', checked: false });
    items.push({ text: '音频/视频测试通过', checked: false });

    checklistContainer.innerHTML = items.map((item, i) => `
        <label style="display: flex; align-items: center; gap: 10px; padding: 8px 0; cursor: pointer;">
            <input type="checkbox" id="check_${i}">
            <span>${item.text}</span>
        </label>
    `).join('');
}

function getRtmpSupportedPlatformsList(selectedPlatforms) {
    return selectedPlatforms
        .filter(p => platforms[p].rtmpSupport)
        .map(p => `<li>打开${platforms[p].name}，创建直播间，等待推流</li>`)
        .join('');
}

function getVirtualCameraPlatformsList(selectedPlatforms) {
    return selectedPlatforms
        .filter(p => !platforms[p].rtmpSupport)
        .map(p => `<li>打开${platforms[p].name}直播伴侣，选择【OBS Virtual Camera】</li>`)
        .join('');
}
