/*
  chatSlice.js
  ------------
  Redux slice for AI chat state.
  Manages the message history and loading indicator
  for the LangGraph-powered chat interface.

  Business logic (async thunks, reducers) will be added later.
*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  messages: [],
  loading: false,
  error: null,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {},
});

export default chatSlice.reducer;
