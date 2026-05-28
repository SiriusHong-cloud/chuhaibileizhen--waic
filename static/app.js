// 出海避雷针 V2.0 - 前端交互逻辑
// 克莱因蓝色彩体系 + 4-Tab布局

// ========== 超强JSON垃圾清除（在任何渲染之前调用） ==========
function _nuclearCleanJson(text) {
    if (!text) return '';
    var t = text;
    var cutKeywords = ['附带详细评分', '评分数据', '评分与', '评分逻辑说明', '量化评分'];
    for (var i = 0; i < cutKeywords.length; i++) {
        var idx = t.indexOf(cutKeywords[i]);
        if (idx > -1) {
            t = t.substring(0, idx);
        }
    }
    var jsonIdx = t.indexOf('```json');
    if (jsonIdx > -1) t = t.substring(0, jsonIdx);
    var scoreIdx = t.indexOf('{"score"');
    if (scoreIdx > -1) t = t.substring(0, scoreIdx);
    t = t.replace(/\n\s*"score"\s*:[\s\S]*$/g, '');
    t = t.replace(/```\w*/g, '');
    t = t.replace(/^\s*"[a-zA-Z_]+"[\s]*:[\s]*.+$/gm, '');
    t = t.replace(/^\s*[\{\}\[\]]\s*[,]*\s*$/gm, '');
    return t.trim();
}

// ========== Markdown 渲染 V5 (Klein Blue色彩) ==========
function _parseMd(md) {
    if (!md) return '';
    var html = _nuclearCleanJson(md);
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

    // 阶段1：强制断行
    html = html.replace(/([^\n])(#{1,4}\s)/g, '$1\n\n$2');
    var _emojiSet = '🔴|🟠|🟡|🟢|✅|💡|⚠️|💥|⚡|📋|📌|🔍|🎯|📡|🔧|💰|⏰|📱|💳|🎨|📅|📊|📖|⭐|🚨|🔒|🛡️|❌|✔️|✍️|🏷️|🧾';
    var _emojiRe = new RegExp('([^\\n])(' + _emojiSet + ')', 'g');
    html = html.replace(_emojiRe, '$1\n\n$2');
    html = html.replace(/([^\n])(\d+\.\s)/g, '$1\n$2');

    // 阶段2：Markdown → HTML转换 (克莱因蓝配色)
    html = html.replace(/^#### (.+)$/gm, '<h4 style="color:#001A5E;font-size:15px;font-weight:600;margin:18px 0 8px;padding-top:8px;clear:both;">$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3 style="color:#002FA7;font-size:16px;font-weight:700;margin:22px 0 10px;border-bottom:1px solid rgba(0,47,167,0.2);padding-bottom:5px;padding-top:10px;clear:both;">$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2 style="color:#002FA7;font-size:18px;font-weight:700;margin:26px 0 12px;border-left:4px solid #002FA7;padding-left:12px;padding-top:12px;clear:both;">$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1 style="color:#001A5E;font-size:22px;font-weight:700;margin:30px 0 16px;padding-top:14px;clear:both;">$1</h1>');

    // 加粗
    html = html.replace(/\*\*\*(.+?)\*\*\*/g, '<strong style="color:#002FA7;">$1</strong>');
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong style="color:#001A5E;font-weight:700;background:rgba(0,47,167,0.06);padding:1px 4px;border-radius:3px;">$1</strong>');
    html = html.replace(/(?<!\*)\*([^*]+?)\*(?!\*)/g, '<em>$1</em>');

    // 代码 (克莱因蓝背景)
    html = html.replace(/`([^`]+)`/g, '<code style="background:rgba(0,47,167,0.08);padding:2px 6px;border-radius:3px;font-size:13px;">$1</code>');

    // 分隔线
    html = html.replace(/^---+$/gm, '<hr style="border:none;border-top:2px solid rgba(0,47,167,0.15);margin:20px 0;">');

    // 引用
    html = html.replace(/^&gt;\s?(.+)$/gm, '<blockquote style="border-left:3px solid #002FA7;padding:8px 12px;color:#4a5568;margin:12px 0;background:rgba(0,47,167,0.03);border-radius:0 6px 6px 0;">$1</blockquote>');

    // 列表
    html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li style="margin-bottom:6px;line-height:1.7;">$1</li>');
    html = html.replace(/((?:<li[\s>][\s\S]*?<\/li>\s*)+)/g, '<ul style="margin-left:20px;margin-bottom:12px;">$1</ul>');
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li style="margin-bottom:6px;line-height:1.7;">$1</li>');

    // 阶段3：emoji行 → 独立div块
    var _emojiDivRe = new RegExp('^(' + _emojiSet + ')(.+)$', 'gm');
    html = html.replace(_emojiDivRe, '<div style="margin:16px 0 8px;padding:8px 12px;background:rgba(0,47,167,0.03);border-radius:6px;font-size:14.5px;font-weight:600;line-height:1.8;border-left:3px solid rgba(0,47,167,0.2);">$1$2</div>');

    // 阶段4：关键词彩色标签 (克莱因蓝配色)
    html = html.replace(/\*\*(原因[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(案例[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(修正[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(建议[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(法规[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(下一步[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(风险等级[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(问题诊断[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(详细分析[：:])\*\*/g, '$1');
    html = html.replace(/\*\*(行动建议[：:])\*\*/g, '$1');

    html = html.replace(/(风险等级[：:])/g, '<span style="display:inline-block;background:#dc2626;color:#fff;padding:2px 8px;border-radius:4px;font-weight:700;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(问题诊断[：:])/g, '<span style="display:inline-block;background:#ea580c;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(详细分析[：:])/g, '<span style="display:inline-block;background:#001A5E;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(原因[：:])/g, '<span style="display:inline-block;background:#002FA7;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(案例[：:])/g, '<span style="display:inline-block;background:#ea580c;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(修正[：:])/g, '<span style="display:inline-block;background:#22c55e;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(行动建议[：:])/g, '<span style="display:inline-block;background:#002FA7;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(建议[：:])/g, '<span style="display:inline-block;background:#002FA7;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(法规[：:])/g, '<span style="display:inline-block;background:#6b7280;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');
    html = html.replace(/(下一步[：:])/g, '<span style="display:inline-block;background:#002FA7;color:#fff;padding:2px 8px;border-radius:4px;font-weight:600;font-size:12px;margin:4px 0;">$1</span> ');

    // 阶段5：段落换行 + 包裹
    html = html.replace(/\n{2,}/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    html = '<p style="line-height:1.9;font-size:13px;color:#333;text-indent:2em;margin-bottom:10px;">' + html + '</p>';

    // 阶段6：清理
    html = html.replace(/<p[^>]*>\s*<\/p>/g, '');
    html = html.replace(/<p[^>]*>\s*(<h[1-4][ >])/g, '$1');
    html = html.replace(/(<\/h[1-4]>)\s*<\/p>/g, '$1');
    html = html.replace(/<p[^>]*>\s*(<ul[ >])/g, '$1');
    html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
    html = html.replace(/<p[^>]*>\s*(<blockquote[ >])/g, '$1');
    html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');
    html = html.replace(/<p[^>]*>\s*(<hr)/g, '$1');
    html = html.replace(/<p[^>]*>\s*(<div[ >])/g, '$1');
    html = html.replace(/(<\/div>)\s*<\/p>/g, '$1');
    html = html.replace(/<p[^>]*>\s*(<br>)+/g, '');
    html = html.replace(/(<br>)+\s*<\/p>/g, '');
    html = html.replace(/(<div[^>]*>)<br>/g, '$1');
    html = html.replace(/<br>(<\/div>)/g, '$1');
    return html;
}

function renderMarkdown(el, md) {
    el.innerHTML = _parseMd(md);
}

let _renderTimer = null;
function renderMarkdownDebounced(el, md, delay) {
    delay = delay || 150;
    clearTimeout(_renderTimer);
    _renderTimer = setTimeout(function() { renderMarkdown(el, md); }, delay);
}

// ========== 市场选项数据 ==========
const MARKETS = [
    { value: '日本', flag: '🇯🇵' },
    { value: '韩国', flag: '🇰🇷' },
    { value: '美国', flag: '🇺🇸' },
    { value: '德国', flag: '🇩🇪' },
    { value: '法国', flag: '🇫🇷' },
    { value: '英国', flag: '🇬🇧' },
    { value: '欧盟', flag: '🇪🇺' },
    { value: '印尼', flag: '🇮🇩' },
    { value: '马来西亚', flag: '🇲🇾' },
    { value: '越南', flag: '🇻🇳' },
    { value: '泰国', flag: '🇹🇭' },
    { value: '沙特阿拉伯', flag: '🇸🇦' },
    { value: '阿联酋', flag: '🇦🇪' },
    { value: '巴西', flag: '🇧🇷' },
    { value: '墨西哥', flag: '🇲🇽' },
    { value: '印度', flag: '🇮🇳' },
    { value: '澳大利亚', flag: '🇦🇺' },
    { value: '新加坡', flag: '🇸🇬' },
    { value: '加拿大', flag: '🇨🇦' },
    { value: '俄罗斯', flag: '🇷🇺' },
    { value: '意大利', flag: '🇮🇹' },
    { value: '西班牙', flag: '🇪🇸' },
    { value: '土耳其', flag: '🇹🇷' },
    { value: '以色列', flag: '🇮🇱' },
    { value: '南非', flag: '🇿🇦' },
    { value: '波兰', flag: '🇵🇱' },
    { value: '瑞典', flag: '🇸🇪' },
    { value: '瑞士', flag: '🇨🇭' },
    { value: '阿根廷', flag: '🇦🇷' },
    { value: '智利', flag: '🇨🇱' },
    { value: '哥伦比亚', flag: '🇨🇴' },
    { value: '中国香港', flag: '🇭🇰' },
    { value: '中国台湾', flag: '🇹🇼' },
    { value: '菲律宾', flag: '🇵🇭' },
    { value: '新西兰', flag: '🇳🇿' },
    { value: '尼日利亚', flag: '🇳🇬' },
    { value: '埃及', flag: '🇪🇬' },
    { value: '肯尼亚', flag: '🇰🇪' },
    { value: '巴基斯坦', flag: '🇵🇰' },
    { value: '孟加拉国', flag: '🇧🇩' },
    { value: '缅甸', flag: '🇲🇲' },
    { value: '柬埔寨', flag: '🇰🇭' },
    { value: '老挝', flag: '🇱🇦' },
    { value: '文莱', flag: '🇧🇳' },
    { value: '卡塔尔', flag: '🇶🇦' },
    { value: '科威特', flag: '🇰🇼' },
    { value: '巴林', flag: '🇧🇭' },
    { value: '阿曼', flag: '🇴🇲' },
    { value: '蒙古', flag: '🇲🇳' },
    { value: '斯里兰卡', flag: '🇱🇰' },
    { value: '东南亚', flag: '🌏' },
];

function generateMarketOptions() {
    return MARKETS.map(m => `<option value="${m.value}">${m.flag} ${m.value}</option>`).join('');
}

// 初始化所有市场select
document.addEventListener('DOMContentLoaded', function() {
    document.querySelectorAll('.market-select').forEach(function(sel) {
        sel.innerHTML = '<option value="">请选择市场...</option>' + generateMarketOptions();
    });
});

// ========== i18n ==========
const i18n = {
    zh: {
        navTitle: "出海避雷针",
        navSubtitle: "跨境出海AI顾问",
        historyBtn: "📋 历史记录",
        mapTitle: "🗺️ 全球出海风险热力图",
        legendHigh: "高风险", legendMedHigh: "中高风险", legendMed: "中风险", legendLow: "低风险",
        quickScan: "⚡ 快速检测", selectMarket: "选择市场...", selectCategory: "选择品类模板...",
        startScan: "⚡ 开始扫描", categoryTemplates: "📂 品类模板", newsTitle: "📰 出海动态速报",
        enterApp: "进入完整检测 →", backHome: "← 返回风险地图",
        categoryLabel: "品类模板：",
        culturalTab: "🎯 文化雷区检测", complianceTab: "📡 合规雷达扫描",
        localizeTab: "🔧 本土化改造", storiesTab: "💥 踩雷故事",
        fullReport: "⚡ 一键完整报告",
        culturalTitle: "🎯 文化雷区检测", culturalDesc: "输入产品信息和目标市场，AI帮你扫描7大文化维度的风险",
        complianceTitle: "📡 合规雷达扫描", complianceDesc: "输入目标市场和产品品类，AI帮你扫描5大合规维度",
        localizeTitle: "🔧 本土化改造方案", localizeDesc: "输入中文内容和目标市场，AI提供深度本土化改造建议",
        storiesTitle: "💥 踩雷故事", storiesDesc: "选择市场和品类，AI讲一个真实的踩雷案例给你听",
        targetMarket: "目标市场", productLabel: "产品/品牌", contentType: "内容类型",
        productCategory: "产品品类", businessModel: "业务模式", originalContent: "原始中文内容",
        startScanBtn: "⚡ 开始扫描", startLocalizeBtn: "⚡ 开始改造", startStoryBtn: "⚡ 讲个故事",
        scanning: "AI正在扫描", analyzing: "AI正在分析中...",
        historyTitle: "📋 历史记录", noHistory: "暂无历史记录",
        scoreSafe: "安全出海", scoreCaution: "谨慎出海", scoreDanger: "高危预警", scoreForbidden: "禁止出海",
        scoreSafeEmoji: "🟢 安全出海 — 放心干",
        scoreCautionEmoji: "🟡 谨慎出海 — 有雷但能避",
        scoreDangerEmoji: "🟠 高危预警 — 必须整改",
        scoreForbiddenEmoji: "🔴 禁止出海 — 先把雷全排了",
        radarTitle: "📊 竞品对比雷达图", yourProduct: "你的产品", bestPractice: "市场最佳实践",
        gapPrefix: "最大差距", suggestPrefix: "优先改善",
        modalStartScan: "开始该国详细检测",
        tabMap: "🗺️ 风险地图",
        tabDiagnosis: "🛡️ 合规诊断",
        tabAdvisor: "💼 出海顾问",
        tabAcademy: "📚 新手学院",
        searchPlaceholder: "搜索市场/品类/平台",
    },
    en: {
        navTitle: "Global Risk Shield",
        navSubtitle: "Cross-Border AI Advisor",
        historyBtn: "📋 History",
        mapTitle: "🗺️ Global Risk Heatmap",
        legendHigh: "High Risk", legendMedHigh: "Med-High", legendMed: "Medium", legendLow: "Low Risk",
        quickScan: "⚡ Quick Scan", selectMarket: "Select Market...", selectCategory: "Category Template...",
        startScan: "⚡ Start Scan", categoryTemplates: "📂 Category Templates", newsTitle: "📰 Regulatory Updates",
        enterApp: "Enter Full Scan →", backHome: "← Back to Risk Map",
        categoryLabel: "Category: ",
        culturalTab: "🎯 Cultural Risks", complianceTab: "📡 Compliance Radar",
        localizeTab: "🔧 Localization", storiesTab: "💥 Cautionary Tales",
        fullReport: "⚡ Full Report",
        culturalTitle: "🎯 Cultural Risk Scan", culturalDesc: "Enter product info and target market.",
        complianceTitle: "📡 Compliance Radar", complianceDesc: "Enter market and category.",
        localizeTitle: "🔧 Localization Plan", localizeDesc: "Enter Chinese content and target market.",
        storiesTitle: "💥 Cautionary Tales", storiesDesc: "Select market and category to hear a real story.",
        targetMarket: "Target Market", productLabel: "Product/Brand", contentType: "Content Type",
        productCategory: "Category", businessModel: "Business Model", originalContent: "Original Content",
        startScanBtn: "⚡ Start Scan", startLocalizeBtn: "⚡ Start Localizing", startStoryBtn: "⚡ Tell Me a Story",
        scanning: "AI Scanning", analyzing: "AI Analyzing...",
        historyTitle: "📋 History", noHistory: "No history yet",
        scoreSafe: "Safe to Launch", scoreCaution: "Proceed with Caution", scoreDanger: "High Risk", scoreForbidden: "Do Not Launch",
        scoreSafeEmoji: "🟢 Safe to Launch — Go Ahead",
        scoreCautionEmoji: "🟡 Proceed with Caution — Risks Exist",
        scoreDangerEmoji: "🟠 High Risk — Must Fix",
        scoreForbiddenEmoji: "🔴 Do Not Launch — Clear All Risks First",
        radarTitle: "📊 Competitor Radar", yourProduct: "Your Product", bestPractice: "Market Best Practice",
        gapPrefix: "Biggest Gap", suggestPrefix: "Priority Fix",
        modalStartScan: "Start Detailed Scan for This Market",
        tabMap: "🗺️ Risk Map",
        tabDiagnosis: "🛡️ Diagnosis",
        tabAdvisor: "💼 Advisor",
        tabAcademy: "📚 Academy",
        searchPlaceholder: "Search market/category/platform",
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';

function t(key) { return i18n[currentLang][key] || key; }

function updateLanguage() {
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === currentLang));
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[currentLang][key]) el.placeholder = i18n[currentLang][key];
    });
}

document.querySelectorAll('.lang-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        currentLang = btn.dataset.lang;
        localStorage.setItem('lang', currentLang);
        updateLanguage();
    });
});

updateLanguage();

// ========== Tab 切换 ==========
document.querySelectorAll('.tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
        document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
        document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
        btn.classList.add('active');
        document.getElementById(`tab-${btn.dataset.tab}`).classList.add('active');
    });
});

function navigateToTab(tabName) {
    document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.tab-content').forEach(c => c.classList.remove('active'));
    document.querySelector(`.tab-btn[data-tab="${tabName}"]`).classList.add('active');
    document.getElementById(`tab-${tabName}`).classList.add('active');
}

// ========== 品类模板 ==========
let currentCategory = '';

function setCategory(cat) {
    currentCategory = cat;
    document.querySelectorAll('.cat-btn').forEach(b => b.classList.toggle('active', b.dataset.cat === cat));
}

function selectTemplate(cat) {
    currentCategory = cat;
    enterApp();
    setCategory(cat);
}

// ========== 首页/应用切换 ==========
function enterApp() {
    navigateToTab('diagnosis');
    window.scrollTo(0, 0);
}

function backToHome() {
    navigateToTab('map');
    window.scrollTo(0, 0);
}

document.querySelector('.navbar-brand').addEventListener('click', () => {
    backToHome();
});

// ========== 历史记录面板 ==========
const historyPanel = document.getElementById('history-panel');
const historyToggle = document.getElementById('historyToggle');

historyToggle.addEventListener('click', toggleHistory);

function toggleHistory() {
    historyPanel.classList.toggle('open');
    if (historyPanel.classList.contains('open')) loadHistory();
}

async function loadHistory() {
    try {
        const res = await fetch('/api/history');
        const data = await res.json();
        const list = document.getElementById('history-list');
        if (data.length === 0) {
            list.innerHTML = `<p style="text-align:center;color:var(--text-muted);padding:32px 0;">${t('noHistory')}</p>`;
            return;
        }
        const moduleNames = { cultural: '文化检测', compliance: '合规扫描', localize: '本土化', stories: '踩雷故事', tariff: '关税估算', cert: '认证查询', crisis: '危机处置', customs: '报关助手', 'brand-name': '品牌本土化', platform: '平台入驻', consult: '顾问咨询', qa: 'AI问答', roadmap: '出海路线图' };
        list.innerHTML = data.map(item => `
            <div class="history-item" onclick="loadHistoryDetail(${item.id})">
                <div class="top">
                    <span class="module-tag ${item.module_type}">${moduleNames[item.module_type] || item.module_type}</span>
                    <span class="date">${new Date(item.created_at).toLocaleString('zh-CN')}</span>
                </div>
                <p class="info">${item.market} · ${item.product || ''}</p>
            </div>
        `).join('');
    } catch (e) { console.error('加载历史记录失败:', e); }
}

async function loadHistoryDetail(id) {
    try {
        const res = await fetch(`/api/history/${id}`);
        const data = await res.json();
        const resultArea = document.getElementById('result-area');
        resultArea.classList.add('show');
        hidePanels();
        document.getElementById('result-content').innerHTML = _parseMd(data.output_data);
        document.getElementById('result-time').textContent = new Date(data.created_at).toLocaleString('zh-CN');
        const moduleNames = { cultural: '🎯 文化雷区检测报告', compliance: '📡 合规雷达扫描报告', localize: '🔧 本土化改造方案', stories: '💥 踩雷故事', tariff: '💰 关税税务估算', cert: '✅ 产品准入认证', crisis: '🆘 危机处置方案', customs: '🧾 报关助手报告', 'brand-name': '📛 品牌名称本土化检测', platform: '🏪 平台入驻指南', consult: '💼 顾问咨询', qa: '🤖 AI智能问答', roadmap: '🗺️ 出海路线图' };
        document.getElementById('result-title').textContent = moduleNames[data.module_type] || '检测报告';
        resultArea.scrollIntoView({ behavior: 'smooth' });
    } catch (e) { console.error('加载详情失败:', e); }
}

function hidePanels() {
    document.getElementById('score-panel').style.display = 'none';
    document.getElementById('radar-panel').style.display = 'none';
}

// ========== 扫描动画 ==========
const scanDimensionsMap = {
    cultural: ['宗教禁忌', '颜色象征', '数字禁忌', '动物图案', '肢体语言', '性别文化', '历史敏感'],
    compliance: ['数据隐私', '产品认证', '广告法规', '电商合规', '知识产权'],
    localize: ['产品命名', '营销话术', '视觉建议', '节日营销', '支付物流', '社媒平台'],
    stories: ['案例检索', '风险分析', '教训总结'],
    tariff: ['HS归类', '关税税率', '增值税率', '优惠税率', '申报要素'],
    cert: ['认证类型', '适用标准', '申请流程', '所需材料', '认证周期'],
    crisis: ['舆情监测', '危机定级', '响应策略', '媒体沟通', '后续处置'],
    customs: ['HS归类', '申报要素', '报关单证', '监管条件', '检验检疫'],
    'brand-name': ['文化含义', '发音歧义', '商标冲突', '宗教敏感', '市场接受度'],
    platform: ['入驻条件', '资质要求', '佣金结构', '物流方案', '运营支持'],
    consult: ['需求分析', '方案设计', '风险评估', '成本估算', '落地建议'],
    qa: ['问题理解', '知识检索', '方案生成', '风险评估'],
    roadmap: ['市场调研', '合规准备', '平台选择', '物流搭建', '本地运营', '品牌建设'],
};

function showScanAnimation(moduleType) {
    const overlay = document.getElementById('scan-overlay');
    const dimsContainer = document.getElementById('scan-dimensions');
    const dims = scanDimensionsMap[moduleType] || [];
    dimsContainer.innerHTML = dims.map(d => `<span class="scan-dim-tag">${d}</span>`).join('');
    overlay.classList.add('show');
    const tags = dimsContainer.querySelectorAll('.scan-dim-tag');
    tags.forEach((tag, i) => {
        setTimeout(() => {
            if (i > 0) tags[i - 1].classList.remove('scanning');
            tag.classList.add('scanning');
            if (i > 0) tags[i - 1].classList.add('scanned');
        }, i * 600);
    });
}

function hideScanAnimation() {
    document.getElementById('scan-overlay').classList.remove('show');
}

// ========== 评分解析与展示 ==========
function parseScore(text) {
    var riskLine = text.match(/\[RISK_SCORE\]\s*(.+)/);
    if (riskLine) {
        try {
            var parts = riskLine[1].split('|');
            var data = {};
            parts.forEach(function(part) {
                var kv = part.split(':');
                if (kv.length >= 2) {
                    var key = kv[0].trim();
                    var val = kv.slice(1).join(':').trim();
                    if (key === 'breakdown') {
                        data.breakdown = val.split(',').map(function(item) {
                            var m = item.match(/(.+?)([+-]\d+)$/);
                            if (m) return {item: m[1].trim(), change: parseInt(m[2]), type: parseInt(m[2]) >= 0 ? 'bonus' : 'deduct'};
                            return {item: item.trim(), change: 0, type: 'base'};
                        });
                    } else if (!isNaN(parseInt(val))) {
                        data[key] = parseInt(val);
                    } else {
                        data[key] = val;
                    }
                }
            });
            if (data.score !== undefined) {
                var result = {
                    score: data.score,
                    level: data.level || 'caution',
                    high_risks: data.high_risks || 0,
                    mid_risks: data.mid_risks || 0,
                    radar: {
                        cultural: data.cultural || 60,
                        compliance: data.compliance || 60,
                        brand: data.brand || 60,
                        localization: data.localization || 60,
                        visual: data.visual || 60,
                        logistics: data.logistics || 60
                    },
                    breakdown: data.breakdown || [{item: '基础分', change: 60, type: 'base'}]
                };
                return result;
            }
        } catch(e) { console.warn('RISK_SCORE parse error', e); }
    }
    var jsonMatch = text.match(/```json\s*([\s\S]*?)```/);
    if (!jsonMatch) return null;
    try {
        return JSON.parse(jsonMatch[1].trim());
    } catch { return null; }
}

function removeScoreJson(text) {
    if (!text) return '';
    var t = text;
    t = t.replace(/\[RISK_SCORE\][^\n]*/g, '');
    t = t.replace(/\[RISK_SCORE\]/g, '');
    t = t.replace(/```json\s*[\s\S]*?```/g, '');
    t = t.replace(/```json[\s\S]*$/g, '');
    t = t.replace(/```\w*/g, '');
    t = t.replace(/\{[\s]*"score"[\s]*:[\s\S]*?\}\s*$/g, '');
    t = t.replace(/附带详细评分[\s\S]*$/g, '');
    t = t.replace(/^\s*"[a-zA-Z_]+"[\s]*:[\s]*.+$/gm, '');
    t = t.replace(/^\s*[\{\}\[\]]\s*[,]*\s*$/gm, '');
    return t.trim();
}

function getScoreColor(score) {
    if (score >= 85) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 30) return '#EA580C';
    return '#EF4444';
}

function getScoreLevel(score) {
    if (score >= 85) return { text: t('scoreSafeEmoji'), color: '#10B981' };
    if (score >= 60) return { text: t('scoreCautionEmoji'), color: '#F59E0B' };
    if (score >= 30) return { text: t('scoreDangerEmoji'), color: '#EA580C' };
    return { text: t('scoreForbiddenEmoji'), color: '#EF4444' };
}

function showScorePanel(scoreData) {
    const panel = document.getElementById('score-panel');
    panel.style.display = 'block';

    const score = scoreData.score;
    const color = getScoreColor(score);
    const level = getScoreLevel(score);

    const segments = panel.querySelectorAll('.gauge-segment');
    segments.forEach((seg, i) => {
        const thresholds = [25, 50, 75, 100];
        seg.style.opacity = (score >= (i === 0 ? 0 : thresholds[i - 1])) ? '1' : '0.15';
    });

    const needle = document.getElementById('gauge-needle');
    const angle = -90 + (score / 100) * 180;
    needle.setAttribute('transform', `rotate(${angle},100,100)`);

    const valueEl = document.getElementById('score-value');
    animateCountUp(valueEl, 0, score, 1200, color);

    const levelEl = document.getElementById('score-level');
    levelEl.textContent = level.text;
    levelEl.style.color = level.color;

    const breakdownEl = document.getElementById('score-breakdown');
    if (scoreData.breakdown && scoreData.breakdown.length > 0) {
        breakdownEl.innerHTML = scoreData.breakdown.map(item => {
            const cls = item.type === 'deduct' ? 'deduct' : 'bonus';
            const sign = item.change > 0 ? '+' : '';
            return `<span class="breakdown-item ${cls}">${item.item} ${sign}${item.change}分</span>`;
        }).join('');
    } else {
        breakdownEl.innerHTML = '';
    }
}

function animateCountUp(el, start, end, duration, color) {
    const startTime = performance.now();
    el.style.color = color;
    function update(now) {
        const elapsed = now - startTime;
        const progress = Math.min(elapsed / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const current = Math.round(start + (end - start) * eased);
        el.textContent = current;
        if (progress < 1) requestAnimationFrame(update);
    }
    requestAnimationFrame(update);
}

// ========== 雷达图 (克莱因蓝配色) ==========
function showRadarPanel(scoreData) {
    if (!scoreData.radar) return;
    const panel = document.getElementById('radar-panel');
    panel.style.display = 'block';

    const dimLabels = ['文化适配', '合规达标', '品牌安全', '文案本土化', '视觉适配', '支付物流'];

    const market = getSelectedMarket();
    const bestPractice = getDefaultBestPractice(market);

    const yourProduct = [
        scoreData.radar.cultural || 0,
        scoreData.radar.compliance || 0,
        scoreData.radar.brand || 0,
        scoreData.radar.localization || 0,
        scoreData.radar.visual || 0,
        scoreData.radar.logistics || 0
    ];

    const chart = echarts.init(document.getElementById('radar-chart'));
    const option = {
        tooltip: {
            trigger: 'item',
            formatter: function(params) {
                if (params.componentType === 'series' && params.seriesType === 'radar') {
                    let html = '';
                    params.value.forEach((v, i) => {
                        html += `${dimLabels[i]}: ${v}<br>`;
                    });
                    return html;
                }
                return '';
            }
        },
        legend: {
            data: [t('yourProduct'), t('bestPractice')],
            bottom: 0,
            textStyle: { color: '#4a5568', fontSize: 13 }
        },
        radar: {
            indicator: dimLabels.map(d => ({ name: d, max: 100 })),
            radius: '65%',
            axisName: { color: '#4a5568', fontSize: 12 },
            splitArea: { areaStyle: { color: ['rgba(0,47,167,0.02)', 'rgba(0,47,167,0.04)'] } },
            splitLine: { lineStyle: { color: 'rgba(0,47,167,0.12)' } },
            axisLine: { lineStyle: { color: 'rgba(0,47,167,0.15)' } }
        },
        series: [{
            type: 'radar',
            data: [
                {
                    value: yourProduct,
                    name: t('yourProduct'),
                    symbol: 'circle',
                    symbolSize: 6,
                    lineStyle: { color: '#002FA7', width: 2 },
                    areaStyle: { color: 'rgba(0,47,167,0.15)' },
                    itemStyle: { color: '#002FA7' }
                },
                {
                    value: bestPractice,
                    name: t('bestPractice'),
                    symbol: 'diamond',
                    symbolSize: 6,
                    lineStyle: { color: '#94a3b8', width: 2, type: 'dashed' },
                    areaStyle: { color: 'rgba(148,163,184,0.05)' },
                    itemStyle: { color: '#94a3b8' }
                }
            ],
            animationDuration: 1500,
            animationEasing: 'cubicOut'
        }]
    };
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());

    const gapsEl = document.getElementById('radar-gaps');
    const gaps = [];
    yourProduct.forEach((v, i) => {
        const gap = bestPractice[i] - v;
        if (gap > 15) gaps.push({ dim: dimLabels[i], gap, your: v, best: bestPractice[i] });
    });
    gaps.sort((a, b) => b.gap - a.gap);

    if (gaps.length > 0) {
        gapsEl.innerHTML = gaps.slice(0, 3).map(g =>
            `<div class="gap-item">
                <span class="gap-label">${t('gapPrefix')}: ${g.dim} (差${g.gap}分)</span>
                <span class="gap-suggestion">${t('suggestPrefix')}: ${g.dim}从${g.your}分提升至${g.best}分</span>
            </div>`
        ).join('');
    } else {
        gapsEl.innerHTML = '';
    }
}

function getDefaultBestPractice(market) {
    const defaults = { cultural: 80, compliance: 80, brand: 78, localization: 80, visual: 78, logistics: 78 };
    return [defaults.cultural, defaults.compliance, defaults.brand, defaults.localization, defaults.visual, defaults.logistics];
}

function getSelectedMarket() {
    const activeTab = document.querySelector('.tab-content.active');
    if (!activeTab) return '';
    const select = activeTab.querySelector('.market-select');
    return select ? select.value : '';
}

// ========== SSE 流式请求 ==========
async function streamRequest(url, body, title, moduleType) {
    const resultArea = document.getElementById('result-area');
    const resultContent = document.getElementById('result-content');
    const resultTitle = document.getElementById('result-title');
    const resultTime = document.getElementById('result-time');
    const loading = document.getElementById('loading-indicator');

    document.querySelectorAll('.btn-primary').forEach(b => b.disabled = true);
    showScanAnimation(moduleType);
    hidePanels();

    resultTitle.textContent = title;
    resultTime.textContent = new Date().toLocaleString('zh-CN');
    resultContent.innerHTML = '';
    loading.style.display = 'flex';

    let fullText = '';

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });

        if (!response.ok) throw new Error(`HTTP ${response.status}: ${response.statusText}`);

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let firstChunk = true;

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;

            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop();

            for (const line of lines) {
                if (!line.startsWith('data: ')) continue;
                const data = line.slice(6);
                if (data === '[DONE]') break;
                if (!data) continue;

                if (firstChunk) {
                    hideScanAnimation();
                    resultArea.classList.add('show');
                    resultArea.scrollIntoView({ behavior: 'smooth' });
                    firstChunk = false;
                }

                fullText += data;
                renderMarkdownDebounced(resultContent, removeScoreJson(fullText), 150);
            }
        }

        const scoreData = parseScore(fullText);
        if (scoreData) {
            showScorePanel(scoreData);
            showRadarPanel(scoreData);
        }
        resultContent.innerHTML = _parseMd(removeScoreJson(fullText));

    } catch (e) {
        hideScanAnimation();
        resultArea.classList.add('show');
        resultContent.innerHTML = `<div style="padding:16px;background:#FEF2F2;border:1px solid #FECACA;border-radius:8px;color:#991B1B;">
            <p style="font-weight:600;">请求失败</p>
            <p style="font-size:13px;margin-top:4px;">${e.message}</p>
            <p style="font-size:13px;margin-top:8px;color:#666;">请检查后端服务是否运行</p>
        </div>`;
    } finally {
        loading.style.display = 'none';
        document.querySelectorAll('.btn-primary').forEach(b => b.disabled = false);
        if (historyPanel.classList.contains('open')) loadHistory();
    }
}

// ========== 各模块提交函数 ==========
function submitCultural() {
    const market = document.getElementById('cultural-market').value;
    const product = document.getElementById('cultural-product').value.trim();
    const contentType = document.getElementById('cultural-type').value;
    if (!market) { alert('请选择目标市场'); return; }
    if (!product) { alert('请输入产品/品牌信息'); return; }
    streamRequest('/api/cultural', { market, product, content_type: contentType, category: currentCategory }, '🎯 文化雷区检测报告', 'cultural');
}

function submitCompliance() {
    const market = document.getElementById('compliance-market').value;
    const product = document.getElementById('compliance-product').value.trim();
    const model = document.getElementById('compliance-model').value;
    if (!market) { alert('请选择目标市场'); return; }
    if (!product) { alert('请输入产品品类'); return; }
    streamRequest('/api/compliance', { market, product, business_model: model, category: currentCategory }, '📡 合规雷达扫描报告', 'compliance');
}

function submitLocalize() {
    const market = document.getElementById('localize-market').value;
    const content = document.getElementById('localize-content').value.trim();
    const contentType = document.getElementById('localize-type').value;
    if (!market) { alert('请选择目标市场'); return; }
    if (!content) { alert('请输入需要本土化的内容'); return; }
    streamRequest('/api/localize', { market, content, content_type: contentType, category: currentCategory }, '🔧 本土化改造方案', 'localize');
}

function submitStories() {
    const market = document.getElementById('stories-market').value;
    const product = document.getElementById('stories-product').value.trim();
    if (!market) { alert('请选择目标市场'); return; }
    if (!product) { alert('请输入品类'); return; }
    streamRequest('/api/stories', { market, product, category: currentCategory }, '💥 踩雷故事', 'stories');
}

// ========== PRO模块提交函数 ==========
function submitTariff() {
    const market = document.getElementById('tariff-market').value;
    const hs = document.getElementById('tariff-hs').value.trim();
    if (!market) { alert('请选择目标市场'); return; }
    if (!hs) { alert('请输入HS编码'); return; }
    streamRequest('/api/tariff', { market, hscode: hs, category: currentCategory }, '💰 关税税务估算报告', 'tariff');
}

function submitCert() {
    const market = document.getElementById('cert-market').value;
    const product = document.getElementById('cert-product').value.trim();
    if (!market) { alert('请选择目标市场'); return; }
    if (!product) { alert('请输入产品名称'); return; }
    streamRequest('/api/cert', { market, product, category: currentCategory }, '✅ 产品准入认证查询', 'cert');
}

function submitCustoms() {
    const market = document.getElementById('customs-market').value;
    const product = document.getElementById('customs-product').value.trim();
    if (!market) { alert('请选择目标市场'); return; }
    if (!product) { alert('请输入产品品名'); return; }
    streamRequest('/api/customs', { market, product, category: currentCategory }, '🧾 报关助手报告', 'cert');
}

function submitBrandName() {
    const market = document.getElementById('brand-market').value;
    const brandName = document.getElementById('brand-name').value.trim();
    if (!market) { alert('请选择目标市场'); return; }
    if (!brandName) { alert('请输入品牌名称'); return; }
    streamRequest('/api/brand-name', { market, brand_name: brandName, category: currentCategory }, '📛 品牌名称本土化检测', 'localize');
}

function submitCrisis() {
    const market = document.getElementById('crisis-market').value;
    const crisisType = document.getElementById('crisis-type').value;
    const desc = document.getElementById('crisis-desc').value.trim();
    if (!market) { alert('请选择市场'); return; }
    if (!desc) { alert('请描述危机情况'); return; }
    streamRequest('/api/crisis', { crisis_type: crisisType, market, description: desc, category: currentCategory }, '🆘 危机处置方案', 'crisis');
}

// ========== 快速扫描 ==========
function quickScan() {
    const market = document.getElementById('quick-market') ? document.getElementById('quick-market').value : '';
    if (!market) { alert('请先选择市场'); return; }
    enterApp();
    document.querySelectorAll('.market-select').forEach(s => s.value = market);
    submitCultural();
}

function quickStory(market, product) {
    enterApp();
    document.querySelectorAll('.market-select').forEach(s => s.value = market);
    const storiesMarket = document.getElementById('stories-market');
    const storiesProduct = document.getElementById('stories-product');
    if (storiesMarket) storiesMarket.value = market;
    if (storiesProduct && product) storiesProduct.value = product;
    navigateToTab('diagnosis');
    setTimeout(() => submitStories(), 100);
}

// ========== 一键完整报告 ==========
async function submitFullReport() {
    const activeTab = document.querySelector('.tab-content.active');
    const tabId = activeTab.id.replace('tab-', '');

    let params = {};
    switch (tabId) {
        case 'cultural':
            params = {
                market: document.getElementById('cultural-market').value,
                product: document.getElementById('cultural-product').value.trim(),
                content_type: document.getElementById('cultural-type').value
            };
            break;
        case 'compliance':
            params = {
                market: document.getElementById('compliance-market').value,
                product: document.getElementById('compliance-product').value.trim(),
                business_model: document.getElementById('compliance-model').value
            };
            break;
        case 'localize':
            params = {
                market: document.getElementById('localize-market').value,
                content: document.getElementById('localize-content').value.trim(),
                content_type: document.getElementById('localize-type').value
            };
            break;
        case 'stories':
            params = {
                market: document.getElementById('stories-market').value,
                product: document.getElementById('stories-product').value.trim()
            };
            break;
        default:
            alert('请先选择一个检测模块');
            return;
    }

    if (!params.market) { alert('请先选择目标市场'); return; }

    const modules = [
        { url: '/api/cultural', body: { market: params.market, product: params.product || '通用产品', content_type: params.content_type || '产品', category: currentCategory }, title: '🎯 文化雷区检测', type: 'cultural' },
        { url: '/api/compliance', body: { market: params.market, product: params.product || '通用品类', business_model: params.business_model || '跨境电商', category: currentCategory }, title: '📡 合规雷达扫描', type: 'compliance' },
        { url: '/api/stories', body: { market: params.market, product: params.product || '通用品类', category: currentCategory }, title: '💥 踩雷故事', type: 'stories' }
    ];

    const resultArea = document.getElementById('result-area');
    const resultContent = document.getElementById('result-content');
    const resultTitle = document.getElementById('result-title');
    const resultTime = document.getElementById('result-time');

    resultTitle.textContent = '⚡ 完整出海避雷报告';
    resultTime.textContent = new Date().toLocaleString('zh-CN');
    resultContent.innerHTML = '';
    resultArea.classList.add('show');
    hidePanels();

    document.querySelectorAll('.btn-primary').forEach(b => b.disabled = true);

    let lastScoreData = null;

    for (const mod of modules) {
        showScanAnimation(mod.type);
        resultContent.innerHTML += `<h2 style="color:#002FA7;font-size:18px;font-weight:700;margin:26px 0 12px;border-left:4px solid #002FA7;padding-left:12px;">${mod.title}</h2><div style="display:flex;flex-direction:row;align-items:center;gap:12px;padding:14px 0;"><div style="display:flex;gap:4px;align-items:center;"><span style="display:inline-block;width:4px;height:16px;background:#002FA7;border-radius:2px;animation:wave-bar 1.2s ease-in-out infinite;"></span><span style="display:inline-block;width:4px;height:16px;background:#002FA7;border-radius:2px;animation:wave-bar 1.2s ease-in-out 0.1s infinite;"></span><span style="display:inline-block;width:4px;height:16px;background:#002FA7;border-radius:2px;animation:wave-bar 1.2s ease-in-out 0.2s infinite;"></span></div><span style="color:#4a5568;font-size:14px;">AI正在分析中...</span></div>`;

        try {
            const response = await fetch(mod.url, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(mod.body),
            });

            const reader = response.body.getReader();
            const decoder = new TextDecoder();
            let buffer = '';
            let fullText = '';

            while (true) {
                const { done, value } = await reader.read();
                if (done) break;
                buffer += decoder.decode(value, { stream: true });
                const lines = buffer.split('\n');
                buffer = lines.pop();
                for (const line of lines) {
                    if (!line.startsWith('data: ')) continue;
                    const data = line.slice(6);
                    if (data === '[DONE]') break;
                    if (!data) continue;
                    fullText += data;
                }
            }

            hideScanAnimation();
            const scoreData = parseScore(fullText);
            if (scoreData) lastScoreData = scoreData;
            const cleanText = removeScoreJson(fullText);
            const html = _parseMd(cleanText);
            resultContent.innerHTML = resultContent.innerHTML.replace(
                new RegExp(`<h2[^>]*>${mod.title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')}</h2>[\\s\\S]*?<div style="display:flex[\\s\\S]*?</div>`),
                html
            );
        } catch (e) {
            hideScanAnimation();
            resultContent.innerHTML += `<p style="color:var(--danger);">模块请求失败: ${e.message}</p>`;
        }
    }

    if (lastScoreData) {
        showScorePanel(lastScoreData);
        showRadarPanel(lastScoreData);
    }

    resultContent.innerHTML += `<hr style="border:none;border-top:2px solid rgba(0,47,167,0.15);margin:20px 0;"><p style="text-align:center;color:var(--text-muted);font-size:13px;">报告生成完成 · ${new Date().toLocaleString('zh-CN')}</p>`;

    document.querySelectorAll('.btn-primary').forEach(b => b.disabled = false);
    if (historyPanel.classList.contains('open')) loadHistory();
}

// ========== 风险地图 (ECharts) - Klein Blue配色 ==========
let riskMapData = {};

async function initRiskMap() {
    try {
        const res = await fetch('/api/risk-map');
        riskMapData = await res.json();
    } catch { 
        // 使用默认数据
        riskMapData = {
            '美国': { score: 72, flag: '🇺🇸', risk: '中风险', en: 'United States', 禁忌: '种族/政治敏感话题', 认证: 'FDA/UL认证' },
            '欧盟': { score: 68, flag: '🇪🇺', risk: '中风险', en: 'European Union', 禁忌: '环保/隐私话题', 认证: 'CE/REACH' },
            '日本': { score: 82, flag: '🇯🇵', risk: '低风险', en: 'Japan', 禁忌: '质量问题/包装', 认证: 'PSE/JIS' },
            '英国': { score: 75, flag: '🇬🇧', risk: '中低风险', en: 'United Kingdom', 禁忌: '皇室/政治', 认证: 'UKCA' },
            '韩国': { score: 78, flag: '🇰🇷', risk: '低风险', en: 'South Korea', 禁忌: '领土/历史', 认证: 'KC认证' },
            '澳大利亚': { score: 76, flag: '🇦🇺', risk: '中低风险', en: 'Australia', 禁忌: '原住民话题', 认证: 'RCM' },
            '印尼': { score: 55, flag: '🇮🇩', risk: '中高风险', en: 'Indonesia', 禁忌: '宗教/腐败', 认证: 'SNI/清真认证' },
            '越南': { score: 70, flag: '🇻🇳', risk: '中风险', en: 'Vietnam', 禁忌: '领土/政治', 认证: 'CR标志' },
            '泰国': { score: 68, flag: '🇹🇭', risk: '中风险', en: 'Thailand', 禁忌: '王室/佛教', 认证: 'TISI' },
            '马来西亚': { score: 62, flag: '🇲🇾', risk: '中高风险', en: 'Malaysia', 禁忌: '宗教/种族', 认证: 'SIRIM/清真认证' },
            '巴西': { score: 58, flag: '🇧🇷', risk: '中高风险', en: 'Brazil', 禁忌: '政治/腐败', 认证: 'INMETRO' },
            '印度': { score: 52, flag: '🇮🇳', risk: '高风险', en: 'India', 禁忌: '宗教/领土', 认证: 'BIS' },
            '墨西哥': { score: 60, flag: '🇲🇽', risk: '中高风险', en: 'Mexico', 禁忌: '毒品/政治', 认证: 'NOM' },
            '俄罗斯': { score: 48, flag: '🇷🇺', risk: '高风险', en: 'Russia', 禁忌: '政治/LGBT', 认证: 'EAC' },
            '中东': { score: 55, flag: '🏜️', risk: '中高风险', en: 'Middle East', 禁忌: '宗教/酒精', 认证: 'SASO/清真认证' },
            '非洲': { score: 50, flag: '🌍', risk: '高风险', en: 'Africa', 禁忌: '政治/部落', 认证: '各地区不同' },
        };
    }

    try {
        const mapRes = await fetch('https://cdn.jsdelivr.net/npm/echarts/map/json/world.json');
        const mapJson = await mapRes.json();
        echarts.registerMap('world', mapJson);
    } catch (e) {
        console.warn('世界地图加载失败，使用简化方案', e);
        return;
    }

    const chart = echarts.init(document.getElementById('risk-map'));

    const countryNameMap = {
        '日本': 'Japan', '韩国': 'South Korea', '美国': 'United States', '德国': 'Germany',
        '法国': 'France', '英国': 'United Kingdom', '印尼': 'Indonesia', '马来西亚': 'Malaysia',
        '越南': 'Vietnam', '泰国': 'Thailand', '沙特阿拉伯': 'Saudi Arabia', '阿联酋': 'United Arab Emirates',
        '巴西': 'Brazil', '墨西哥': 'Mexico', '印度': 'India', '澳大利亚': 'Australia',
        '新加坡': 'Singapore', '加拿大': 'Canada', '俄罗斯': 'Russia', '意大利': 'Italy',
        '西班牙': 'Spain', '土耳其': 'Turkey', '以色列': 'Israel', '南非': 'South Africa',
        '欧盟': 'Europe', '东南亚': 'Southeast Asia', '中东': 'Middle East', '非洲': 'Africa',
    };

    const seriesData = Object.entries(riskMapData).map(([cn, info]) => ({
        name: info.en || cn,
        value: info.score,
        cnName: cn,
        flag: info.flag,
        risk: info.risk,
        禁忌: info.禁忌,
        认证: info.认证
    }));

    const getRiskColor = (score) => {
        if (score <= 55) return '#EF4444';
        if (score <= 65) return '#F59E0B';
        if (score <= 75) return '#10B981';
        return '#059669';
    };

    const option = {
        tooltip: {
            trigger: 'item',
            backgroundColor: 'rgba(255,255,255,0.98)',
            borderColor: 'rgba(0,47,167,0.2)',
            borderWidth: 1,
            textStyle: { color: '#0F172A' },
            formatter: function(params) {
                if (!params.data || !params.data.cnName) return params.name;
                const d = params.data;
                return `<div style="font-weight:700;font-size:15px;">${d.flag} ${d.cnName}</div>
                    <div style="margin:6px 0;">综合评分：<span style="font-weight:700;color:${getRiskColor(d.value)}">${d.value}</span>/100</div>
                    <div style="font-size:12px;">⚠️ ${d.禁忌 || ''}</div>
                    <div style="font-size:12px;">📋 认证：${d.认证 || ''}</div>`;
            }
        },
        visualMap: {
            show: false,
            min: 40,
            max: 90,
            inRange: {
                color: ['#EF4444', '#F59E0B', '#10B981', '#059669']
            }
        },
        series: [{
            type: 'map',
            map: 'world',
            roam: true,
            scaleLimit: { min: 1, max: 8 },
            emphasis: {
                label: { show: true, fontSize: 12, fontWeight: 'bold', color: '#001A5E' },
                itemStyle: { areaColor: '#FFD700', shadowBlur: 10, shadowColor: 'rgba(0,47,167,0.3)' }
            },
            itemStyle: {
                areaColor: '#E8EDFB',
                borderColor: '#C5D4F7',
                borderWidth: 0.5
            },
            data: seriesData,
            label: { show: false }
        }]
    };

    chart.setOption(option);

    chart.on('click', function(params) {
        if (params.data && params.data.cnName) {
            showCountryModal(params.data);
        }
    });

    window.addEventListener('resize', () => chart.resize());
}

// ========== 国家弹窗 (升级版) ==========
function showCountryModal(data) {
    const modal = document.getElementById('country-modal');
    const body = document.getElementById('modal-body');
    const scoreColor = getScoreColor(data.value);
    const level = getScoreLevel(data.value);

    body.innerHTML = `
        <div class="modal-flag">${data.flag}</div>
        <div class="modal-country">${data.cnName}</div>
        <div class="modal-score" style="color:${scoreColor}">${data.value}分</div>
        <div class="modal-level" style="color:${scoreColor}">${level.text}</div>
        <div class="modal-info">⚠️ <strong>核心禁忌：</strong>${data.禁忌 || '暂无数据'}</div>
        <div class="modal-info">📋 <strong>必备认证：</strong>${data.认证 || '暂无数据'}</div>
        <div class="modal-buttons">
            <button class="modal-btn" onclick="startCountryScan('${data.cnName}')">🛡️ 风险检测</button>
            <button class="modal-btn" onclick="startCountryCert('${data.cnName}')">✅ 认证查询</button>
            <button class="modal-btn" onclick="startCountryTariff('${data.cnName}')">💰 关税估算</button>
            <button class="modal-btn" onclick="startCountryStories('${data.cnName}')">💥 踩雷故事</button>
        </div>
    `;
    modal.classList.add('show');
}

function closeModal() {
    document.getElementById('country-modal').classList.remove('show');
}

function startCountryScan(market) {
    closeModal();
    enterApp();
    document.querySelectorAll('.market-select').forEach(s => s.value = market);
    navigateToTab('diagnosis');
    document.getElementById('cultural-market').value = market;
}

function startCountryCert(market) {
    closeModal();
    enterApp();
    navigateToTab('diagnosis');
    document.getElementById('cert-market').value = market;
}

function startCountryTariff(market) {
    closeModal();
    enterApp();
    navigateToTab('diagnosis');
    document.getElementById('tariff-market').value = market;
}

function startCountryStories(market) {
    closeModal();
    quickStory(market, '通用品类');
}

// ========== 平台入驻模块 ==========
const PLATFORMS = {
    'north-america': [
        { name: 'Amazon', flag: '🇺🇸', countries: '美国、加拿大、墨西哥', threshold: '需要美国公司或身份证', commission: '8-15%' },
        { name: 'eBay', flag: '🇺🇸', countries: '美国、英国、德国', threshold: '需要双币信用卡', commission: '10-12%' },
        { name: 'Walmart', flag: '🇺🇸', countries: '美国', threshold: '美国公司+年销售额', commission: '6-15%' },
        { name: 'Target', flag: '🇺🇸', countries: '美国', threshold: '需审核+仓储要求', commission: '15-20%' },
    ],
    'europe': [
        { name: 'OTTO', flag: '🇩🇪', countries: '德国及欧洲', threshold: '德国公司+德语支持', commission: '15-20%' },
        { name: 'Zalando', flag: '🇩🇪', countries: '欧洲20+国家', threshold: '需要欧洲VAT', commission: '20-30%' },
        { name: 'Cdiscount', flag: '🇫🇷', countries: '法国及法语区', threshold: '法国公司或代理', commission: '10-15%' },
        { name: 'Fnac', flag: '🇫🇷', countries: '法国、西班牙', threshold: '需资质审核', commission: '12-18%' },
    ],
    'southeast-asia': [
        { name: 'Shopee', flag: '🇸🇬', countries: '东南亚6国', threshold: '中国营业执照', commission: '5-8%' },
        { name: 'Lazada', flag: '🇸🇬', countries: '东南亚6国', threshold: '中国公司+本地仓', commission: '5-10%' },
        { name: 'Tokopedia', flag: '🇮🇩', countries: '印尼', threshold: '印尼公司+本地仓', commission: '8-12%' },
        { name: 'Tiki', flag: '🇻🇳', countries: '越南', threshold: '越南公司资质', commission: '10-15%' },
    ],
    'east-asia': [
        { name: 'Rakuten', flag: '🇯🇵', countries: '日本', threshold: '日本公司+日语', commission: '8-15%' },
        { name: 'Amazon Japan', flag: '🇯🇵', countries: '日本', threshold: '日本公司或代理', commission: '8-15%' },
        { name: 'Naver', flag: '🇰🇷', countries: '韩国', threshold: '韩国公司+韩语', commission: '10-15%' },
        { name: 'Coupang', flag: '🇰🇷', countries: '韩国', threshold: '韩国公司或FBC', commission: '10-20%' },
    ],
    'russia-india': [
        { name: 'Wildberries', flag: '🇷🇺', countries: '俄罗斯', threshold: '俄罗斯公司', commission: '12-20%' },
        { name: 'Ozon', flag: '🇷🇺', countries: '俄罗斯', threshold: '俄罗斯公司或代理', commission: '10-18%' },
        { name: 'Flipkart', flag: '🇮🇳', countries: '印度', threshold: '印度公司+FDI许可', commission: '15-25%' },
        { name: 'Amazon India', flag: '🇮🇳', countries: '印度', threshold: '印度公司+FDI', commission: '15-25%' },
    ],
    'middle-east': [
        { name: 'Noon', flag: '🇸🇦', countries: '沙特、阿联酋、埃及', threshold: '当地公司+阿拉伯语', commission: '10-15%' },
        { name: 'Namshi', flag: '🇦🇪', countries: '海湾国家', threshold: '时尚品类为主', commission: '15-25%' },
        { name: 'Amazon.ae', flag: '🇦🇪', countries: '阿联酋、沙特', threshold: '需要当地仓储', commission: '8-15%' },
        { name: 'Jarir', flag: '🇸🇦', countries: '沙特', threshold: '3C/文具品类', commission: '12-18%' },
    ],
    'latin-america': [
        { name: 'MercadoLibre', flag: '🇦🇷', countries: '拉美18国', threshold: '需要当地税号', commission: '10-20%' },
        { name: 'Americanas', flag: '🇧🇷', countries: '巴西', threshold: '巴西公司+本地仓', commission: '12-18%' },
        { name: 'Linio', flag: '🇲🇽', countries: '拉美西语区', threshold: '中国卖家可入驻', commission: '10-15%' },
        { name: 'Shopee虾皮', flag: '🌏', countries: '墨西哥、智利', threshold: '中国执照', commission: '5-8%' },
    ],
    'standalone': [
        { name: 'Shopify', flag: '🏪', countries: '全球', threshold: '信用卡+域名', commission: '无平台费，仅订阅' },
        { name: 'Shopline', flag: '🏪', countries: '全球华人市场', threshold: '中文后台', commission: '无平台费' },
        { name: 'Magento', flag: '🏪', countries: '全球', threshold: '技术能力强', commission: '无平台费' },
        { name: 'WordPress+WooCommerce', flag: '🏪', countries: '全球', threshold: '自托管', commission: '无平台费' },
    ],
};

function initPlatformGrid() {
    const grid = document.getElementById('platform-grid');
    const platforms = PLATFORMS['north-america'] || [];
    
    grid.innerHTML = platforms.map(p => `
        <div class="platform-card">
            <div class="platform-header">
                <div class="platform-name">${p.name}</div>
                <div class="platform-flag">${p.flag}</div>
            </div>
            <div class="platform-countries">📍 ${p.countries}</div>
            <div class="platform-tags">
                <span class="tag">${p.threshold.substring(0, 15)}...</span>
            </div>
            <div class="platform-commission">佣金：<strong>${p.commission}</strong></div>
            <button class="btn-ai" onclick="submitPlatform('${p.name}', '${p.countries.split('、')[0]}')">
                🤖 AI咨询
            </button>
        </div>
    `).join('');
}

document.querySelectorAll('.platform-tab').forEach(tab => {
    tab.addEventListener('click', () => {
        document.querySelectorAll('.platform-tab').forEach(t => t.classList.remove('active'));
        tab.classList.add('active');
        
        const region = tab.dataset.region;
        const grid = document.getElementById('platform-grid');
        const platforms = PLATFORMS[region] || [];
        
        grid.innerHTML = platforms.map(p => `
            <div class="platform-card">
                <div class="platform-header">
                    <div class="platform-name">${p.name}</div>
                    <div class="platform-flag">${p.flag}</div>
                </div>
                <div class="platform-countries">📍 ${p.countries}</div>
                <div class="platform-tags">
                    <span class="tag">${p.threshold.substring(0, 15)}...</span>
                </div>
                <div class="platform-commission">佣金：<strong>${p.commission}</strong></div>
                <button class="btn-ai" onclick="submitPlatform('${p.name}', '${p.countries.split('、')[0]}')">
                    🤖 AI咨询
                </button>
            </div>
        `).join('');
    });
});

function submitPlatform(platformName, market) {
    if (!market) market = getSelectedMarket();
    const question = prompt(`关于 ${platformName} 入驻，你想了解什么？\n\n例如：入驻条件、所需资质、佣金结构、物流方案、常见问题等`);
    if (!question) return;
    streamRequest('/api/platform', { platform: platformName, market, question, category: currentCategory }, '🏪 ' + platformName + ' 入驻指南', 'platform');
}

// ========== 路线图 ==========
function roadmapStep(step) {
    const questions = [
        '如何选择目标市场？考虑哪些因素？',
        '进入新市场前需要完成哪些合规准备？',
        '各大电商平台入驻条件和流程是什么？',
        '跨境物流有哪些方案？各有什么优缺点？',
        '如何做好产品本土化和营销运营？',
        '如何从0到1打造出海品牌？'
    ];
    const question = prompt('新手出海路线图 - 第' + step + '步\n\n' + questions[step - 1]);
    if (!question) return;
    streamRequest('/api/roadmap', { step, question, category: currentCategory }, '🗺️ 出海路线图 - 第' + step + '步', 'platform');
}

// ========== 顾问服务 ==========
function submitConsult(service) {
    const question = prompt(`${service} - 你想了解什么？`);
    if (!question) return;
    streamRequest('/api/consult', { service, question, category: currentCategory }, '💼 ' + service, 'platform');
}

// ========== AI问答 ==========
function submitAIQuestion() {
    const input = document.getElementById('ai-question');
    const question = input.value.trim();
    if (!question) { alert('请输入问题'); return; }
    streamRequest('/api/qa', { question, category: currentCategory }, '🤖 AI智能问答', 'platform');
    input.value = '';
}

// ========== 快捷键 ==========
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeModal();
        historyPanel.classList.remove('open');
    }
});

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    loadHistory();
    initRiskMap();
    initPlatformGrid();
});

