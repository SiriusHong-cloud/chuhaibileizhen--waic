// 出海避雷针 V5 - 前端交互逻辑
// 信任蓝 #1A56DB + 警示橙 #F59E0B + 安全绿 #10B981

// ========== 14大模块配置 ==========
const MODULES = [
    {
        id: 'cultural',
        icon: '🎯',
        title: '文化雷区检测',
        titleEn: 'Cultural Risk Scan',
        desc: '7维度文化扫描：宗教、颜色、数字、动物、肢体语言、性别、历史敏感',
        descEn: '7-dimension cultural scan: religion, color, numbers, animals, gestures, gender, history',
        riskLevel: 'high',
        isNew: false,
        api: '/api/cultural',
        dimensions: ['宗教禁忌', '颜色象征', '数字禁忌', '动物图案', '肢体语言', '性别文化', '历史敏感']
    },
    {
        id: 'compliance',
        icon: '📡',
        title: '合规雷达',
        titleEn: 'Compliance Radar',
        desc: '法规/认证/税务扫描：数据隐私、产品认证、广告法规、电商合规、知识产权',
        descEn: 'Regulatory/cert/tax scan: privacy, certification, advertising, e-commerce, IP',
        riskLevel: 'high',
        isNew: false,
        api: '/api/compliance',
        dimensions: ['数据隐私', '产品认证', '广告法规', '电商合规', '知识产权']
    },
    {
        id: 'localize',
        icon: '🔧',
        title: '本土化改造',
        titleEn: 'Localization',
        desc: '文案/视觉/命名本地化：产品命名、营销话术、视觉建议、节日日历、支付物流',
        descEn: 'Content/visual/naming localization: naming, copy, visuals, holidays, payment',
        riskLevel: 'normal',
        isNew: false,
        api: '/api/localize',
        dimensions: ['产品命名', '营销话术', '视觉建议', '节日营销', '支付物流', '社媒平台']
    },
    {
        id: 'tariff',
        icon: '💰',
        title: '关税估算',
        titleEn: 'Tariff Estimator',
        desc: 'HS编码→关税+物流成本：基础关税、额外税种、流转税、FTA优惠',
        descEn: 'HS Code → tariff + logistics cost: basic tariff, extra taxes, VAT, FTA benefits',
        riskLevel: 'normal',
        isNew: false,
        api: '/api/tariff',
        dimensions: ['HS归类', '关税税率', '增值税率', '优惠税率', '申报要素']
    },
    {
        id: 'cert',
        icon: '✅',
        title: '产品准入',
        titleEn: 'Product Certification',
        desc: '认证清单+准入要求：强制认证清单、费用/周期/本地代理要求',
        descEn: 'Cert checklist + entry requirements: mandatory certs, cost/cycle/local rep',
        riskLevel: 'safe',
        isNew: false,
        api: '/api/cert',
        dimensions: ['认证类型', '适用标准', '申请流程', '所需材料', '认证周期']
    },
    {
        id: 'platform',
        icon: '🛒',
        title: '电商平台体检',
        titleEn: 'Platform Checkup',
        desc: 'Amazon/TikTok Shop等平台规则：类目准入、标签要求、变体风险、广告合规',
        descEn: 'Amazon/TikTok Shop platform rules: category entry, labeling, variation risk, ad compliance',
        riskLevel: 'normal',
        isNew: false,
        api: '/api/platform',
        dimensions: ['入驻条件', '资质要求', '佣金结构', '物流方案', '运营支持']
    },
    {
        id: 'intellectual-property',
        icon: '📝',
        title: '知识产权预检',
        titleEn: 'IP Pre-check',
        desc: '商标/专利/版权风险：商标冲突、专利风险、版权问题、投诉历史',
        descEn: 'Trademark/patent/copyright risk: trademark conflicts, patent risk, copyright, complaints',
        riskLevel: 'high',
        isNew: false,
        api: '/api/intellectual-property',
        dimensions: ['商标风险', '专利风险', '版权风险', '投诉历史', '行动建议']
    },
    {
        id: 'logistics-compliance',
        icon: '🚢',
        title: '物流合规',
        titleEn: 'Logistics Compliance',
        desc: '制裁筛查+危险品+原产地：制裁筛查、危险品要求、木质包装、提前申报、原产地证',
        descEn: 'Sanctions screening + dangerous goods + origin: sanctions, DG requirements, wood packing, advance declaration, CO',
        riskLevel: 'high',
        isNew: false,
        api: '/api/logistics-compliance',
        dimensions: ['制裁筛查', '危险品', '木质包装', '提前申报', '原产地证', '清关文件']
    },
    {
        id: 'crisis',
        icon: '🆘',
        title: '危机处置',
        titleEn: 'Crisis Response',
        desc: '海关扣货/下架/召回应急：黄金24小时行动、沟通话术模板、证据清单',
        descEn: 'Customs hold/delisting/recall emergency: golden 24h action, communication templates, evidence list',
        riskLevel: 'high',
        isNew: false,
        api: '/api/crisis',
        dimensions: ['舆情监测', '危机定级', '响应策略', '媒体沟通', '后续处置']
    },
    {
        id: 'store-checkup',
        icon: '🏪',
        title: '店铺AI体检',
        titleEn: 'Store AI Checkup',
        desc: '🆕一键跳转商家店铺，AI实时分析：店铺评分、商品抽检、Listing评估、定价分析',
        descEn: '🆕One-click store checkup: store rating, product audit, listing review, pricing analysis',
        riskLevel: 'normal',
        isNew: true,
        api: '/api/store-checkup',
        dimensions: ['店铺评分', '商品抽检', 'Listing质量', '定价分析', '侵权风险']
    },
    {
        id: 'product-quick-check',
        icon: '📦',
        title: '选品快检',
        titleEn: 'Product Quick Check',
        desc: '🆕输入选品URL/关键词，一键合规检测：禁售检查、认证需求、关税预估、文化适配',
        descEn: '🆕Enter product URL/keyword, one-click compliance: restricted check, certs, tariff, cultural fit',
        riskLevel: 'normal',
        isNew: true,
        api: '/api/product-quick-check',
        dimensions: ['禁售检查', '认证需求', '关税预估', '文化适配', '竞争格局', '利润空间']
    },
    {
        id: 'trade-news',
        icon: '📰',
        title: '外贸新闻',
        titleEn: 'Trade News',
        desc: '🆕实时新闻+原文/翻译双语切换：政策、关税、平台、市场趋势',
        descEn: '🆕Real-time news + bilingual toggle: policy, tariff, platforms, market trends',
        riskLevel: 'safe',
        isNew: true,
        api: '/api/trade-news',
        dimensions: ['政策法规', '关税税务', '平台动态', '市场趋势']
    },
    {
        id: 'trade-academy',
        icon: '📚',
        title: '外贸学院',
        titleEn: 'Trade Academy',
        desc: '新手学习区：入门教程、术语库、实操指南、合规专题、运营技巧',
        descEn: 'Beginner learning: intro courses, terminology, practical guides, compliance topics, ops tips',
        riskLevel: 'safe',
        isNew: true,
        api: '/api/trade-academy',
        dimensions: ['入门课程', '术语词典', '进阶内容', '实操要点', '常见误区']
    },
    {
        id: 'trade-tools',
        icon: '🧰',
        title: '外贸工具箱',
        titleEn: 'Trade Toolbox',
        desc: '🆕外贸小白必备工具：HS编码查询、外贸术语词典、外贸知识普及',
        descEn: '🆕Essential tools for newbies: HS code lookup, trade terms dictionary, knowledge base',
        riskLevel: 'safe',
        isNew: true,
        api: '',
        isTool: true,
        dimensions: ['HS编码查询', '外贸术语词典', '外贸知识库']
    },
    {
        id: 'stories',
        icon: '💥',
        title: '踩雷故事',
        titleEn: 'Cautionary Tales',
        desc: '真实品牌案例+教训总结：品牌+罚款金额+新闻来源的完整案例',
        descEn: 'Real brand case studies + lessons: brand + fine amount + news source full cases',
        riskLevel: 'high',
        isNew: false,
        api: '/api/stories',
        dimensions: ['案例检索', '风险分析', '教训总结']
    }
];

