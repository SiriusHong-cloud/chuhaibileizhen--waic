from typing import AsyncGenerator
from .mimo_client import chat_stream
from .prompts import LOCALIZE_PROMPT


async def localize_content(content: str, market: str, content_type: str, category: str = "") -> AsyncGenerator[str, None]:
    """本土化内容改造"""
    messages = [
        {"role": "system", "content": LOCALIZE_PROMPT},
        {"role": "user", "content": f"请提供以下内容的本土化改造方案：\n\n目标市场：{market}\n原始内容：{content}\n内容类型：{content_type}\n品类背景：{category}"},
    ]
    async for chunk in chat_stream(messages, "localize"):
        yield chunk
