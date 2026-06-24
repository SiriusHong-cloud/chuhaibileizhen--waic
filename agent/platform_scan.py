from typing import AsyncGenerator
from .mimo_client import chat_stream
from .platform import PLATFORM_PROMPT


async def platform_scan(platform: str, market: str, question: str, category: str = "") -> AsyncGenerator[str, None]:
    """平台入驻指南"""
    system_prompt = PLATFORM_PROMPT
    user_msg = f"请提供以下平台的入驻指南：\n\n目标平台：{platform}\n目标市场：{market}\n品类：{category}\n具体问题：{question}"
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_msg},
    ]
    async for chunk in chat_stream(messages, "platform"):
        yield chunk
