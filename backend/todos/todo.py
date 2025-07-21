from fastapi import FastAPI, Depends, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from sqlalchemy.ext.asyncio import AsyncSession
from typing import List, Optional
from contextlib import asynccontextmanager

from .database import AsyncSessionLocal, engine
from . import models, schemas, crud

app = FastAPI()

origins = [
    "http://127.0.0.1:5173",
    "http://localhost:5173",
    "http://localhost",
    "http://127.0.0.1",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()

@app.on_event("startup")
async def startup():
    async with engine.begin() as conn:
        await conn.run_sync(models.Base.metadata.create_all)

@app.get("/todos", response_model=List[schemas.TodoOut])
async def read_todos(priority: Optional[str] = None, db: AsyncSession = Depends(get_db)):
    return await crud.get_todos(db, priority)

@app.get("/todos/{todo_id}", response_model=schemas.TodoOut)
async def read_todo(todo_id: int, db: AsyncSession = Depends(get_db)):
    return await crud.get_todo(db, todo_id)

@app.post("/todos", response_model=schemas.TodoOut)
async def create_todo(todo: schemas.TodoCreate, db: AsyncSession = Depends(get_db)):
    return await crud.create_todo(db, todo)

@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int, db: AsyncSession = Depends(get_db)):
    await crud.delete_todo(db, todo_id)
    return {"ok": True}

@app.put("/todos/{todo_id}", response_model=schemas.TodoOut)
async def update_todo(todo_id: int, todo: schemas.TodoUpdate, db: AsyncSession = Depends(get_db)):
    return await crud.update_todo(db, todo_id, todo)