from typing import AsyncGenerator
from .mimo_client import chat_stream
from .prompts import STORIES_PROMPT


async def get_story(market: str, product: str, category: str = "") -> AsyncGenerator[str, None]:
    """获取踩雷故事"""
    messages = [
        {"role": "system", "content": STORIES_PROMPT},
        {"role": "user", "content": f"请讲述一个{market}市场{product}品类的真实踩雷故事：\n\n市场：{market}\n品类：{product}\n品类背景：{category}"},
    ]
    async for chunk in chat_stream(messages):
        yield chunk
