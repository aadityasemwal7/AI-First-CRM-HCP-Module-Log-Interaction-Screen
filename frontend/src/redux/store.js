/*
  store.js
  --------
  Configures the Redux Toolkit store.
  Registers the interaction and chat feature slices.
*/

import { configureStore } from "@reduxjs/toolkit";
import interactionReducer from "./interactionSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    interaction: interactionReducer,
    chat: chatReducer,
  },
  // Redux Toolkit automatically adds thunk middleware
});