// ========== 市场数据 ==========
const MARKETS = [
    { value: '美国', flag: '🇺🇸', en: 'United States' },
    { value: '欧盟', flag: '🇪🇺', en: 'European Union' },
    { value: '日本', flag: '🇯🇵', en: 'Japan' },
    { value: '英国', flag: '🇬🇧', en: 'United Kingdom' },
    { value: '德国', flag: '🇩🇪', en: 'Germany' },
    { value: '法国', flag: '🇫🇷', en: 'France' },
    { value: '韩国', flag: '🇰🇷', en: 'South Korea' },
    { value: '澳大利亚', flag: '🇦🇺', en: 'Australia' },
    { value: '加拿大', flag: '🇨🇦', en: 'Canada' },
    { value: '新加坡', flag: '🇸🇬', en: 'Singapore' },
    { value: '印尼', flag: '🇮🇩', en: 'Indonesia' },
    { value: '马来西亚', flag: '🇲🇾', en: 'Malaysia' },
    { value: '越南', flag: '🇻🇳', en: 'Vietnam' },
    { value: '泰国', flag: '🇹🇭', en: 'Thailand' },
    { value: '沙特阿拉伯', flag: '🇸🇦', en: 'Saudi Arabia' },
    { value: '阿联酋', flag: '🇦🇪', en: 'UAE' },
    { value: '巴西', flag: '🇧🇷', en: 'Brazil' },
    { value: '墨西哥', flag: '🇲🇽', en: 'Mexico' },
    { value: '印度', flag: '🇮🇳', en: 'India' },
    { value: '俄罗斯', flag: '🇷🇺', en: 'Russia' },
    { value: '意大利', flag: '🇮🇹', en: 'Italy' },
    { value: '西班牙', flag: '🇪🇸', en: 'Spain' },
    { value: '土耳其', flag: '🇹🇷', en: 'Turkey' },
    { value: '以色列', flag: '🇮🇱', en: 'Israel' },
    { value: '南非', flag: '🇿🇦', en: 'South Africa' },
    { value: '波兰', flag: '🇵🇱', en: 'Poland' },
    { value: '瑞典', flag: '🇸🇪', en: 'Sweden' },
    { value: '瑞士', flag: '🇨🇭', en: 'Switzerland' },
    { value: '阿根廷', flag: '🇦🇷', en: 'Argentina' },
    { value: '智利', flag: '🇨🇱', en: 'Chile' },
    { value: '哥伦比亚', flag: '🇨🇴', en: 'Colombia' },
    { value: '中国香港', flag: '🇭🇰', en: 'Hong Kong' },
    { value: '中国台湾', flag: '🇹🇼', en: 'Taiwan' },
    { value: '菲律宾', flag: '🇵🇭', en: 'Philippines' },
    { value: '新西兰', flag: '🇳🇿', en: 'New Zealand' },
    { value: '尼日利亚', flag: '🇳🇬', en: 'Nigeria' },
    { value: '埃及', flag: '🇪🇬', en: 'Egypt' },
    { value: '肯尼亚', flag: '🇰🇪', en: 'Kenya' },
    { value: '巴基斯坦', flag: '🇵🇰', en: 'Pakistan' },
    { value: '孟加拉国', flag: '🇧🇩', en: 'Bangladesh' },
    { value: '全球', flag: '🌍', en: 'Global' },
];

// ========== i18n 多语言 ==========
const i18n = {
    zh: {
        navSubtitle: '跨境出海全链路AI顾问',
        searchPlaceholder: '搜索市场/品类/平台...',
        historyBtn: '📋 历史记录',
        heroTitle: '跨境出海，先让AI帮你扫一遍雷区',
        heroDesc: '文化雷区 · 合规法规 · 本土化改造 · 关税物流 · 店铺体检 · 选品快检 · 实时新闻',
        quickScanTitle: '⚡ 快速检测',
        quickProductPlaceholder: '输入产品/品牌/选品...',
        quickScanBtn: '开始检测',
        todayNewsTitle: '📰 今日外贸要闻',
        newsPolicy: '政策',
        newsTariff: '关税',
        newsPlatform: '平台',
        newsMarket: '市场',
        viewAllNews: '查看全部 →',
        modulesTitle: '🛠️ 全链路功能模块',
        modulesDesc: '从文化合规到物流清关，一站式覆盖出海全流程',
        analyzing: 'AI正在分析中...',
        scanningTitle: 'AI正在扫描中...',
        closeBtn: '关闭',
        fullReportBtn: '⚡ 生成完整报告',
        historyTitle: '📋 历史记录',
        noHistory: '暂无历史记录',
        scoreSafe: '🟢 安全出海 — 放心干',
        scoreCaution: '🟡 谨慎出海 — 有雷但能避',
        scoreDanger: '🟠 高危预警 — 必须整改',
        scoreForbidden: '🔴 禁止出海 — 先把雷全排了',
        startScan: '开始检测',
        targetMarket: '目标市场',
        pleaseSelect: '请选择...',
    },
    en: {
        navSubtitle: 'Cross-Border AI Advisor',
        searchPlaceholder: 'Search market/category/platform...',
        historyBtn: '📋 History',
        heroTitle: 'Go Global with AI-Powered Risk Detection',
        heroDesc: 'Cultural · Compliance · Localization · Tariff · Store Checkup · Product Check · Real-time News',
        quickScanTitle: '⚡ Quick Scan',
        quickProductPlaceholder: 'Enter product/brand...',
        quickScanBtn: 'Start Scan',
        todayNewsTitle: '📰 Today\'s Trade News',
        newsPolicy: 'Policy',
        newsTariff: 'Tariff',
        newsPlatform: 'Platform',
        newsMarket: 'Market',
        viewAllNews: 'View All →',
        modulesTitle: '🛠️ Full-Feature Modules',
        modulesDesc: 'From cultural compliance to logistics clearance, one-stop coverage',
        analyzing: 'AI is analyzing...',
        scanningTitle: 'AI is scanning...',
        closeBtn: 'Close',
        fullReportBtn: '⚡ Full Report',
        historyTitle: '📋 History',
        noHistory: 'No history yet',
        scoreSafe: '🟢 Safe to Launch — Go Ahead',
        scoreCaution: '🟡 Proceed with Caution — Risks Exist',
        scoreDanger: '🟠 High Risk — Must Fix',
        scoreForbidden: '🔴 Do Not Launch — Clear All Risks',
        startScan: 'Start Scan',
        targetMarket: 'Target Market',
        pleaseSelect: 'Please select...',
    }
};

let currentLang = localStorage.getItem('lang') || 'zh';
let currentModuleType = '';
let currentFilterParams = {};
let currentTheme = localStorage.getItem('theme') || 'light';

function t(key) { return i18n[currentLang][key] || key; }

// ========== 主题切换 ==========
function toggleTheme() {
    currentTheme = currentTheme === 'light' ? 'dark' : 'light';
    document.documentElement.setAttribute('data-theme', currentTheme);
    localStorage.setItem('theme', currentTheme);
    document.getElementById('theme-icon').textContent = currentTheme === 'dark' ? '☀️' : '🌙';
}

// ========== 语言切换 ==========
function switchLang(lang) {
    currentLang = lang;
    localStorage.setItem('lang', lang);
    document.querySelectorAll('[data-i18n]').forEach(el => {
        const key = el.getAttribute('data-i18n');
        if (i18n[currentLang][key]) el.textContent = i18n[currentLang][key];
    });
    document.querySelectorAll('[data-i18n-placeholder]').forEach(el => {
        const key = el.getAttribute('data-i18n-placeholder');
        if (i18n[currentLang][key]) el.placeholder = i18n[currentLang][key];
    });
    document.querySelectorAll('.lang-btn').forEach(b => b.classList.toggle('active', b.dataset.lang === lang));
    renderModules();
    initMarketSelects();
}

// ========== 初始化 ==========
document.addEventListener('DOMContentLoaded', function() {
    // 初始化主题
    if (currentTheme === 'dark') {
        document.documentElement.setAttribute('data-theme', 'dark');
        document.getElementById('theme-icon').textContent = '☀️';
    }
    
    // 初始化语言
    switchLang(currentLang);
    
    // 渲染模块卡片
    renderModules();
    
    // 初始化市场选择
    initMarketSelects();
    
    // 新闻标签切换
    document.querySelectorAll('.news-tab').forEach(tab => {
        tab.addEventListener('click', function() {
            document.querySelectorAll('.news-tab').forEach(t => t.classList.remove('active'));
            this.classList.add('active');
        });
    });
});

// ========== 渲染模块卡片 ==========
function renderModules() {
    const grid = document.getElementById('modules-grid');
    const isEn = currentLang === 'en';
    
    grid.innerHTML = MODULES.map(m => {
        const riskClass = m.riskLevel === 'high' ? 'risk-high' : m.riskLevel === 'safe' ? 'safe' : '';
        const newClass = m.isNew ? 'new-badge' : '';
        const title = isEn ? m.titleEn : m.title;
        const desc = isEn ? m.descEn : m.desc;
        const btnText = isEn ? 'Start' : '立即体验';
        
        return `
        <div class="module-card ${riskClass} ${newClass}" onclick="openModule('${m.id}')">
            <div class="module-icon">${m.icon}</div>
            <div class="module-title">${title}</div>
            <div class="module-desc">${desc}</div>
            <div class="module-action">
                <button class="module-btn">${btnText}</button>
                <span class="module-arrow">→</span>
            </div>
        </div>
        `;
    }).join('');
}

// ========== 初始化市场选择器 ==========
function initMarketSelects() {
    const selects = document.querySelectorAll('.market-select');
    const isEn = currentLang === 'en';
    const options = MARKETS.map(m => 
        `<option value="${m.value}">${m.flag} ${isEn ? m.en : m.value}</option>`
    ).join('');
    
    selects.forEach(sel => {
        const currentVal = sel.value;
        sel.innerHTML = `<option value="">${t('pleaseSelect')}</option>` + options;
        if (currentVal) sel.value = currentVal;
    });
}

