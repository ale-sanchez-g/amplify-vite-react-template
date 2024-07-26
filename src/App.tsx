import { useEffect, useState } from "react";
import type { Schema } from "../amplify/data/resource";
import { generateClient } from "aws-amplify/data";
import { useFlags } from "launchdarkly-react-client-sdk";
import DeleteItem from "./atomic/delete";
import { Authenticator } from '@aws-amplify/ui-react'
import '@aws-amplify/ui-react/styles.css'

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
    // client.models.Todo.create({ content: window.prompt("Todo content") });
    // replace old window.prompt with input value
    const input = document.getElementById("todoInput") as HTMLInputElement;
    client.models.Todo.create({ content: input.value });
  }

  return (
    <Authenticator>
      {({ signOut }) => (
        <main>
          <h1>My todos</h1>
          <p>LaunchDarkly flag: {reactExample ? "enabled" : "disabled"}</p>
          <label className="todolbl" htmlFor="todoInput" title="Todo Input">
        Add item
      </label>
      <div className="tododiv">      
          <input
          type="text"
          id="todoInput"
          className="todo-input"
          placeholder="Enter todo item"
        />
      </div>
      <br />
      <button onClick={createTodo}>+ new</button>
          <ul>
            {todos.map((todo) => (
              <>
                <li key={todo.id}>
              {todo.content}
              {domInteraction ? <DeleteItem todo={todo} /> : null}
                </li>
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
          <button onClick={signOut}>Sign out</button>
        </main>
      )}
      </Authenticator>
  );
}

export default App;
