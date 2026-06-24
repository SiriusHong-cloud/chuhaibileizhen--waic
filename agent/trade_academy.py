from agent.mimo_client import chat_stream, DEMO_MODE, generate_trade_academy_demo
from agent.prompts import TRADE_ACADEMY_PROMPT
import asyncio


async def trade_academy(topic: str, level: str = "beginner", question: str = ""):
    """外贸学院：提供学习内容和术语解释"""
    
    if DEMO_MODE == "true" or DEMO_MODE == "1":
        print("[DEMO MODE] Using trade academy demo response")
        info = {
            "topic": topic,
            "level": level,
            "question": question
        }
        demo_text = generate_trade_academy_demo(info)
        chunk_size = 3
        for i in range(0, len(demo_text), chunk_size):
            chunk = demo_text[i:i + chunk_size]
            yield chunk
            await asyncio.sleep(0.01)
        return
    
    messages = [
        {"role": "system", "content": TRADE_ACADEMY_PROMPT},
        {"role": "user", "content": f"""
学习主题：{topic}
学习级别：{level}
具体问题：{question}

请生成对应的学习内容。
"""}
    ]
    async for chunk in chat_stream(messages):
        yield chunk
