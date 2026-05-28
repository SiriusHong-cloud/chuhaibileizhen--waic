"""
Mimo API Client for 出海避雷针
从环境变量 MIMO_API_KEY 读取 API Key
"""
import os
import httpx
from typing import List, Dict, AsyncGenerator

# API 配置
API_KEY = os.environ.get("MIMO_API_KEY", "tp-ck7e27f72ecbe3f5-0aae5c4c7c0s0sl6d")
BASE_URL = "https://token-plan-cn.xiaomimimo.com/v1"
MODEL = "mimo-v2.5-pro"


async def chat_stream(messages: List[Dict[str, str]]) -> AsyncGenerator[str, None]:
    """
    发送消息到 Mimo API 并返回流式响应
    解析 SSE 格式的流式响应
    """
    headers = {
        "Authorization": f"Bearer {API_KEY}",
        "Content-Type": "application/json",
    }
    
    payload = {
        "model": MODEL,
        "messages": messages,
        "stream": True,
    }
    
    async with httpx.AsyncClient(timeout=120.0) as client:
        async with client.stream("POST", f"{BASE_URL}/chat/completions", json=payload, headers=headers) as response:
            response.raise_for_status()
            async for line in response.aiter_lines():
                if line.startswith("data: "):
                    data = line[6:]  # 去掉 "data: " 前缀
                    if data == "[DONE]":
                        break
                    try:
                        import json
                        chunk = json.loads(data)
                        # 解析 SSE 格式
                        if "choices" in chunk and len(chunk["choices"]) > 0:
                            delta = chunk["choices"][0].get("delta", {})
                            content = delta.get("content", "")
                            if content:
                                yield content
                    except json.JSONDecodeError:
                        continue
