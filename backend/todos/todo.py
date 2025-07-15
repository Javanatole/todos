from typing import List, Optional

from fastapi import FastAPI
from fastapi.params import Query
from pydantic import BaseModel

from todos.todos import Todo, Priority, TodosDB

app = FastAPI()

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

class TodoParams(BaseModel):
    title: str
    content: str
    priority: Priority

@app.post("/todos", response_model=Todo)
async def create_todo(todo_params: TodoParams):
    return todos_db.add_todo(
        todo_params.title,
        todo_params.content,
        todo_params.priority
    )


@app.delete("/todos")
async def delete_todo(id_to_delete: int):
    todos_db.delete_todo(id_to_delete)

@app.put("/todos/{todo_id}")
async def update_todo(todo_id: int, todo: TodoParams):
    todos_db.update_todo(todo_id, todo)