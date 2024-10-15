import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import "./index.css";

const Root = document.getElementById("root");
if (!Root) throw new Error("Missing #root element");
createRoot(Root).render(
  <StrictMode>
    <App />
  </StrictMode>
);
