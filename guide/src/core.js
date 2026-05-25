import { platforms } from './data/platforms/index.js';

let selectedPlatforms = [];
let selectedSolution = 1;
let currentStep = 1;

const TOTAL_STEPS = 5;
const STEP_DURATIONS = [2, 3, 5, 8, 2];
const STORAGE_KEY = 'mlive-wizard-state';
const STORAGE_VERSION = 1;

function saveState() {
    try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify({
            selectedPlatforms,
            selectedSolution,
            currentStep,
            version: STORAGE_VERSION
        }));
    } catch (e) { /* quota exceeded or private mode */ }
}

function clearState() {
    try { localStorage.removeItem(STORAGE_KEY); } catch (e) {}
    const banner = document.getElementById('resumeBanner');
    if (banner) banner.hidden = true;
}

function restoreState() {
    let data;
    try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return;
        data = JSON.parse(raw);
    } catch (e) { return; }

    if (!data || data.version !== STORAGE_VERSION) {
        clearState();
        return;
    }

    if (!data.selectedPlatforms?.length && data.currentStep <= 1) return;

    const banner = document.getElementById('resumeBanner');
    if (!banner) return;

    const stepLabel = banner.querySelector('.resume-step-label');
    if (stepLabel) stepLabel.textContent = data.currentStep;

    banner.hidden = false;

    banner.querySelector('.resume-continue')?.addEventListener('click', () => {
        applyRestoredState(data);
        banner.hidden = true;
    }, { once: true });

    banner.querySelector('.resume-start-over')?.addEventListener('click', () => {
        clearState();
    }, { once: true });
}

function applyRestoredState(data) {
    if (data.selectedPlatforms?.length) {
        document.querySelectorAll('input[name="platform"]').forEach(cb => {
            cb.checked = data.selectedPlatforms.includes(cb.value);
        });
        updatePlatformSelection();
    }

    if (data.selectedSolution) {
        selectedSolution = data.selectedSolution;
        document.querySelectorAll('.solution-card').forEach(c => c.classList.remove('selected'));
        const card = document.getElementById(`solution${selectedSolution}`);
        if (card) card.classList.add('selected');
    }

    if (data.currentStep > 1) {
        goToStep(data.currentStep);
    }
}

window.clearWizardState = clearState;

function updateProgressBar(step) {
    const percentage = ((step - 1) / (TOTAL_STEPS - 1)) * 100;
    const fill = document.querySelector('.progress-bar-fill');
    const estimate = document.querySelector('.time-estimate');
    if (fill) fill.style.width = percentage + '%';
    if (estimate) {
        const remaining = STEP_DURATIONS.slice(step - 1).reduce((a, b) => a + b, 0);
        estimate.textContent = remaining > 0 ? `~${remaining} 分钟剩余` : '';
    }
}

document.querySelectorAll('.step-item').forEach(item => {
    item.addEventListener('click', () => {
        if (item.classList.contains('completed')) {
            const step = parseInt(item.dataset.step, 10);
            goToStep(step);
        }
    });
});

