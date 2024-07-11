import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { Amplify } from "aws-amplify";
import outputs from "../path/to/amplify_outputs.json";
import { asyncWithLDProvider } from 'launchdarkly-react-client-sdk';


Amplify.configure(outputs);

(async () => {
  const LDProvider = await asyncWithLDProvider({
    clientSideID: process.env.REACT_APP_LD_CLIENT_ID ?? '',
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