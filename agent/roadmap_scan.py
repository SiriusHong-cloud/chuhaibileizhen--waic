from typing import AsyncGenerator
from .mimo_client import chat_stream
from .roadmap import ROADMAP_PROMPT


async def roadmap_scan(step: str, market: str, category: str, question: str) -> AsyncGenerator[str, None]:
    """新手出海路线图"""
    system_prompt = ROADMAP_PROMPT
    user_msg = f"请提供出海路线图指导：\n\n当前阶段：{step}\n目标市场：{market}\n产品品类：{category}\n具体问题：{question}"
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_msg},
    ]
    async for chunk in chat_stream(messages):
        yield chunk
