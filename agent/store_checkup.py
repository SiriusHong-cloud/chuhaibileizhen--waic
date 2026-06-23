from agent.mimo_client import chat_stream
from agent.prompts import STORE_CHECKUP_PROMPT


async def store_checkup(store_url: str, platform: str, market: str, category: str = ""):
    """店铺AI体检：解析店铺URL并生成体检报告"""
    messages = [
        {"role": "system", "content": STORE_CHECKUP_PROMPT},
        {"role": "user", "content": f"""
店铺URL：{store_url}
平台：{platform}
目标市场：{market}
品类背景：{category}

请对这家店铺进行AI体检，生成完整的体检报告。
注意：由于无法直接访问网页，请基于该平台和市场的通用规则，模拟分析一个典型店铺的体检报告。
"""}
    ]
    async for chunk in chat_stream(messages):
        yield chunk
