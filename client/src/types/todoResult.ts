export const PriorityEnum = {
    HIGH: "HIGH",
    MEDIUM: "MEDIUM",
    LOW: "LOW",
} as const

export type Priority = typeof PriorityEnum[keyof typeof PriorityEnum]

export type TodoPayload = {
    title: string,
    content: string,
    priority: Priority
}

export type TodoResult = TodoPayload & {
    id: number,
    isDone: boolean,
}

export type Todos = {
    todos: TodoResult[]
}
