import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App";
import EmceePage from "./EmceePage";
import "./styles.css";

const rootElement = document.getElementById("root");

if (!rootElement) {
  throw new Error('Root element "#root" was not found.');
}

const isEmceePage = window.location.pathname.replace(/\/+$/, "") === "/emcee";
const Page = isEmceePage ? EmceePage : App;

createRoot(rootElement).render(
  <StrictMode>
    <Page />
  </StrictMode>,
);
