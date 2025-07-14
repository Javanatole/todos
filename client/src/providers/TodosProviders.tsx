import React, {type FC, type PropsWithChildren, useState} from "react";

export type TodoType = {
    id: number
    title: string
    content: string
}

export type TodosContextType = {
    todos: TodoType[],
    addTodo: (title: string, content: string) => void,
    deleteTodo: (index: number) => void
}

const defaultValue: TodosContextType = {
    todos: [],
    addTodo: (content: string) => {
        console.log('add todo ', content);
    },
    deleteTodo: (index: number) => {
        console.log('delete todo with index = ', index)
    }

}

const TodosContext = React.createContext(defaultValue)

const TodosProviders: FC<PropsWithChildren> = ({children}) => {
    const [todos, setTodos] = useState<TodoType[]>([])

    const addTodo = (title: string, content: string): void => {
        setTodos([...todos, {
            title: title,
            content: content,
            id: todos.length
        }])
    }

    const deleteTodo = (id: number): void => {
        setTodos(todos.filter(todo => todo.id !== id))
    }

    return (
        <TodosContext value={{todos, addTodo, deleteTodo}}>
            {children}
        </TodosContext>
    )
}

export {TodosContext, TodosProviders}