// ========== 打开模块 ==========
function openModule(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;
    
    currentModuleType = moduleId;
    
    // 特殊模块处理
    if (moduleId === 'store-checkup') {
        openStoreCheckup();
        return;
    }
    
    if (moduleId === 'trade-news') {
        openTradeNews();
        return;
    }
    
    if (moduleId === 'trade-academy') {
        openTradeAcademy();
        return;
    }
    
    if (moduleId === 'trade-tools') {
        openTradeTools();
        return;
    }
    
    // 普通模块：先展示默认内容，再显示筛选栏
    openModuleWithContent(moduleId);
}

function openModuleWithContent(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;
    
    const isEn = currentLang === 'en';
    const title = isEn ? module.titleEn : module.title;
    const defaultMarket = '美国';
    const defaultProduct = '电子产品';
    
    showResultFilter(true);
    document.getElementById('filter-market-label').textContent = t('targetMarket');
    document.getElementById('filter-category-label').textContent = t('productCategory');
    
    let extraHtml = '';
    let body = {};
    
    switch(moduleId) {
        case 'cultural':
            extraHtml = `
                <div class="filter-item">
                    <label>${isEn ? 'Content Type' : '内容类型'}</label>
                    <select id="filter-type" class="form-select small">
                        <option value="产品包装">${isEn ? 'Product Packaging' : '产品包装'}</option>
                        <option value="广告营销">${isEn ? 'Advertising' : '广告营销'}</option>
                        <option value="产品设计">${isEn ? 'Product Design' : '产品设计'}</option>
                        <option value="社交媒体">${isEn ? 'Social Media' : '社交媒体'}</option>
                    </select>
                </div>
            `;
            body = { product: defaultProduct, market: defaultMarket, content_type: '产品包装', category: '' };
            break;
        case 'compliance':
            extraHtml = `
                <div class="filter-item">
                    <label>${isEn ? 'Business Model' : '业务模式'}</label>
                    <select id="filter-type" class="form-select small">
                        <option value="B2C">B2C (跨境电商)</option>
                        <option value="B2B">B2B (传统外贸)</option>
                        <option value="D2C">D2C (独立站)</option>
                    </select>
                </div>
            `;
            body = { product: defaultProduct, market: defaultMarket, business_model: 'B2C', category: '' };
            break;
        case 'localize':
            extraHtml = `
                <div class="filter-item">
                    <label>${isEn ? 'Content Type' : '内容类型'}</label>
                    <select id="filter-type" class="form-select small">
                        <option value="产品命名">${isEn ? 'Product Naming' : '产品命名'}</option>
                        <option value="营销话术">${isEn ? 'Marketing Copy' : '营销话术'}</option>
                        <option value="视觉建议">${isEn ? 'Visual Design' : '视觉建议'}</option>
                        <option value="节日日历">${isEn ? 'Holiday Calendar' : '节日日历'}</option>
                    </select>
                </div>
            `;
            body = { content: defaultProduct, market: defaultMarket, content_type: '产品命名', category: '' };
            break;
        case 'tariff':
            extraHtml = `
                <div class="filter-item">
                    <label>${isEn ? 'HS Code' : 'HS编码'}</label>
                    <input type="text" id="filter-hscode" class="form-input small" placeholder="8517.62.0000">
                </div>
            `;
            body = { market: defaultMarket, hscode: '8517.62.0000', origin: '中国', declared_value: '1000', incoterm: 'FOB', category: '' };
            break;
        case 'cert':
            extraHtml = '';
            body = { product: defaultProduct, market: defaultMarket, market2: '', category: '' };
            break;
        case 'platform':
            extraHtml = `
                <div class="filter-item">
                    <label>${isEn ? 'Platform' : '平台'}</label>
                    <select id="filter-type" class="form-select small">
                        <option value="Amazon">Amazon</option>
                        <option value="TikTok Shop">TikTok Shop</option>
                        <option value="eBay">eBay</option>
                        <option value="Wish">Wish</option>
                    </select>
                </div>
            `;
            body = { platform: 'Amazon', market: defaultMarket, question: '', category: '' };
            break;
        case 'intellectual-property':
            extraHtml = `
                <div class="filter-item">
                    <label>${isEn ? 'Search Type' : '检索类型'}</label>
                    <select id="filter-type" class="form-select small">
                        <option value="商标">${isEn ? 'Trademark' : '商标'}</option>
                        <option value="专利">${isEn ? 'Patent' : '专利'}</option>
                        <option value="版权">${isEn ? 'Copyright' : '版权'}</option>
                    </select>
                </div>
            `;
            body = { brand_name: '示例品牌', product_desc: defaultProduct, market: defaultMarket, category: '' };
            break;
        case 'logistics-compliance':
            extraHtml = `
                <div class="filter-item">
                    <label>${isEn ? 'Shipping Method' : '运输方式'}</label>
                    <select id="filter-type" class="form-select small">
                        <option value="海运">${isEn ? 'Sea Freight' : '海运'}</option>
                        <option value="空运">${isEn ? 'Air Freight' : '空运'}</option>
                        <option value="快递">${isEn ? 'Express' : '快递'}</option>
                    </select>
                </div>
            `;
            body = { origin_country: '中国', destination_country: defaultMarket, product_type: defaultProduct, shipping_method: '海运', category: '' };
            break;
        case 'crisis':
            extraHtml = `
                <div class="filter-item">
                    <label>${isEn ? 'Crisis Type' : '危机类型'}</label>
                    <select id="filter-type" class="form-select small">
                        <option value="customs_hold">${isEn ? 'Customs Hold' : '海关扣货'}</option>
                        <option value="platform_ban">${isEn ? 'Platform Ban' : '平台下架/封店'}</option>
                        <option value="legal_letter">${isEn ? 'Legal Letter' : '收到律师函'}</option>
                        <option value="product_recall">${isEn ? 'Product Recall' : '产品召回'}</option>
                    </select>
                </div>
            `;
            body = { crisis_type: 'customs_hold', market: defaultMarket, description: '', category: '' };
            break;
        case 'stories':
            extraHtml = '';
            body = { market: defaultMarket, product: defaultProduct, category: '' };
            break;
        case 'product-quick-check':
            extraHtml = '';
            body = { product_name: defaultProduct, markets: defaultMarket, category: '' };
            break;
        default:
            extraHtml = '';
            body = { market: defaultMarket, product: defaultProduct };
    }
    
    document.getElementById('filter-extra').innerHTML = extraHtml;
    currentFilterParams = body;
    
    streamRequest(module.api, body, `${module.icon} ${title}`, moduleId, module.dimensions);
}

// ========== 显示模块表单弹窗 ==========
function showModuleForm(module) {
    const modal = document.getElementById('module-modal');
    const body = document.getElementById('modal-body');
    const isEn = currentLang === 'en';
    
    let formHtml = '';
    const title = isEn ? module.titleEn : module.title;
    const desc = isEn ? module.descEn : module.desc;
    
    // 根据模块类型生成不同表单
    switch(module.id) {
        case 'cultural':
            formHtml = culturalForm();
            break;
        case 'compliance':
            formHtml = complianceForm();
            break;
        case 'localize':
            formHtml = localizeForm();
            break;
        case 'tariff':
            formHtml = tariffForm();
            break;
        case 'cert':
            formHtml = certForm();
            break;
        case 'platform':
            formHtml = platformForm();
            break;
        case 'intellectual-property':
            formHtml = ipForm();
            break;
        case 'logistics-compliance':
            formHtml = logisticsForm();
            break;
        case 'crisis':
            formHtml = crisisForm();
            break;
        case 'stories':
            formHtml = storiesForm();
            break;
        case 'product-quick-check':
            formHtml = productQuickCheckForm();
            break;
        default:
            formHtml = defaultForm(module);
    }
    
    body.innerHTML = `
        <h2 class="modal-title">${module.icon} ${title}</h2>
        <p class="modal-subtitle">${desc}</p>
        ${formHtml}
        <div class="modal-footer">
            <button class="btn-outline" onclick="closeModuleModal()">${isEn ? 'Cancel' : '取消'}</button>
            <button class="btn-primary" onclick="submitModule('${module.id}')">⚡ ${isEn ? 'Start Scan' : '开始检测'}</button>
        </div>
    `;
    
    // 初始化市场选择
    setTimeout(() => initMarketSelects(), 0);
    
    modal.classList.add('show');
}

// ========== 各模块表单生成 ==========
function culturalForm() {
    return `
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Product/Brand' : '产品/品牌'}</label>
            <input type="text" id="form-product" class="form-input" placeholder="${currentLang === 'en' ? 'Enter product or brand name' : '请输入产品或品牌名称'}">
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Content Type' : '内容类型'}</label>
            <select id="form-type" class="form-select">
                <option value="产品">${currentLang === 'en' ? 'Product' : '产品本身'}</option>
                <option value="包装">${currentLang === 'en' ? 'Packaging' : '产品包装'}</option>
                <option value="营销文案">${currentLang === 'en' ? 'Marketing Copy' : '营销文案'}</option>
                <option value="广告素材">${currentLang === 'en' ? 'Ad Creative' : '广告素材'}</option>
                <option value="品牌名称">${currentLang === 'en' ? 'Brand Name' : '品牌名称'}</option>
            </select>
        </div>
    `;
}

