from typing import AsyncGenerator
from .mimo_client import chat_stream
from .prompts import COMPLIANCE_PROMPT


async def compliance_scan(product: str, market: str, business_model: str, category: str = "") -> AsyncGenerator[str, None]:
    """合规雷达扫描"""
    messages = [
        {"role": "system", "content": COMPLIANCE_PROMPT},
        {"role": "user", "content": f"请进行合规雷达扫描：\n\n目标市场：{market}\n产品品类：{product}\n业务模式：{business_model}\n品类背景：{category}"},
    ]
    async for chunk in chat_stream(messages, "compliance"):
        yield chunk
