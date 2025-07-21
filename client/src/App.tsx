import {Stack, Typography} from "@mui/material";
import AddTodoForm from "./features/todos/components/containers/AddTodoForm.tsx";
import {TodosList} from "./features/todos/components/containers/TodosList.tsx";

function App() {
    return (
        <Stack paddingX={'20%'} direction={'column'} spacing={2}>
            <Typography textAlign={'center'} variant={'h1'}>TODOS</Typography>
            <AddTodoForm/>
            <hr/>
            <TodosList/>
        </Stack>
    )
}

export default App
