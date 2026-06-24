from agent.mimo_client import chat_stream
from agent.prompts import TRADE_NEWS_PROMPT


async def trade_news(market: str, category: str = "", news_type: str = "all"):
    """外贸实时新闻：生成外贸新闻聚合与解读"""
    messages = [
        {"role": "system", "content": TRADE_NEWS_PROMPT},
        {"role": "user", "content": f"""
关注市场：{market}
关注品类：{category}
新闻类型：{news_type}

请生成最新的外贸新闻聚合与解读报告。
"""}
    ]
    async for chunk in chat_stream(messages, "trade-news"):
        yield chunk
