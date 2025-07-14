import {Button, Card, CardActions, CardContent, CardHeader, Typography} from "@mui/material";
import type {FC} from "react";
import {useTodos} from "../hooks/useTodos.tsx";
import type {TodoType} from "../providers/TodosProviders.tsx";

type Props = {
    todo: TodoType
}

const Todo: FC<Props> = ({todo}) => {
    const {deleteTodo} = useTodos()

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
                <Button onClick={onRemoveClicked}>
                    Remove
                </Button>
            </CardActions>
        </Card>
    )
}

export default Todo;
