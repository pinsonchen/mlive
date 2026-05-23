import { platforms } from './data/platforms.js';

let selectedPlatforms = [];
let selectedSolution = 1;
let currentStep = 1;

let stepModules = null;
async function getStepModules() {
    if (!stepModules) {
        stepModules = await import('./steps/index.js');
    }
    return stepModules;
}

document.querySelectorAll('input[name="platform"]').forEach(checkbox => {
    checkbox.addEventListener('change', updatePlatformSelection);
});

function updatePlatformSelection() {
    const checkboxes = document.querySelectorAll('input[name="platform"]:checked');
    selectedPlatforms = Array.from(checkboxes).map(cb => cb.value);

    updateSelectedPlatformsDisplay();
    updateWarnings();
    updateSolutionRecommendations();
}

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

function updateWarnings() {
    const warningsContainer = document.getElementById('warnings');
    warningsContainer.innerHTML = '';

    selectedPlatforms.forEach(platform => {
        const config = platforms[platform];

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

        if (platform === 'douyin' && !config.rtmpSupport) {
            const warning = document.createElement('div');
            warning.className = 'warning-item';
            warning.innerHTML = `
                <div class="icon">🔒</div>
                <div class="content">
                    <h4>${config.name} OBS推流限制</h4>
                    <p>抖音已于2023年起取消OBS直接推流功能。建议使用虚拟摄像头方案（OBS Virtual Camera + 抖音直播伴侣）。</p>
                </div>
            `;
            warningsContainer.appendChild(warning);
        }

        if (config.requirements.fans > 0) {
            const warning = document.createElement('div');
            warning.className = 'warning-item';
            warning.innerHTML = `
                <div class="icon">👥</div>
                <div class="content">
                    <h4>${config.name}粉丝要求</h4>
                    <p>OBS推流需要${config.requirements.fans}+粉丝。${platform === 'xiaohongshu' ? '还需注册满6个月且近3个月发布原创笔记≥10篇。' : ''}</p>
                </div>
            `;
            warningsContainer.appendChild(warning);
        }
    });
}

