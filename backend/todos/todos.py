from enum import Enum
from typing import List

from fastapi import HTTPException
from pydantic import BaseModel

class Priority(str, Enum):
    HIGH = "HIGH"
    MEDIUM = "MEDIUM"
    LOW = "LOW"

class TodoParams(BaseModel):
    title: str
    content: str
    priority: Priority

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
        if len(self._todos_db) == 0:
            return 0
        # return 0 if no todos are in the list
        # otherwise the maximum of id
        return max(self._todos_db, key=lambda todo: todo.id).id + 1

    def get_todos(self, priority: Priority | None = None) -> List[Todo]:
        """
        get list of todos
        :param priority: filter todos by priority
        :return: list od filtered priority
        """
        if priority is None:
            return self._todos_db
        return list(filter(lambda todo: todo.priority is priority, self._todos_db))

    def get_todo(self, id_to_search: int):
        """
        get todo
        :param id_to_search:
        :return:
        """
        todo = next((t for t in self._todos_db if t.id == id_to_search), None)
        if todo is None:
            raise HTTPException(status_code=404)
        return todo


    def add_todo(self, title: str, content: str, priority: Priority) -> Todo:
        """
        Add Todo
        :param title: title of the todo
        :param content: content of the todo
        :param priority: priority of the todo
        :return: the new todo created by python
        """
        new_todo = Todo(
            id=self._get_new_id(),
            title=title,
            content=content,
            is_done=False,
            priority=priority
        )
        self._todos_db.append(new_todo)
        return new_todo

    def delete_todo(self, id_to_delete: int):
        """
        Delete specific todo
        :param id_to_delete:
        :return:
        """
        index_to_delete = self._todos_db.index(self.get_todo(id_to_delete))
        del self._todos_db[index_to_delete]

    def update_todo(self, id_to_update, todo: TodoParams):
        """
        Update todo
        :param id_to_update: id of todo to replace
        :param todo: component of new todo
        :return:
        """
        index_to_update = self._todos_db.index(self.get_todo(id_to_update))
        todo_replacement = Todo(
            id=self._todos_db[index_to_update].id,
            title=todo.title,
            content=todo.content,
            priority=todo.priority,
        )
        self._todos_db[index_to_update] = todo_replacement
        return todo_replacement