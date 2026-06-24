from agent.mimo_client import chat_stream
from agent.prompts import PRODUCT_QUICK_CHECK_PROMPT


async def product_quick_check(product_name: str, markets: str, category: str = ""):
    """选品快检：快速检测产品在目标市场的合规情况"""
    messages = [
        {"role": "system", "content": PRODUCT_QUICK_CHECK_PROMPT},
        {"role": "user", "content": f"""
选品名称/URL：{product_name}
目标市场：{markets}
品类背景：{category}

请对该选品进行快速合规检测，生成选品快检报告。
"""}
    ]
    async for chunk in chat_stream(messages, "product-quick-check"):
        yield chunk
