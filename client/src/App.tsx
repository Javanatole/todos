import {Stack, Typography} from "@mui/material";
import AddTodoForm from "./features/todos/components/AddTodoForm.tsx";
import {Todos} from "./features/todos/components/Todos.tsx";

function App() {
    return (
        <Stack paddingX={'20%'} direction={'column'} spacing={2}>
            <Typography textAlign={'center'} variant={'h1'}>TODOS</Typography>
            <AddTodoForm/>
            <hr/>
            <Todos/>
        </Stack>
    )
}

export default App
