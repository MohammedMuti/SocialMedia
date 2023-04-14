import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import ContextReducer from "./Context/Reducer";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <ContextReducer>
      <App />
    </ContextReducer>
  </React.StrictMode>
);
