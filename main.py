from fastapi import FastAPI, Request
from fastapi.responses import HTMLResponse, StreamingResponse, JSONResponse
from fastapi.staticfiles import StaticFiles
from pydantic import BaseModel
import asyncio

from database.models import init_db
from database.crud import save_history, get_history_list, get_history_detail, delete_history
from agent.cultural import cultural_scan
from agent.compliance import compliance_scan
from agent.localize import localize_content
from agent.stories import get_story
from agent.prompts import MARKET_BEST_PRACTICE, DEFAULT_BEST_PRACTICE



app = FastAPI(title="出海避雷针⚡", version="2.0.0")


# --- Pydantic 请求模型 ---

class CulturalRequest(BaseModel):
    market: str
    product: str
    content_type: str = "产品"
    category: str = ""


class ComplianceRequest(BaseModel):
    market: str
    product: str
    business_model: str = "跨境电商"
    category: str = ""


class LocalizeRequest(BaseModel):
    market: str
    content: str
    content_type: str = "营销文案"
    category: str = ""


class StoriesRequest(BaseModel):
    market: str
    product: str
    category: str = ""


# --- 启动事件 ---

@app.on_event("startup")
async def startup():
    await init_db()


# --- 静态文件 ---

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.get("/", response_class=HTMLResponse)
async def index():
    with open("static/index.html", "r", encoding="utf-8") as f:
        return HTMLResponse(content=f.read())


# --- SSE 流式响应封装 ---

def sse_response(generator, module_type: str, market: str, product: str, input_data: str):
    """将异步生成器包装为 SSE 流式响应，并在完成后保存历史"""

    async def stream_with_save():
        full_output = []
        async for chunk in generator:
            full_output.append(chunk)
            yield f"data: {chunk}\n\n"
        # 保存到历史记录
        output_text = "".join(full_output)
        await save_history(module_type, market, product, input_data, output_text)
        yield "data: [DONE]\n\n"

    return StreamingResponse(
        stream_with_save(),
        media_type="text/event-stream",
        headers={
            "Cache-Control": "no-cache",
            "Connection": "keep-alive",
            "X-Accel-Buffering": "no",
        },
    )


# --- 原有 API 路由 ---

@app.post("/api/cultural")
async def api_cultural(req: CulturalRequest):
    gen = cultural_scan(req.product, req.market, req.content_type, req.category)
    input_data = f"市场：{req.market}\n产品：{req.product}\n类型：{req.content_type}"
    return sse_response(gen, "cultural", req.market, req.product, input_data)


@app.post("/api/compliance")
async def api_compliance(req: ComplianceRequest):
    gen = compliance_scan(req.product, req.market, req.business_model, req.category)
    input_data = f"市场：{req.market}\n品类：{req.product}\n模式：{req.business_model}"
    return sse_response(gen, "compliance", req.market, req.product, input_data)


@app.post("/api/localize")
async def api_localize(req: LocalizeRequest):
    gen = localize_content(req.content, req.market, req.content_type, req.category)
    input_data = f"市场：{req.market}\n类型：{req.content_type}\n内容：{req.content}"
    return sse_response(gen, "localize", req.market, req.content, input_data)


@app.post("/api/stories")
async def api_stories(req: StoriesRequest):
    gen = get_story(req.market, req.product, req.category)
    input_data = f"市场：{req.market}\n品类：{req.product}"
    return sse_response(gen, "stories", req.market, req.product, input_data)


# --- Pro模块路由 ---

@app.post("/api/tariff")
async def api_tariff(req: Request):
    body = await req.json()
    market = body.get("market", "")
    hscode = body.get("hscode", "")
    origin = body.get("origin", "中国")
    declared_value = body.get("declared_value", "0")
    incoterm = body.get("incoterm", "FOB")
    category = body.get("category", "")
    from agent.tariff_scan import tariff_scan
    gen = tariff_scan(market, hscode, origin, declared_value, incoterm, category)
    input_data = f"市场：{market}\nHS编码：{hscode}\n申报价值：{declared_value}USD"
    return sse_response(gen, "tariff", market, hscode, input_data)


@app.post("/api/cert")
async def api_cert(req: Request):
    body = await req.json()
    market = body.get("market", "")
    product = body.get("product", "")
    market2 = body.get("market2", "")
    category = body.get("category", "")
    from agent.cert_scan import cert_scan
    gen = cert_scan(market, product, market2, category)
    input_data = f"市场：{market}\n产品：{product}"
    return sse_response(gen, "cert", market, product, input_data)


