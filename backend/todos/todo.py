from typing import List, Optional

from fastapi import FastAPI
from fastapi.params import Query
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware

from todos.todos import Todo, Priority, TodosDB, TodoParams, TodoUpdateParams

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

class TodosType(BaseModel):
    todos: List[Todo]

todos_db = TodosDB()

@app.get("/todos", response_model=TodosType)
async def todos(priority: Optional[Priority] = Query(default=None, description="Field used for filtering the priority")):
    """
    Return filtered todos
    :param priority: filter with priority
    :return: list of todos
    """
    return {'todos': todos_db.get_todos(priority)}

@app.get("/todos/{todo_id}", response_model=Todo)
async def get_todo(todo_id: int):
    """
    Return one Todo that matches *todo_id*.
    Raises 404 if it doesn’t exist.
    """
    return todos_db.get_todo(todo_id)

@app.post("/todos", response_model=Todo)
async def create_todo(todo_params: TodoParams):
    return todos_db.add_todo(
        todo_params.title,
        todo_params.content,
        todo_params.priority
    )


@app.delete("/todos/{todo_id}")
async def delete_todo(todo_id: int):
    todos_db.delete_todo(todo_id)

@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, todo: TodoUpdateParams):
    todos_db.update_todo(todo_id, todo)