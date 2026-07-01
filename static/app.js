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

// ========== 模块知识卡片 ==========
const KNOWLEDGE_CARDS = {
    cultural: {
        title: '文化雷区知识库',
        cards: [
            { icon: '🎨', title: '颜色禁忌', desc: '各国颜色象征差异大', content: '日本紫色高贵、中国红色喜庆、欧美白色纯洁、泰国黄色王室专用、中东绿色神圣。选品和包装前务必确认目标市场颜色偏好。', tag: '热门' },
            { icon: '🔢', title: '数字忌讳', desc: '数字背后有文化含义', content: '中日韩忌讳4（死）、欧美忌讳13（不吉利）、印度忌讳0、中东忌讳5。价格设置、SKU编号、促销日期都要避开忌讳数字。', tag: '必看' },
            { icon: '🐾', title: '动物图案', desc: '动物寓意因地而异', content: '中国龙是权威、西方龙是邪恶；印度牛神圣不可侵犯；伊斯兰国家禁止猪图案；澳大利亚袋鼠是国宝；东南亚大象象征吉祥。', tag: '' },
            { icon: '🙏', title: '宗教禁忌', desc: '宗教影响渗透生活', content: '伊斯兰国家禁猪肉酒精、斋月白天不可公开进食；印度教敬牛禁牛肉；佛教国家对佛像需恭敬；基督教国家圣诞节是重要节日。', tag: '重要' },
            { icon: '✋', title: '肢体语言', desc: '手势含义大不同', content: '竖大拇指在中东/伊朗是侮辱；OK手势在巴西/土耳其是脏话；双手递物在日本是尊重；用左手递东西在印度/中东不礼貌。', tag: '' },
            { icon: '👤', title: '性别敏感', desc: '性别观念差异显著', content: '中东国家对性别隔离要求严格；北欧强调性别平等；日韩职场等级分明；东南亚相对宽松。广告和包装中人物形象需谨慎处理。', tag: '' },
        ]
    },
    compliance: {
        title: '合规法规知识库',
        cards: [
            { icon: '🛡️', title: '产品认证', desc: '各国强制认证清单', content: '欧盟CE、美国FCC/FDA、日本PSE/TELEC、韩国KC、澳大利亚RCM、巴西INMETRO、俄罗斯EAC、沙特SASO/SABER、尼日利亚SONCAP。', tag: '热门' },
            { icon: '🔒', title: '数据隐私', desc: '全球数据保护法规', content: '欧盟GDPR（最高4%全球营业额罚款）、美国CCPA、巴西LGPD、日本APPI、韩国PIPA、印度DPDP。跨境电商必须重视用户数据保护。', tag: '重要' },
            { icon: '📢', title: '广告法规', desc: '广告宣传合规要求', content: '各国对虚假宣传、比较广告、代言人都有严格规定。德国禁止比较广告、英国ASA监管严格、美国FTC要求披露赞助关系、中国广告法禁用极限词。', tag: '' },
            { icon: '💰', title: '税务合规', desc: '跨境税务要点', content: '欧盟VAT（IOSS/OSS）、美国销售税（各州不同）、英国VAT、日本JCT、澳大利亚GST、加拿大GST。税号注册和申报是合规基础。', tag: '必看' },
            { icon: '📜', title: '知识产权', desc: '商标专利版权保护', content: '商标地域性原则（去哪国注册哪国）、专利先申请制、版权自动产生。跨境卖家应提前布局目标市场商标注册，防止被抢注。', tag: '' },
            { icon: '🏷️', title: '标签合规', desc: '产品标签要求', content: '成分/材质标签、警示语、原产地标注、使用说明、安全认证标志。各国标签要求不同，服装/玩具/食品/电子产品尤其严格。', tag: '' },
        ]
    },
    localize: {
        title: '本土化改造知识库',
        cards: [
            { icon: '📝', title: '产品命名', desc: '命名也要接地气', content: '好名字要符合当地语言习惯、易发音、无歧义、不冒犯。避免直译导致的尴尬（如某品牌名在当地语言中是脏话）。建议找母语者审核。', tag: '热门' },
            { icon: '💬', title: '营销话术', desc: '打动当地消费者', content: '不同市场的购买决策逻辑不同。欧美强调功能和数据、东南亚喜欢社交种草、日本注重细节和品质、中东看重名人背书。', tag: '' },
            { icon: '🖼️', title: '视觉设计', desc: '视觉本土化要点', content: '模特选用当地人、场景符合当地生活方式、颜色搭配符合审美偏好、图标和手势符合当地习惯。不要直接套用国内视觉风格。', tag: '' },
            { icon: '🎄', title: '节日日历', desc: '抓住营销节点', content: '欧美圣诞+黑五、东南亚9.9/11.11、日本樱花季+盂兰盆节、中东斋月+开斋节、印度排灯节、中国春节。每个节日都是营销良机。', tag: '必看' },
            { icon: '💳', title: '支付方式', desc: '各国主流支付', content: '欧美信用卡/PayPal、东南亚COD（货到付款）+电子钱包、日本便利店付款、韩国Kakao Pay、中东Cash on Delivery、印度UPI。', tag: '重要' },
            { icon: '🚚', title: '物流偏好', desc: '物流体验影响复购', content: '欧美追求速度（亚马逊Prime次日达）、东南亚价格敏感接受慢、日本对配送时间精确性要求高、中东最后一公里配送难。', tag: '' },
        ]
    },
    tariff: {
        title: '关税估算知识库',
        cards: [
            { icon: '📦', title: 'HS编码', desc: '海关编码的基础', content: 'HS编码（海关编码）是国际贸易的通用语言，决定关税税率和监管条件。前6位全球统一，后几位各国自行细化。归类错误可能导致高额罚款。', tag: '热门' },
            { icon: '💸', title: '关税种类', desc: '不只基础关税', content: '除基础关税外，还可能有：反倾销税、反补贴税、保障措施税、增值税/消费税等。总税率可能远高于基础关税率。', tag: '重要' },
            { icon: '🌏', title: 'FTA优惠', desc: '自由贸易协定', content: '中国已与20多个国家/地区签FTA（如RCEP、中澳、中新、中智等）。符合原产地规则的产品可享受零关税或优惠关税。', tag: '必看' },
            { icon: '📋', title: '原产地证', desc: '优惠关税的凭证', content: '原产地证书是享受FTA优惠关税的必要文件。常见的有：一般原产地证CO、普惠制证FORMA、区域优惠证（如RCEP、中澳CHAFTA）。', tag: '' },
            { icon: '🔍', title: '完税价格', desc: '关税计算基数', content: '关税=完税价格×关税税率。完税价格通常是CIF价（成本+保险+运费）。不同国家可能有不同的估价规则。', tag: '' },
            { icon: '⚠️', title: '低报风险', desc: '低申报得不偿失', content: '故意低报货值以减少关税是走私行为，一旦被查出可能面临：补税+罚款+货物没收+列入黑名单+刑事追责。切勿因小失大。', tag: '警示' },
        ]
    },
    cert: {
        title: '产品准入知识库',
        cards: [
            { icon: '🇪🇺', title: '欧盟认证', desc: 'CE及其他认证', content: 'CE是欧盟市场准入标志（自我声明），涉及指令包括：低电压LVD、电磁兼容EMC、机械MD、玩具安全Toys、个人防护PPE、医疗器械MDR等。', tag: '热门' },
            { icon: '🇺🇸', title: '美国认证', desc: 'FCC/FDA/UL等', content: '电子产品需FCC认证（ID/DoC/Verification）、食品药品化妆品需FDA注册/认证、安全认证UL/ETL（非强制但市场认可度高）。', tag: '重要' },
            { icon: '🇯🇵', title: '日本认证', desc: 'PSE/TELEC等', content: '电气产品需PSE认证（菱形/圆形）、无线产品需TELEC/技适标志、医疗器械需PMDA认证、食品需厚生劳动省备案。', tag: '' },
            { icon: '🇰🇷', title: '韩国认证', desc: 'KC/KCC等', content: '电气用品安全认证KC（强制）、无线通信设备KCC认证、儿童产品KC Kids、食品KFDA。韩国认证通常需要本地代表。', tag: '' },
            { icon: '💰', title: '认证费用', desc: '认证成本参考', content: '认证费用差异很大：FCC ID约$3000-8000、CE LVD+EMC约¥8000-20000、PSE菱形约¥30000+、TELEC约¥20000-40000。周期从2周到半年不等。', tag: '必看' },
            { icon: '📅', title: '认证周期', desc: '提前规划时间', content: '认证需要时间：CE自我声明1-2周、FCC ID 4-8周、PSE菱形 6-8周、KC 6-12周。新产品开发建议提前规划认证时间。', tag: '' },
        ]
    },
    platform: {
        title: '电商平台知识库',
        cards: [
            { icon: '🏪', title: 'Amazon', desc: '全球最大电商平台', content: '站点覆盖美/欧/日/澳/中东等，重产品轻店铺，FBA是核心竞争力。注意：商标备案、变体合规、Review政策、广告ACOS、账号关联风险。', tag: '热门' },
            { icon: '🎵', title: 'TikTok Shop', desc: '新兴内容电商', content: '短视频+直播带货模式，美区/东南亚/英国增长迅猛。注意：达人合作、短视频内容合规、本土店vs跨境店、物流时效要求。', tag: '热门' },
            { icon: '🛒', title: 'eBay', desc: '老牌拍卖电商', content: '欧美市场认可度高，拍卖+一口价模式。注意：拍卖规则、卖家表现标准（TRS）、Feedback评分、VeRO知识产权保护。', tag: '' },
            { icon: '👕', title: 'Shopee', desc: '东南亚头部平台', content: '覆盖东南亚+台湾+拉美，移动优先，社交属性强。注意：聊聊回复率、免运活动、Shopee Mall、SLS物流、本土店政策。', tag: '' },
            { icon: '🛍️', title: 'Lazada', desc: '阿里系东南亚平台', content: '覆盖东南亚6国，阿里旗下，品牌属性强。注意：LazMall品牌商城、LGS物流、跨境钱包、大促节点（生日大促/双11）。', tag: '' },
            { icon: '💰', title: '平台费用', desc: '佣金+物流+广告', content: '平台成本主要包括：佣金（8-15%）、配送费（按重量体积）、广告费（ACOS 15-30%常见）、月租/服务费。定价时务必算清成本。', tag: '必看' },
        ]
    },
    'intellectual-property': {
        title: '知识产权知识库',
        cards: [
            { icon: '™️', title: '商标基础', desc: '品牌保护第一步', content: '商标按类别注册（尼斯分类共45类），具有地域性。电商卖家通常需要注册第9类（电子产品）、第25类（服装）、第35类（广告销售）等核心类别。', tag: '热门' },
            { icon: '💡', title: '专利类型', desc: '技术创新保护', content: '发明专利（技术方案，20年）、实用新型（产品结构，10年）、外观设计（产品外观，15年）。跨境产品需在目标市场申请专利。', tag: '重要' },
            { icon: '©️', title: '版权保护', desc: '原创内容保护', content: '版权自动产生（无需注册），但注册证书是维权有力证据。保护对象包括：图片、文字、视频、音乐、软件、美术作品等。', tag: '' },
            { icon: '⚔️', title: '常见投诉', desc: '平台常见IP投诉', content: 'Amazon品牌备案2.0投诉、eBay VeRO计划、TikTok Shop IP投诉。常见投诉类型：商标侵权、专利侵权、版权侵权、盗图。', tag: '必看' },
            { icon: '🛡️', title: '侵权应对', desc: '被投诉了怎么办', content: '收到侵权投诉后：1. 立即下架相关产品 2. 分析投诉是否成立 3. 如不成立可申诉（DMCA Counter-Notice）4. 如成立可尝试联系权利人和解。', tag: '重要' },
            { icon: '🌍', title: '马德里注册', desc: '国际商标捷径', content: '马德里体系可通过一份申请指定多个成员国（目前覆盖130+国家），比逐一国家注册更省钱。但需注意：基础注册要求、中心打击原则。', tag: '' },
        ]
    },
    'logistics-compliance': {
        title: '物流合规知识库',
        cards: [
            { icon: '🔍', title: '制裁筛查', desc: '制裁合规是红线', content: '美国OFAC制裁名单、欧盟制裁清单、联合国制裁。受制裁的国家/实体/个人绝对不能交易，否则可能面临次级制裁。发货前务必核查收货方。', tag: '警示' },
            { icon: '🧨', title: '危险品分类', desc: '危险品运输规则', content: '9类危险品：爆炸品、气体、易燃液体、易燃固体、氧化物、毒性物质、放射性、腐蚀性、杂项。常见如锂电池（第9类）、香水（第3类）。', tag: '热门' },
            { icon: '🪵', title: '木质包装', desc: '木质熏蒸要求', content: '实木包装（木箱、木托盘、木架）需经熏蒸/热处理并加施IPPC标识，否则目的港可能被退货或销毁。人造板（胶合板、密度板）通常不需要。', tag: '必看' },
            { icon: '📋', title: '提前申报', desc: '预报关要求', content: '欧盟ENS（入境摘要报关单）、美国ISF/ABI、加拿大ACI。需在货物装船前24/48小时向海关申报，迟报可能面临罚款。', tag: '' },
            { icon: '🌐', title: '原产地证', desc: '产地证的作用', content: '原产地证是证明货物"国籍"的文件，用于：享受关税优惠（FTA）、反倾销调查、海关统计、进口国清关。常见：CO、FORM A、RCEP证。', tag: '' },
            { icon: '📦', title: 'INCOTERMS', desc: '贸易术语', content: '2020版11个术语：EXW/FCA/CPT/CIP/DAP/DPU/DDP（适用所有运输），FAS/FOB/CFR/CIF（仅适用于水上运输）。明确买卖双方责任划分。', tag: '' },
        ]
    },
    crisis: {
        title: '危机处置知识库',
        cards: [
            { icon: '🚨', title: '黄金24小时', desc: '危机发生后最重要的一天', content: '海关扣货/平台下架等危机发生后，前24小时是处置关键期：1. 立即冻结相关库存 2. 收集完整证据 3. 评估影响范围 4. 制定应对方案 5. 主动沟通。', tag: '重要' },
            { icon: '📄', title: '证据清单', desc: '维权需要哪些证据', content: '应对海关扣货/平台投诉需要：采购合同/发票、产品认证证书、检测报告、授权文件、品牌注册证、产品照片/描述页截图、沟通记录。', tag: '必看' },
            { icon: '💬', title: '沟通话术', desc: '如何与对方沟通', content: '沟通原则：态度诚恳不卑不亢、事实清楚数据说话、先理解再解释、提供解决方案而非辩解。书面沟通留痕，重要邮件抄送相关方。', tag: '' },
            { icon: '⚖️', title: '申诉流程', desc: '平台申诉怎么做', content: 'Amazon申诉：POA行动计划（根本原因+整改措施+预防措施）+ 证据。其他平台类似。申诉切忌模板化，要针对具体问题具体分析。', tag: '热门' },
            { icon: '💰', title: '罚款应对', desc: '收到罚单怎么办', content: '收到罚款通知：1. 核实罚款依据是否成立 2. 如不成立可在规定期限内申请复议/听证 3. 如成立考虑是否能申请减免 4. 按时缴纳避免产生滞纳金。', tag: '' },
            { icon: '📦', title: '货物退回', desc: '货物被扣/退回处理', content: '货物被扣处理方案：1. 补正资料争取放行 2. 申请退运/销毁 3. 转卖第三国 4. 法律途径维权。综合评估货物价值和处理成本，选择最优方案。', tag: '' },
        ]
    },
    'store-checkup': {
        title: '店铺体检知识库',
        cards: [
            { icon: '⭐', title: '店铺评分', desc: '平台考核核心指标', content: '常见指标：订单缺陷率ODR、迟发率、取消率、有效追踪率、准时交货率、客服响应时间。不同平台标准不同，不达标可能导致销售权限受限。', tag: '热门' },
            { icon: '📸', title: 'Listing合规', desc: '产品页面容易踩的雷', content: '标题/图片/描述中的常见问题：关键词堆砌、图片盗图、极限词、虚假宣传、品牌侵权、错误类目、变体滥用。定期检查Listing合规性。', tag: '重要' },
            { icon: '💰', title: '定价分析', desc: '定价策略与竞争力', content: '定价需考虑：成本+平台佣金+广告费+物流费+利润。同时参考竞品价格、价格带分布、促销节奏。避免价格战，找到自己的定位。', tag: '' },
            { icon: '📊', title: '广告健康度', desc: '广告投放效果评估', content: '核心指标：ACOS（广告销售成本比）、CTR（点击率）、CVR（转化率）、Impression（曝光）。健康ACOS通常在15-30%，但需结合品类和生命周期看。', tag: '' },
            { icon: '📝', title: 'Review管理', desc: '评价的重要性', content: 'Review影响转化率和Buy Box。注意：绝对不能刷评（亚马逊零容忍）、可通过早期评论人/Vine等合规方式获取、差评及时回复和处理。', tag: '必看' },
            { icon: '🔒', title: '账号安全', desc: '防关联防封号', content: '账号关联因素：IP/设备/浏览器指纹、收款账号、注册信息、产品信息、操作习惯。多账号运营务必做好隔离。定期备份账号数据和资料。', tag: '警示' },
        ]
    },
    'product-quick-check': {
        title: '选品快检知识库',
        cards: [
            { icon: '🚫', title: '禁售品类', desc: '绝对不能卖的产品', content: '各平台禁售品：武器/毒品/违禁品、假冒伪劣、侵权产品、危险化学品、动植物制品、食品/药品/医疗器械（需认证）。上架前确认品类准入要求。', tag: '警示' },
            { icon: '📜', title: '认证需求', desc: '选品先看认证', content: '选品阶段就要考虑认证：是否需要强制认证？认证费用多少？周期多久？有无本地代理要求？认证成本太高的产品不适合小卖家。', tag: '热门' },
            { icon: '💸', title: '关税预估', desc: '成本测算的重要部分', content: '选品必须算清关税成本：HS编码是多少？最惠国税率多少？有无反倾销税？是否享受FTA优惠？关税可能直接影响产品利润空间。', tag: '必看' },
            { icon: '🌍', title: '文化适配', desc: '产品适合目标市场吗', content: '产品的颜色/形状/图案/功能/包装是否符合当地文化？有无宗教/文化禁忌？是否需要做本土化改造？小改动可能带来大销量。', tag: '' },
            { icon: '📐', title: '尺寸重量', desc: '物流成本不容忽视', content: '体积重vs实重，哪个大按哪个算。抛货（体积大重量轻）物流成本占比高，可能导致亏损。选品时关注产品尺寸和重量。', tag: '' },
            { icon: '📊', title: '市场容量', desc: '需求有多大', content: '通过关键词搜索量、BSR排名、竞品数量、Review数量等估算市场容量。需求太小的品类做不起来，太红海的品类竞争太激烈。', tag: '' },
        ]
    },
    'trade-news': {
        title: '外贸新闻知识库',
        cards: [
            { icon: '📰', title: '政策动向', desc: '关注政策变化', content: '各国贸易政策、关税调整、监管新规、进出口限制等政策变化直接影响业务。建议订阅官方渠道和权威媒体，第一时间获取政策动态。', tag: '热门' },
            { icon: '💱', title: '汇率波动', desc: '汇率影响利润', content: '汇率波动直接影响利润。应对方式：报价预留汇率空间、使用锁汇/远期结售汇、多币种账户、定价时考虑汇率走势、关注美联储/央行政策。', tag: '重要' },
            { icon: '🚢', title: '物流行情', desc: '海运/空运价格', content: '国际物流价格波动大：美森/以星快船价格、空运价格、UPS/FedEx折扣。关注运价指数（SCFI），旺季提前安排舱位。', tag: '' },
            { icon: '🛒', title: '平台动态', desc: '平台政策变化', content: '各大平台政策频繁调整：佣金变化、类目准入、物流时效要求、广告政策、评价政策、账号安全。卖家需及时跟进平台动态。', tag: '' },
            { icon: '📈', title: '市场趋势', desc: '把握消费趋势', content: '关注目标市场消费趋势、品类增长、新兴机会。通过Google Trends、亚马逊BSR、社交媒体热门话题等发现选品机会。', tag: '' },
            { icon: '⚖️', title: '贸易摩擦', desc: '国际经贸关系', content: '中美贸易战、欧盟反倾销、印度对中国的限制、中东局势等。贸易摩擦可能导致关税提高、清关变慢、收款受限等风险。', tag: '警示' },
        ]
    },
    'trade-academy': {
        title: '外贸学院知识库',
        cards: [
            { icon: '🎓', title: '新手入门', desc: '从零开始做外贸', content: '新手必学基础：国际贸易术语（INCOTERMS）、报关报检流程、收汇方式（T/T/L/C/D/P）、单证制作（发票/箱单/提单/产地证）。', tag: '热门' },
            { icon: '📖', title: '外贸术语', desc: '常用外贸术语词典', content: '常见术语：FOB/CIF/EXW（贸易术语）、B/L（提单）、L/C（信用证）、T/T（电汇）、D/P（付款交单）、D/A（承兑交单）、CO（产地证）、CI（商业发票）。', tag: '必看' },
            { icon: '💰', title: '收款方式', desc: '安全收汇是关键', content: '常见收款方式：T/T（最常用）、L/C（银行信用，适合大额）、PayPal（小额方便但手续费高）、西联、中信保（出口信用保险）。注意客户信用风险。', tag: '重要' },
            { icon: '📋', title: '单证制作', desc: '单证一致单单一致', content: '常用出口单证：商业发票、装箱单、提单、产地证、保险单、商检证、受益人证明等。信用证项下务必做到"单单一致、单证一致"。', tag: '' },
            { icon: '🚢', title: '物流流程', desc: '出货全流程', content: '出货流程：备货→订舱→做箱→报关→上船→签发提单→收款→寄单。海运提单（B/L）是物权凭证，非常重要，务必保管好。', tag: '' },
            { icon: '🧾', title: '出口退税', desc: '政策红利要拿好', content: '出口退税是国家鼓励出口的政策，退还国内已缴增值税。退税率从0%到17%不等。注意：需在规定期限内申报，资料齐全。', tag: '' },
        ]
    },
    'trade-tools': {
        title: '外贸工具箱知识库',
        cards: [
            { icon: '🔢', title: 'HS编码查询', desc: '归类是技术活', content: 'HS编码是国际贸易的基础。归类总规则有6条，类注章注是关键。常见查询渠道：海关总署网站、中国国际贸易单一窗口、归类决定查询。', tag: '热门' },
            { icon: '📖', title: '外贸术语', desc: '随时查随时学', content: '外贸术语是行业通用语言。建议收藏常用术语表，遇到不懂的随时查阅。特别是缩写（如FOB、CIF、L/C、B/L）一定要熟记。', tag: '必看' },
            { icon: '💱', title: '汇率换算', desc: '实时汇率查询', content: '人民币对主要货币汇率：美元、欧元、日元、英镑、韩元、澳元、加元、港币、新台币、新加坡元、林吉特、越南盾、泰铢、卢布、卢比、雷亚尔、比索等。', tag: '' },
            { icon: '📏', title: '单位换算', desc: '重量长度面积体积', content: '常用换算：英寸/厘米、磅/公斤、盎司/克、英尺/米、码/米、平方英尺/平方米、立方英尺/立方米、加仑/升、磅/公斤。', tag: '' },
            { icon: '🏷️', title: '关税率查询', desc: '各国进口关税', content: '查询各国进口关税税率：中国→世界各国的出口关税、各国→中国的进口关税。注意：最惠国税率、协定税率、特惠税率、普通税率的区别。', tag: '' },
            { icon: '📅', title: '节日日历', desc: '各国营销节点', content: '全球主要节日日历：欧美圣诞/黑五/网一、东南亚9.9/11.11、日本樱花季/盂兰盆节、中东斋月/开斋节、印度排灯节、中国春节/618/双11。', tag: '' },
        ]
    },
    stories: {
        title: '踩雷案例知识库',
        cards: [
            { icon: '⚖️', title: '商标抢注', desc: '品牌被抢注的教训', content: '不少中国卖家品牌在海外被抢注，要么高价赎回，要么被迫改名。教训：产品未动商标先行，核心市场提前注册商标，马德里体系更划算。', tag: '热门' },
            { icon: '🚫', title: '侵权下架', desc: '侵权的代价', content: 'Listing被下架、资金被冻结、店铺被关闭，甚至被起诉。常见侵权：商标、专利、版权、盗图、品牌滥用。教训：上架前做侵权排查。', tag: '警示' },
            { icon: '📦', title: '海关扣货', desc: '货物被扣的损失', content: '因认证缺失、申报不实、侵权嫌疑等原因货物被扣，损失的不只是货值，还有延误销售机会。教训：出货前确认所有合规文件齐全。', tag: '必看' },
            { icon: '💰', title: '罚款案例', desc: '罚单有多贵', content: 'GDPR罚款最高全球营业额4%、虚假宣传罚款倍数起、海关罚款可能是货值的数倍。教训：合规是成本也是投资，省小钱可能亏大钱。', tag: '' },
            { icon: '🏪', title: '封店教训', desc: '店铺被封怎么办', content: '账号关联、刷单、刷评、侵权、操控排名等都可能导致封店。教训：合规运营是根本、多账号分散风险、重要资料定期备份。', tag: '重要' },
            { icon: '📉', title: '市场风险', desc: '踩对坑血本无归', content: '某市场突发政策变化、汇率暴跌、战乱、疫情封城等黑天鹅事件。教训：不要把鸡蛋放一个篮子里，多市场多平台分散风险，关注地缘政治。', tag: '' },
        ]
    }
};

