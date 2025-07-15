import {configureStore} from '@reduxjs/toolkit'
import todoReducer from './features/todos/todosSlice.ts'
import {todosApi} from "./services/todos.ts";

export const store = configureStore({
    reducer: {
        todos: todoReducer,
        [todosApi.reducerPath]: todosApi.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(todosApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
