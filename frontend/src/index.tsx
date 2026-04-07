import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import "./App.css";
import "./App-light.css";
import "../src/pages/admin/Admin.css";
import "../src/Responsive.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";

const root = ReactDOM.createRoot(document.getElementById("root") as HTMLElement);
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

reportWebVitals();
