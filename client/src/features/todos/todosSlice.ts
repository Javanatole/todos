import type {TodoType} from "../../providers/TodosProviders.tsx";
import {createSlice, type PayloadAction} from "@reduxjs/toolkit";

export type TodoActionType = {
    title: string,
    content: string
}

export interface TodosState {
    todos: TodoType[]
}

const initialState: TodosState = {
    todos: []
}

export const todosSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo: (state: TodosState, action: PayloadAction<TodoActionType>) => {
            state.todos = [...state.todos, {
                title: action.payload.title,
                content: action.payload.content,
                id: state.todos.length
            }]
        },
        deleteTodo: (state: TodosState, action: PayloadAction<number>) => {
            state.todos = state.todos.filter(todo => todo.id !== action.payload)
        }
    }
})

export const {addTodo, deleteTodo} = todosSlice.actions
export default todosSlice.reducer
