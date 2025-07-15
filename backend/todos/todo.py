from enum import Enum
from typing import List, TypedDict, Optional

from fastapi import FastAPI, HTTPException
from fastapi.params import Query
from pydantic import BaseModel

class Priority(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class Todo(BaseModel):
    id: int
    title: str
    content: str
    is_done: bool
    priority: Priority

todos_db: List[Todo] = [
    Todo(id=1, title="Todo 1", content="I'm Todo 1", is_done=False, priority=Priority.HIGH),
    Todo(id=2, title="Todo 2", content="I'm Todo 2", is_done=False, priority=Priority.LOW)
]

app = FastAPI()

class TodosType(BaseModel):
    todos: List[Todo]

@app.get("/todos", response_model=TodosType)
async def todos(priority: Optional[Priority] = Query(default=None, description="Field used for filtering the priority")):
    todos_result = todos_db
    if priority:
        todos_result = filter(lambda todo: todo.priority is priority, todos_db)
    return {'todos': todos_result}

@app.get("/todos/{todo_id}", response_model=Todo)
async def get_todo(todo_id: int):
    """
    Return one Todo that matches *todo_id*.
    Raises 404 if it doesn’t exist.
    """
    todo = next((t for t in todos_db if t.id == todo_id), None)
    if todo is None:
        raise HTTPException(status_code=404)
    return todo

