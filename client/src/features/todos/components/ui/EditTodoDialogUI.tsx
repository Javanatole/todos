import type {FC} from "react";
import {Button, Dialog, DialogContent, DialogTitle} from "@mui/material";
import {TodoForm} from "./TodoForm.tsx";
import type {TodoPayload, TodoResult} from "../../types/todoResult.ts";
import {TODO_LABELS} from "../../constants";

interface EditTodoDialogUIProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (todo: TodoPayload) => void;
    isLoading: boolean;
    todo: TodoResult;
}

export const EditTodoDialogUI: FC<EditTodoDialogUIProps> = ({ open, onClose, onSubmit, isLoading, todo }) => (
    <Dialog open={open} fullWidth={true} onClose={onClose}>
        <DialogTitle>
            {TODO_LABELS.editTitle}
        </DialogTitle>
        <DialogContent dividers>
            <TodoForm
                titleAction={TODO_LABELS.update}
                onTodoAction={onSubmit}
                isLoading={isLoading}
                defaultTodo={todo}
            />
            <Button
                size={'large'}
                color={'warning'}
                variant={'contained'}
                fullWidth={true}
                sx={{ mt: 1 }}
                onClick={onClose}
            >
                {TODO_LABELS.cancel}
            </Button>
        </DialogContent>
    </Dialog>
);
