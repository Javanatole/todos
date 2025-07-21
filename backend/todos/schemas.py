from pydantic import BaseModel, ConfigDict
from pydantic.alias_generators import to_camel


class TodoBase(BaseModel):
    title: str
    content: str
    priority: str

    model_config = ConfigDict(
        alias_generator=to_camel,
        populate_by_name=True,
    )

class TodoCreate(TodoBase):
    pass

class TodoUpdate(TodoBase):
    is_done: bool

class TodoOut(TodoBase):
    id: int
    is_done: bool

    model_config = {"from_attributes": True} 