function complianceForm() {
    return `
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Category' : '产品品类'}</label>
            <input type="text" id="form-product" class="form-input" placeholder="${currentLang === 'en' ? 'Enter product category' : '请输入产品品类'}">
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Business Model' : '业务模式'}</label>
            <select id="form-model" class="form-select">
                <option value="跨境电商">${currentLang === 'en' ? 'Cross-border e-commerce' : '跨境电商'}</option>
                <option value="本地仓发货">${currentLang === 'en' ? 'Local warehouse' : '本地仓发货'}</option>
                <option value="线下零售">${currentLang === 'en' ? 'Offline retail' : '线下零售'}</option>
                <option value="OEM/ODM">OEM/ODM</option>
            </select>
        </div>
    `;
}

function localizeForm() {
    return `
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Original Content' : '原始中文内容'}</label>
            <textarea id="form-content" class="form-textarea" placeholder="${currentLang === 'en' ? 'Enter content to localize' : '请输入需要本土化的内容'}"></textarea>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Content Type' : '内容类型'}</label>
            <select id="form-type" class="form-select">
                <option value="产品描述">${currentLang === 'en' ? 'Product Description' : '产品描述'}</option>
                <option value="营销文案">${currentLang === 'en' ? 'Marketing Copy' : '营销文案'}</option>
                <option value="社交媒体">${currentLang === 'en' ? 'Social Media' : '社交媒体内容'}</option>
                <option value="客服话术">${currentLang === 'en' ? 'Customer Service' : '客服话术'}</option>
            </select>
        </div>
    `;
}

function tariffForm() {
    return `
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'HS Code' : 'HS编码'}</label>
            <input type="text" id="form-hs" class="form-input" placeholder="${currentLang === 'en' ? 'Enter HS Code' : '请输入HS编码'}">
        </div>
        <div class="form-row">
            <div class="form-group">
                <label>${currentLang === 'en' ? 'Declared Value (USD)' : '申报价值(美元)'}</label>
                <input type="text" id="form-value" class="form-input" placeholder="1000">
            </div>
            <div class="form-group">
                <label>${currentLang === 'en' ? 'Incoterm' : '贸易术语'}</label>
                <select id="form-incoterm" class="form-select">
                    <option value="FOB">FOB</option>
                    <option value="CIF">CIF</option>
                    <option value="DDP">DDP</option>
                </select>
            </div>
        </div>
    `;
}

function certForm() {
    return `
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Product Name' : '产品名称'}</label>
            <input type="text" id="form-product" class="form-input" placeholder="${currentLang === 'en' ? 'Enter product name' : '请输入产品名称'}">
        </div>
    `;
}

function platformForm() {
    return `
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Platform' : '平台名称'}</label>
            <select id="form-platform" class="form-select">
                <option value="Amazon">Amazon</option>
                <option value="TikTok Shop">TikTok Shop</option>
                <option value="Shopee">Shopee</option>
                <option value="Temu">Temu</option>
                <option value="独立站">${currentLang === 'en' ? 'Independent Site' : '独立站'}</option>
                <option value="Lazada">Lazada</option>
            </select>
        </div>
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Question' : '具体问题'}</label>
            <input type="text" id="form-question" class="form-input" placeholder="${currentLang === 'en' ? 'Your question' : '您的问题'}">
        </div>
    `;
}

function ipForm() {
    return `
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Brand Name' : '品牌名称'}</label>
            <input type="text" id="form-brand" class="form-input" placeholder="${currentLang === 'en' ? 'Enter brand name' : '请输入品牌名称'}">
        </div>
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Product Description' : '产品描述'}</label>
            <textarea id="form-desc" class="form-textarea" placeholder="${currentLang === 'en' ? 'Brief product description' : '简要描述产品'}"></textarea>
        </div>
    `;
}

function logisticsForm() {
    return `
        <div class="form-row">
            <div class="form-group">
                <label>${currentLang === 'en' ? 'Origin Country' : '发货国'}</label>
                <select id="form-origin" class="form-select market-select">
                    <option value="中国">🇨🇳 ${currentLang === 'en' ? 'China' : '中国'}</option>
                </select>
            </div>
            <div class="form-group">
                <label>${currentLang === 'en' ? 'Destination' : '目的国'}</label>
                <select id="form-dest" class="form-select market-select"></select>
            </div>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Product Type' : '产品类型'}</label>
            <input type="text" id="form-product" class="form-input" placeholder="${currentLang === 'en' ? 'Enter product type' : '请输入产品类型'}">
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Shipping Method' : '运输方式'}</label>
            <select id="form-shipping" class="form-select">
                <option value="海运">${currentLang === 'en' ? 'Sea Freight' : '海运'}</option>
                <option value="空运">${currentLang === 'en' ? 'Air Freight' : '空运'}</option>
                <option value="快递">${currentLang === 'en' ? 'Express' : '快递'}</option>
                <option value="陆运">${currentLang === 'en' ? 'Land Transport' : '陆运'}</option>
            </select>
        </div>
    `;
}

function crisisForm() {
    return `
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Crisis Type' : '危机类型'}</label>
            <select id="form-crisis" class="form-select">
                <option value="customs_hold">${currentLang === 'en' ? 'Customs Hold' : '海关扣货'}</option>
                <option value="platform_ban">${currentLang === 'en' ? 'Platform Ban' : '平台下架/封店'}</option>
                <option value="legal_letter">${currentLang === 'en' ? 'Legal Letter' : '收到律师函'}</option>
                <option value="negative_pr">${currentLang === 'en' ? 'Negative PR' : '负面舆情'}</option>
                <option value="product_recall">${currentLang === 'en' ? 'Product Recall' : '产品召回'}</option>
                <option value="gov_investigation">${currentLang === 'en' ? 'Gov Investigation' : '政府调查'}</option>
            </select>
        </div>
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Description' : '危机描述'}</label>
            <textarea id="form-desc" class="form-textarea" placeholder="${currentLang === 'en' ? 'Describe the crisis...' : '简要描述危机情况...'}"></textarea>
        </div>
    `;
}

function storiesForm() {
    return `
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Category' : '产品品类'}</label>
            <input type="text" id="form-product" class="form-input" placeholder="${currentLang === 'en' ? 'Enter category' : '请输入品类'}">
        </div>
    `;
}

function productQuickCheckForm() {
    return `
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Product Name / URL' : '选品名称 / URL'}</label>
            <input type="text" id="form-product" class="form-input" placeholder="${currentLang === 'en' ? 'Enter product name or URL' : '请输入商品名称或URL'}">
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Target Markets (multi-select)' : '目标市场（可多选）'}</label>
            <input type="text" id="form-markets" class="form-input" placeholder="${currentLang === 'en' ? 'e.g. US, EU, Japan' : '如：美国, 欧盟, 日本'}">
        </div>
    `;
}

function defaultForm(module) {
    return `
        <div class="form-group">
            <label>${t('targetMarket')}</label>
            <select id="form-market" class="form-select market-select"></select>
        </div>
        <div class="form-group">
            <label>${currentLang === 'en' ? 'Product' : '产品'}</label>
            <input type="text" id="form-product" class="form-input" placeholder="${currentLang === 'en' ? 'Enter product info' : '请输入产品信息'}">
        </div>
    `;
}

// ========== 提交模块检测 ==========
function submitModule(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;
    
    closeModuleModal();
    
    let body = {};
    const market = document.getElementById('form-market')?.value || '';
    const product = document.getElementById('form-product')?.value || '';
    
    switch(moduleId) {
        case 'cultural':
            body = { market, product, content_type: document.getElementById('form-type')?.value || '产品' };
            break;
        case 'compliance':
            body = { market, product, business_model: document.getElementById('form-model')?.value || '跨境电商' };
            break;
        case 'localize':
            body = { market, content: document.getElementById('form-content')?.value || '', content_type: document.getElementById('form-type')?.value || '产品描述' };
            break;
        case 'tariff':
            body = { market, hscode: document.getElementById('form-hs')?.value || '', declared_value: document.getElementById('form-value')?.value || '0', incoterm: document.getElementById('form-incoterm')?.value || 'FOB' };
            break;
        case 'cert':
            body = { market, product };
            break;
        case 'platform':
            body = { platform: document.getElementById('form-platform')?.value || 'Amazon', market, question: document.getElementById('form-question')?.value || '' };
            break;
        case 'intellectual-property':
            body = { brand_name: document.getElementById('form-brand')?.value || '', product_desc: document.getElementById('form-desc')?.value || '', market };
            break;
        case 'logistics-compliance':
            body = { origin_country: document.getElementById('form-origin')?.value || '中国', destination_country: document.getElementById('form-dest')?.value || '', product_type: document.getElementById('form-product')?.value || '', shipping_method: document.getElementById('form-shipping')?.value || '海运' };
            break;
        case 'crisis':
            body = { crisis_type: document.getElementById('form-crisis')?.value || 'customs_hold', market, description: document.getElementById('form-desc')?.value || '' };
            break;
        case 'stories':
            body = { market, product };
            break;
        case 'product-quick-check':
            body = { product_name: document.getElementById('form-product')?.value || '', markets: document.getElementById('form-markets')?.value || '' };
            break;
        default:
            body = { market, product };
    }
    
    const title = currentLang === 'en' ? module.titleEn : module.title;
    streamRequest(module.api, body, `${module.icon} ${title}`, moduleId, module.dimensions);
}

