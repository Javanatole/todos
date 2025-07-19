import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import type {FC} from "react";
import {useDeleteTodoMutation} from "../services/todos.ts";
import {TodoTitleHeader} from "./TodoTitleHeader.tsx";
import type {TodoResult} from "../types/todoResult.ts";

type Props = {
    todo: TodoResult
}

export const Todo: FC<Props> = ({todo}) => {
    const [deleteTodo, {isLoading}] = useDeleteTodoMutation()

    const onRemoveClicked = () => {
        deleteTodo(todo.id)
    }

    return (
        <Card color={'primary'}>
            <CardHeader title={<TodoTitleHeader todo={todo} />} />
            <CardContent>
                <Typography variant={'subtitle1'}>
                    {todo.content}
                </Typography>
            </CardContent>
            <CardActions style={{justifySelf: 'end'}}>
                <Button onClick={onRemoveClicked} loading={isLoading}>
                    {isLoading ? 'is removing' : 'Remove'}
                </Button>
            </CardActions>
        </Card>
    )
}
