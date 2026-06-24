from typing import AsyncGenerator
from .mimo_client import chat_stream
from .crisis import CRISIS_PROMPT


async def crisis_scan(crisis_type: str, market: str, description: str, category: str = "") -> AsyncGenerator[str, None]:
    """危机处置与应急"""
    system_prompt = CRISIS_PROMPT
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"紧急！请提供危机处置方案：\n\n危机类型：{crisis_type}\n相关市场：{market}\n当前状况：{description}\n品类：{category}"},
    ]
    async for chunk in chat_stream(messages, "crisis"):
        yield chunk
