from agent.mimo_client import chat_stream
from agent.prompts import TRADE_ACADEMY_PROMPT


async def trade_academy(topic: str, level: str = "beginner", question: str = ""):
    """外贸学院：提供学习内容和术语解释"""
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
