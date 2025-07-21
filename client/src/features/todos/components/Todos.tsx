import type {FC} from "react";
import {CircularProgress, Stack} from "@mui/material";
import {useGetTodosQuery} from "../services/todos.ts";
import {Todo} from "./Todo.tsx";

export const Todos: FC = () => {
    const {data, isLoading} = useGetTodosQuery(undefined)

    if (isLoading) {
        return (
            <CircularProgress />
        )
    }

    return (
        <Stack direction={'column'} spacing={2}>
            {data?.todos?.map(todo => <Todo key={todo.id} todo={todo}/>)}
        </Stack>
    )
}
