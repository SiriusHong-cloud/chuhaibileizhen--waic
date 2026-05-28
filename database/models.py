"""
Database models for 出海避雷针
使用 aiosqlite 异步 SQLite
"""
import aiosqlite
import os

DATABASE_URL = os.environ.get("DATABASE_URL", "chuhai.db")
DB_PATH = DATABASE_URL if DATABASE_URL.startswith("/") else DATABASE_URL


async def init_db():
    """初始化数据库，创建表"""
    async with aiosqlite.connect(DB_PATH) as db:
        await db.execute("""
            CREATE TABLE IF NOT EXISTS history (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                module_type TEXT NOT NULL,
                market TEXT,
                product TEXT,
                input_data TEXT,
                output_text TEXT,
                created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
            )
        """)
        await db.execute("""
            CREATE INDEX IF NOT EXISTS idx_history_module ON history(module_type)
        """)
        await db.execute("""
            CREATE INDEX IF NOT EXISTS idx_history_created ON history(created_at DESC)
        """)
        await db.commit()
