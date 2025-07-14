import {type TodosContextType} from "../providers/TodosProviders.tsx";
import {useDispatch} from "react-redux";
import {addTodo, deleteTodo} from "../features/todos/todosSlice.ts";
import {useAppSelector} from "./hooks.ts";

export const useTodos = (): TodosContextType => {
    const todos = useAppSelector(state => state.todos.todos)
    const dispatch = useDispatch();

    const dispatchAddTodo = (title: string, content: string) => {
        dispatch(addTodo({
            title: title,
            content: content,
        }))
    }

    const dispatchDeleteTodo = (index: number) => {
        dispatch(deleteTodo(index))
    }

    return {
        todos,
        addTodo: dispatchAddTodo,
        deleteTodo: dispatchDeleteTodo
    }
}
