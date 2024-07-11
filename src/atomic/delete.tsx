import type { Schema } from "../../amplify/data/resource";
import { generateClient } from "aws-amplify/data";

const client = generateClient<Schema>();


function deleteTodo(id: string) {
    client.models.Todo.delete({ id })
}

function TodoItem({ todo }: { todo: Schema["Todo"]["type"] }) {
    return (
        <span className="small-text" onClick={() => deleteTodo(todo.id)}> -remove-</span>
    )
}

export default TodoItem;