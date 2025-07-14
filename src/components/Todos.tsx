import type {FC} from "react";
import {Stack} from "@mui/material";
import Todo from "./Todo.tsx";

type Props = {
    todos: string[]
}

export const Todos: FC<Props> = ({todos}: Props) => {
    return (
        <Stack direction={'column'} spacing={2}>
            {todos.map(todo => <Todo title={todo}/>)}
        </Stack>
    )
}
