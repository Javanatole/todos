import {createApi, fetchBaseQuery} from "@reduxjs/toolkit/query/react";
import type {Priority, TodoResult, TodoPayload, TodoUpdatePayload} from "../types/todoResult.ts";

export const todosApi = createApi({
    reducerPath: 'todosApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://127.0.0.1/api'}),
    tagTypes: ['Todo'],
    endpoints: (builder) => ({
        getTodos: builder.query<TodoResult[],  Priority | undefined>({
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
        addTodo: builder.mutation<TodoResult, TodoPayload>({
            query: (payload) => ({
                url: `todos`,
                method: 'POST',
                body: payload
            }),
            invalidatesTags: ['Todo']
        }),
        updateTodo: builder.mutation<void, {id: number, payload: TodoUpdatePayload}>({
            query: ({id, payload}) => ({
                url: `todos/${id}`,
                method: 'PUT',
                body: payload
            }),
            invalidatesTags: ['Todo']
        })
    })
})

export const { useGetTodosQuery, useDeleteTodoMutation, useAddTodoMutation, useUpdateTodoMutation } = todosApi;