// ========== 新闻快链 ==========
const NEWS_ARTICLES = {
    '欧盟-通用': {
        title: '欧盟新电池法规2026年8月全面生效，跨境卖家需提前布局EPR合规',
        source: '欧盟官方公报',
        date: '2025-11-15',
        tag: '法规',
        content: `据欧盟官方公报消息，《欧盟电池与废电池法规》(EU 2023/1542)将于2026年8月18日全面实施。该法规对所有在欧盟市场销售含电池产品的卖家产生重大影响。\n\n### 核心变化\n\n1. **电池护照强制要求**：所有容量超过2kWh的工业电池和电动汽车电池必须配备数字电池护照，记录全生命周期数据。\n\n2. **碳足迹声明**：电动汽车电池必须提供碳足迹声明，标注从原材料开采到制造全过程的总碳排放量。\n\n3. **回收材料比例**：2028年起，新电池必须包含最低比例的回收材料：钴16%、铅85%、锂6%、镍6%。\n\n4. **EPR延伸责任**：所有电池生产商（含进口商）必须注册EPR，建立收集、回收和处理体系。\n\n### 对跨境卖家的影响\n\n- 含电池产品进入欧盟前，必须完成EPR注册\n- 产品需标注电池容量、化学体系、回收标识\n- 未注册EPR的卖家，平台有权直接下架商品\n- 德国、法国已率先执行，其他成员国逐步跟进\n\n### 合规建议\n\n- 立即确认产品是否含电池，评估EPR注册需求\n- 通过LUCID平台（德国）或CITEO系统（法国）完成注册\n- 联系合规服务商办理电池护照和碳足迹声明\n- 预留6-8周注册周期，避免赶不上法规生效日`
    },
    '美国-光伏/番茄/棉花': {
        title: '美国UFLPA执法范围扩大，涉疆产品扣押清单更新',
        source: '美国海关与边境保护局(CBP)',
        date: '2026-03-02',
        tag: '政策',
        content: `美国海关与边境保护局(CBP)更新了《维吾尔强迫劳动预防法》(UFLPA)的执法指南，扩大了可反驳推定的适用范围。\n\n### 核心变化\n\n1. **新增品类**：在原有的棉花、番茄、多晶硅基础上，新增了光伏产业链下游产品、PVC制品和部分铝制品。\n\n2. **实体清单扩展**：UFLPA实体清单新增12家中国企业，涉及纺织、光伏和铝加工行业。\n\n3. **举证责任提高**：进口商需提供"清晰且令人信服的证据"证明供应链不涉及强迫劳动。\n\n### 对跨境卖家的影响\n\n- 光伏产品、棉制品、番茄制品出口美国风险显著升高\n- 即使产品非新疆生产，若供应链涉及实体清单企业，仍可能被扣押\n- 3C电子产品若含铝壳体或PVC线缆，需排查供应链\n\n### 合规建议\n\n- 全面排查供应链，确认无实体清单企业参与\n- 保留完整的供应链溯源文件\n- 对高风险品类，建议转向非美市场或申请UFLPA豁免`
    },
    '印尼-食品饮料': {
        title: '印尼强制要求所有进口商品完成Postel认证，违规直接扣押',
        source: '印尼通信与信息技术部',
        date: '2026-01-20',
        tag: '认证',
        content: `印尼通信与信息技术部(Kominfo)发布新规，自2026年3月1日起，所有进口到印尼的电信和IT设备必须取得Postel认证，否则海关将直接扣押货物。\n\n### 核心变化\n\n1. **认证范围扩大**：从通信设备扩展至所有带WiFi/蓝牙功能的智能设备。\n\n2. **本地测试要求**：部分品类要求在印尼本土实验室完成测试。\n\n3. **标签要求**：通过认证的产品必须加贴Postel标签。\n\n### 对跨境卖家的影响\n\n- 所有含无线通信功能的3C产品出口印尼前必须取得Postel认证\n- 认证周期3-6个月，费用约5000-15000美元/型号\n- Shopee/Lazada印尼站已开始清理无Postel认证的Listing\n\n### 合规建议\n\n- 立即盘点出口印尼产品中的无线通信设备\n- 通过印尼认证代理机构提前申请Postel认证\n- 认证期间可考虑先出口无无线功能的版本`
    },
    '沙特-建材/汽车配件': {
        title: '沙特SABER系统新增5个品类强制认证，建材和汽配首当其冲',
        source: '沙特标准计量和质量组织(SASO)',
        date: '2026-02-10',
        tag: '认证',
        content: `沙特SASO宣布，自2026年4月1日起，SABER认证系统新增5个品类的强制认证要求。\n\n### 新增强制认证品类\n\n1. **建筑材料**：水泥、钢材、瓷砖、管材等\n2. **汽车配件**：刹车片、轮胎、蓄电池、车灯等\n3. **电动工具**：电钻、角磨机等\n4. **厨房电器**：电饭煲、搅拌机、电磁炉等\n5. **儿童用品**：童车、学步车、高脚椅等\n\n### SABER认证流程\n\n1. 在SABER平台注册企业账号\n2. 提交产品技术文件和测试报告\n3. 由认证机构审核并颁发符合性证书(PCoC)\n4. 每批出货前申请装运证书(SCoC)\n\n### 对跨境卖家的影响\n\n- 未取得SABER认证的产品将被沙特海关直接退回\n- 建材和汽配品类检测费用较高\n- 认证周期4-8周，需提前规划出货时间`
    },
    '日本-食品饮料': {
        title: '日本JCT消费税新规全面执行，跨境电商不再享受免税待遇',
        source: '日本国税厅',
        date: '2025-10-01',
        tag: '税务',
        content: `日本国税厅宣布，自2025年10月1日起，JCT消费税逆征收机制全面执行，所有向日本消费者销售商品的海外卖家均需注册JCT并代收代缴消费税。\n\n### 核心变化\n\n1. **海外卖家注册义务**：年销售额超过1000万日元的海外卖家必须注册JCT税号。\n\n2. **平台代扣代缴**：Amazon Japan、乐天市场等平台将自动代扣10%消费税。\n\n3. **简易申报门槛降低**：年销售额1000万日元以下可使用简易申报制度。\n\n### 对跨境卖家的影响\n\n- 需注册JCT税号，注册周期约2-3个月\n- 商品定价需考虑10%消费税对利润的影响\n- 食品饮料品类适用8%轻减税率\n\n### 合规建议\n\n- 通过日本税务代理机构注册JCT税号\n- 调整定价策略，将消费税纳入成本核算\n- 使用合规发票系统，标注JCT注册号`
    },
    '美国-服装/美妆': {
        title: 'TikTok Shop美国站全面开放本地小店招商，中国卖家入驻门槛降低',
        source: 'TikTok Shop官方公告',
        date: '2026-04-05',
        tag: '平台',
        content: `TikTok Shop宣布美国站全面开放本地小店招商，中国跨境卖家可通过特定渠道入驻。\n\n### 入驻条件\n\n1. 中国营业执照、法人身份证、美国收款账户\n2. 需在美国本土发货或使用TikTok官方物流\n3. 每月至少发布10条带货视频\n\n### 新卖家扶持\n\n- 前90天佣金减半（2.5%）\n- 新账号7天流量扶持期\n- 免费使用TikTok创意工具\n\n### 热门品类\n\n- 美妆个护：占GMV 35%\n- 服装配饰：占GMV 25%\n- 家居厨房：占GMV 15%\n- 3C配件：占GMV 10%`
    },
    '巴西-服装/3C': {
        title: '巴西Remessa Conforme新税政全面执行，50美元以下包裹不再免税',
        source: '巴西联邦税务局',
        date: '2025-09-01',
        tag: '税务',
        content: `巴西联邦税务局确认，Remessa Conforme新税政已全面执行，所有跨境包裹统一征收20%进口税。\n\n### 核心变化\n\n1. **取消小额免税**：50美元以下包裹不再免税，统一征收20%进口税\n2. **ICMS州税**：另需缴纳17%的ICMS商品流通税\n3. **平台代扣**：Shopee、速卖通等平台必须代扣代缴\n4. **合规标识**：合规清关包裹获绿色标识，清关速度从7天缩至3天\n\n### 对跨境卖家的影响\n\n- 低客单价产品利润空间大幅压缩\n- 售价需重新核算：进口税20% + ICMS 17% + 平台佣金\n- 不合规发货将被海关扣押\n\n### 合规建议\n\n- 通过Remessa Conforme合规渠道发货\n- 重新核算定价，确保税后利润>25%\n- 考虑提升客单价至50美元以上`
    },
    '东南亚-通用': {
        title: '东盟原产地证电子化推进，跨境电商首次纳入自贸协定优惠范围',
        source: '东盟秘书处',
        date: '2026-01-08',
        tag: '政策',
        content: `东盟秘书处宣布，RCEP框架下的原产地证电子化系统将于2026年6月在6个成员国率先上线。\n\n### 核心变化\n\n1. **电子原产地证**：在线申请、在线验核，审批时间从5个工作日缩短至1个工作日\n2. **跨境电商纳入**：单票5000美元以下货物首次享受RCEP关税减让\n3. **累积规则放宽**：增值比例门槛从40%降至30%\n4. **首批上线国家**：中国、新加坡、马来西亚、泰国、越南、印尼\n\n### 对跨境卖家的影响\n\n- 出口东南亚电商货物可申请关税减免，平均降幅5-15%\n- 5000美元以下小额订单首次享受自贸优惠\n\n### 合规建议\n\n- 注册中国国际贸易单一窗口账号\n- 确认产品HS编码是否在RCEP减让清单内\n- 保留完整原材料采购凭证`
    }
};