// ========== 店铺体检 ==========
function openStoreCheckup() {
    const modal = document.getElementById('store-modal');
    const isEn = currentLang === 'en';
    
    const body = document.getElementById('modal-body');
    if (body) {} // placeholder
    
    // 先显示表单弹窗输入URL
    showModuleForm({
        id: 'store-checkup-form',
        icon: '🏪',
        title: isEn ? 'Store AI Checkup' : '店铺AI体检',
        titleEn: 'Store AI Checkup',
        desc: isEn ? 'Enter store URL for AI analysis' : '输入店铺URL，AI实时分析店铺健康度',
        descEn: 'Enter store URL for AI analysis'
    });
    
    // 替换表单内容
    setTimeout(() => {
        const modalBody = document.getElementById('modal-body');
        const formHtml = `
            <h2 class="modal-title">🏪 ${isEn ? 'Store AI Checkup' : '店铺AI体检'}</h2>
            <p class="modal-subtitle">${isEn ? 'Enter store URL for AI analysis' : '输入店铺URL，AI实时分析店铺健康度'}</p>
            <div class="form-group">
                <label>${isEn ? 'Platform' : '平台'}</label>
                <select id="form-platform" class="form-select">
                    <option value="Amazon">Amazon</option>
                    <option value="独立站">${isEn ? 'Independent Site' : '独立站'}</option>
                    <option value="TikTok Shop">TikTok Shop</option>
                    <option value="1688">1688</option>
                    <option value="Shopee">Shopee</option>
                </select>
            </div>
            <div class="form-group">
                <label>${isEn ? 'Store URL' : '店铺URL'}</label>
                <input type="text" id="form-url" class="form-input" placeholder="https://...">
            </div>
            <div class="form-group">
                <label>${t('targetMarket')}</label>
                <select id="form-market" class="form-select market-select"></select>
            </div>
            <div class="modal-footer">
                <button class="btn-outline" onclick="closeModuleModal()">${isEn ? 'Cancel' : '取消'}</button>
                <button class="btn-primary" onclick="startStoreCheckup()">⚡ ${isEn ? 'Start Checkup' : '开始体检'}</button>
            </div>
        `;
        modalBody.innerHTML = formHtml;
        initMarketSelects();
    }, 10);
}

function startStoreCheckup() {
    const url = document.getElementById('form-url')?.value || '';
    const platform = document.getElementById('form-platform')?.value || 'Amazon';
    const market = document.getElementById('form-market')?.value || '美国';
    
    if (!url) {
        alert(currentLang === 'en' ? 'Please enter store URL' : '请输入店铺URL');
        return;
    }
    
    closeModuleModal();
    
    // 打开店铺体检大弹窗
    const storeModal = document.getElementById('store-modal');
    const iframe = document.getElementById('store-iframe');
    
    storeModal.classList.add('show');
    
    // 设置iframe (注意：很多网站不允许iframe嵌入，这里用about:blank作为占位
    iframe.src = 'about:blank';
    
    // 同时发起AI分析
    const analysisContent = document.getElementById('store-analysis-content');
    analysisContent.innerHTML = '';
    
    // 开始流式请求
    streamRequestStore('/api/store-checkup', {
        store_url: url, platform, market }, '🏪 店铺AI体检', 'store-checkup', ['店铺评分', '商品抽检', 'Listing质量', '定价分析', '侵权风险'], analysisContent);
}

function closeStoreModal(event) {
    if (event && event.target.id !== 'store-modal') return;
    document.getElementById('store-modal').classList.remove('show');
}

// ========== 外贸新闻 ==========
function openTradeNews() {
    currentModuleType = 'trade-news';
    const isEn = currentLang === 'en';
    
    showResultFilter(true);
    document.getElementById('filter-market-label').textContent = isEn ? 'Market' : '关注市场';
    document.getElementById('filter-category-label').textContent = isEn ? 'Category' : '关注品类';
    document.getElementById('filter-category').placeholder = isEn ? 'Enter category (optional)' : '请输入品类（可选）';
    document.getElementById('filter-extra').innerHTML = '';
    
    const defaultMarket = '全球';
    const defaultCategory = '';
    currentFilterParams = { market: defaultMarket, category: defaultCategory, news_type: 'all' };
    
    streamRequest(
        '/api/trade-news', 
        currentFilterParams, 
        '📰 外贸新闻', 
        'trade-news', 
        ['政策法规', '关税税务', '平台动态', '市场趋势']
    );
}

function submitNews() {
    const market = document.getElementById('form-market')?.value || '全球';
    const category = document.getElementById('form-category')?.value || '';
    closeModuleModal();
    
    streamRequest('/api/trade-news', { market, category, news_type: 'all' }, '📰 外贸新闻', 'trade-news', ['政策法规', '关税税务', '平台动态', '市场趋势']);
}

// ========== 外贸学院 ==========
function openTradeAcademy() {
    currentModuleType = 'trade-academy';
    const isEn = currentLang === 'en';
    
    showResultFilter(true);
    document.getElementById('filter-market-label').textContent = isEn ? 'Topic' : '学习主题';
    document.getElementById('filter-category-label').textContent = isEn ? 'Level' : '学习级别';
    
    const extraHtml = `
        <div class="filter-item">
            <label>${isEn ? 'Level' : '学习级别'}</label>
            <select id="filter-level" class="form-select small">
                <option value="beginner">${isEn ? 'Beginner' : '入门级'}</option>
                <option value="intermediate">${isEn ? 'Intermediate' : '进阶级'}</option>
                <option value="advanced">${isEn ? 'Advanced' : '高级'}</option>
            </select>
        </div>
    `;
    document.getElementById('filter-extra').innerHTML = extraHtml;
    
    const topicSelect = document.getElementById('filter-market');
    topicSelect.innerHTML = `
        <option value="跨境电商入门">${isEn ? 'Cross-border E-commerce Intro' : '跨境电商入门'}</option>
        <option value="外贸术语词典">${isEn ? 'Trade Terminology' : '外贸术语词典'}</option>
        <option value="平台入驻指南">${isEn ? 'Platform Entry Guide' : '平台入驻指南'}</option>
        <option value="合规专题">${isEn ? 'Compliance Topics' : '合规专题'}</option>
        <option value="运营技巧">${isEn ? 'Operations Tips' : '运营技巧'}</option>
        <option value="品牌建设">${isEn ? 'Brand Building' : '品牌建设'}</option>
    `;
    
    const defaultTopic = '跨境电商入门';
    const defaultLevel = 'beginner';
    currentFilterParams = { topic: defaultTopic, level: defaultLevel, question: '' };
    
    streamRequest(
        '/api/trade-academy', 
        currentFilterParams, 
        '📚 外贸学院', 
        'trade-academy', 
        ['入门课程', '术语词典', '进阶内容', '实操要点', '常见误区']
    );
}

function submitAcademy() {
    const topic = document.getElementById('form-topic')?.value || '跨境电商入门';
    const level = document.getElementById('form-level')?.value || 'beginner';
    const question = document.getElementById('form-question')?.value || '';
    closeModuleModal();
    
    streamRequest('/api/trade-academy', { topic, level, question }, '📚 外贸学院', 'trade-academy', ['入门课程', '术语词典', '进阶内容', '实操要点', '常见误区']);
}

// ========== 外贸工具箱 ==========
let currentToolTab = 'hs';

function openTradeTools() {
    const modal = document.getElementById('module-modal');
    const body = document.getElementById('modal-body');
    const isEn = currentLang === 'en';
    
    modal.classList.add('modal-large');
    
    body.innerHTML = `
        <h2 class="modal-title">🧰 ${isEn ? 'Trade Toolbox' : '外贸工具箱'}</h2>
        <p class="modal-subtitle">${isEn ? 'Essential tools for cross-border beginners' : '外贸小白必备实用工具'}</p>
        
        <div class="tool-tabs">
            <div class="tool-tab ${currentToolTab === 'hs' ? 'active' : ''}" onclick="switchToolTab('hs')">
                🔍 ${isEn ? 'HS Code Lookup' : 'HS编码查询'}
            </div>
            <div class="tool-tab ${currentToolTab === 'terms' ? 'active' : ''}" onclick="switchToolTab('terms')">
                📖 ${isEn ? 'Trade Terms' : '术语词典'}
            </div>
            <div class="tool-tab ${currentToolTab === 'knowledge' ? 'active' : ''}" onclick="switchToolTab('knowledge')">
                📚 ${isEn ? 'Knowledge Base' : '外贸知识库'}
            </div>
        </div>
        
        <div class="tool-content" id="tool-content">
            ${renderToolTab(currentToolTab, isEn)}
        </div>
        
        <div class="modal-footer">
            <button class="btn-outline" onclick="closeToolModal()">${isEn ? 'Close' : '关闭'}</button>
        </div>
    `;
    
    document.getElementById('module-modal').style.display = 'flex';
    
    setTimeout(() => {
        if (currentToolTab === 'knowledge') {
            loadKnowledgeList();
        } else if (currentToolTab === 'hs') {
            searchHsCode('');
        } else if (currentToolTab === 'terms') {
            searchTerms('');
        }
    }, 50);
}

