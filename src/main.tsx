import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";

// Debug: Check if CSS is being loaded
console.log("Main.tsx loaded - CSS should be imported");
console.log("Environment:", import.meta.env.MODE);
console.log("Base URL:", import.meta.env.BASE_URL);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
