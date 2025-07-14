import {Stack, Typography} from "@mui/material";
import AddingTodo from "./components/AddingTodo.tsx";
import {Todos} from "./components/Todos.tsx";

function App() {
    return (
        <Stack paddingX={50} direction={'column'} spacing={2}>
            <Typography textAlign={'center'} variant={'h1'}>TODOS</Typography>
            <AddingTodo/>
            <Todos todos={["todo 1", "todo 2", "todo 3"]}/>
        </Stack>
    )
}

export default App
