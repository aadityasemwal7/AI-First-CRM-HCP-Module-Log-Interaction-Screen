/*
  store.js
  --------
  Configures the Redux Toolkit store.
  All feature slices are registered here as reducers.
*/

import { configureStore } from "@reduxjs/toolkit";
import interactionReducer from "./interactionSlice";
import chatReducer from "./chatSlice";

export const store = configureStore({
  reducer: {
    interaction: interactionReducer,
    chat: chatReducer,
  },
});