function switchToolTab(tab) {
    currentToolTab = tab;
    const isEn = currentLang === 'en';
    
    document.querySelectorAll('.tool-tab').forEach((el, i) => {
        const tabs = ['hs', 'terms', 'knowledge'];
        el.classList.toggle('active', tabs[i] === tab);
    });
    
    document.getElementById('tool-content').innerHTML = renderToolTab(tab, isEn);
    
    setTimeout(() => {
        if (tab === 'hs') searchHsCode('');
        else if (tab === 'terms') searchTerms('');
        else if (tab === 'knowledge') loadKnowledgeList();
    }, 50);
}

function renderToolTab(tab, isEn) {
    if (tab === 'hs') {
        return `
            <div class="tool-search-bar">
                <input type="text" id="hs-search-input" class="form-input" 
                    placeholder="${isEn ? 'Search HS code or product name...' : '输入HS编码或商品名称搜索...'}"
                    oninput="searchHsCode(this.value)">
                <select id="hs-category" class="form-select" onchange="searchHsCode(document.getElementById('hs-search-input').value)">
                    <option value="">${isEn ? 'All Categories' : '全部品类'}</option>
                    <option value="3C">3C电子</option>
                    <option value="服装">服装鞋包</option>
                    <option value="家居">家居用品</option>
                    <option value="食品">食品饮料</option>
                    <option value="美妆">美妆个护</option>
                    <option value="玩具">母婴玩具</option>
                </select>
            </div>
            <div class="tool-result-list" id="hs-result-list">
                <div class="tool-loading">${isEn ? 'Loading...' : '加载中...'}</div>
            </div>
        `;
    } else if (tab === 'terms') {
        return `
            <div class="tool-search-bar">
                <input type="text" id="terms-search-input" class="form-input" 
                    placeholder="${isEn ? 'Search trade terms...' : '输入术语缩写或中文搜索...'}"
                    oninput="searchTerms(this.value)">
                <select id="terms-category" class="form-select" onchange="searchTerms(document.getElementById('terms-search-input').value)">
                    <option value="">${isEn ? 'All Categories' : '全部类别'}</option>
                    <option value="贸易术语">贸易术语</option>
                    <option value="付款方式">付款方式</option>
                    <option value="海关编码">海关编码</option>
                    <option value="采购术语">采购术语</option>
                    <option value="生产方式">生产方式</option>
                    <option value="商业模式">商业模式</option>
                </select>
            </div>
            <div class="tool-result-list" id="terms-result-list">
                <div class="tool-loading">${isEn ? 'Loading...' : '加载中...'}</div>
            </div>
        `;
    } else {
        return `
            <div class="tool-search-bar">
                <div class="tool-info-bar">
                    📖 ${isEn ? 'Practical knowledge for cross-border beginners' : '跨境出海新手必备实用知识'}
                </div>
            </div>
            <div class="tool-result-list" id="knowledge-list">
                <div class="tool-loading">${isEn ? 'Loading...' : '加载中...'}</div>
            </div>
        `;
    }
}

async function searchHsCode(keyword) {
    const category = document.getElementById('hs-category')?.value || '';
    const resultEl = document.getElementById('hs-result-list');
    if (!resultEl) return;
    
    try {
        const res = await fetch('/api/tools/hs-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keyword, category })
        });
        const data = await res.json();
        const results = data.results || [];
        
        if (results.length === 0) {
            resultEl.innerHTML = `<div class="tool-empty">${currentLang === 'en' ? 'No results found' : '未找到相关结果'}</div>`;
            return;
        }
        
        resultEl.innerHTML = results.map(item => `
            <div class="tool-item">
                <div class="tool-item-header">
                    <span class="tool-item-code">${item.code}</span>
                    <span class="tool-item-category">${item.category}</span>
                </div>
                <div class="tool-item-title">${item.name}</div>
                <div class="tool-item-desc">${item.description}</div>
                <div class="tool-item-tariffs">
                    <span class="tariff-tag">🇨🇳 ${currentLang === 'en' ? 'CN' : '中'}: ${item.tariff_cn}</span>
                    <span class="tariff-tag">🇺🇸 ${currentLang === 'en' ? 'US' : '美'}: ${item.tariff_us}</span>
                    <span class="tariff-tag">🇪🇺 ${currentLang === 'en' ? 'EU' : '欧'}: ${item.tariff_eu}</span>
                </div>
            </div>
        `).join('');
    } catch (e) {
        resultEl.innerHTML = `<div class="tool-error">${currentLang === 'en' ? 'Search failed' : '搜索失败'}</div>`;
    }
}

async function searchTerms(keyword) {
    const category = document.getElementById('terms-category')?.value || '';
    const resultEl = document.getElementById('terms-result-list');
    if (!resultEl) return;
    
    try {
        const res = await fetch('/api/tools/terms-search', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ keyword, category })
        });
        const data = await res.json();
        const results = data.results || [];
        
        if (results.length === 0) {
            resultEl.innerHTML = `<div class="tool-empty">${currentLang === 'en' ? 'No results found' : '未找到相关结果'}</div>`;
            return;
        }
        
        resultEl.innerHTML = results.map(item => `
            <div class="tool-item">
                <div class="tool-item-header">
                    <span class="tool-item-en">${item.en}</span>
                    <span class="tool-item-category">${item.category}</span>
                </div>
                <div class="tool-item-title">${item.cn}</div>
                <div class="tool-item-full"><strong>${item.full}</strong></div>
                <div class="tool-item-desc">${item.description}</div>
                <div class="tool-item-section">
                    <div class="tool-item-label">💡 ${currentLang === 'en' ? 'Scenario' : '使用场景'}:</div>
                    <div>${item.scenario}</div>
                </div>
                <div class="tool-item-section">
                    <div class="tool-item-label">⚠️ ${currentLang === 'en' ? 'Tips' : '注意事项'}:</div>
                    <div>${item.tips}</div>
                </div>
            </div>
        `).join('');
    } catch (e) {
        resultEl.innerHTML = `<div class="tool-error">${currentLang === 'en' ? 'Search failed' : '搜索失败'}</div>`;
    }
}

async function loadKnowledgeList() {
    const resultEl = document.getElementById('knowledge-list');
    if (!resultEl) return;
    
    try {
        const res = await fetch('/api/tools/knowledge');
        const data = await res.json();
        const results = data.results || [];
        
        if (results.length === 0) {
            resultEl.innerHTML = `<div class="tool-empty">${currentLang === 'en' ? 'No content yet' : '暂无内容'}</div>`;
            return;
        }
        
        resultEl.innerHTML = results.map(item => `
            <div class="tool-item knowledge-item" onclick="openKnowledgeDetail('${item.title}')">
                <div class="tool-item-header">
                    <span class="knowledge-icon">📖</span>
                    <span class="tool-item-category">${item.category}</span>
                </div>
                <div class="tool-item-title">${item.title}</div>
                <div class="knowledge-arrow">→</div>
            </div>
        `).join('');
    } catch (e) {
        resultEl.innerHTML = `<div class="tool-error">${currentLang === 'en' ? 'Load failed' : '加载失败'}</div>`;
    }
}

async function openKnowledgeDetail(title) {
    const isEn = currentLang === 'en';
    const resultEl = document.getElementById('knowledge-list');
    
    try {
        const res = await fetch('/api/tools/knowledge-detail', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title })
        });
        const data = await res.json();
        const item = data.result;
        
        if (!item) {
            alert(isEn ? 'Content not found' : '内容不存在');
            return;
        }
        
        document.getElementById('tool-content').innerHTML = `
            <div class="knowledge-detail">
                <button class="back-btn" onclick="switchToolTab('knowledge')">← ${isEn ? 'Back' : '返回列表'}</button>
                <h3 class="knowledge-detail-title">${item.title}</h3>
                <div class="knowledge-detail-category">${item.category}</div>
                <div class="knowledge-detail-content" id="knowledge-detail-content">
                    加载中...
                </div>
            </div>
        `;
        
        setTimeout(() => {
            document.getElementById('knowledge-detail-content').innerHTML = parseMd(item.content);
        }, 50);
    } catch (e) {
        alert(isEn ? 'Load failed' : '加载失败');
    }
}

