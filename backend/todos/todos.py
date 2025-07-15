from enum import Enum
from typing import List

from fastapi import HTTPException
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

class TodosDB:
    def __init__(self):
        self._todos_db: List[Todo] = [
            Todo(id=1, title="Todo 1", content="I'm Todo 1", is_done=False, priority=Priority.HIGH),
            Todo(id=2, title="Todo 2", content="I'm Todo 2", is_done=False, priority=Priority.LOW)
        ]

    def __init_todos(self) -> None:
        self.add_todo("Todo 1", "I'm Todo 1", Priority.HIGH)
        self.add_todo("Todo 2", "I'm Todo 2", Priority.LOW)

    def _get_new_id(self) -> int:
        """
        compute new id
        :return: new id available
        """
        return max(self._todos_db, key=lambda todo: todo.id).id + 1

    def get_todos(self, priority: Priority | None = None) -> List[Todo]:
        if priority is None:
            return self._todos_db
        return list(filter(lambda todo: todo.priority is priority, self._todos_db))

    def get_todo(self, id_to_search: int):
        todo = next((t for t in self._todos_db if t.id == id_to_search), None)
        if todo is None:
            raise HTTPException(status_code=404)
        return todo


    def add_todo(self, title: str, content: str, priority: Priority) -> Todo:
        new_todo = Todo(
            id=self._get_new_id(),
            title=title,
            content=content,
            is_done=False,
            priority=priority
        )
        self._todos_db.append(new_todo)
        return new_todo