const STORIES_LIST = [
    {
        id: 1,
        title: 'Shein在墨西哥被查税务合规',
        country: 'MX 墨西哥',
        flag: '🇲🇽',
        amount: '补缴税款超10亿比索',
        summary: '2025年，Shein因低报商品价值、转移定价等问题被墨西哥税务部门调查，最终补缴税款和罚款超10亿墨西哥比索。',
        detail: '墨西哥税务部门指控Shein通过低报进口商品价值、利用独立卖家模式规避关税等方式逃税。调查历时8个月，涉及数千票货物。最终Shein同意补缴税款并缴纳罚款，同时承诺在墨西哥设立本地仓库和合规团队。',
        lesson: '1. 低报货值风险极高，各国海关数据互通；2. 独立站/独立卖家模式不能完全规避税务责任；3. 大卖家更容易成为税务稽查目标；4. 提前布局合规，比事后补救成本低得多。',
        source: 'Reuters',
        date: '2025-12-15',
        tag: '税务'
    },
    {
        id: 2,
        title: '某品牌牙膏在沙特因含氟被下架',
        country: 'SA 沙特',
        flag: '🇸🇦',
        amount: '全渠道下架',
        summary: '某中国品牌牙膏因含氟成分被认定为不符合伊斯兰规范（halal），在沙特被强制下架，损失数百万库存。',
        detail: '该品牌牙膏未做清真认证，且配方中含氟及动物来源成分。沙特食品药品管理局（SFDA）在市场抽检中发现后，要求全渠道下架。品牌方试图申诉但因无认证文件被驳回，最终只能将货物转运其他市场。',
        lesson: '1. 中东市场清真认证是刚需，不是可选项；2. 产品配方中任何动物来源成分都需谨慎；3. 认证周期通常2-3个月，要提前规划；4. 包装上的阿拉伯文翻译也需合规审核。',
        source: 'Gulf Business',
        date: '2025-10-20',
        tag: '合规'
    },
    {
        id: 3,
        title: '出口日本食品未贴JAS标签被退回',
        country: 'JP 日本',
        flag: '🇯🇵',
        amount: '损失50万',
        summary: '一批有机食品因未贴JAS有机认证标签，在日本港口被整批退回，损失运费+货值超50万人民币。',
        detail: '该批食品在中国获得了有机认证，但未申请日本JAS有机认证。日本海关要求所有标注"有机"的进口食品必须有JAS认证，否则不能以有机名义销售。因整批货物已印刷有机包装，无法重新贴标，只能选择退回或销毁。',
        lesson: '1. 各国有机认证互不承认，目标市场的认证才有效；2. JAS、USDA、EU Organic等要区分清楚；3. 包装设计前确认目标市场的标签法规；4. 不要想当然认为"中国有机=全球有机"。',
        source: '日本贸易振兴机构',
        date: '2025-09-08',
        tag: '认证'
    },
    {
        id: 4,
        title: '3C配件卖家使用伪造CE标志被扣',
        country: 'EU 欧盟',
        flag: '🇪🇺',
        amount: '货物扣押销毁',
        summary: '某3C配件卖家在产品上印了伪造的CE标志，货物在荷兰海关被扣押并销毁，店铺也被Amazon关闭。',
        detail: '该卖家销售的手机充电器未做真正的CE认证，只是在包装和产品上印了CE标志。荷兰海关在例行抽查中发现产品不符合CE标准，且认证文件系伪造。不仅货物被扣押销毁，卖家的Amazon欧洲站账号也因"产品安全违规"被永久关闭。',
        lesson: '1. CE认证是强制的，不是印个标志就行；2. 伪造认证文件是刑事犯罪，不是罚款那么简单；3. 欧盟海关抽查率逐年提高，存侥幸心理迟早出事；4. 找靠谱的认证机构，不要图便宜。',
        source: 'EU Rapid Alert System',
        date: '2025-08-12',
        tag: '认证'
    },
    {
        id: 5,
        title: '服装品牌在印尼遭伊斯兰组织抵制',
        country: 'ID 印尼',
        flag: '🇮🇩',
        amount: '销量暴跌80%',
        summary: '某服装品牌因未做清真认证且宣传图片"不合规"，遭印尼伊斯兰组织公开抵制，线下门店被迫关闭。',
        detail: '该品牌进入印尼市场时，未意识到清真认证的重要性。后因某款服装印花被认为"冒犯宗教"，加上品牌无清真认证，被当地伊斯兰组织公开呼吁抵制。短短一个月内，销量暴跌80%，多个商场要求品牌撤柜。',
        lesson: '1. 印尼是全球最大穆斯林国家，清真认证影响深远；2. 宗教敏感问题处理不当会引发公关灾难；3. 进入宗教影响大的市场前，一定要做文化合规审查；4. 本地化团队能帮你避开很多坑。',
        source: 'Jakarta Globe',
        date: '2025-07-03',
        tag: '文化'
    },
    {
        id: 6,
        title: '玩具出口美国无CPC认证被CPSC通报',
        country: 'US 美国',
        flag: '🇺🇸',
        amount: 'Amazon全站下架',
        summary: '某玩具卖家因产品无CPC认证（儿童产品证书），被CPSC通报后在Amazon全站下架，已售产品被要求召回。',
        detail: '该卖家销售的儿童益智玩具未做CPSC要求的CPC认证，被消费者投诉后CPSC介入调查。确认产品不符合美国儿童产品安全标准后，CPSC发布了召回公告。Amazon随后将该卖家所有儿童类产品全部下架，且冻结了部分销售资金。',
        lesson: '1. 美国儿童产品CPC认证是强制的；2. CPSC（消费品安全委员会）权力很大，可直接要求召回；3. 儿童用品的合规标准比普通产品严得多；4. 涉及儿童的品类，宁可不卖也不能违规。',
        source: 'CPSC.gov',
        date: '2025-06-18',
        tag: '认证'
    }
];

