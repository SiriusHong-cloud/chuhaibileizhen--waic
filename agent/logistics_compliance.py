from agent.mimo_client import chat_stream
from agent.prompts import LOGISTICS_COMPLIANCE_PROMPT


async def logistics_compliance_check(origin_country: str, destination_country: str, product_type: str, shipping_method: str, category: str = ""):
    """物流合规：制裁筛查+危险品+原产地"""
    messages = [
        {"role": "system", "content": LOGISTICS_COMPLIANCE_PROMPT},
        {"role": "user", "content": f"""
发货国：{origin_country}
目的国：{destination_country}
产品类型：{product_type}
运输方式：{shipping_method}
品类背景：{category}

请进行物流合规检测。
"""}
    ]
    async for chunk in chat_stream(messages):
        yield chunk
