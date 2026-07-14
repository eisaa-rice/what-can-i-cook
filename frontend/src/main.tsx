import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import Header from "./components/layout/header.tsx";
import App from "./App.tsx";

import "./index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Header />

    <App />
  </StrictMode>,
);
