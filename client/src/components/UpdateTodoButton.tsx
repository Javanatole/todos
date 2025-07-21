import type {FC} from "react";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {useUpdateTodoMutation} from "../services/todos.ts";
import type {TodoPayload, TodoResult} from "../types/todoResult.ts";
import {TodoForm} from "./TodoForm.tsx";
import {useToggle} from "usehooks-ts";

type Props = {
    todo: TodoResult
}

export const UpdateTodoButton: FC<Props> = ({todo}) => {
    const [open, toggle] = useToggle()
    const [updateTodo, {isLoading: isLoadingUpdate}] = useUpdateTodoMutation()

    const onUpdateClicked = (newTodo: TodoPayload) => {
        updateTodo({
            id: todo.id,
            payload: {
                ...newTodo,
                isDone: todo.isDone
            }
        })
        toggle()
    }

    return (
        <>
            <Button onClick={toggle}>
                Update
            </Button>
            <Dialog open={open} fullWidth={true} onClose={toggle}>
                <DialogTitle>
                    Edit your todo
                </DialogTitle>
                <DialogContent dividers>
                    <TodoForm
                        titleAction={'Update'}
                        onTodoAction={onUpdateClicked}
                        isLoading={isLoadingUpdate}
                        defaultTodo={todo}
                    />
                    <Button
                        size={'large'}
                        color={'warning'}
                        variant={'contained'}
                        fullWidth={true}
                        sx={{ mt: 1 }}
                        onClick={toggle}
                    >
                        {'Cancel'}
                    </Button>
                </DialogContent>
            </Dialog>
        </>
    )
}
