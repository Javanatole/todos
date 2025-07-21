import type {FC} from "react";
import {Button} from "@mui/material";
import {useUpdateTodoMutation} from "../../services/todos.ts";
import type {TodoPayload, TodoResult} from "../../types/todoResult.ts";
import {useToggle} from "usehooks-ts";
import {EditTodoDialogUI} from "../ui/EditTodoDialogUI.tsx";

interface Props {
    todo: TodoResult;
}

export const EditTodoDialog: FC<Props> = ({ todo }) => {
    const [open, toggle] = useToggle();
    const [updateTodo, { isLoading: isLoadingUpdate }] = useUpdateTodoMutation();

    const onUpdateClicked = (newTodo: TodoPayload) => {
        updateTodo({
            id: todo.id,
            payload: {
                ...newTodo,
                isDone: todo.isDone
            }
        });
        toggle();
    };

    return (
        <>
            <Button onClick={toggle}>
                Update
            </Button>
            <EditTodoDialogUI
                open={open}
                onClose={toggle}
                onSubmit={onUpdateClicked}
                isLoading={isLoadingUpdate}
                todo={todo}
            />
        </>
    );
};
