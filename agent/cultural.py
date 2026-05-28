from typing import AsyncGenerator
from .mimo_client import chat_stream
from .prompts import CULTURAL_PROMPT


async def cultural_scan(product: str, market: str, content_type: str, category: str = "") -> AsyncGenerator[str, None]:
    """文化雷区检测"""
    messages = [
        {"role": "system", "content": CULTURAL_PROMPT},
        {"role": "user", "content": f"请检测以下内容的文化雷区：\n\n目标市场：{market}\n产品类型：{product}\n检测类型：{content_type}\n品类背景：{category}"},
    ]
    async for chunk in chat_stream(messages):
        yield chunk
