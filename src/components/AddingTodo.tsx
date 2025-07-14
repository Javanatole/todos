import {Button, Stack, TextField} from "@mui/material";

export const AddingTodo = () => {
    return (
        <Stack
            direction={'row'}
            sx={{alignItems: 'center', display: 'flex'}}
            spacing={2}
        >
            <TextField label="New task" variant="outlined" fullWidth={true}/>
            <Button size={'large'} variant={'contained'}>
                Add
            </Button>
        </Stack>
    )
}

export default AddingTodo;
