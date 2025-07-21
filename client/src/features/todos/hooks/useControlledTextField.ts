import {type ChangeEvent, useState} from "react";

type ControlledTextFieldType = [
    value: string,
    onChange: (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => void,
    onReset: () => void
]

export const useControlledTextField = (defaultValue: string = ''): ControlledTextFieldType => {
    const [value, setValue] = useState(defaultValue);

    const onChange = (event: ChangeEvent<HTMLInputElement & HTMLTextAreaElement>) => {
        setValue(event.target.value)
    }

    const onReset = () => {
        setValue(defaultValue)
    }

    return [value, onChange, onReset]
}