updateProgressBar(1);

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
    saveState();
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
    const allCards = [solution1, solution2, solution3, solution4];

    allCards.forEach(card => {
        card.classList.remove('selected', 'best-match');
        card.removeAttribute('data-best-match');
    });

    solution1.querySelector('.solution-badge').textContent = '推荐';
    solution1.querySelector('.solution-badge').className = 'solution-badge alternative';
    solution2.querySelector('.solution-badge').textContent = '备选';
    solution2.querySelector('.solution-badge').className = 'solution-badge alternative';
    solution3.querySelector('.solution-badge').textContent = '备选';
    solution3.querySelector('.solution-badge').className = 'solution-badge alternative';
    solution4.querySelector('.solution-badge').textContent = '备选';
    solution4.querySelector('.solution-badge').className = 'solution-badge alternative';

    const confirmUI = document.getElementById('inlineConfirmUI');
    if (confirmUI) confirmUI.classList.remove('visible');

    if (selectedPlatforms.length === 0) {
        selectedSolution = 1;
        return;
    }

    const allSupportRTMP = selectedPlatforms.every(p => platforms[p].rtmpSupport);
    const hasLimitedPlatform = selectedPlatforms.some(p => !platforms[p].rtmpSupport);
    const rtmpSupportedPlatforms = selectedPlatforms.filter(p => platforms[p].rtmpSupport);
    const rtmpLimitedPlatforms = selectedPlatforms.filter(p => !platforms[p].rtmpSupport);

    let recommendedCard = null;

    if (allSupportRTMP && selectedPlatforms.length > 0) {
        selectedSolution = 1;
        recommendedCard = solution1;
        addRecommendationReason(
            '✨ 系统推荐：方案一（OBS + Multi RTMP）',
            `您选择的 ${selectedPlatforms.map(p => platforms[p].name).join('、')} 都支持RTMP推流，使用方案一可以获得最佳画质和最低的资源占用！`
        );
    } else if (hasLimitedPlatform && rtmpSupportedPlatforms.length > 0) {
        selectedSolution = 2;
        recommendedCard = solution2;
        const supportedNames = rtmpSupportedPlatforms.map(p => platforms[p].name).join('、');
        const limitedNames = rtmpLimitedPlatforms.map(p => platforms[p].name).join('、');
        addRecommendationReason(
            '✨ 系统推荐：方案二（混合方案）',
            `${supportedNames} 支持RTMP推流，但 ${limitedNames} 不支持或受限。混合方案可以让您同时享受RTMP的高画质和虚拟摄像头的兼容性！`
        );
    } else {
        selectedSolution = 3;
        recommendedCard = solution3;
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

    recommendedCard.classList.add('selected', 'best-match');
    recommendedCard.setAttribute('data-best-match', 'true');
    recommendedCard.querySelector('.solution-badge').textContent = 'Best for your setup';
    recommendedCard.querySelector('.solution-badge').className = 'solution-badge best-match';

    if (confirmUI) {
        const solutionNames = {
            1: 'OBS + Multi RTMP 插件',
            2: '混合方案（Multi RTMP + 虚拟摄像头）',
            3: '虚拟摄像头方案',
            4: '全手机直播方案'
        };
        const desc = confirmUI.querySelector('.confirm-desc');
        if (desc) desc.textContent = `系统已为您推荐：${solutionNames[selectedSolution]}`;
        confirmUI.classList.add('visible');
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
        saveState();
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

    if (selectedSolution === 3) {
        goToStep(4);
    } else if (selectedSolution === 4) {
        goToStep(5);
    } else {
        goToStep(3);
    }
};

window.acceptRecommendation = function() {
    window.confirmSolution();
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
    saveState();

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

    updateProgressBar(step);
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

// Roving tabindex keyboard navigation
function setupRovingTabindex(container, selector) {
    const items = container.querySelectorAll(selector);
    if (items.length === 0) return;

    container.addEventListener('keydown', function(e) {
        const currentItems = container.querySelectorAll(selector);
        const currentIndex = Array.from(currentItems).indexOf(document.activeElement);
        if (currentIndex === -1) return;

        let nextIndex = -1;
        if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
            e.preventDefault();
            nextIndex = (currentIndex + 1) % currentItems.length;
        } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
            e.preventDefault();
            nextIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
        }

        if (nextIndex !== -1) {
            currentItems.forEach(item => item.setAttribute('tabindex', '-1'));
            currentItems[nextIndex].setAttribute('tabindex', '0');
            currentItems[nextIndex].focus();
        }
    });
}

const platformGrid = document.querySelector('.platform-grid');
if (platformGrid) {
    const cards = platformGrid.querySelectorAll('.platform-card');
    cards.forEach((card, i) => {
        card.setAttribute('tabindex', i === 0 ? '0' : '-1');
    });
    setupRovingTabindex(platformGrid, '.platform-card');
}

const solutionCards = document.querySelector('.solution-cards');
if (solutionCards) {
    setupRovingTabindex(solutionCards, '.solution-card');
}

// Enter/Space to select solution cards
document.querySelectorAll('.solution-card').forEach(card => {
    card.addEventListener('keydown', function(e) {
        if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault();
            this.click();
        }
    });
});

// Focus trap for modal
let previouslyFocusedElement = null;

const originalShowPluginModal = window.showPluginModal;
window.showPluginModal = function() {
    previouslyFocusedElement = document.activeElement;
    originalShowPluginModal();
    const modal = document.getElementById('pluginModal');
    requestAnimationFrame(() => {
        const focusable = getFocusableElements(modal);
        if (focusable.length > 0) focusable[0].focus();
    });
};

const originalCloseModal = window.closeModal;
window.closeModal = function() {
    originalCloseModal();
    if (previouslyFocusedElement) {
        previouslyFocusedElement.focus();
        previouslyFocusedElement = null;
    }
};

function getFocusableElements(container) {
    return Array.from(container.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    ));
}

document.getElementById('pluginModal')?.addEventListener('keydown', function(e) {
    if (e.key !== 'Tab') return;
    const modal = document.querySelector('#pluginModal .modal-content');
    const focusable = getFocusableElements(modal);
    if (focusable.length === 0) return;

    const first = focusable[0];
    const last = focusable[focusable.length - 1];

    if (e.shiftKey) {
        if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
        }
    } else {
        if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
        }
    }
});

restoreState();
