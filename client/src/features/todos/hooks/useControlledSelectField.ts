import {useState} from "react";
import type {SelectChangeEvent} from "@mui/material";

type ControlledSelectFieldType<T> = [
    value: T,
    onChange: (event: SelectChangeEvent<T>) => void,
    onReset: () => void
]

export const useControlledSelectField = <T>(defaultValue: T): ControlledSelectFieldType<T> => {
    const [value, setValue] = useState<T>(defaultValue);

    const onChange = (event: SelectChangeEvent<T>) => {
        setValue(event.target.value as unknown as T)
    }

    const onReset = () => {
        setValue(defaultValue)
    }

    return [value, onChange, onReset]
}
