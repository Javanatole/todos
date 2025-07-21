import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import type {FC} from "react";
import {useDeleteTodoMutation} from "../../services/todos.ts";
import {TodoTitleHeader} from "./TodoTitleHeader.tsx";
import type {TodoResult} from "../../types/todoResult.ts";
import {EditTodoDialog} from "../containers/EditTodoDialog.tsx";

type Props = {
    todo: TodoResult
}

export const TodoItem: FC<Props> = ({todo}) => {
    const [deleteTodo, {isLoading: isLoadingDelete}] = useDeleteTodoMutation()

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
                <EditTodoDialog todo={todo} />
                <Button onClick={onRemoveClicked} loading={isLoadingDelete}>
                    {isLoadingDelete ? 'is removing' : 'Remove'}
                </Button>
            </CardActions>
        </Card>
    )
}
