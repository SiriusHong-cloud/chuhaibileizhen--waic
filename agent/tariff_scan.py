from typing import AsyncGenerator
from .mimo_client import chat_stream
from .tariff import TARIFF_PROMPT


async def tariff_scan(market: str, hscode: str, origin: str = "中国", declared_value: str = "0", incoterm: str = "FOB", category: str = "") -> AsyncGenerator[str, None]:
    """关税与税务估算"""
    system_prompt = TARIFF_PROMPT
    messages = [
        {"role": "system", "content": system_prompt},
        {"role": "user", "content": f"请估算以下产品的关税与税务：\n\n目标市场：{market}\nHS编码：{hscode}\n出口国：{origin}\n申报价值：{declared_value} USD\n贸易方式：{incoterm}\n品类：{category}"},
    ]
    async for chunk in chat_stream(messages):
        yield chunk
