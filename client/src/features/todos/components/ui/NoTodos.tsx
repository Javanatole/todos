import {Stack, Typography} from "@mui/material";
import SearchOffIcon from '@mui/icons-material/SearchOff'

export const NoTodos = () => {
    return (
        <Stack
            direction={'column'}
            sx={{
                display: 'flex',
                alignItems: 'center',
            }}
        >
            <SearchOffIcon sx={{ fontSize: 80 }} />
            <Typography variant={'h4'}>
                No todos yet
            </Typography>
        </Stack>
    )
}
