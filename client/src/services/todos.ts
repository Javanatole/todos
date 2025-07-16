import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {PriorityEnum, Todo, TodoPayload, Todos} from "../types/todo.ts";

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1/api'}),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query<Todos,  PriorityEnum | undefined>({
            query: (priority) => {
                const queryString = priority ? `?priority=${priority}` : '';
                return `todos${queryString}`;
            },
            providesTags: ['Todo'],
        }),
        deleteTodo: builder.mutation<void, number>({
            query: (id) => ({
                url: `todos/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Todo']
        }),
        addTodo: builder.mutation<Todo, TodoPayload>({
            query: (payload) => ({
                url: `todos`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Todo']
        })
    })
})

export const { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation } = todosApi;
