import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useFlags } from "launchdarkly-react-client-sdk";
import TodoItem from "./atomic/delete";

const client = generateClient<Schema>();

function App() {
  const { reactExample, domInteraction } = useFlags();
  const [todos, setTodos] = useState<Array<Schema["Todo"]["type"]>>([]);
  

  useEffect(() => {
    client.models.Todo.observeQuery().subscribe({
      next: (data) => setTodos([...data.items]),
    });
  }, []);

  function createTodo() {
    client.models.Todo.create({ content: window.prompt("Todo content") });
  }

  return (
    <main>
      <h1>My todos</h1>
      <p>LaunchDarkly flag: {reactExample ? "enabled" : "disabled"}</p>
      <button onClick={createTodo}>+ new</button>
      <ul>
        {todos.map((todo) => (
          <>
            <li key={todo.id}>{todo.content}</li>
            <div>{domInteraction ? <TodoItem todo={todo} /> : null}</div>
          </>
        ))}
      </ul>
      <div>
        🥳 App successfully hosted. Try creating a new todo.
        <br />
        <a href="https://docs.amplify.aws/react/start/quickstart/#make-frontend-updates">
          Review next step of this tutorial.
        </a>
      </div>
    </main>
  );
}

export default App;
