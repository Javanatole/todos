import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {type FC, type FormEvent, useState} from "react";
import {useControlledTextField} from "../hooks/useControlledTextField.ts";
import {useAddTodoMutation} from "../services/todos.ts";
import {PriorityEnum} from "../types/todoResult.ts";
import {useControlledSelectField} from "../hooks/useControlledSelectField.ts";

export const AddingTodo: FC = () => {
    const [title, onChangeTitle, onResetTitle] = useControlledTextField()
    const [content, onChangeContent, onResetContent] = useControlledTextField()
    const [priority, onChangePriority, onResetPriority] = useControlledSelectField(PriorityEnum.HIGH)

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
            priority: priority
        })
        onResetTitle()
        onResetContent()
        onResetPriority()
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
            <FormControl fullWidth={true}>
                <InputLabel id={'priority'}>Priority</InputLabel>
                <Select
                    id={'priority'}
                    label="Priority"
                    variant="outlined"
                    fullWidth={true}
                    onChange={onChangePriority}
                    value={priority}
                >
                    {
                        Object.entries(PriorityEnum).map(entry => (
                            <MenuItem value={entry[0]}>{entry[1]}</MenuItem>
                        ))
                    }
                </Select>
            </FormControl>
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