function updateSolutionRecommendations() {
    const solution1 = document.getElementById('solution1');
    const solution2 = document.getElementById('solution2');
    const solution3 = document.getElementById('solution3');
    const solution4 = document.getElementById('solution4');

    solution1.classList.remove('selected');
    solution2.classList.remove('selected');
    solution3.classList.remove('selected');
    solution4.classList.remove('selected');

    solution1.querySelector('.solution-badge').textContent = '推荐';
    solution1.querySelector('.solution-badge').className = 'solution-badge alternative';
    solution2.querySelector('.solution-badge').textContent = '备选';
    solution2.querySelector('.solution-badge').className = 'solution-badge alternative';
    solution3.querySelector('.solution-badge').textContent = '备选';
    solution3.querySelector('.solution-badge').className = 'solution-badge alternative';
    solution4.querySelector('.solution-badge').textContent = '备选';
    solution4.querySelector('.solution-badge').className = 'solution-badge alternative';

    if (selectedPlatforms.length === 0) {
        selectedSolution = 1;
        return;
    }

    const allSupportRTMP = selectedPlatforms.every(p => platforms[p].rtmpSupport);
    const hasLimitedPlatform = selectedPlatforms.some(p => !platforms[p].rtmpSupport);
    const rtmpSupportedPlatforms = selectedPlatforms.filter(p => platforms[p].rtmpSupport);
    const rtmpLimitedPlatforms = selectedPlatforms.filter(p => !platforms[p].rtmpSupport);

    if (allSupportRTMP && selectedPlatforms.length > 0) {
        selectedSolution = 1;
        solution1.classList.add('selected');
        solution1.querySelector('.solution-badge').textContent = '✨ 强烈推荐';
        solution1.querySelector('.solution-badge').className = 'solution-badge recommended';

        addRecommendationReason(
            '✨ 系统推荐：方案一（OBS + Multi RTMP）',
            `您选择的 ${selectedPlatforms.map(p => platforms[p].name).join('、')} 都支持RTMP推流，使用方案一可以获得最佳画质和最低的资源占用！`
        );
    } else if (hasLimitedPlatform && rtmpSupportedPlatforms.length > 0) {
        selectedSolution = 2;
        solution2.classList.add('selected');
        solution2.querySelector('.solution-badge').textContent = '✨ 强烈推荐';
        solution2.querySelector('.solution-badge').className = 'solution-badge recommended';

        const supportedNames = rtmpSupportedPlatforms.map(p => platforms[p].name).join('、');
        const limitedNames = rtmpLimitedPlatforms.map(p => platforms[p].name).join('、');
        addRecommendationReason(
            '✨ 系统推荐：方案二（混合方案）',
            `${supportedNames} 支持RTMP推流，但 ${limitedNames} 不支持或受限。混合方案可以让您同时享受RTMP的高画质和虚拟摄像头的兼容性！`
        );
    } else {
        selectedSolution = 3;
        solution3.classList.add('selected');
        solution3.querySelector('.solution-badge').textContent = '✨ 强烈推荐';
        solution3.querySelector('.solution-badge').className = 'solution-badge recommended';

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

function addRecommendationReason(title, reason) {
    let reasonBox = document.getElementById('recommendationReason');
    if (!reasonBox) {
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

document.querySelectorAll('.solution-card').forEach(card => {
    card.addEventListener('click', function() {
        document.querySelectorAll('.solution-card').forEach(c => c.classList.remove('selected'));
        this.classList.add('selected');

        if (this.id === 'solution1') selectedSolution = 1;
        else if (this.id === 'solution2') selectedSolution = 2;
        else if (this.id === 'solution3') selectedSolution = 3;
        else if (this.id === 'solution4') selectedSolution = 4;
        else selectedSolution = 1;

        updateManualSelectionMessage();
    });
});

function updateManualSelectionMessage() {
    const solutionNames = {
        1: '方案一（OBS + Multi RTMP）',
        2: '方案二（混合方案）',
        3: '方案三（虚拟摄像头）',
        4: '方案四（全手机直播）'
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

window.confirmSolution = function() {
    if (selectedPlatforms.length === 0) {
        alert('请先选择要开播的平台！');
        return;
    }

    const solutionNames = {
        1: 'OBS + Multi RTMP 插件',
        2: '混合方案（Multi RTMP + 虚拟摄像头）',
        3: '虚拟摄像头方案',
        4: '全手机直播方案'
    };

    if (selectedSolution === 3) {
        const message = `系统已为您推荐：${solutionNames[selectedSolution]}\n\n虚拟摄像头方案不需要获取RTMP推流地址，\n将直接进入OBS虚拟摄像头配置步骤。`;
        if (confirm(message)) {
            goToStep(4);
        }
    } else if (selectedSolution === 4) {
        const message = `系统已为您推荐：${solutionNames[selectedSolution]}\n\n手机直播方案无需OBS配置，\n将直接进入开播步骤指导！`;
        if (confirm(message)) {
            goToStep(5);
        }
    } else {
        const message = `系统已为您推荐：${solutionNames[selectedSolution]}\n\n点击"确定"继续获取各平台推流地址。`;
        if (confirm(message)) {
            goToStep(3);
        }
    }
};

window.goToStep = goToStep;
async function goToStep(step) {
    if (step === 2 && selectedPlatforms.length === 0) {
        alert('请先选择要开播的平台！');
        return;
    }

    document.querySelectorAll('.step-section').forEach(section => {
        section.style.display = 'none';
    });

    document.getElementById(`step${step}`).style.display = 'block';

    document.querySelectorAll('.step-item').forEach((item, index) => {
        item.classList.remove('active');
        item.classList.remove('skipped');

        const stepNumber = index + 1;

        if (selectedSolution === 3 && stepNumber === 3) {
            item.classList.add('skipped');
        } else if (selectedSolution === 4 && (stepNumber === 3 || stepNumber === 4)) {
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

    if (step === 3 || step === 4 || step === 5) {
        const modules = await getStepModules();
        if (step === 3) {
            modules.generatePlatformGuides(selectedPlatforms, selectedSolution);
        } else if (step === 4) {
            modules.generateOBSConfiguration(selectedPlatforms, selectedSolution);
        } else if (step === 5) {
            modules.generateFinalSteps(selectedPlatforms, selectedSolution);
        }
    }

    window.scrollTo({ top: 0, behavior: 'smooth' });
}

window.showPluginModal = function() {
    document.getElementById('pluginModal').style.display = 'flex';
};

window.closeModal = function() {
    document.getElementById('pluginModal').style.display = 'none';
};

window.startStreaming = function() {
    const checkboxes = document.querySelectorAll('.completion-checklist input[type="checkbox"]');
    const allChecked = Array.from(checkboxes).every(cb => cb.checked);

    if (!allChecked) {
        const confirmResult = window.confirm('您还没有完成所有检查项，确定要开始直播吗？');
        if (!confirmResult) return;
    }

    alert('🎉 恭喜！您已准备好开始多平台同步直播！\n\n祝您直播顺利！');
};

document.getElementById('pluginModal')?.addEventListener('click', function(e) {
    if (e.target === this) {
        window.closeModal();
    }
});

document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape') {
        window.closeModal();
    }
});