function quickNews(market, product) {
    const key = market + '-' + product;
    const article = NEWS_ARTICLES[key];
    if (!article) {
        streamRequest('/api/news', { market, product, category: currentCategory }, '📰 ' + market + ' - ' + product + ' 政策动态解读', 'compliance');
        return;
    }
    // 全屏新闻阅读页
    const overlay = document.createElement('div');
    overlay.id = 'news-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10000;background:#fff;overflow-y:auto;';
    overlay.innerHTML = `
        <div style="max-width:800px;margin:0 auto;padding:32px 24px 60px;">
            <!-- 顶部导航条 -->
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;padding-bottom:16px;border-bottom:1px solid #e5e7eb;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:20px;">⚡</span>
                    <span style="font-weight:700;color:#001A5E;font-size:15px;">出海避雷针</span>
                    <span style="color:#94A3B8;font-size:13px;margin-left:8px;">/ 行业速报</span>
                </div>
                <button onclick="document.getElementById('news-overlay').remove()" style="width:36px;height:36px;border-radius:50%;border:1px solid #e5e7eb;background:#f8fafc;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;color:#64748b;" onmouseover="this.style.background='#f1f5f9'" onmouseout="this.style.background='#f8fafc'">✕</button>
            </div>

            <!-- 标签 -->
            <div style="margin-bottom:16px;">
                <span style="background:#002FA7;color:#fff;font-size:12px;padding:4px 14px;border-radius:4px;font-weight:500;">${article.tag}</span>
            </div>

            <!-- 标题 -->
            <h1 style="font-size:26px;font-weight:700;color:#0F172A;line-height:1.5;margin:0 0 20px 0;">${article.title}</h1>

            <!-- 元信息 -->
            <div style="display:flex;align-items:center;gap:20px;font-size:13px;color:#64748B;margin-bottom:24px;padding-bottom:20px;border-bottom:1px solid #f1f5f9;">
                <span>📰 ${article.source}</span>
                <span>📅 ${article.date}</span>
                <span>🌍 ${market}</span>
            </div>

            <!-- 正文 -->
            <div class="news-article-body">${_parseMd(article.content)}</div>

            <!-- AI解读分割线 -->
            <div style="margin:40px 0 24px;display:flex;align-items:center;gap:12px;">
                <div style="flex:1;height:1px;background:linear-gradient(to right,#002FA7,transparent);"></div>
                <span style="color:#002FA7;font-weight:600;font-size:14px;">🤖 AI 深度解读</span>
                <div style="flex:1;height:1px;background:linear-gradient(to left,#002FA7,transparent);"></div>
            </div>
            <div id="news-ai-insight" style="background:#F4F7FC;border-radius:12px;padding:20px;min-height:60px;">
                <button id="news-ai-btn" style="background:#002FA7;color:#fff;border:none;padding:10px 24px;border-radius:8px;cursor:pointer;font-size:14px;font-weight:500;" onclick="generateNewsInsight('${market}','${product}')">生成AI深度解读</button>
            </div>

            <!-- 底部 -->
            <div style="margin-top:40px;padding-top:20px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;">
                <button onclick="document.getElementById('news-overlay').remove()" style="color:#64748B;background:none;border:1px solid #e5e7eb;padding:8px 20px;border-radius:8px;cursor:pointer;font-size:13px;">← 返回首页</button>
                <span style="font-size:12px;color:#94A3B8;">出海避雷针 · 让跨境不再踩雷</span>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.scrollIntoView();
}

function generateNewsInsight(market, product) {
    const container = document.getElementById('news-ai-insight');
    const btn = document.getElementById('news-ai-btn');
    if (btn) btn.style.display = 'none';
    container.innerHTML = '<div style="text-align:center;padding:16px;color:#64748B;"><span class="loading-dots" style="display:inline-flex;gap:4px;"><span style="width:8px;height:8px;border-radius:50%;background:#002FA7;animation:newsPulse 1s infinite;"></span><span style="width:8px;height:8px;border-radius:50%;background:#002FA7;animation:newsPulse 1s infinite 0.2s;"></span><span style="width:8px;height:8px;border-radius:50%;background:#002FA7;animation:newsPulse 1s infinite 0.4s;"></span></span><p style="margin-top:8px;">AI正在深度分析...</p></div><style>@keyframes newsPulse{0%,100%{opacity:0.3;transform:scale(0.8)}50%{opacity:1;transform:scale(1.2)}}</style>';
    streamRequest('/api/news', { market, product, category: currentCategory }, '📰 AI深度解读', 'compliance');
    // 监听结果区域更新后，复制到新闻页
    const observer = new MutationObserver(() => {
        const resultContent = document.getElementById('result-content');
        if (resultContent && resultContent.innerHTML && !resultContent.querySelector('.loading-indicator')) {
            container.innerHTML = resultContent.innerHTML;
            container.style.padding = '24px';
            observer.disconnect();
        }
    });
    setTimeout(() => {
        const resultContent = document.getElementById('result-content');
        if (resultContent) observer.observe(resultContent, { childList: true, subtree: true });
    }, 500);
}

// ========== 课程全屏阅读页 ==========
const COURSES = {
    intro: {
        icon: '🎓',
        title: '跨境电商入门必修课',
        lessons: 12,
        students: '2.3万',
        difficulty: '入门',
        duration: '约6小时',
        outline: `### 第1课：什么是跨境电商？（15分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1XW4y1w7MQ)

- 跨境电商 vs 国内电商的5个核心区别
- 2026年全球跨境电商市场规模：6.3万亿美元
- 中国卖家出海的3波浪潮：B2B → B2C → 品牌化
- 新手最容易犯的3个认知错误

### 第2课：选市场——去哪卖最赚钱？（25分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1eK4y1k7XG)

- 东南亚：文化相近、门槛最低、适合0经验起步
- 欧美：利润最高、竞争最激烈、需要品牌
- 日韩：高客单价、品质要求高
- 中东：消费力强、文化敏感度高
- 拉美：增速最快、税务复杂
- **实操**：用Google Trends对比3个品类的搜索趋势

### 第3课：选平台——你的第一个店开在哪？（30分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1mW4y1w7HN)

| 你的情况 | 推荐平台 | 原因 |
|---------|---------|------|
| 0经验+资金<3万 | Shopee东南亚 | 门槛最低，中文后台 |
| 0经验+会拍视频 | TikTok Shop | 内容驱动，新流量红利 |
| 有工厂+走量 | Temu全托管 | 0佣金，你只供货 |
| 有品牌+资金3-10万 | Amazon | 利润最高，长期价值 |

### 第4课：办资质——这些证你必须有（20分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1XY4y1v7JG)

- 营业执照注册全流程（网上办理，3-5天出证）
- 进出口权备案（现在网上就能办，0费用）
- 外汇账户开通（银行柜台，1-2周）
- 收款账户选择：Payoneer / PingPong / 连连支付 对比

### 第5课：选品——卖什么才能赚钱？（30分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1qT4y1Q7XF)

- 选品4原则：轻小件、高复购、低售后、非敏感
- 5大黄金品类：3C配件、美妆工具、家居收纳、宠物用品、运动户外
- 禁选品类清单：食品、药品、液体、粉末、带电大件
- **实操**：用Jungle Scout分析Amazon类目竞争度

### 第6课：定价——怎么算才能不亏？（20分钟）

- 定价公式：售价 = (采购成本 + 头程运费) ÷ (1 - 佣金率 - 利润率) × 汇率
- 3个必须算进去的隐形成本：退货率、汇率波动、广告费
- 不同平台的佣金对比表
- **实操**：用Excel做一个成本核算模板

### 第7课：上架——让你的产品被搜到（25分钟）

- 标题公式：品牌词 + 核心关键词 + 卖点 + 规格
- 图片标准：白底主图 + 场景图 + 细节图 + 尺寸图（至少5张）
- 五点描述：卖点→功能→材质→适用场景→售后
- **实操**：写一个完整的Listing

### 第8课：物流——货怎么发出去？（20分钟）

- 3种模式对比：一件代发 / 自发货 / 海外仓
- 测款期：云途/燕文小包（7-15天，成本低）
- 跑量期：平台官方仓（3-7天）
- 爆款期：第三方海外仓（1-3天）
- **避坑**：不要一上来就大批量备货到FBA

### 第9课：广告——怎么花钱买流量？（20分钟）

- Amazon PPC：先开自动广告跑1-2周
- Shopee广告：关键词广告+关联广告，日预算10-30元
- TikTok广告：短视频自然流+付费投流
- **新手建议**：广告费控制在销售额15%以内

### 第10课：客服——好评是生命线（15分钟）

- 多语言客服模板（英/日/韩/泰）
- 差评处理3步法：道歉→补救→预防
- 退货率控制：东南亚<3%、欧美<8%
- **工具**：使用AI翻译工具处理多语言客服

### 第11课：合规——别让一纸罚单毁掉你的店（20分钟）

- 用出海避雷针全量扫描：文化→合规→认证→关税
- 5个最容易被查的合规问题：EPR、VAT、认证、标签、知识产权
- 各平台合规要求速查表
- **实操**：用出海避雷针做一次完整的合规体检

### 第12课：从0到1实战复盘（20分钟）

- 真实案例：一个小白卖家30天从开店到首单的全过程
- 关键数据指标：点击率>2%、转化率>5%、ACOS<30%
- 3个月目标：日出10单→日出50单→日出100单
- 常见的"卡点"和突破方法`,
        aiPrompt: '跨境电商入门指导'
    },
    compliance: {
        icon: '📋',
        title: '全球主要市场合规指南',
        lessons: 8,
        students: '1.8万',
        difficulty: '进阶',
        duration: '约4小时',
        outline: `### 第1课：合规为什么这么重要？（15分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1e54y1V7Fg)

- 2025年跨境卖家因合规问题损失超50亿美元
- 不合规的4种后果：罚款、扣押、封店、刑事诉讼
- 合规不是成本，是保险——一次罚款>5年认证费
- 各平台2026合规趋势：越来越严，越来越自动化

### 第2课：欧盟合规全景图（40分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1h54y1V7Df)

- **CE认证**：几乎所有产品进入欧盟的通行证
- **EPR注册**：德国/法国强制，包装法+电子法+电池法
- **GDPR**：数据隐私，违规罚款年营收4%或2000万欧元（取高）
- **REACH**：化学品注册，纺织/鞋类/化妆品必做
- **新电池法规**：2026年8月全面生效，含电池产品必须注册
- **实操**：在LUCID平台完成德国包装法注册

### 第3课：美国合规全景图（35分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1R54y1V7Ec)

- **FCC认证**：所有电子/无线产品必做
- **FDA注册**：食品、化妆品、医疗器械、激光产品
- **UL认证**：虽非强制但Amazon等平台要求
- **CPC证书**：儿童产品（玩具、童装等）强制
- **UFLPA**：涉疆产品扣押，2026执法范围扩大
- **实操**：FCC认证申请全流程

### 第4课：东南亚合规要点（30分钟）

- 印尼：SNI认证 + Postel认证（带WiFi/蓝牙设备）+ 清真认证
- 泰国：TISI认证 + FDA注册 + 王室避讳
- 越南：CR标志 + MoH注册
- 马来西亚：SIRIM + 清真认证
- 菲律宾：BPS/ICC认证
- **避坑**：东南亚各国清关流程差异大，不要一套文件走全部

### 第5课：中东合规要点（25分钟）

- 沙特：SABER认证系统全流程（PCoC + SCoC）
- 阿联酋：ESMA/ECAS认证
- 清真认证：食品/化妆品必备，不同机构认可度不同
- 阿拉伯语标签：必须包含特定信息
- **避坑**：中东退货率高，合规不达标=全批退回

### 第6课：日韩合规要点（25分钟）

- 日本：PSE + TELEC + JIS + JAS + PSC + JCT消费税
- 韩国：KC认证 + KCC + KFDA + 清关申报
- 日韩消费者品质期望极高，差评=致命
- **实操**：日本PSE认证申请流程

### 第7课：知识产权保护（25分钟）

- 商标：国内注册（300元/类）+ 马德里国际（1万元起）+ 美国/欧盟单独注册
- 专利：外观专利跨境保护策略
- 版权：产品图片/描述被盗用怎么办
- **避坑**：出口前先注册目标市场商标，被抢注=被动
- **实操**：美国USPTO商标注册全流程

### 第8课：合规自检清单（20分钟）

- 上市前必查清单：认证→标签→包装→VAT→知识产权
- 各市场合规优先级排序
- 合规成本预算参考表
- 用出海避雷针做一键合规体检
- **实操**：完成一份产品的完整合规档案`,
        aiPrompt: '跨境合规指导'
    },
    localize: {
        icon: '💡',
        title: '本土化运营实战手册',
        lessons: 15,
        students: '1.5万',
        difficulty: '进阶',
        duration: '约5小时',
        outline: `### 第1课：本土化不是翻译——为什么你的产品在海外卖不动？（15分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1v54y1V7Gh)

- 翻译≠本土化：6个经典失败案例
- 本土化的4个层次：语言→文化→体验→品牌
- 做好本土化的品牌 vs 没做的品牌：转化率差3-5倍
- 本土化投入产出比：1元本土化投入=5-8元营收增长

### 第2课：品牌名本土化检测（20分钟）

**视频教学**：[B站观看 →](https://www.bilibili.com/video/BV1A54y1V7Hj)

- 品牌名踩雷案例：发音不雅、文化冒犯、商标冲突
- 品牌名检测5维度：发音歧义、文化含义、宗教敏感、商标冲突、市场接受度
- **实操**：用出海避雷针的品牌名称本土化检测功能
- 好的品牌名案例：名创优品→Miniso、花西子→Florasis

### 第3课：产品包装本土化（25分钟）

- 颜色禁忌：巴西忌绿色、中东忌十字架图案、印度忌白色包装
- 数字禁忌：日本忌4和9、欧美忌13
- 图案禁忌：中东忌猪/酒/十字架、印度忌牛、泰国忌佛像商用
- 文字规范：欧盟必须标注CE标志+原产地+进口商信息
- **实操**：用出海避雷针做一次文化雷区扫描

### 第4课：营销文案本土化（30分钟）

- 直译的灾难：6个翻译翻车的真实案例
- 本土化文案3原则：用地道表达、融入本地场景、尊重文化习惯
- 不同市场的营销风格：
  - 美国：直接、数据驱动、强调个性
  - 日本：含蓄、细节控、信任背书
  - 中东：家庭观念、宗教底线、奢华感
- **实操**：用出海避雷针的本土化改造功能

### 第5课：社媒运营本土化（25分钟）

- 各市场主流社媒：美国(Instagram/TikTok)、日本(LINE/Twitter)、韩国(Naver/Kakao)、东南亚(Shopee Feed/TikTok)
- 内容日历：结合当地节日和消费节点
- 网红合作：各国KOL报价参考和避坑指南
- **实操**：制定一份东南亚社媒运营计划

### 第6课：客服话术本土化（20分钟）

- 多语言客服模板：英/日/韩/泰/阿拉伯语
- 差评回复的文化差异：美国要真诚道歉、日本要超预期补偿、中东要尊重体面
- 自动化工具：AI翻译+人工审核
- **实操**：用出海避雷针生成客服话术

### 第7课：支付方式本土化（15分钟）

- 全球支付方式分布：信用卡、电子钱包、银行转账、货到付款
- 东南亚：电子钱包占比>40%（GrabPay/OVO/Dana）
- 拉美：分期付款（巴西boleto、墨西哥OXXO）
- 中东：货到付款仍占50%+
- **建议**：接入本地支付可提升转化率20-40%

### 第8课：节日营销日历（20分钟）

- 全球主要消费节日：
  - Q4：黑五/网一/圣诞/新年（全年GMV 40%+）
  - 东南亚：6.6/7.7/8.8/9.9/10.10/11.11/12.12
  - 中东：斋月/开斋节
  - 日本：黄金周/盂兰盆节
  - 印度：排灯节
- **实操**：制定一份全年营销日历

### 第9-15课：深度实战模块

- 第9课：Amazon Listing本土化高级技巧
- 第10课：TikTok内容本土化——爆款视频公式
- 第11课：独立站本土化设计
- 第12课：本土化定价策略
- 第13课：本地仓储和配送体验优化
- 第14课：品牌故事本土化
- 第15课：本土化数据监控与迭代

> 每节课均配有实操练习和AI辅助工具推荐，完成全部课程可获得"出海本土化达人"认证。`,
        aiPrompt: '本土化运营指导'
    }
};

function openCourse(courseId) {
    const course = COURSES[courseId];
    if (!course) return;
    const overlay = document.createElement('div');
    overlay.id = 'news-overlay';
    overlay.style.cssText = 'position:fixed;top:0;left:0;right:0;bottom:0;z-index:10000;background:#fff;overflow-y:auto;';
    overlay.innerHTML = `
        <div style="max-width:800px;margin:0 auto;padding:32px 24px 60px;">
            <div style="display:flex;align-items:center;justify-content:space-between;margin-bottom:28px;padding-bottom:16px;border-bottom:1px solid #e5e7eb;">
                <div style="display:flex;align-items:center;gap:8px;">
                    <span style="font-size:20px;">⚡</span>
                    <span style="font-weight:700;color:#001A5E;font-size:15px;">出海避雷针</span>
                    <span style="color:#94A3B8;font-size:13px;margin-left:8px;">/ 新手学院 / ${course.title}</span>
                </div>
                <button onclick="document.getElementById('news-overlay').remove()" style="width:36px;height:36px;border-radius:50%;border:1px solid #e5e7eb;background:#f8fafc;cursor:pointer;font-size:18px;display:flex;align-items:center;justify-content:center;color:#64748b;">✕</button>
            </div>

            <div style="display:flex;align-items:center;gap:16px;margin-bottom:20px;">
                <span style="font-size:48px;">${course.icon}</span>
                <div>
                    <h1 style="font-size:24px;font-weight:700;color:#0F172A;margin:0;">${course.title}</h1>
                    <div style="display:flex;gap:16px;font-size:13px;color:#64748B;margin-top:6px;">
                        <span>📚 ${course.lessons}节课</span>
                        <span>👥 ${course.students}人学习</span>
                        <span>📊 ${course.difficulty}</span>
                        <span>⏱️ ${course.duration}</span>
                    </div>
                </div>
            </div>

            <div style="background:#F4F7FC;border-radius:12px;padding:16px 20px;margin-bottom:28px;display:flex;align-items:center;gap:12px;">
                <span style="font-size:20px;">🤖</span>
                <span style="font-size:14px;color:#002FA7;font-weight:500;">遇到问题？随时用AI助手提问，获得个性化解答</span>
            </div>

            <div style="margin-bottom:20px;padding-bottom:16px;border-bottom:1px solid #f1f5f9;">
                <h2 style="font-size:18px;font-weight:700;color:#001A5E;margin:0;">📖 课程大纲</h2>
            </div>

            <div class="news-article-body">${_parseMd(course.outline)}</div>

            <div style="margin-top:40px;padding-top:20px;border-top:1px solid #e5e7eb;display:flex;justify-content:space-between;align-items:center;">
                <button onclick="document.getElementById('news-overlay').remove()" style="color:#64748B;background:none;border:1px solid #e5e7eb;padding:8px 20px;border-radius:8px;cursor:pointer;font-size:13px;">← 返回学院</button>
                <span style="font-size:12px;color:#94A3B8;">出海避雷针 · 让跨境不再踩雷</span>
            </div>
        </div>
    `;
    document.body.appendChild(overlay);
    overlay.scrollIntoView();
}