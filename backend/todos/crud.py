from sqlalchemy.future import select
from sqlalchemy.ext.asyncio import AsyncSession
from .models import Todo
from .schemas import TodoCreate, TodoUpdate
from typing import List, Optional
from fastapi import HTTPException

async def get_todos(db: AsyncSession, priority: Optional[str] = None) -> List[Todo]:
    query = select(Todo)
    if priority:
        query = query.where(Todo.priority == priority)
    result = await db.execute(query)
    return result.scalars().all()

async def get_todo(db: AsyncSession, todo_id: int) -> Todo:
    result = await db.execute(select(Todo).where(Todo.id == todo_id))
    todo = result.scalar_one_or_none()
    if not todo:
        raise HTTPException(status_code=404, detail="Todo not found")
    return todo

async def create_todo(db: AsyncSession, todo: TodoCreate) -> Todo:
    db_todo = Todo(
        title=todo.title,
        content=todo.content,
        priority=todo.priority,
        is_done=False
    )
    db.add(db_todo)
    await db.commit()
    await db.refresh(db_todo)
    return db_todo

async def delete_todo(db: AsyncSession, todo_id: int):
    todo = await get_todo(db, todo_id)
    await db.delete(todo)
    await db.commit()

async def update_todo(db: AsyncSession, todo_id: int, todo_update: TodoUpdate) -> Todo:
    todo = await get_todo(db, todo_id)
    todo.title = todo_update.title
    todo.content = todo_update.content
    todo.priority = todo_update.priority
    todo.is_done = todo_update.is_done
    await db.commit()
    await db.refresh(todo)
    return todo 