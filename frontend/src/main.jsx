/*
  main.jsx
  --------
  Application entry point.
  Wraps the App in:
    - React.StrictMode   → catches potential problems during dev
    - Redux Provider     → makes the store available to all components
  Imports the global CSS (Tailwind + Inter font).
*/

import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider } from "react-redux";

import { store } from "./redux/store";
import App from "./App";
import "./index.css";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </StrictMode>
);
