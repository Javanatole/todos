import {
    Chip,
    type ChipProps,
    Stack,
    Typography
} from "@mui/material";
import type {FC} from "react";
import {type Priority, PriorityEnum, type TodoResult} from "../../types/todoResult.ts";

type Props = {
    todo: TodoResult
}

export const TodoTitleHeader: FC<Props> = ({todo: {title, priority}}) => {
    const mapPriorityToColor: {[key in Priority]: ChipProps['color']} = {
        [PriorityEnum.LOW]: 'info',
        [PriorityEnum.MEDIUM]: 'warning',
        [PriorityEnum.HIGH]: 'error',
    }
    return (
        <Stack direction={'row'} alignItems={'center'} spacing={2}>
            <Typography>
                {title}
            </Typography>
            <Chip label={priority} variant="filled" color={mapPriorityToColor[priority]} />
        </Stack>
    )
}
