/* eslint-disable no-undef */
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";

import "./global.css";
import App from "./App";
import { initGSAPConfig } from "./utils/gsapConfig";

// Initialize GSAP configuration for optimal performance
initGSAPConfig();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <App />
  </StrictMode>
);
