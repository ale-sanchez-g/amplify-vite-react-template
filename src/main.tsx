import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../amplify_outputs.json";
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';

Amplify.configure(outputs);

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: '667bb77aadc1dc1125e749b0',
    context: {
      kind: 'user',
      key: 'example-user-key',
      name: 'Alejandro',
    },
  });

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <LDProvider>
      <App />
    </LDProvider>
  </React.StrictMode>
);

})();