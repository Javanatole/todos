import {type FC} from "react";
import {useAddTodoMutation} from "../../services/todos.ts";
import {TodoForm} from "../ui/TodoForm.tsx";
import {TODO_LABELS} from "../../constants";

const AddTodoForm: FC = () => {
    const [addTodo, {isLoading}] = useAddTodoMutation();

    return (
        <TodoForm
            isLoading={isLoading}
            onTodoAction={addTodo}
            titleAction={TODO_LABELS.add}
        />
    )
}

export default AddTodoForm;