function closeToolModal() {
    closeModuleModal();
}

// ========== 快速检测 ==========
function quickScan() {
    const market = document.getElementById('quick-market')?.value || '';
    const product = document.getElementById('quick-product')?.value?.trim() || '';
    
    if (!market) {
        alert(currentLang === 'en' ? 'Please select a market' : '请选择目标市场');
        return;
    }
    if (!product) {
        alert(currentLang === 'en' ? 'Please enter product info' : '请输入产品信息');
        return;
    }
    
    // 默认走文化检测作为快速检测
    streamRequest('/api/cultural', { market, product, content_type: '产品' }, '⚡ 快速检测报告', 'cultural', ['宗教禁忌', '颜色象征', '数字禁忌', '动物图案', '肢体语言', '性别文化', '历史敏感']);
}

// ========== 新闻详情 ==========
function openNewsDetail(id) {
    openModule('trade-news');
}

// ========== SSE 流式请求 ==========
function showResultFilter(show) {
    const filter = document.getElementById('result-filter');
    if (show) {
        filter.style.display = 'block';
        setTimeout(() => initFilterMarketSelect(), 50);
    } else {
        filter.style.display = 'none';
    }
}

function initFilterMarketSelect() {
    const select = document.getElementById('filter-market');
    if (!select || select.options.length > 1) return;
    
    const sourceSelect = document.getElementById('market-select');
    if (sourceSelect) {
        select.innerHTML = sourceSelect.innerHTML;
    } else {
        initMarketSelects();
        if (sourceSelect) {
            select.innerHTML = sourceSelect.innerHTML;
        }
    }
}

function applyFilter() {
    const market = document.getElementById('filter-market')?.value || '美国';
    const category = document.getElementById('filter-category')?.value || '';
    const filterType = document.getElementById('filter-type')?.value || '';
    const filterHsCode = document.getElementById('filter-hscode')?.value || '';
    const filterLevel = document.getElementById('filter-level')?.value || '';
    
    const module = MODULES.find(m => m.id === currentModuleType);
    if (!module) return;
    
    const isEn = currentLang === 'en';
    const title = isEn ? module.titleEn : module.title;
    let body = {};
    
    switch(currentModuleType) {
        case 'trade-news':
            body = { market, category, news_type: 'all' };
            break;
        case 'trade-academy':
            const topic = document.getElementById('filter-market')?.value || '跨境电商入门';
            const level = filterLevel || 'beginner';
            body = { topic, level, question: '' };
            break;
        case 'cultural':
            body = { product: category || '示例产品', market, content_type: filterType || '产品包装', category: '' };
            break;
        case 'compliance':
            body = { product: category || '电子产品', market, business_model: filterType || 'B2C', category: '' };
            break;
        case 'localize':
            body = { content: category || '示例产品', market, content_type: filterType || '产品命名', category: '' };
            break;
        case 'tariff':
            body = { market, hscode: filterHsCode || '8517.62.0000', origin: '中国', declared_value: '1000', incoterm: 'FOB', category: '' };
            break;
        case 'cert':
            body = { product: category || '电子产品', market, market2: '', category: '' };
            break;
        case 'platform':
            body = { platform: filterType || 'Amazon', market, question: '', category: '' };
            break;
        case 'intellectual-property':
            body = { brand_name: category || '示例品牌', product_desc: '电子产品', market, category: '' };
            break;
        case 'logistics-compliance':
            body = { origin_country: '中国', destination_country: market, product_type: category || '电子产品', shipping_method: filterType || '海运', category: '' };
            break;
        case 'crisis':
            body = { crisis_type: filterType || 'customs_hold', market, description: '', category: '' };
            break;
        case 'stories':
            body = { market, product: category || '电子产品', category: '' };
            break;
        case 'product-quick-check':
            body = { product_name: category || '电子产品', markets: market, category: '' };
            break;
        default:
            body = { market, product: category || '电子产品' };
    }
    
    currentFilterParams = body;
    streamRequest(module.api, body, `${module.icon} ${title}`, currentModuleType, module.dimensions);
}

async function streamRequest(url, body, title, moduleType, dimensions, customContentEl) {
    const resultPanel = document.getElementById('result-panel');
    const resultContent = customContentEl || document.getElementById('result-content');
    const resultTitle = document.getElementById('result-title');
    const resultTime = document.getElementById('result-time');
    const loading = document.getElementById('loading-indicator');
    
    // 显示扫描动画
    showScanAnimation(moduleType, dimensions);
    
    // 设置结果面板
    resultTitle.textContent = title;
    resultTime.textContent = new Date().toLocaleString(currentLang === 'zh' ? 'zh-CN' : 'en-US');
    
    if (!customContentEl) {
        resultContent.innerHTML = '';
        resultPanel.classList.add('show');
        loading.style.display = 'flex';
        document.getElementById('score-panel').style.display = 'none';
        document.getElementById('radar-panel').style.display = 'none';
    } else {
        customContentEl.innerHTML = '';
    }
    
    let fullText = '';
    let firstChunk = true;
    
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
        let eventBuffer = [];
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop();
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') {
                        eventBuffer = [];
                        break;
                    }
                    eventBuffer.push(data);
                } else if (line === '') {
                    if (eventBuffer.length > 0) {
                        const data = eventBuffer.join('\n');
                        eventBuffer = [];
                        
                        if (firstChunk && data) {
                            hideScanAnimation();
                            firstChunk = false;
                            if (!customContentEl) {
                                loading.style.display = 'none';
                            }
                        }
                        
                        fullText += data;
                        renderMarkdownDebounced(resultContent, removeScoreJson(fullText), 100);
                    }
                }
            }
        }
        
        // 解析评分
        const scoreData = parseScore(fullText);
        if (scoreData && !customContentEl) {
            showScorePanel(scoreData);
            showRadarPanel(scoreData);
        }
        
        resultContent.innerHTML = parseMd(removeScoreJson(fullText));
        
    } catch (e) {
        hideScanAnimation();
        if (!customContentEl) {
            loading.style.display = 'none';
        }
        const isEn = currentLang === 'en';
        let errorMsg = e.message;
        let errorTip = '';
        
        if (e.message.includes('401') || e.message.includes('Unauthorized')) {
            errorMsg = isEn ? 'API key is invalid or expired' : 'API密钥无效或已过期';
            errorTip = isEn ? 'The system is running in demo mode with sample data' : '系统将使用演示数据展示功能';
        } else if (e.message.includes('500')) {
            errorMsg = isEn ? 'Server internal error' : '服务器内部错误';
        } else if (e.message.includes('Failed to fetch') || e.message.includes('Load failed')) {
            errorMsg = isEn ? 'Cannot connect to server' : '无法连接到服务器';
            errorTip = isEn ? 'Please check if the service is running' : '请检查服务是否正常运行';
        }
        
        resultContent.innerHTML = `
        <div style="padding:20px;background:var(--danger-bg);border:1px solid var(--danger-border);border-radius:12px;color:var(--danger);">
            <div style="font-size:32px;margin-bottom:12px;">⚠️</div>
            <p style="font-weight:600;font-size:16px;margin-bottom:8px;">${isEn ? 'Request Failed' : '请求失败'}</p>
            <p style="font-size:14px;opacity:0.9;margin-bottom:4px;">${errorMsg}</p>
            ${errorTip ? `<p style="font-size:13px;opacity:0.7;margin-top:8px;padding-top:8px;border-top:1px solid var(--danger-border);">💡 ${errorTip}</p>` : ''}
        </div>`;
    } finally {
        if (document.getElementById('history-panel').classList.contains('open')) {
            loadHistory();
        }
    }
}

// 店铺体检专用流式请求
async function streamRequestStore(url, body, title, moduleType, dimensions, contentEl) {
    showScanAnimation(moduleType, dimensions);
    let fullText = '';
    let firstChunk = true;
    
    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body),
        });
        
        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let eventBuffer = [];
        
        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop();
            
            for (const line of lines) {
                if (line.startsWith('data: ')) {
                    const data = line.slice(6);
                    if (data === '[DONE]') {
                        eventBuffer = [];
                        break;
                    }
                    eventBuffer.push(data);
                } else if (line === '') {
                    if (eventBuffer.length > 0) {
                        const data = eventBuffer.join('\n');
                        eventBuffer = [];
                        
                        if (firstChunk && data) {
                            hideScanAnimation();
                            firstChunk = false;
                            document.querySelector('.store-analysis-title').textContent = 
                                currentLang === 'en' ? 'AI Analysis Result' : 'AI分析结果';
                        }
                        
                        fullText += data;
                        renderMarkdownDebounced(contentEl, removeScoreJson(fullText), 100);
                    }
                }
            }
        }
        
        contentEl.innerHTML = parseMd(removeScoreJson(fullText));
        
    } catch (e) {
        hideScanAnimation();
        contentEl.innerHTML = `<p style="color:var(--danger)">${currentLang === 'en' ? 'Request failed: ' : '请求失败：' }${e.message}</p>`;
    }
}

