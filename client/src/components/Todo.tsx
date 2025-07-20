import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import type {FC} from "react";
import {useDeleteTodoMutation, useUpdateTodoMutation} from "../services/todos.ts";
import {TodoTitleHeader} from "./TodoTitleHeader.tsx";
import type {TodoResult} from "../types/todoResult.ts";

type Props = {
    todo: TodoResult
}

export const Todo: FC<Props> = ({todo}) => {
    const [deleteTodo, {isLoading: isLoadingDelete}] = useDeleteTodoMutation()
    const [updateTodo, {isLoading: isLoadingUpdate}] = useUpdateTodoMutation()

    const onRemoveClicked = () => {
        deleteTodo(todo.id)
    }

    const onUpdateClicked = () => {
        updateTodo({
            id: todo.id,
            payload: {
                title: 'Test 222',
                content: todo.content,
                priority: todo.priority,
                isDone: false
            }
        })
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
                <Button onClick={onUpdateClicked} loading={isLoadingUpdate}>
                    {isLoadingUpdate ? 'is updating' : 'Update'}
                </Button>
                <Button onClick={onRemoveClicked} loading={isLoadingDelete}>
                    {isLoadingDelete ? 'is removing' : 'Remove'}
                </Button>
            </CardActions>
        </Card>
    )
}