@app.post("/api/crisis")
async def api_crisis(req: Request):
    body = await req.json()
    crisis_type_map = {
        "customs_hold": "海关扣货",
        "platform_ban": "平台下架/封店",
        "legal_letter": "收到律师函",
        "negative_pr": "负面舆情/媒体曝光",
        "product_recall": "产品召回",
        "gov_investigation": "政府调查"
    }
    crisis_type = crisis_type_map.get(body.get("crisis_type", ""), "未知")
    market = body.get("market", "")
    description = body.get("description", "")
    category = body.get("category", "")
    from agent.crisis_scan import crisis_scan
    gen = crisis_scan(crisis_type, market, description, category)
    input_data = f"危机：{crisis_type}\n市场：{market}\n描述：{description}"
    return sse_response(gen, "crisis", market, crisis_type, input_data)


# --- V2新增模块路由 ---

@app.post("/api/platform")
async def api_platform(req: Request):
    body = await req.json()
    platform = body.get("platform", "")
    market = body.get("market", "")
    question = body.get("question", "")
    category = body.get("category", "")
    from agent.platform_scan import platform_scan
    gen = platform_scan(platform, market, question, category)
    input_data = f"平台：{platform}\n市场：{market}\n问题：{question}"
    return sse_response(gen, "platform", market, platform, input_data)


@app.post("/api/roadmap")
async def api_roadmap(req: Request):
    body = await req.json()
    step = body.get("step", "选市场")
    market = body.get("market", "")
    category = body.get("category", "")
    question = body.get("question", "")
    from agent.roadmap_scan import roadmap_scan
    gen = roadmap_scan(step, market, category, question)
    input_data = f"阶段：{step}\n市场：{market}\n品类：{category}"
    return sse_response(gen, "roadmap", market, step, input_data)


# --- V2扩展路由 ---

@app.post("/api/customs")
async def api_customs(req: Request):
    body = await req.json()
    market = body.get("market", "")
    product = body.get("product", "")
    category = body.get("category", "")
    from agent.tariff_scan import tariff_scan
    # 报关助手复用关税扫描，用产品名替代HS编码
    gen = tariff_scan(market, product, "中国", "0", "FOB", category)
    input_data = f"市场：{market}\n产品：{product}"
    return sse_response(gen, "customs", market, product, input_data)


@app.post("/api/brand-name")
async def api_brand_name(req: Request):
    body = await req.json()
    market = body.get("market", "")
    brand_name = body.get("brand_name", "")
    category = body.get("category", "")
    from agent.localize import localize_content
    # 品牌名称本土化检测复用本土化模块
    gen = localize_content(f"品牌名称「{brand_name}」的文化适应性检测", market, "品牌名称", category)
    input_data = f"市场：{market}\n品牌：{brand_name}"
    return sse_response(gen, "brand-name", market, brand_name, input_data)


@app.post("/api/consult")
async def api_consult(req: Request):
    body = await req.json()
    service = body.get("service", "通用咨询")
    question = body.get("question", "")
    market = body.get("market", "")
    category = body.get("category", "")
    from agent.mimo_client import chat_stream
    system_prompt = f"""你是出海避雷针的专业顾问，专注于{service}领域。
请根据用户的问题，给出专业、实用的建议。
使用[RISK_SCORE]格式输出评分。
用中文回复，使用Markdown格式，内容详细且有条理。"""
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"服务类型：{service}\n市场：{market}\n品类：{category}\n问题：{question}"},
    ]
    async def consult_gen():
        async for chunk in chat_stream(messages):
            yield chunk
    gen = consult_gen()
    input_data = f"服务：{service}\n问题：{question}"
    return sse_response(gen, "consult", market or "全球", service, input_data)


@app.post("/api/qa")
async def api_qa(req: Request):
    body = await req.json()
    question = body.get("question", "")
    category = body.get("category", "")
    from agent.mimo_client import chat_stream
    system_prompt = """你是出海避雷针的AI助手，专注于跨境出海领域。
你可以回答关于外贸、跨境电商、文化差异、合规认证、平台入驻等方面的问题。
使用[RISK_SCORE]格式输出评分。
用中文回复，使用Markdown格式，简洁实用。"""
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"品类背景：{category}\n问题：{question}"},
    ]
    async def qa_gen():
        async for chunk in chat_stream(messages):
            yield chunk
    gen = qa_gen()
    input_data = f"问题：{question}"
    return sse_response(gen, "qa", "全球", question, input_data)