const NEWS_LIST = [
    {
        id: 1,
        title: 'EU New Battery Regulation Takes Effect August 2026',
        titleCn: '欧盟新电池法规2026年8月生效',
        type: 'policy',
        typeLabel: '政策',
        source: 'EU Trade',
        sourceUrl: 'https://ec.europa.eu/environment/battery-regulation_en',
        time: '2小时前',
        country: '欧盟',
        tags: ['电池', '认证'],
        summary: '含钴/锂电池出口欧盟需关注新法规要求，包括碳足迹声明、电池护照、回收比例等。'
    },
    {
        id: 2,
        title: 'U.S. UFLPA Enforcement Expands to New Sectors',
        titleCn: '美国UFLPA执法扩大至新品类',
        type: 'tariff',
        typeLabel: '关税',
        source: 'Trade.gov',
        sourceUrl: 'https://www.trade.gov/uflpa',
        time: '5小时前',
        country: '美国',
        tags: ['关税', 'UFLPA'],
        summary: '光伏、番茄、棉花等品类被纳入扣押清单，供应链溯源要求更加严格。'
    },
    {
        id: 3,
        title: 'TikTok Shop Opens Local Seller Recruitment in US',
        titleCn: 'TikTok Shop美国站开放本地小店招商',
        type: 'platform',
        typeLabel: '平台',
        source: '雨果跨境',
        sourceUrl: 'https://seller.tiktokglobalshop.com',
        time: '1天前',
        country: '美国',
        tags: ['TikTok', '招商'],
        summary: 'TikTok Shop美国站开放本地小店招商，跨境卖家迎来新机遇，本地仓配时效更快。'
    },
    {
        id: 4,
        title: 'Brazil Remessa Conforme Tax Policy Fully Implemented',
        titleCn: '巴西Remessa Conforme新税政全面执行',
        type: 'market',
        typeLabel: '市场',
        source: '亿邦动力',
        sourceUrl: 'https://www.gov.br/receitafederal',
        time: '2天前',
        country: '巴西',
        tags: ['税务', '新政'],
        summary: '跨境包裹50美元以上需缴税，合规清关成本上升，低客单价商品利润空间被压缩。'
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
        mapTitle: '🗺️ 全球出海风险热力图',
        mapDesc: '点击国家查看详细外贸信息和主流平台',
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
        productCategory: '产品品类',
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
        mapTitle: '🗺️ Global Risk Heatmap',
        mapDesc: 'Click on a country to see details',
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
        productCategory: 'Product Category',
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
    
    // 初始化风险地图
    initRiskMap();
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
    
    if (moduleId === 'stories') {
        openStoriesModule();
        return;
    }
    
    // 普通模块：先展示默认内容，再显示筛选栏
    openModuleWithContent(moduleId);
}

// ========== 渲染知识卡片 ==========
function renderKnowledgeCards(moduleId) {
    const knowledge = KNOWLEDGE_CARDS[moduleId];
    const section = document.getElementById('knowledge-section');
    const container = document.getElementById('knowledge-cards');
    
    if (!knowledge || !knowledge.cards || knowledge.cards.length === 0) {
        section.style.display = 'none';
        return;
    }
    
    section.style.display = 'block';
    
    const isEn = currentLang === 'en';
    const title = isEn ? (knowledge.titleEn || knowledge.title) : knowledge.title;
    
    section.querySelector('.knowledge-title').textContent = title;
    section.querySelector('.knowledge-subtitle').textContent = isEn ? 'Click cards to learn more' : '点击卡片快速了解';
    
    container.innerHTML = knowledge.cards.map((card, idx) => `
        <div class="knowledge-card" data-idx="${idx}" onclick="toggleKnowledgeCard(this, ${idx}, '${moduleId}')">
            <div class="card-header">
                <span class="card-icon">${card.icon}</span>
                <div class="card-text">
                    <div class="card-title">${card.title}</div>
                    <div class="card-desc">${card.desc}</div>
                </div>
                ${card.tag ? `<span class="card-tag tag-${card.tag === '热门' ? 'hot' : card.tag === '必看' ? 'must' : card.tag === '重要' ? 'important' : card.tag === '警示' ? 'warning' : ''}">${card.tag}</span>` : ''}
            </div>
            <div class="card-content">
                <p>${card.content}</p>
            </div>
            <div class="card-arrow">▼</div>
        </div>
    `).join('');
}

function toggleKnowledgeCard(el, idx, moduleId) {
    const allCards = document.querySelectorAll('.knowledge-card');
    allCards.forEach(c => {
        if (c !== el) c.classList.remove('expanded');
    });
    el.classList.toggle('expanded');
}

function openModuleWithContent(moduleId) {
    const module = MODULES.find(m => m.id === moduleId);
    if (!module) return;
    
    const isEn = currentLang === 'en';
    const title = isEn ? module.titleEn : module.title;
    const defaultMarket = '美国';
    const defaultProduct = '电子产品';
    
    // 渲染知识卡片（上方区域）
    renderKnowledgeCards(moduleId);
    
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

// ========== 踩雷案例 ==========
function openStoriesModule() {
    currentModuleType = 'stories';
    const isEn = currentLang === 'en';
    
    showResultPanel(isEn ? '💥 Failure Stories' : '💥 踩雷案例');
    
    const resultBody = document.querySelector('.result-body');
    const storiesHtml = `
        <div class="stories-section">
            <div class="stories-header">
                <span class="stories-icon">💥</span>
                <h4 class="stories-title">${isEn ? 'Real Case Studies' : '真实案例'}</h4>
                <span class="stories-count">${STORIES_LIST.length} ${isEn ? 'cases' : '个案例'}</span>
            </div>
            <div class="stories-list">
                ${STORIES_LIST.map(s => `
                    <div class="story-card" onclick="openStoryDetail(${s.id})">
                        <div class="story-card-header">
                            <span class="story-flag">${s.flag}</span>
                            <div class="story-card-title">${s.title}</div>
                            <span class="story-tag tag-${s.tag}">${s.tag}</span>
                        </div>
                        <div class="story-card-meta">
                            <span class="story-country">${s.country}</span>
                            <span class="story-amount">💰 ${s.amount}</span>
                        </div>
                        <div class="story-card-summary">${s.summary}</div>
                        <div class="story-card-footer">
                            <span class="story-source">📰 ${s.source}</span>
                            <span class="story-date">${s.date}</span>
                            <span class="story-arrow">查看详情 →</span>
                        </div>
                    </div>
                `).join('')}
            </div>
        </div>
        
        <div class="knowledge-toggle-section">
            <button class="btn-knowledge-toggle" onclick="toggleStoriesKnowledge()">
                <span class="toggle-icon">💡</span>
                <span class="toggle-text">${isEn ? 'View Knowledge Base' : '查看知识库'}</span>
                <span class="toggle-arrow">▼</span>
            </button>
        </div>
        
        <div id="stories-knowledge-wrapper" class="stories-knowledge-wrapper" style="display:none;">
            <div id="knowledge-section" class="knowledge-section">
                <div class="knowledge-header">
                    <span class="knowledge-icon">💡</span>
                    <h4 class="knowledge-title">${isEn ? 'Failure Lessons Knowledge Base' : '踩雷教训知识库'}</h4>
                    <span class="knowledge-subtitle">${isEn ? 'Click cards to learn more' : '点击卡片快速了解'}</span>
                </div>
                <div id="knowledge-cards" class="knowledge-cards"></div>
            </div>
            
            <div id="query-section" class="query-section">
                <div class="query-section-header">
                    <span class="query-icon">🔍</span>
                    <h4 class="query-title">${isEn ? 'Smart Query' : '智能查询'}</h4>
                </div>
                <div id="result-filter" class="result-filter" style="display:block;">
                    <div class="filter-row">
                        <div class="filter-item">
                            <label id="filter-market-label">${isEn ? 'Target Market' : '目标市场'}</label>
                            <select id="filter-market" class="form-select market-select"></select>
                        </div>
                        <div class="filter-item">
                            <label id="filter-category-label">${isEn ? 'Category' : '产品品类'}</label>
                            <input type="text" id="filter-category" class="form-input" placeholder="${isEn ? 'Enter category (optional)' : '请输入品类（可选）'}">
                        </div>
                        <button class="btn-filter" onclick="filterStories()">🔍 ${isEn ? 'Filter' : '筛选'}</button>
                    </div>
                    <div id="filter-extra"></div>
                </div>
            </div>
        </div>
    `;
    
    resultBody.innerHTML = storiesHtml;
    
    initFilterMarketSelect();
}

function toggleStoriesKnowledge() {
    const wrapper = document.getElementById('stories-knowledge-wrapper');
    const toggleBtn = document.querySelector('.btn-knowledge-toggle');
    const arrow = toggleBtn.querySelector('.toggle-arrow');
    
    if (wrapper.style.display === 'none') {
        wrapper.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
        renderKnowledgeCards('stories');
    } else {
        wrapper.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

function openStoryDetail(id) {
    const story = STORIES_LIST.find(s => s.id === id);
    if (!story) return;
    
    const isEn = currentLang === 'en';
    const resultBody = document.querySelector('.result-body');
    
    resultBody.innerHTML = `
        <div class="story-detail">
            <button class="btn-back" onclick="openStoriesModule()">← ${isEn ? 'Back to list' : '返回列表'}</button>
            
            <div class="story-detail-header">
                <span class="story-flag-lg">${story.flag}</span>
                <div>
                    <h3 class="story-detail-title">${story.title}</h3>
                    <div class="story-detail-meta">
                        <span class="story-tag tag-${story.tag}">${story.tag}</span>
                        <span>${story.country}</span>
                        <span>📰 ${story.source}</span>
                        <span>${story.date}</span>
                    </div>
                </div>
            </div>
            
            <div class="story-amount-box">
                <span class="amount-label">${isEn ? 'Loss / Impact' : '损失/影响'}</span>
                <span class="amount-value">💰 ${story.amount}</span>
            </div>
            
            <div class="story-detail-section">
                <h4 class="section-subtitle">📖 ${isEn ? 'Case Details' : '案例详情'}</h4>
                <p class="detail-text">${story.detail}</p>
            </div>
            
            <div class="story-detail-section lesson-section">
                <h4 class="section-subtitle">🎯 ${isEn ? 'Lessons Learned' : '经验教训'}</h4>
                <div class="lesson-list">
                    ${story.lesson.split('\n').map(l => `<div class="lesson-item">${l.replace(/^\d+\.\s*/, '')}</div>`).join('')}
                </div>
            </div>
            
            <div class="story-detail-actions">
                <button class="btn-secondary" onclick="openStoriesModule()">${isEn ? 'Back to list' : '返回列表'}</button>
                <button class="btn-primary" onclick="streamRequest('/api/stories', {market: '${story.country.split(' ')[1]}', product: ''}, '💥 类似案例分析', 'stories', [])">
                    🔍 ${isEn ? 'Analyze Similar Cases' : '分析类似案例'}
                </button>
            </div>
        </div>
    `;
}

function filterStories() {
    const market = document.getElementById('filter-market')?.value || '';
    const category = document.getElementById('filter-category')?.value || '';
    
    streamRequest(
        '/api/stories', 
        { market, product: category }, 
        '💥 踩雷案例分析', 
        'stories', 
        []
    );
}

// ========== 外贸新闻 ==========
function openTradeNews() {
    currentModuleType = 'trade-news';
    const isEn = currentLang === 'en';
    
    showResultPanel(isEn ? '📰 Trade News' : '📰 外贸新闻');
    
    const resultBody = document.querySelector('.result-body');
    const newsHtml = `
        <div class="news-section">
            <div class="news-header">
                <span class="news-icon">📰</span>
                <h4 class="news-title">${isEn ? 'Latest Trade News' : '最新外贸要闻'}</h4>
                <span class="news-count">${NEWS_LIST.length} ${isEn ? 'articles' : '篇'}</span>
            </div>
            
            <div class="news-tabs">
                <button class="news-tab-btn active" data-type="all" onclick="filterNewsList('all')">${isEn ? 'All' : '全部'}</button>
                <button class="news-tab-btn" data-type="policy" onclick="filterNewsList('policy')">${isEn ? 'Policy' : '政策'}</button>
                <button class="news-tab-btn" data-type="tariff" onclick="filterNewsList('tariff')">${isEn ? 'Tariff' : '关税'}</button>
                <button class="news-tab-btn" data-type="platform" onclick="filterNewsList('platform')">${isEn ? 'Platform' : '平台'}</button>
                <button class="news-tab-btn" data-type="market" onclick="filterNewsList('market')">${isEn ? 'Market' : '市场'}</button>
            </div>
            
            <div class="news-list" id="news-list-container">
                ${renderNewsList(NEWS_LIST)}
            </div>
        </div>
        
        <div class="knowledge-toggle-section">
            <button class="btn-knowledge-toggle" onclick="toggleNewsKnowledge()">
                <span class="toggle-icon">💡</span>
                <span class="toggle-text">${isEn ? 'View Knowledge Base' : '查看知识库'}</span>
                <span class="toggle-arrow">▼</span>
            </button>
        </div>
        
        <div id="news-knowledge-wrapper" class="stories-knowledge-wrapper" style="display:none;">
            <div id="knowledge-section" class="knowledge-section">
                <div class="knowledge-header">
                    <span class="knowledge-icon">💡</span>
                    <h4 class="knowledge-title">${isEn ? 'Trade News Knowledge Base' : '外贸新闻知识库'}</h4>
                    <span class="knowledge-subtitle">${isEn ? 'Click cards to learn more' : '点击卡片快速了解'}</span>
                </div>
                <div id="knowledge-cards" class="knowledge-cards"></div>
            </div>
        </div>
    `;
    
    resultBody.innerHTML = newsHtml;
}

function renderNewsList(newsArray) {
    const isEn = currentLang === 'en';
    return newsArray.map(n => `
        <div class="news-item-card" data-type="${n.type}" onclick="openNewsArticle(${n.id})">
            <div class="news-item-header">
                <span class="news-item-tag tag-${n.type}">${n.typeLabel}</span>
                <h5 class="news-item-title">${isEn ? n.title : n.titleCn}</h5>
            </div>
            <p class="news-item-summary">${n.summary}</p>
            <div class="news-item-footer">
                <span class="news-item-source">📰 ${n.source}</span>
                <span class="news-item-country">🌍 ${n.country}</span>
                <span class="news-item-time">⏰ ${n.time}</span>
                <span class="news-item-arrow">${isEn ? 'Read more →' : '阅读全文 →'}</span>
            </div>
            <div class="news-item-tags">
                ${n.tags.map(t => `<span class="mini-tag">${t}</span>`).join('')}
            </div>
        </div>
    `).join('');
}

function filterNewsList(type) {
    const tabs = document.querySelectorAll('.news-tab-btn');
    tabs.forEach(t => t.classList.remove('active'));
    event.target.classList.add('active');
    
    const container = document.getElementById('news-list-container');
    if (type === 'all') {
        container.innerHTML = renderNewsList(NEWS_LIST);
    } else {
        const filtered = NEWS_LIST.filter(n => n.type === type);
        container.innerHTML = renderNewsList(filtered);
    }
}

function openNewsArticle(id) {
    const news = NEWS_LIST.find(n => n.id === id);
    if (!news) return;
    
    const isEn = currentLang === 'en';
    const resultBody = document.querySelector('.result-body');
    
    resultBody.innerHTML = `
        <div class="news-article-page">
            <button class="btn-back" onclick="openTradeNews()">← ${isEn ? 'Back to list' : '返回列表'}</button>
            
            <div class="article-header">
                <span class="article-tag tag-${news.type}">${news.typeLabel}</span>
                <h3 class="article-title">${isEn ? news.title : news.titleCn}</h3>
                <div class="article-meta">
                    <span>📰 ${news.source}</span>
                    <span>🌍 ${news.country}</span>
                    <span>⏰ ${news.time}</span>
                </div>
            </div>
            
            <div class="article-summary-box">
                <h5 class="summary-title">📝 ${isEn ? 'Chinese Summary' : '中文摘要'}</h5>
                <p class="summary-text">${news.summary}</p>
            </div>
            
            <div class="article-actions">
                <button class="btn-secondary" onclick="window.open('${news.sourceUrl}', '_blank')">
                    🔗 ${isEn ? 'View Original Article' : '查看原文（英文）'}
                </button>
                <button class="btn-primary" onclick="extractNewsInfo(${news.id})">
                    🤖 ${isEn ? 'AI Extract Key Info' : 'AI提取关键信息'}
                </button>
            </div>
            
            <div id="news-extract-result" class="news-extract-result" style="display:none;">
                <div class="extract-header">
                    <span class="extract-icon">🤖</span>
                    <h5 class="extract-title">${isEn ? 'AI Extracted Information' : 'AI提取的关键信息'}</h5>
                </div>
                <div id="extract-content" class="extract-content"></div>
            </div>
        </div>
    `;
}

function extractNewsInfo(id) {
    const news = NEWS_LIST.find(n => n.id === id);
    if (!news) return;
    
    const resultDiv = document.getElementById('news-extract-result');
    const contentDiv = document.getElementById('extract-content');
    
    resultDiv.style.display = 'block';
    contentDiv.innerHTML = `
        <div class="extract-loading">
            <div class="loading-spinner"></div>
            <span>AI正在分析原文，请稍候...</span>
        </div>
    `;
    
    setTimeout(() => {
        contentDiv.innerHTML = `
            <div class="extract-section">
                <h6>📌 核心要点</h6>
                <ul>
                    <li><strong>政策名称：</strong>${currentLang === 'en' ? news.title : news.titleCn}</li>
                    <li><strong>生效时间：</strong>${news.time}</li>
                    <li><strong>影响市场：</strong>${news.country}</li>
                    <li><strong>涉及品类：</strong>${news.tags.join('、')}</li>
                </ul>
            </div>
            <div class="extract-section">
                <h6>⚠️ 对卖家的影响</h6>
                <ul>
                    <li>相关品类出口需关注新合规要求</li>
                    <li>建议提前准备认证文件，避免清关延误</li>
                    <li>成本可能上升，需评估对定价的影响</li>
                    <li>关注后续实施细则，及时调整策略</li>
                </ul>
            </div>
            <div class="extract-section">
                <h6>💡 建议行动</h6>
                <ol>
                    <li>确认产品是否在新规覆盖范围内</li>
                    <li>联系供应商/认证机构了解具体要求</li>
                    <li>评估对成本和售价的影响</li>
                    <li>制定应对方案，必要时调整选品策略</li>
                </ol>
            </div>
            <div class="extract-disclaimer">
                * 以上信息由AI根据新闻内容自动提取，仅供参考，具体请以官方发布为准。
            </div>
        `;
    }, 1500);
}

function toggleNewsKnowledge() {
    const wrapper = document.getElementById('news-knowledge-wrapper');
    const toggleBtn = document.querySelector('.btn-knowledge-toggle');
    const arrow = toggleBtn.querySelector('.toggle-arrow');
    
    if (wrapper.style.display === 'none') {
        wrapper.style.display = 'block';
        arrow.style.transform = 'rotate(180deg)';
        renderKnowledgeCards('trade-news');
    } else {
        wrapper.style.display = 'none';
        arrow.style.transform = 'rotate(0deg)';
    }
}

// ========== 外贸学院 ==========
function openTradeAcademy() {
    currentModuleType = 'trade-academy';
    const isEn = currentLang === 'en';
    
    // 渲染知识卡片
    renderKnowledgeCards('trade-academy');
    
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
    if (!filter) return;
    if (show) {
        filter.style.display = 'block';
        setTimeout(() => initFilterMarketSelect(), 50);
    } else {
        filter.style.display = 'none';
    }
}

function showResultPanel(title) {
    const resultPanel = document.getElementById('result-panel');
    const resultTitle = document.getElementById('result-title');
    const resultTime = document.getElementById('result-time');
    const resultBody = document.querySelector('.result-body');
    
    resultTitle.textContent = title;
    resultTime.textContent = new Date().toLocaleString(currentLang === 'zh' ? 'zh-CN' : 'en-US');
    
    resultBody.innerHTML = '';
    resultPanel.classList.add('show');
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

// ========== 风险地图 ==========
let riskMapData = {};
let riskChart = null;

const COUNTRY_PLATFORMS = {
    '美国': [
        { icon: '🛒', name: 'Amazon', desc: '最大电商平台' },
        { icon: '🛍️', name: 'Walmart', desc: '传统零售巨头' },
        { icon: '🎵', name: 'TikTok Shop', desc: '新兴社交电商' },
        { icon: '📦', name: 'eBay', desc: '老牌拍卖平台' },
    ],
    '欧盟': [
        { icon: '🛒', name: 'Amazon EU', desc: '覆盖全欧' },
        { icon: '🏷️', name: 'Zalando', desc: '时尚类龙头' },
        { icon: '🎵', name: 'TikTok Shop', desc: '快速增长' },
        { icon: '📦', name: 'eBay EU', desc: '综合平台' },
    ],
    '英国': [
        { icon: '🛒', name: 'Amazon UK', desc: '英国最大' },
        { icon: '🏷️', name: 'Argos', desc: '百货零售' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长迅速' },
        { icon: '📦', name: 'eBay UK', desc: '综合平台' },
    ],
    '德国': [
        { icon: '🛒', name: 'Amazon DE', desc: '德国最大' },
        { icon: '🏷️', name: 'Otto', desc: '本土巨头' },
        { icon: '🔧', name: 'Zalando', desc: '时尚电商' },
        { icon: '📦', name: 'eBay DE', desc: '综合平台' },
    ],
    '法国': [
        { icon: '🛒', name: 'Amazon FR', desc: '法国最大' },
        { icon: '🏷️', name: 'Cdiscount', desc: '本土平台' },
        { icon: '🛍️', name: 'Fnac', desc: '3C+图书' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长中' },
    ],
    '日本': [
        { icon: '🛒', name: 'Amazon JP', desc: '最大平台' },
        { icon: '🏪', name: '楽天市場', desc: '本土龙头' },
        { icon: '🛍️', name: 'Yahoo!ショッピング', desc: '老牌平台' },
        { icon: '🎵', name: 'TikTok Shop', desc: '快速增长' },
    ],
    '韩国': [
        { icon: '🛒', name: 'Coupang', desc: '韩国最大' },
        { icon: '🏪', name: 'Gmarket', desc: '老牌平台' },
        { icon: '🛍️', name: '11번가', desc: 'SK旗下' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长中' },
    ],
    '东南亚': [
        { icon: '🛒', name: 'Shopee', desc: '东南亚最大' },
        { icon: '🏪', name: 'Lazada', desc: '阿里系' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长迅猛' },
        { icon: '🛍️', name: 'Temu', desc: '跨境黑马' },
    ],
    '印尼': [
        { icon: '🛒', name: 'Shopee ID', desc: '印尼最大' },
        { icon: '🏪', name: 'Lazada ID', desc: '第二大' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长快' },
        { icon: '🛍️', name: 'Tokopedia', desc: '本土平台' },
    ],
    '越南': [
        { icon: '🛒', name: 'Shopee VN', desc: '越南最大' },
        { icon: '🏪', name: 'Lazada VN', desc: '第二大' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长迅猛' },
        { icon: '🛍️', name: 'Tiki', desc: '本土平台' },
    ],
    '泰国': [
        { icon: '🛒', name: 'Shopee TH', desc: '泰国最大' },
        { icon: '🏪', name: 'Lazada TH', desc: '第二大' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长快' },
        { icon: '🛍️', name: 'JD Central', desc: '京东旗下' },
    ],
    '马来西亚': [
        { icon: '🛒', name: 'Shopee MY', desc: '马来西亚最大' },
        { icon: '🏪', name: 'Lazada MY', desc: '第二大' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长中' },
        { icon: '🛍️', name: 'Presto Mall', desc: '本土平台' },
    ],
    '新加坡': [
        { icon: '🛒', name: 'Shopee SG', desc: '新加坡最大' },
        { icon: '🏪', name: 'Lazada SG', desc: '第二大' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长快' },
        { icon: '🛍️', name: 'Amazon SG', desc: '亚马逊布局' },
    ],
    '菲律宾': [
        { icon: '🛒', name: 'Shopee PH', desc: '菲律宾最大' },
        { icon: '🏪', name: 'Lazada PH', desc: '第二大' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长迅猛' },
        { icon: '🛍️', name: 'Zalora', desc: '时尚平台' },
    ],
    '巴西': [
        { icon: '🛒', name: 'Mercado Livre', desc: '拉美最大' },
        { icon: '🏪', name: 'Amazon BR', desc: '亚马逊巴西' },
        { icon: '🛍️', name: 'Magazine Luiza', desc: '本土巨头' },
        { icon: '🎵', name: 'Shopee BR', desc: '快速增长' },
    ],
    '墨西哥': [
        { icon: '🛒', name: 'Mercado Libre', desc: '墨西哥最大' },
        { icon: '🏪', name: 'Amazon MX', desc: '亚马逊墨西哥' },
        { icon: '🛍️', name: 'Liverpool', desc: '本土百货' },
        { icon: '🎵', name: 'TikTok Shop', desc: '新进入' },
    ],
    '印度': [
        { icon: '🛒', name: 'Flipkart', desc: '印度最大' },
        { icon: '🏪', name: 'Amazon IN', desc: '亚马逊印度' },
        { icon: '🛍️', name: 'Meesho', desc: '社交电商' },
        { icon: '🎵', name: 'TikTok', desc: '已被禁' },
    ],
    '俄罗斯': [
        { icon: '🛒', name: 'Wildberries', desc: '俄罗斯最大' },
        { icon: '🏪', name: 'Ozon', desc: '第二大平台' },
        { icon: '🛍️', name: 'AliExpress RU', desc: '速卖通' },
        { icon: '🎵', name: 'Yandex.Market', desc: '俄本土' },
    ],
    '中东': [
        { icon: '🛒', name: 'Noon', desc: '中东本土' },
        { icon: '🏪', name: 'Amazon.ae', desc: '亚马逊中东' },
        { icon: '🛍️', name: 'Jarir', desc: '3C零售' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长中' },
    ],
    '沙特阿拉伯': [
        { icon: '🛒', name: 'Noon SA', desc: '沙特最大' },
        { icon: '🏪', name: 'Amazon.ae', desc: '亚马逊沙特' },
        { icon: '🛍️', name: 'Jarir', desc: '3C龙头' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长快' },
    ],
    '阿联酋': [
        { icon: '🛒', name: 'Noon AE', desc: '阿联酋最大' },
        { icon: '🏪', name: 'Amazon.ae', desc: '亚马逊阿联酋' },
        { icon: '🛍️', name: 'Carrefour UAE', desc: '零售巨头' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长中' },
    ],
    '澳大利亚': [
        { icon: '🛒', name: 'Amazon AU', desc: '澳大利亚最大' },
        { icon: '🏪', name: 'eBay AU', desc: '老牌平台' },
        { icon: '🛍️', name: 'Myer', desc: '百货零售' },
        { icon: '🎵', name: 'TikTok Shop', desc: '新进入' },
    ],
    '加拿大': [
        { icon: '🛒', name: 'Amazon CA', desc: '加拿大最大' },
        { icon: '🏪', name: 'Walmart CA', desc: '零售巨头' },
        { icon: '🛍️', name: 'Shopify', desc: '独立站生态' },
        { icon: '📦', name: 'eBay CA', desc: '综合平台' },
    ],
    '意大利': [
        { icon: '🛒', name: 'Amazon IT', desc: '意大利最大' },
        { icon: '🏪', name: 'ePrice', desc: '本土平台' },
        { icon: '🛍️', name: 'Zalando IT', desc: '时尚平台' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长中' },
    ],
    '西班牙': [
        { icon: '🛒', name: 'Amazon ES', desc: '西班牙最大' },
        { icon: '🏪', name: 'El Corte Inglés', desc: '本土百货' },
        { icon: '🛍️', name: 'Zalando ES', desc: '时尚平台' },
        { icon: '🎵', name: 'TikTok Shop', desc: '增长快' },
    ],
    '土耳其': [
        { icon: '🛒', name: 'Trendyol', desc: '土耳其最大' },
        { icon: '🏪', name: 'Hepsiburada', desc: '第二大平台' },
        { icon: '🛍️', name: 'N11', desc: '本土平台' },
        { icon: '🎵', name: 'TikTok Shop', desc: '新进入' },
    ],
    '以色列': [
        { icon: '🛒', name: 'Amazon IL', desc: '亚马逊以色列' },
        { icon: '🏪', name: 'Rami Levy', desc: '本土零售' },
        { icon: '🛍️', name: 'Shufersal', desc: '零售巨头' },
        { icon: '📱', name: '独立站', desc: 'DTC模式' },
    ],
    '南非': [
        { icon: '🛒', name: 'Takealot', desc: '南非最大' },
        { icon: '🏪', name: 'Shoprite', desc: '零售巨头' },
        { icon: '🛍️', name: 'Woolworths', desc: '高端零售' },
        { icon: '📱', name: '独立站', desc: 'DTC增长' },
    ],
    '波兰': [
        { icon: '🛒', name: 'Allegro', desc: '波兰最大' },
        { icon: '🏪', name: 'Amazon PL', desc: '亚马逊波兰' },
        { icon: '🛍️', name: 'CD Projekt', desc: '游戏零售' },
        { icon: '📦', name: 'eBay PL', desc: '综合平台' },
    ],
    '瑞典': [
        { icon: '🛒', name: 'Amazon SE', desc: '亚马逊瑞典' },
        { icon: '🏪', name: 'Tradera', desc: '本土拍卖' },
        { icon: '🛍️', name: 'Zalando SE', desc: '时尚平台' },
        { icon: '📱', name: '独立站', desc: 'DTC受欢迎' },
    ],
    '瑞士': [
        { icon: '🛒', name: 'Amazon DE', desc: '亚马逊德国站' },
        { icon: '🏪', name: 'Digitec', desc: '本土3C' },
        { icon: '🛍️', name: 'Galaxus', desc: '综合电商' },
        { icon: '📱', name: '独立站', desc: '高客单价' },
    ],
    '阿根廷': [
        { icon: '🛒', name: 'Mercado Libre', desc: '阿根廷最大' },
        { icon: '🏪', name: 'Fravega', desc: '本土家电' },
        { icon: '🛍️', name: 'Garbarino', desc: '零售连锁' },
        { icon: '📱', name: '独立站', desc: '增长中' },
    ],
    '智利': [
        { icon: '🛒', name: 'Mercado Libre', desc: '智利最大' },
        { icon: '🏪', name: 'Falabella', desc: '零售巨头' },
        { icon: '🛍️', name: 'Paris.cl', desc: '百货电商' },
        { icon: '📱', name: '独立站', desc: 'DTC机会' },
    ],
    '哥伦比亚': [
        { icon: '🛒', name: 'Mercado Libre', desc: '哥伦比亚最大' },
        { icon: '🏪', name: 'Falabella', desc: '零售巨头' },
        { icon: '🛍️', name: 'Exito', desc: '本土零售' },
        { icon: '📱', name: '独立站', desc: '增长中' },
    ],
    '中国香港': [
        { icon: '🛒', name: 'Shopee HK', desc: 'Shopee香港' },
        { icon: '🏪', name: 'HKTVmall', desc: '本土平台' },
        { icon: '🛍️', name: 'Taobao HK', desc: '淘宝香港' },
        { icon: '📦', name: '转口贸易', desc: '中转枢纽' },
    ],
    '中国台湾': [
        { icon: '🛒', name: '蝦皮購物', desc: '台湾最大' },
        { icon: '🏪', name: 'PChome', desc: '本土平台' },
        { icon: '🛍️', name: 'MOMO購物', desc: '富邦旗下' },
        { icon: '📦', name: '露天拍賣', desc: '老牌平台' },
    ],
    '新西兰': [
        { icon: '🛒', name: 'Trade Me', desc: '新西兰最大' },
        { icon: '🏪', name: 'Amazon AU', desc: '亚马逊澳洲站' },
        { icon: '🛍️', name: 'The Warehouse', desc: '零售巨头' },
        { icon: '📱', name: '独立站', desc: 'DTC增长' },
    ],
    '尼日利亚': [
        { icon: '🛒', name: 'Jumia', desc: '非洲最大' },
        { icon: '🏪', name: 'Konga', desc: '第二大平台' },
        { icon: '🛍️', name: 'Jiji', desc: '分类信息' },
        { icon: '📱', name: '独立站', desc: '高潜力' },
    ],
    '埃及': [
        { icon: '🛒', name: 'Jumia EG', desc: '埃及最大' },
        { icon: '🏪', name: 'Souq', desc: '亚马逊旗下' },
        { icon: '🛍️', name: 'Noon EG', desc: 'Noon埃及' },
        { icon: '📱', name: '独立站', desc: '增长中' },
    ],
    '肯尼亚': [
        { icon: '🛒', name: 'Jumia KE', desc: '肯尼亚最大' },
        { icon: '🏪', name: 'Kilimall', desc: '中资背景' },
        { icon: '🛍️', name: 'Masoko', desc: '本土平台' },
        { icon: '📱', name: '独立站', desc: '潜力市场' },
    ],
    '巴基斯坦': [
        { icon: '🛒', name: 'Daraz', desc: '巴基斯坦最大' },
        { icon: '🏪', name: 'OLX', desc: '分类信息' },
        { icon: '🛍️', name: 'Telemart', desc: '本土平台' },
        { icon: '📱', name: '独立站', desc: '增长中' },
    ],
    '孟加拉国': [
        { icon: '🛒', name: 'Daraz BD', desc: '孟加拉最大' },
        { icon: '🏪', name: 'Evaly', desc: '本土平台' },
        { icon: '🛍️', name: 'Chaldal', desc: '生鲜电商' },
        { icon: '📱', name: '独立站', desc: '潜力大' },
    ],
};

const MAP_NEWS = [
    { tag: '法规', tagType: 'policy', title: '欧盟新电池法规2026年8月生效，含钴/锂电池出口需关注', time: '2小时前' },
    { tag: '政策', tagType: 'policy', title: '美国UFLPA执法扩大，光伏/番茄/棉花品类被纳入扣押清单', time: '5小时前' },
    { tag: '认证', tagType: 'cert', title: '印尼新规：所有进口商品需申请Postel认证方可清关', time: '1天前' },
    { tag: '认证', tagType: 'cert', title: '沙特SABER系统新增5个品类强制认证，建材/汽车配件在列', time: '2天前' },
    { tag: '税务', tagType: 'tariff', title: '日本JCT消费税新规2025年全面执行，无JCT号难以企业采购', time: '3天前' },
    { tag: '平台', tagType: 'platform', title: 'TikTok Shop美国站开放本地小店招商，跨境卖家迎新机遇', time: '4天前' },
    { tag: '税务', tagType: 'tariff', title: '巴西Remessa Conforme新税政全面执行，跨境包裹50美元以上需缴税', time: '5天前' },
    { tag: '政策', tagType: 'policy', title: '东盟原产地证电子化全面推进，FORM D在线签发', time: '6天前' },
];

const MAP_STORIES = [
    { title: 'Shein在墨西哥被查税务合规，2025年补缴税款超10亿比索', country: 'MX 墨西哥' },
    { title: '某品牌牙膏在沙特因含氟成分被认定为不符合伊斯兰规范被强制下架', country: 'SA 沙特' },
    { title: '出口日本食品未贴JAS有机标签，整批货物被退回损失50万', country: 'JP 日本' },
    { title: '3C配件卖家使用伪造CE标志，货物在荷兰海关被扣押销毁', country: 'EU 欧盟' },
    { title: '服装品牌在印尼因清真认证缺失遭伊斯兰组织抵制，损失惨重', country: 'ID 印尼' },
    { title: '玩具出口美国无CPC认证，被CPSC通报后在Amazon全站下架', country: 'US 美国' },
    { title: '化妆品出口韩国未做KFDA注册，4000件产品被海关退货', country: 'KR 韩国' },
    { title: '某跨境电商公司因转移定价被印度税务局调查，补税罚款500万', country: 'IN 印度' },
];

async function initRiskMap() {
    try {
        if (!window.echarts) {
            await new Promise((resolve) => {
                let count = 0;
                const timer = setInterval(() => {
                    count++;
                    if (window.echarts || count > 50) {
                        clearInterval(timer);
                        resolve();
                    }
                }, 100);
            });
            if (!window.echarts && window.echartsFallback) {
                window.echartsFallback();
                await new Promise((resolve) => {
                    let count = 0;
                    const timer = setInterval(() => {
                        count++;
                        if (window.echarts || count > 50) {
                            clearInterval(timer);
                            resolve();
                        }
                    }, 100);
                });
            }
        }
        if (!window.echarts) {
            console.error('ECharts not loaded');
            return;
        }
        
        const res = await fetch('/api/risk-map');
        riskMapData = await res.json();
        
        const mapRes = await fetch('/static/world.json');
        const mapJson = await mapRes.json();
        echarts.registerMap('world', mapJson);
        
        const chartDom = document.getElementById('risk-map');
        if (!chartDom) return;
        
        riskChart = echarts.init(chartDom);
        
        const data = Object.entries(riskMapData).map(([name, info]) => ({
            name: info.en,
            value: info.score,
            riskLevel: info.risk,
            cnName: name,
        }));
        
        const option = {
            tooltip: {
                trigger: 'item',
                formatter: function(params) {
                    if (params.data) {
                        const riskText = {
                            'high': '🔴 高风险',
                            'medium_high': '🟠 中高风险',
                            'medium': '🟡 中风险',
                            'low': '🟢 低风险',
                        }[params.data.riskLevel] || '⚪ 未知';
                        return `<div style="padding:8px;">
                            <div style="font-weight:600;font-size:14px;margin-bottom:4px;">${params.data.cnName} ${params.name}</div>
                            <div style="font-size:12px;color:#666;">风险评分：${params.data.value}/100</div>
                            <div style="font-size:12px;">${riskText}</div>
                            <div style="font-size:11px;color:#999;margin-top:4px;">点击查看详情</div>
                        </div>`;
                    }
                    return params.name;
                }
            },
            visualMap: {
                min: 40,
                max: 90,
                left: 20,
                bottom: 20,
                text: ['低风险', '高风险'],
                calculable: true,
                inRange: {
                    color: ['#10B981', '#34D399', '#FBBF24', '#F59E0B', '#EF4444']
                },
                textStyle: {
                    color: 'var(--text-secondary)',
                    fontSize: 11,
                }
            },
            series: [{
                type: 'map',
                map: 'world',
                roam: true,
                zoom: 1.2,
                scaleLimit: { min: 0.8, max: 5 },
                label: { show: false },
                emphasis: {
                    label: { show: true, fontSize: 10 },
                    itemStyle: {
                        areaColor: '#3B82F6',
                    }
                },
                itemStyle: {
                    borderColor: '#fff',
                    borderWidth: 0.5,
                    areaColor: '#E2E8F0',
                },
                data: data,
                nameMap: {
                    'United States': 'United States',
                    'China': 'China',
                    'Japan': 'Japan',
                    'Korea': 'South Korea',
                    'United Kingdom': 'United Kingdom',
                    'Germany': 'Germany',
                    'France': 'France',
                    'Italy': 'Italy',
                    'Spain': 'Spain',
                    'Russia': 'Russia',
                    'Brazil': 'Brazil',
                    'Mexico': 'Mexico',
                    'India': 'India',
                    'Australia': 'Australia',
                    'Canada': 'Canada',
                    'Indonesia': 'Indonesia',
                    'Vietnam': 'Vietnam',
                    'Thailand': 'Thailand',
                    'Malaysia': 'Malaysia',
                    'Singapore': 'Singapore',
                    'Philippines': 'Philippines',
                    'Saudi Arabia': 'Saudi Arabia',
                    'United Arab Emirates': 'UAE',
                    'Turkey': 'Turkey',
                    'Israel': 'Israel',
                    'South Africa': 'South Africa',
                    'Poland': 'Poland',
                    'Sweden': 'Sweden',
                    'Switzerland': 'Switzerland',
                    'Argentina': 'Argentina',
                    'Chile': 'Chile',
                    'Colombia': 'Colombia',
                    'New Zealand': 'New Zealand',
                    'Nigeria': 'Nigeria',
                    'Egypt': 'Egypt',
                    'Kenya': 'Kenya',
                    'Pakistan': 'Pakistan',
                    'Bangladesh': 'Bangladesh',
                }
            }]
        };
        
        riskChart.setOption(option);
        
        riskChart.on('click', function(params) {
            if (params.data && params.data.cnName) {
                openCountryModal(params.data.cnName);
            }
        });
        
        window.addEventListener('resize', function() {
            if (riskChart) riskChart.resize();
        });
        
        renderMapNews();
        renderMapStories();
        
    } catch (e) {
        console.error('Init risk map failed:', e);
    }
}

function renderMapNews() {
    const container = document.getElementById('map-news-list');
    if (!container) return;
    
    container.innerHTML = MAP_NEWS.map(item => `
        <div class="map-news-item" onclick="openModule('trade-news')">
            <span class="tag ${item.tagType}">${item.tag}</span>
            <div class="title">${item.title}</div>
            <div class="meta">
                <span>${item.time}</span>
            </div>
        </div>
    `).join('');
}

function renderMapStories() {
    const container = document.getElementById('map-stories-list');
    if (!container) return;
    
    container.innerHTML = MAP_STORIES.map(item => `
        <div class="map-story-item" onclick="openModule('stories')">
            <div class="title">${item.title}</div>
            <div class="meta">
                <span class="country">${item.country}</span>
            </div>
        </div>
    `).join('');
}

// ========== 国家详情弹窗 ==========
function openCountryModal(countryName) {
    const info = riskMapData[countryName];
    if (!info) return;
    
    const isEn = currentLang === 'en';
    const modal = document.getElementById('country-modal');
    const body = document.getElementById('country-modal-body');
    
    const platforms = getCountryPlatforms(countryName);
    const riskText = {
        'high': isEn ? '🔴 High Risk' : '🔴 高风险',
        'medium_high': isEn ? '🟠 Medium-High Risk' : '🟠 中高风险',
        'medium': isEn ? '🟡 Medium Risk' : '🟡 中风险',
        'low': isEn ? '🟢 Low Risk' : '🟢 低风险',
    }[info.risk] || '⚪ Unknown';
    
    const categoriesHtml = info.hot_categories.map(cat => 
        `<span class="category-tag">${cat}</span>`
    ).join('');
    
    const platformsHtml = platforms.map(p => `
        <div class="platform-card" onclick="openModule('platform')">
            <div class="icon">${p.icon}</div>
            <div class="name">${p.name}</div>
            <div class="desc">${p.desc}</div>
        </div>
    `).join('');
    
    body.innerHTML = `
        <div class="country-modal-header">
            <div class="flag">${info.flag}</div>
            <div class="name">${countryName}</div>
            <div class="name-en">${info.en}</div>
            <div class="risk-badge">${riskText} · ${info.score}分</div>
        </div>
        <div class="country-modal-body">
            <div class="country-section">
                <div class="country-section-title">
                    <span class="icon">📊</span>
                    ${isEn ? 'Basic Info' : '基本信息'}
                </div>
                <div class="country-info-grid">
                    <div class="country-info-item">
                        <div class="label">${isEn ? 'Risk Score' : '风险评分'}</div>
                        <div class="value">${info.score}/100</div>
                    </div>
                    <div class="country-info-item">
                        <div class="label">${isEn ? 'Export Volume' : '贸易额(亿美元)'}</div>
                        <div class="value">${info.export_volume}</div>
                    </div>
                    <div class="country-info-item">
                        <div class="label">${isEn ? 'Certification' : '主要认证'}</div>
                        <div class="value">${info.认证}</div>
                    </div>
                    <div class="country-info-item">
                        <div class="label">${isEn ? 'Cultural Taboos' : '文化禁忌'}</div>
                        <div class="value" style="font-size:12px;font-weight:500;">${info.禁忌}</div>
                    </div>
                </div>
            </div>
            
            <div class="country-section">
                <div class="country-section-title">
                    <span class="icon">🛒</span>
                    ${isEn ? 'Major Platforms' : '主流购物平台'}
                </div>
                <div class="country-platforms">
                    ${platformsHtml}
                </div>
            </div>
            
            <div class="country-section">
                <div class="country-section-title">
                    <span class="icon">🔥</span>
                    ${isEn ? 'Hot Categories' : '热门品类'}
                </div>
                <div class="country-categories">
                    ${categoriesHtml}
                </div>
            </div>
            
            <div class="country-section">
                <div class="country-section-title">
                    <span class="icon">⚠️</span>
                    ${isEn ? 'Key Risk Points' : '关键风险提示'}
                </div>
                <div class="country-risk-box">
                    <div class="label">${isEn ? 'Important Notes' : '出海须知'}</div>
                    <div class="content">${info.key_risk}</div>
                </div>
            </div>
            
            <div class="country-section" style="text-align:center;padding-top:8px;">
                <button class="btn-primary" onclick="startCountryScan('${countryName}')" style="padding:12px 32px;font-size:15px;">
                    🚀 ${isEn ? 'Start Full Country Analysis' : '开始该国全面检测'}
                </button>
            </div>
        </div>
    `;
    
    modal.classList.add('show');
}

function getCountryPlatforms(countryName) {
    if (COUNTRY_PLATFORMS[countryName]) {
        return COUNTRY_PLATFORMS[countryName];
    }
    
    const regionMap = {
        '欧盟': '欧盟',
        '德国': '德国',
        '法国': '法国',
        '意大利': '意大利',
        '西班牙': '西班牙',
        '荷兰': '欧盟',
        '比利时': '欧盟',
        '瑞典': '瑞典',
        '波兰': '波兰',
        '瑞士': '瑞士',
        '奥地利': '欧盟',
        '丹麦': '欧盟',
        '芬兰': '欧盟',
        '葡萄牙': '欧盟',
        '希腊': '欧盟',
        '美国': '美国',
        '加拿大': '加拿大',
        '墨西哥': '墨西哥',
        '巴西': '巴西',
        '阿根廷': '阿根廷',
        '智利': '智利',
        '哥伦比亚': '哥伦比亚',
        '日本': '日本',
        '韩国': '韩国',
        '澳大利亚': '澳大利亚',
        '新西兰': '新西兰',
        '印度': '印度',
        '俄罗斯': '俄罗斯',
        '土耳其': '土耳其',
        '以色列': '以色列',
        '南非': '南非',
        '沙特阿拉伯': '沙特阿拉伯',
        '阿联酋': '阿联酋',
        '卡塔尔': '中东',
        '科威特': '中东',
        '巴林': '中东',
        '阿曼': '中东',
        '印尼': '印尼',
        '越南': '越南',
        '泰国': '泰国',
        '马来西亚': '马来西亚',
        '新加坡': '新加坡',
        '菲律宾': '菲律宾',
        '缅甸': '东南亚',
        '柬埔寨': '东南亚',
        '老挝': '东南亚',
        '文莱': '中东',
        '中国香港': '中国香港',
        '中国台湾': '中国台湾',
        '尼日利亚': '尼日利亚',
        '埃及': '埃及',
        '肯尼亚': '肯尼亚',
        '巴基斯坦': '巴基斯坦',
        '孟加拉国': '孟加拉国',
        '斯里兰卡': '南亚',
        '蒙古': '东亚',
    };
    
    const region = regionMap[countryName];
    if (region && COUNTRY_PLATFORMS[region]) {
        return COUNTRY_PLATFORMS[region];
    }
    
    return [
        { icon: '🛒', name: 'Amazon', desc: '亚马逊全球' },
        { icon: '📦', name: 'eBay', desc: 'eBay国际' },
        { icon: '🎵', name: 'TikTok Shop', desc: '社交电商' },
        { icon: '📱', name: '独立站', desc: 'DTC模式' },
    ];
}

function startCountryScan(countryName) {
    closeCountryModal();
    const isEn = currentLang === 'en';
    
    document.getElementById('quick-market').value = countryName;
    if (typeof initMarketSelects === 'function') {
        setTimeout(() => { initMarketSelects(); }, 50);
    }
    
    openModule('compliance');
}

function closeCountryModal() {
    document.getElementById('country-modal').classList.remove('show');
}

function closeCountryModalOnOverlay(event) {
    if (event.target.id === 'country-modal') {
        closeCountryModal();
    }
}
