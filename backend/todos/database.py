from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession
from sqlalchemy.orm import sessionmaker
from contextlib import asynccontextmanager

DATABASE_URL = "postgresql+asyncpg://postgres:monmotdepasse@db:5432/todosdb"

engine = create_async_engine(DATABASE_URL, echo=True)
AsyncSessionLocal = sessionmaker(
    bind=engine, class_=AsyncSession, expire_on_commit=False
)

@asynccontextmanager
async def get_db():
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close() 