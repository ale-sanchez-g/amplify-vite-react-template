import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
}

function TodoItem({ todo }: { todo: Schema["Todo"]["type"] }) {
    return (
        <div>
            <span>{todo.content}</span>
            <button onClick={() => deleteTodo(todo.id)}>Delete</button>
        </div>
    )
}

export default TodoItem;