// ========== 扫描动画 ==========
function showScanAnimation(moduleType, dimensions) {
    const overlay = document.getElementById('scan-overlay');
    const dimsContainer = document.getElementById('scan-dimensions');
    
    dimsContainer.innerHTML = dimensions.map(d => `<span class="scan-dim-tag">${d}</span>`).join('');
    overlay.classList.add('show');
    
    const tags = dimsContainer.querySelectorAll('.scan-dim-tag');
    tags.forEach((tag, i) => {
        setTimeout(() => {
            if (i > 0) tags[i - 1].classList.remove('scanning');
            tag.classList.add('scanning');
            if (i > 0) tags[i - 1].classList.add('scanned');
        }, i * 500);
    });
}

function hideScanAnimation() {
    document.getElementById('scan-overlay').classList.remove('show');
}

// ========== 评分解析 ==========
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
                return {
                    score: data.score,
                    level: data.level || 'caution',
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
    t = t.replace(/```\w*/g, '');
    t = t.replace(/\{[\s]*"score"[\s]*:[\s\S]*?\}\s*$/g, '');
    return t.trim();
}

// ========== 评分显示 ==========
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
            return `<span class="breakdown-item ${cls}">${item.item} ${sign}${item.change}${currentLang === 'en' ? 'pts' : '分'}</span>`;
        }).join('');
    } else {
        breakdownEl.innerHTML = '';
    }
}

function getScoreColor(score) {
    if (score >= 85) return '#10B981';
    if (score >= 60) return '#F59E0B';
    if (score >= 30) return '#EA580C';
    return '#EF4444';
}

function getScoreLevel(score) {
    if (score >= 85) return { text: t('scoreSafe'), color: '#10B981' };
    if (score >= 60) return { text: t('scoreCaution'), color: '#F59E0B' };
    if (score >= 30) return { text: t('scoreDanger'), color: '#EA580C' };
    return { text: t('scoreForbidden'), color: '#EF4444' };
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

// ========== 雷达图 ==========
function showRadarPanel(scoreData) {
    if (!scoreData.radar) return;
    const panel = document.getElementById('radar-panel');
    panel.style.display = 'block';
    
    const dimLabels = currentLang === 'en' 
        ? ['Cultural', 'Compliance', 'Brand', 'Localization', 'Visual', 'Logistics']
        : ['文化适配', '合规达标', '品牌安全', '文案本土化', '视觉适配', '支付物流'];
    
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
        tooltip: { trigger: 'item' },
        radar: {
            indicator: dimLabels.map(d => ({ name: d, max: 100 })),
            radius: '65%',
            axisName: { color: 'var(--text-secondary)', fontSize: 12 },
            splitArea: { areaStyle: { color: ['rgba(26,86,219,0.02)', 'rgba(26,86,219,0.05)'] } },
            splitLine: { lineStyle: { color: 'rgba(26,86,219,0.12)' } },
            axisLine: { lineStyle: { color: 'rgba(26,86,219,0.15)' } }
        },
        series: [{
            type: 'radar',
            data: [{
                value: yourProduct,
                name: currentLang === 'en' ? 'Your Product' : '你的产品',
                symbol: 'circle',
                symbolSize: 6,
                lineStyle: { color: '#1A56DB', width: 2 },
                areaStyle: { color: 'rgba(26,86,219,0.15)' },
                itemStyle: { color: '#1A56DB' }
            }],
            animationDuration: 1500,
            animationEasing: 'cubicOut'
        }]
    };
    chart.setOption(option);
    window.addEventListener('resize', () => chart.resize());
}

// ========== Markdown 解析 ==========
function parseMd(md) {
    if (!md) return '';
    let html = md;
    html = html.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    
    // 标题
    html = html.replace(/^#### (.+)$/gm, '<h4>$1</h4>');
    html = html.replace(/^### (.+)$/gm, '<h3>$1</h3>');
    html = html.replace(/^## (.+)$/gm, '<h2>$1</h2>');
    html = html.replace(/^# (.+)$/gm, '<h1>$1</h1>');
    
    // 加粗
    html = html.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');
    
    // 代码
    html = html.replace(/`([^`]+)`/g, '<code>$1</code>');
    
    // 分隔线
    html = html.replace(/^---+$/gm, '<hr>');
    
    // 引用
    html = html.replace(/^&gt;\s?(.+)$/gm, '<blockquote>$1</blockquote>');
    
    // 列表
    html = html.replace(/^[\-\*]\s+(.+)$/gm, '<li>$1</li>');
    html = html.replace(/((?:<li[\s>][\s\S]*?<\/li>\s*)+)/g, '<ul>$1</ul>');
    html = html.replace(/^\d+\.\s+(.+)$/gm, '<li>$1</li>');
    
    // 段落
    html = html.replace(/\n{2,}/g, '</p><p>');
    html = html.replace(/\n/g, '<br>');
    html = '<p>' + html + '</p>';
    
    // 清理
    html = html.replace(/<p>\s*<\/p>/g, '');
    html = html.replace(/<p>\s*(<h[1-4][ >])/g, '$1');
    html = html.replace(/(<\/h[1-4]>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<ul[ >])/g, '$1');
    html = html.replace(/(<\/ul>)\s*<\/p>/g, '$1');
    html = html.replace(/<p>\s*(<blockquote[ >])/g, '$1');
    html = html.replace(/(<\/blockquote>)\s*<\/p>/g, '$1');
    
    return html;
}

let _renderTimer = null;
function renderMarkdownDebounced(el, md, delay) {
    delay = delay || 150;
    clearTimeout(_renderTimer);
    _renderTimer = setTimeout(function() { 
        el.innerHTML = parseMd(md);
    }, delay);
}

// ========== 结果面板控制 ==========
function closeResult() {
    document.getElementById('result-panel').classList.remove('show');
    showResultFilter(false);
    currentModuleType = '';
    currentFilterParams = {};
}

function generateFullReport() {
    alert(currentLang === 'en' ? 'Generating full report...' : '生成完整报告中...');
}

// ========== 模态框控制 ==========
function closeModuleModal() {
    document.getElementById('module-modal').classList.remove('show');
}

function closeModalOnOverlay(event) {
    if (event.target.id === 'module-modal') {
        closeModuleModal();
    }
}

// ========== 历史记录 ==========
function toggleHistory() {
    const panel = document.getElementById('history-panel');
    panel.classList.toggle('open');
    if (panel.classList.contains('open')) {
        loadHistory();
    }
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
        const moduleNames = {
            cultural: currentLang === 'en' ? 'Cultural' : '文化检测',
            compliance: currentLang === 'en' ? 'Compliance' : '合规扫描',
            localize: currentLang === 'en' ? 'Localization' : '本土化',
            stories: currentLang === 'en' ? 'Stories' : '踩雷故事',
            tariff: currentLang === 'en' ? 'Tariff' : '关税估算',
            cert: currentLang === 'en' ? 'Certification' : '认证查询',
            crisis: currentLang === 'en' ? 'Crisis' : '危机处置',
            'store-checkup': currentLang === 'en' ? 'Store Checkup' : '店铺体检',
            'product-quick-check': currentLang === 'en' ? 'Product Check' : '选品快检',
            'trade-news': currentLang === 'en' ? 'News' : '外贸新闻',
            'trade-academy': currentLang === 'en' ? 'Academy' : '外贸学院',
            'intellectual-property': currentLang === 'en' ? 'IP Check' : '知识产权',
            'logistics-compliance': currentLang === 'en' ? 'Logistics' : '物流合规',
            platform: currentLang === 'en' ? 'Platform' : '平台入驻',
        };
        list.innerHTML = data.map(item => `
            <div class="history-item" onclick="loadHistoryDetail(${item.id})">
                <div class="top">
                    <span class="module-tag">${moduleNames[item.module_type] || item.module_type}</span>
                    <span class="date">${new Date(item.created_at).toLocaleString(currentLang === 'zh' ? 'zh-CN' : 'en-US')}</span>
                </div>
                <p class="info">${item.market} · ${item.product || ''}</p>
            </div>
        `).join('');
    } catch (e) { console.error('Load history failed:', e); }
}

async function loadHistoryDetail(id) {
    try {
        const res = await fetch(`/api/history/${id}`);
        const data = await res.json();
        const resultPanel = document.getElementById('result-panel');
        resultPanel.classList.add('show');
        document.getElementById('score-panel').style.display = 'none';
        document.getElementById('radar-panel').style.display = 'none';
        document.getElementById('result-content').innerHTML = parseMd(data.output_data);
        document.getElementById('result-time').textContent = new Date(data.created_at).toLocaleString(currentLang === 'zh' ? 'zh-CN' : 'en-US');
        
        const scoreData = parseScore(data.output_data);
        if (scoreData) {
            showScorePanel(scoreData);
            showRadarPanel(scoreData);
        }
        
        resultPanel.scrollIntoView({ behavior: 'smooth' });
    } catch (e) { console.error('Load detail failed:', e); }
}

// ========== 滚动到顶部 ==========
function scrollToTop() {
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
