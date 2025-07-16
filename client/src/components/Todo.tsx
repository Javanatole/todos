import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import type {FC} from "react";
import type {TodoType} from "../providers/TodosProviders.tsx";
import {useDeleteTodoMutation} from "../services/todos.ts";

type Props = {
    todo: TodoType
}

const Todo: FC<Props> = ({todo}) => {
    const [deleteTodo, {isLoading}] = useDeleteTodoMutation()

    const onRemoveClicked = () => {
        deleteTodo(todo.id)
    }

    return (
        <Card color={'primary'}>
            <CardHeader title={todo.title}/>
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

export default Todo;
