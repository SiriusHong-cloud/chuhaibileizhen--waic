"""
CRUD operations for 出海避雷针
"""
import aiosqlite
import os
from typing import List, Optional, Dict, Any

DATABASE_URL = os.environ.get("DATABASE_URL", "chuhai.db")
DB_PATH = DATABASE_URL if DATABASE_URL.startswith("/") else DATABASE_URL


async def save_history(module_type: str, market: str, product: str, input_data: str, output_text: str) -> int:
    """保存历史记录"""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            """
            INSERT INTO history (module_type, market, product, input_data, output_text)
            VALUES (?, ?, ?, ?, ?)
            """,
            (module_type, market, product, input_data, output_text)
        )
        await db.commit()
        return cursor.lastrowid


async def get_history_list(limit: int = 50, offset: int = 0) -> List[Dict[str, Any]]:
    """获取历史记录列表"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            """
            SELECT id, module_type, market, product, input_data, created_at
            FROM history
            ORDER BY created_at DESC
            LIMIT ? OFFSET ?
            """,
            (limit, offset)
        )
        rows = await cursor.fetchall()
        return [dict(row) for row in rows]


async def get_history_detail(record_id: int) -> Optional[Dict[str, Any]]:
    """获取历史记录详情"""
    async with aiosqlite.connect(DB_PATH) as db:
        db.row_factory = aiosqlite.Row
        cursor = await db.execute(
            """
            SELECT * FROM history WHERE id = ?
            """,
            (record_id,)
        )
        row = await cursor.fetchone()
        return dict(row) if row else None


async def delete_history(record_id: int) -> bool:
    """删除历史记录"""
    async with aiosqlite.connect(DB_PATH) as db:
        cursor = await db.execute(
            "DELETE FROM history WHERE id = ?",
            (record_id,)
        )
        await db.commit()
        return cursor.rowcount > 0
