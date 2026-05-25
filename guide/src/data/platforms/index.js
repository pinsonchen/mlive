export const platforms = {
    taobao: {
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
        }
    },
    douyin: {
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
        }
    },
    xiaohongshu: {
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
        }
    },
    shipinhao: {
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
        }
    }
};

const _cache = new Map();

export async function getPlatform(id) {
    if (_cache.has(id)) return _cache.get(id);
    const mod = await import(`./chunks/${id}.js`);
    _cache.set(id, mod.default);
    return mod.default;
}
