from typing import AsyncGenerator
from .mimo_client import chat_stream
from .prompts import STORIES_PROMPT


async def get_story(market: str, product: str, category: str = "") -> AsyncGenerator[str, None]:
    """踩雷故事"""
    messages = [
        {"role": "system", "content": STORIES_PROMPT},
        {"role": "user", "content": f"请提供以下市场和产品相关的踩雷故事：\n\n目标市场：{market}\n产品品类：{product}\n品类背景：{category}"},
    ]
    async for chunk in chat_stream(messages, "stories"):
        yield chunk