@app.post("/api/news")
async def api_news(req: Request):
    body = await req.json()
    market = body.get("market", "")
    product = body.get("product", "")
    category = body.get("category", "")
    from agent.mimo_client import chat_stream
    system_prompt = f"""你是出海避雷针的新闻分析师，专注于跨境出海领域的政策法规动态解读。

用户关注的市场：{market}
用户关注的品类：{product}

请基于2025-2026年的最新政策动态，生成一份该市场/品类的政策解读报告。必须包含真实可验证的政策信息，如果不确定具体日期和数字，标注"约"或"待确认"。

报告结构：
### 📰 政策概要
（一句话总结最新政策变化）

### 📋 政策详情
（详细解读2-3条相关政策，包含生效时间、影响范围、关键条款）

### 🎯 对跨境卖家的影响
（具体列出对卖家的3-5个直接影响）

### ⚠️ 需要立即行动的事项
（列出紧急度最高的2-3个待办）

### 💡 应对建议
（给出3条可执行的应对策略）

### 📅 政策时间线
（近期相关政策的生效节点）

使用[RISK_SCORE]格式输出评分。
用中文回复，使用Markdown格式。"""
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"请解读{market}市场{product}品类的最新跨境政策动态"},
    ]
    async def news_gen():
        async for chunk in chat_stream(messages):
            yield chunk
    gen = news_gen()
    input_data = f"市场：{market}\n品类：{product}"
    return sse_response(gen, "news", market, product, input_data)


# --- 风险地图数据 ---

