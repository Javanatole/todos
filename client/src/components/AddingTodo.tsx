import {type FC} from "react";
import {useAddTodoMutation} from "../services/todos.ts";
import {TodoForm} from "./TodoForm.tsx";

export const AddingTodo: FC = () => {
    const [addTodo, {isLoading}] = useAddTodoMutation()

    return (
        <TodoForm
            isLoading={isLoading}
            onTodoAction={addTodo}
            titleAction={'Add todo'}
        />
    )
}

export default AddingTodo;
