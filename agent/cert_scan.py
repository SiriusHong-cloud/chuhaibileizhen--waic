from typing import AsyncGenerator
from .mimo_client import chat_stream
from .cert import CERT_PROMPT


async def cert_scan(market: str, product: str, market2: str = "", category: str = "") -> AsyncGenerator[str, None]:
    """产品准入与认证"""
    system_prompt = CERT_PROMPT
    user_msg = f"请查询以下产品的准入认证要求：\n\n目标市场：{market}\n产品品类：{product}\n品类：{category}"
    if market2:
        user_msg += f"\n对比市场：{market2}"
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": user_msg},
    ]
    async for chunk in chat_stream(messages):
        yield chunk