RISK_MAP_DATA = {
    "日本": {"en": "Japan", "risk": "medium", "score": 78, "flag": "🇯🇵", "禁忌": "数字4/9忌讳、二战历史敏感", "认证": "PSE/JIS/TELEC", "export_volume": "1528", "hot_categories": ["3C电子", "美妆个护", "服装纺织", "家居用品", "食品饮料"], "key_risk": "消费者品质要求极高，差评致命"},
    "韩国": {"en": "South Korea", "risk": "medium", "score": 76, "flag": "🇰🇷", "禁忌": "日韩历史争议、日本元素", "认证": "KC认证", "export_volume": "1370", "hot_categories": ["美妆护肤", "3C配件", "服装鞋包", "家居用品", "食品"], "key_risk": "KCC认证严格，韩语本地化成本高"},
    "美国": {"en": "United States", "risk": "medium", "score": 75, "flag": "🇺🇸", "禁忌": "种族/性别平等、枪支议题", "认证": "FCC/UL/FDA", "export_volume": "5003", "hot_categories": ["3C电子", "机械装备", "家具家居", "纺织品", "玩具礼品"], "key_risk": "UFLPA执法扩大，涉疆产品扣押风险"},
    "德国": {"en": "Germany", "risk": "medium_high", "score": 70, "flag": "🇩🇪", "禁忌": "绝对化用语、虚假紧迫感", "认证": "CE/GS/LFGB", "export_volume": "1051", "hot_categories": ["汽车配件", "机械电子", "化工产品", "医疗设备", "家居用品"], "key_risk": "包装法/EPR合规强制，环保要求严格"},
    "法国": {"en": "France", "risk": "medium_high", "score": 72, "flag": "🇫🇷", "禁忌": "英语文化抵抗、法语优先", "认证": "CE/NF", "export_volume": "489", "hot_categories": ["时尚服饰", "美妆护肤", "酒类", "奢侈品", "家居装饰"], "key_risk": "法语强制，本土化成本高，VAT合规严格"},
    "英国": {"en": "United Kingdom", "risk": "medium", "score": 74, "flag": "🇬🇧", "禁忌": "脱欧后独立认证", "认证": "UKCA/ASA", "export_volume": "743", "hot_categories": ["3C电子", "服装纺织", "家居用品", "美妆护肤", "玩具"], "key_risk": "UKCA认证成本高，VAT合规复杂"},
    "欧盟": {"en": "European Union", "risk": "medium_high", "score": 68, "flag": "🇪🇺", "禁忌": "GDPR年营收4%罚款", "认证": "CE/RoHS/REACH", "export_volume": "5602", "hot_categories": ["机电产品", "汽车零部件", "光伏设备", "纺织品", "化工品"], "key_risk": "电池法规2026年生效，碳边境调节机制"},
    "印尼": {"en": "Indonesia", "risk": "high", "score": 55, "flag": "🇮🇩", "禁忌": "斋月白天禁食、猪肉/酒", "认证": "SNI/清真认证", "export_volume": "652", "hot_categories": ["钢铁制品", "汽车配件", "纺织服装", "电子设备", "塑料制品"], "key_risk": "清真认证强制，Postel认证复杂"},
    "马来西亚": {"en": "Malaysia", "risk": "medium_high", "score": 65, "flag": "🇲🇾", "禁忌": "三大族群平衡、伊斯兰规范", "认证": "SIRIM/清真认证", "export_volume": "534", "hot_categories": ["电子元器件", "钢铁", "化工品", "机械设备", "食品"], "key_risk": "清真认证必备，多元文化需注意"},
    "越南": {"en": "Vietnam", "risk": "medium_high", "score": 62, "flag": "🇻🇳", "禁忌": "中越历史争议、南海问题", "认证": "MoH/TCVN", "export_volume": "1119", "hot_categories": ["纺织服装", "电子设备", "机械", "农产品", "塑料制品"], "key_risk": "原产地规则严格，越南制造标签要求"},
    "泰国": {"en": "Thailand", "risk": "medium", "score": 68, "flag": "🇹🇭", "禁忌": "佛像禁忌、王室不可批评", "认证": "TISI/FDA", "export_volume": "505", "hot_categories": ["汽车摩托车", "电子设备", "橡胶", "农产品", "化工品"], "key_risk": "BOI优惠申请复杂，TISI认证周期长"},
    "沙特阿拉伯": {"en": "Saudi Arabia", "risk": "high", "score": 50, "flag": "🇸🇦", "禁忌": "猪肉/酒/十字架/六芒星", "认证": "SASO/清真认证", "export_volume": "434", "hot_categories": ["石油设备", "汽车配件", "建筑材料", "纺织品", "食品"], "key_risk": "SABER系统强制认证，清真认证必备"},
    "阿联酋": {"en": "UAE", "risk": "medium_high", "score": 65, "flag": "🇦🇪", "禁忌": "斋月规范、公共场所行为", "认证": "ESMA/ECAS", "export_volume": "518", "hot_categories": ["电子产品", "纺织品", "机械设备", "黄金珠宝", "食品"], "key_risk": "ECAS认证复杂，清真认证重要"},
    "巴西": {"en": "Brazil", "risk": "high", "score": 52, "flag": "🇧🇷", "禁忌": "绿色=厄运、紫色=丧事", "认证": "INMETRO/ANVISA", "export_volume": "797", "hot_categories": ["大豆", "铁矿", "石油", "肉类", "棉花"], "key_risk": "Remessa Conforme税政全面执行，清关复杂"},
    "墨西哥": {"en": "Mexico", "risk": "medium_high", "score": 60, "flag": "🇲🇽", "禁忌": "商标驳回率41%", "认证": "NOM/COFEPRIS", "export_volume": "524", "hot_categories": ["机电产品", "汽车零部件", "纺织品", "塑料制品", "电子产品"], "key_risk": "USMCA原产地规则复杂，墨西哥本地化要求"},
    "印度": {"en": "India", "risk": "medium", "score": 65, "flag": "🇮🇳", "禁忌": "牛神圣、猫头鹰不祥", "认证": "BIS/FSSAI", "export_volume": "1017", "hot_categories": ["机电产品", "化工品", "医药原料", "纺织品", "钢铁"], "key_risk": "BIS认证周期长，本地化运营复杂"},
    "澳大利亚": {"en": "Australia", "risk": "low", "score": 82, "flag": "🇦🇺", "禁忌": "原住民文化尊重", "认证": "RCM/SAA", "export_volume": "468", "hot_categories": ["铁矿", "煤炭", "天然气", "农产品", "医药品"], "key_risk": "TGA认证严格，保健食品准入门槛高"},
    "新加坡": {"en": "Singapore", "risk": "low", "score": 85, "flag": "🇸🇬", "禁忌": "禁口香糖、多元宗教", "认证": "IMDA/SFA", "export_volume": "283", "hot_categories": ["电子设备", "石油化工", "医药品", "食品", "金融服务设备"], "key_risk": "法规完善，合规成本高，适合高附加值产品"},
    "加拿大": {"en": "Canada", "risk": "low", "score": 80, "flag": "🇨🇦", "禁忌": "双语英法、原住民议题", "认证": "CSA/IC", "export_volume": "318", "hot_categories": ["钾肥", "原油", "小麦", "木材", "铝"], "key_risk": "CETA关税优惠，原产地规则需注意"},
    "俄罗斯": {"en": "Russia", "risk": "medium_high", "score": 58, "flag": "🇷🇺", "禁忌": "东正教文化、二战胜利日", "认证": "EAC/GOST", "export_volume": "964", "hot_categories": ["机械装备", "汽车", "化工产品", "农产品", "电子产品"], "key_risk": "EAC认证必备，制裁风险持续，汇率波动大"},
    "意大利": {"en": "Italy", "risk": "medium", "score": 75, "flag": "🇮🇹", "禁忌": "天主教文化、设计审美高", "认证": "CE/IMQ", "export_volume": "292", "hot_categories": ["机械设备", "汽车配件", "时尚服装", "化工品", "医药品"], "key_risk": "设计要求高，本土化需符合审美标准"},
    "西班牙": {"en": "Spain", "risk": "medium", "score": 73, "flag": "🇪🇸", "禁忌": "加泰罗尼亚敏感", "认证": "CE/AENOR", "export_volume": "215", "hot_categories": ["机电产品", "纺织品", "化工品", "农产品", "汽车配件"], "key_risk": "电商渗透率提升，物流基建改善中"},
    "土耳其": {"en": "Turkey", "risk": "medium_high", "score": 60, "flag": "🇹🇷", "禁忌": "国父凯末尔不可批评", "认证": "TSE/CE", "export_volume": "340", "hot_categories": ["汽车配件", "纺织品", "钢铁", "机械", "电子产品"], "key_risk": "电商快速发展，认证要求严格"},
    "以色列": {"en": "Israel", "risk": "medium", "score": 70, "flag": "🇮🇱", "禁忌": "犹太教安息日、猪肉禁忌", "认证": "SI标准", "export_volume": "98", "hot_categories": ["电子设备", "医疗设备", "化工品", "机械设备", "纺织品"], "key_risk": "SI认证必备，安息日物流暂停"},
    "南非": {"en": "South Africa", "risk": "medium", "score": 62, "flag": "🇿🇦", "禁忌": "种族平等敏感", "认证": "NRCS/SABS", "export_volume": "168", "hot_categories": ["矿产品", "机械设备", "电子产品", "化工品", "纺织品"], "key_risk": "SABS认证周期长，本地化服务网络重要"},
    "波兰": {"en": "Poland", "risk": "medium", "score": 72, "flag": "🇵🇱", "禁忌": "天主教保守、二战敏感", "认证": "CE/PCBC", "export_volume": "178", "hot_categories": ["机电产品", "汽车配件", "化工品", "家具", "食品"], "key_risk": "欧洲门户，Allegro平台机遇，物流便利"},
    "瑞典": {"en": "Sweden", "risk": "low", "score": 83, "flag": "🇸🇪", "禁忌": "环保极强、Janteloven", "认证": "CE/SP", "export_volume": "62", "hot_categories": ["汽车零部件", "机电产品", "医药品", "化工品", "林木"], "key_risk": "环保要求高，可持续发展认证加分"},
    "瑞士": {"en": "Switzerland", "risk": "low", "score": 85, "flag": "🇨🇭", "禁忌": "多语言区、准时文化", "认证": "SECO/SIA", "export_volume": "86", "hot_categories": ["精密仪器", "医药品", "机械", "化工品", "钟表"], "key_risk": "非欧盟国家，关税和认证需单独处理"},
    "阿根廷": {"en": "Argentina", "risk": "medium_high", "score": 58, "flag": "🇦🇷", "禁忌": "马岛争议、足球狂热", "认证": "IRAM/ANMAT", "export_volume": "67", "hot_categories": ["大豆", "牛肉", "矿产品", "机电产品", "汽车配件"], "key_risk": "外汇管制严格，汇率波动极大，清关复杂"},
    "智利": {"en": "Chile", "risk": "medium", "score": 63, "flag": "🇨🇱", "禁忌": "地震多发区", "认证": "SEC", "export_volume": "85", "hot_categories": ["铜", "农产品", "机电产品", "化工品", "纸浆"], "key_risk": "CPTPP成员国，零关税准入机会多"},
    "哥伦比亚": {"en": "Colombia", "risk": "medium_high", "score": 58, "flag": "🇨🇴", "禁忌": "避免提及毒品历史", "认证": "INVIMA", "export_volume": "56", "hot_categories": ["石油", "煤炭", "咖啡", "化工品", "机电产品"], "key_risk": "INVIMA认证严格，医药食品类门槛高"},
    "中国香港": {"en": "Hong Kong", "risk": "low", "score": 82, "flag": "🇭🇰", "禁忌": "政治敏感、繁体字必须", "认证": "OFCA/EMSD", "export_volume": "本地转口", "hot_categories": ["转口贸易", "金融服务", "电子产品", "成衣", "珠宝"], "key_risk": "转口贸易便利，非原产地证明需注意"},
    "中国台湾": {"en": "Taiwan", "risk": "medium", "score": 72, "flag": "🇹🇼", "禁忌": "政治称谓敏感", "认证": "BSMI/NCC", "export_volume": "237", "hot_categories": ["电子零部件", "机械设备", "化工品", "纺织品", "自行车"], "key_risk": "BSMI认证必备，ECFA早收清单可关注"},
    "菲律宾": {"en": "Philippines", "risk": "medium_high", "score": 60, "flag": "🇵🇭", "禁忌": "家族商业网络", "认证": "BPS/FDA", "export_volume": "89", "hot_categories": ["电子产品", "机械设备", "化工品", "纺织品", "食品"], "key_risk": "BPS认证复杂，本地分销渠道重要"},
    "新西兰": {"en": "New Zealand", "risk": "low", "score": 82, "flag": "🇳🇿", "禁忌": "毛利文化尊重", "认证": "RCM/MPI", "export_volume": "62", "hot_categories": ["乳制品", "肉类", "水果", "木材", "羊毛"], "key_risk": "MPI认证严格，食品农产品门槛高"},
    "尼日利亚": {"en": "Nigeria", "risk": "high", "score": 48, "flag": "🇳🇬", "禁忌": "部落文化多元", "认证": "SON/NAFDAC", "export_volume": "72", "hot_categories": ["汽车", "机械设备", "电子产品", "纺织品", "建材"], "key_risk": "SONCAP认证复杂，清关时间长，汇率管制严格"},
    "埃及": {"en": "Egypt", "risk": "medium_high", "score": 58, "flag": "🇪🇬", "禁忌": "伊斯兰文化、法老图案", "认证": "EOS", "export_volume": "102", "hot_categories": ["纺织品", "机电产品", "化工品", "食品", "建材"], "key_risk": "GOEIC认证，清关复杂周期长"},
    "肯尼亚": {"en": "Kenya", "risk": "medium_high", "score": 55, "flag": "🇰🇪", "禁忌": "部落文化、野生动物保护", "认证": "KEBS", "export_volume": "58", "hot_categories": ["纺织品", "机电产品", "化工品", "建材", "日用品"], "key_risk": "KEBS认证必备，PSI检验强制"},
    "巴基斯坦": {"en": "Pakistan", "risk": "high", "score": 48, "flag": "🇵🇰", "禁忌": "伊斯兰保守、左手不洁", "认证": "PSQCA/清真认证", "export_volume": "78", "hot_categories": ["纺织品", "机电产品", "化工品", "医疗设备", "食品"], "key_risk": "清真认证重要，PSQCA认证复杂"},
    "孟加拉国": {"en": "Bangladesh", "risk": "high", "score": 45, "flag": "🇧🇩", "禁忌": "伊斯兰文化、禁酒", "认证": "BSTI", "export_volume": "98", "hot_categories": ["纺织品", "成衣", "皮革", "化工品", "黄麻"], "key_risk": "BSTI认证，非纺织品类机会少"},
    "缅甸": {"en": "Myanmar", "risk": "high", "score": 42, "flag": "🇲🇲", "禁忌": "佛教至上、鞋子不洁", "认证": "FDA", "export_volume": "22", "hot_categories": ["纺织品", "食品", "日用品", "建材", "机电产品"], "key_risk": "政治风险高，制裁风险，支付困难"},
    "柬埔寨": {"en": "Cambodia", "risk": "medium_high", "score": 55, "flag": "🇰🇭", "禁忌": "佛像不可商业化", "认证": "CDC", "export_volume": "18", "hot_categories": ["纺织品", "成衣", "电子产品", "建材", "食品"], "key_risk": "EBA优惠需关注，美国普惠制待遇"},
    "老挝": {"en": "Laos", "risk": "medium_high", "score": 50, "flag": "🇱🇦", "禁忌": "小乘佛教禁忌", "认证": "进口许可", "export_volume": "8", "hot_categories": ["建材", "机电产品", "化工品", "食品", "纺织品"], "key_risk": "市场规模小，本地化难度大"},
    "文莱": {"en": "Brunei", "risk": "medium_high", "score": 60, "flag": "🇧🇳", "禁忌": "伊斯兰教法严格", "认证": "清真认证/BruCERT", "export_volume": "5", "hot_categories": ["食品", "建材", "机电产品", "日用品", "纺织品"], "key_risk": "市场极小，清真认证必须"},
    "卡塔尔": {"en": "Qatar", "risk": "medium_high", "score": 62, "flag": "🇶🇦", "禁忌": "伊斯兰保守、斋月严格", "认证": "QCS/清真认证", "export_volume": "28", "hot_categories": ["建材", "机电设备", "食品", "纺织品", "化工品"], "key_risk": "清真认证强制，本地合作伙伴重要"},
    "科威特": {"en": "Kuwait", "risk": "medium_high", "score": 60, "flag": "🇰🇼", "禁忌": "伊斯兰规范", "认证": "KUCAS/清真认证", "export_volume": "42", "hot_categories": ["建材", "机电产品", "纺织品", "食品", "化工品"], "key_risk": "KUCAS认证必备，TER一致性评价"},
    "巴林": {"en": "Bahrain", "risk": "medium", "score": 65, "flag": "🇧🇭", "禁忌": "伊斯兰底线不可触碰", "认证": "清真认证", "export_volume": "18", "hot_categories": ["铝", "石化产品", "纺织品", "食品", "建材"], "key_risk": "小市场但法规相对宽松，海湾门户"},
    "阿曼": {"en": "Oman", "risk": "medium_high", "score": 58, "flag": "🇴🇲", "禁忌": "保守伊斯兰", "认证": "DGSM/清真认证", "export_volume": "25", "hot_categories": ["石油设备", "建材", "机电产品", "食品", "纺织品"], "key_risk": "清真认证重要，本地化服务网络需建立"},
    "蒙古": {"en": "Mongolia", "risk": "medium_high", "score": 52, "flag": "🇲🇳", "禁忌": "成吉思汗不可亵渎", "认证": "标准化法", "export_volume": "15", "hot_categories": ["矿产品", "畜产品", "机电产品", "食品", "纺织品"], "key_risk": "内陆国家物流困难，市场规模小"},
    "斯里兰卡": {"en": "Sri Lanka", "risk": "medium_high", "score": 55, "flag": "🇱🇰", "禁忌": "佛教文化、头部神圣", "认证": "SLSI", "export_volume": "28", "hot_categories": ["纺织品", "茶叶", "橡胶", "宝石", "香料"], "key_risk": "经济困难，外汇管制严格"},
}


@app.get("/api/risk-map")
async def api_risk_map():
    return JSONResponse(content=RISK_MAP_DATA)


# --- 历史记录 API ---

@app.get("/api/history")
async def api_history_list():
    records = await get_history_list()
    return JSONResponse(content=records)


@app.get("/api/history/{record_id}")
async def api_history_detail(record_id: int):
    record = await get_history_detail(record_id)
    if not record:
        return JSONResponse(status_code=404, content={"error": "记录不存在"})
    return JSONResponse(content=record)


@app.delete("/api/history/{record_id}")
async def api_history_delete(record_id: int):
    success = await delete_history(record_id)
    if not success:
        return JSONResponse(status_code=404, content={"error": "记录不存在"})
    return JSONResponse(content={"success": True})


# --- 启动入口 ---

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
