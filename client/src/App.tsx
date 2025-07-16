import {Stack, Typography} from "@mui/material";
import AddingTodo from "./components/AddingTodo.tsx";
import {Todos} from "./components/Todos.tsx";
import {TodosProviders} from "./providers/TodosProviders.tsx";

function App() {
    return (
        <Stack paddingX={'20%'} direction={'column'} spacing={2}>
            <Typography textAlign={'center'} variant={'h1'}>TODOS</Typography>
            <TodosProviders>
                <AddingTodo/>
                <hr/>
                <Todos/>
            </TodosProviders>
        </Stack>
    )
}

export default App
