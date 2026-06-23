from agent.mimo_client import chat_stream
from agent.prompts import INTELLECTUAL_PROPERTY_PROMPT


async def intellectual_property_check(brand_name: str, product_desc: str, market: str, category: str = ""):
    """知识产权预检：商标/专利/版权风险检测"""
    messages = [
        {"role": "system", "content": INTELLECTUAL_PROPERTY_PROMPT},
        {"role": "user", "content": f"""
品牌名称：{brand_name}
产品描述：{product_desc}
目标市场：{market}
品类背景：{category}

请进行知识产权风险预检。
"""}
    ]
    async for chunk in chat_stream(messages):
        yield chunk
