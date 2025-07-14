import type {FC} from "react";
import {Stack} from "@mui/material";
import {useTodos} from "../hooks/useTodos.tsx";
import Todo from "./Todo.tsx";

export const Todos: FC = () => {
    const {todos} = useTodos()
    return (
        <Stack direction={'column'} spacing={2}>
            {todos.map(todo => <Todo key={todo.id} todo={todo}/>)}
        </Stack>
    )
}
