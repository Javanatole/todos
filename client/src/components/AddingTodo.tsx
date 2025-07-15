import {Button, Stack, TextField} from "@mui/material";
import {type FC, type FormEvent, useState} from "react";
import {useControlledTextField} from "../hooks/useControlledTextField.ts";
import {useAddTodoMutation} from "../services/todos.ts";

export const AddingTodo: FC = () => {
    const [title, onChangeTitle, onResetTitle] = useControlledTextField()
    const [content, onChangeContent, onResetContent] = useControlledTextField()

    const [addTodo, {isLoading}] = useAddTodoMutation()

    const [showErrors, setShowErrors] = useState(false)
    const isValid = title.trim() !== '' && content.trim() !== ''

    const onAddClick = (event: FormEvent<HTMLFormElement>) => {
        event.stopPropagation()
        event.preventDefault()

        if (!isValid) {
            setShowErrors(true)
            return
        }
        addTodo({
            title: title.trim(),
            content: content.trim(),
            priority: 'HIGH'
        })
        onResetTitle()
        onResetContent()
        setShowErrors(false)
    }

    return (
        <Stack
            direction={'column'}
            sx={{alignItems: 'center', display: 'flex'}}
            spacing={2}
            component={"form"}
            onSubmit={onAddClick}
        >
            <TextField
                label="Title"
                value={title}
                variant="outlined"
                fullWidth={true}
                onChange={onChangeTitle}
                error={showErrors && title.trim() === ''}
                helperText={showErrors && title.trim() === '' ? 'Title is needed' : ''}
            />
            <TextField
                label="Content"
                value={content}
                variant="outlined"
                fullWidth={true}
                onChange={onChangeContent}
                error={showErrors && content.trim() === ''}
                helperText={showErrors && content.trim() === '' ? 'Content is needed' : ''}
            />
            <Button
                size={'large'}
                variant={'contained'}
                fullWidth={true}
                loading={isLoading}
                type={'submit'}
            >
                Add
            </Button>
        </Stack>
    )
}

export default AddingTodo;
