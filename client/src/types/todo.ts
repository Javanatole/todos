export type Priority = "HIGH" | "MEDIUM" | "LOW";

export type TodoPayload = {
    title: string,
    content: string,
    priority: Priority
}

export type Todo = TodoPayload & {
    id: number,
    isDone: boolean,
}

export type Todos = {
    todos: Todo[]
}
