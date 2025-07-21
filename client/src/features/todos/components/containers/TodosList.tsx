import type {FC} from "react";
import {CircularProgress, Stack} from "@mui/material";
import {useGetTodosQuery} from "../../services/todos.ts";
import {TodoItem} from "../ui/TodoItem.tsx";

export const TodosList: FC = () => {
    const {data, isLoading} = useGetTodosQuery(undefined)

    if (isLoading) {
        return (
            <CircularProgress />
        )
    }

    return (
        <Stack direction={'column'} spacing={2}>
            {data?.todos?.map(todo => <TodoItem key={todo.id} todo={todo}/>)}
        </Stack>
    )
}
