import {type FC, type FormEvent, useState} from "react";
import {Button, FormControl, InputLabel, MenuItem, Select, Stack, TextField} from "@mui/material";
import {PriorityEnum, type TodoPayload} from "../../types/todoResult.ts";
import {useControlledTextField} from "../../hooks/useControlledTextField.ts";
import {useControlledSelectField} from "../../hooks/useControlledSelectField.ts";
import {TODO_LABELS} from "../../constants";

type Props = {
    titleAction: string
    onTodoAction: (todo: TodoPayload) => void
    isLoading: boolean
    defaultTodo?: TodoPayload
}

export const TodoForm: FC<Props> = ({titleAction, onTodoAction, isLoading, defaultTodo}) => {
    const [title, onChangeTitle, onResetTitle] = useControlledTextField(defaultTodo?.title)
    const [content, onChangeContent, onResetContent] = useControlledTextField(defaultTodo?.content)
    const [priority, onChangePriority, onResetPriority] = useControlledSelectField(defaultTodo?.priority ?? PriorityEnum.HIGH)

    const isValid = title.trim() !== '' && content.trim() !== ''
    const [showErrors, setShowErrors] = useState(false)

    const onSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.stopPropagation()
        event.preventDefault()

        if (!isValid) {
            setShowErrors(true)
            return
        }
        onTodoAction({
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
            onSubmit={onSubmit}
        >
            <TextField
                label={TODO_LABELS.title}
                value={title}
                variant="outlined"
                fullWidth={true}
                onChange={onChangeTitle}
                error={showErrors && title.trim() === ''}
                helperText={showErrors && title.trim() === '' ? TODO_LABELS.titleNeeded : ''}
            />
            <TextField
                label={TODO_LABELS.content}
                value={content}
                variant="outlined"
                fullWidth={true}
                onChange={onChangeContent}
                error={showErrors && content.trim() === ''}
                helperText={showErrors && content.trim() === '' ? TODO_LABELS.contentNeeded : ''}
            />
            <FormControl fullWidth={true}>
                <InputLabel id={'priority'}>{TODO_LABELS.priority}</InputLabel>
                <Select
                    id={'priority'}
                    label={TODO_LABELS.priority}
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
                {titleAction}
            </Button>
        </Stack>
    )
}
