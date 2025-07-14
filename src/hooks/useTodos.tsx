import {useContext} from "react";
import {TodosContext, type TodosContextType} from "../providers/TodosProviders.tsx";

export const useTodos = (): TodosContextType => {
    const {todos, addTodo, deleteTodo} = useContext(TodosContext)
    return {
        todos,
        addTodo,
        deleteTodo
    }
}
