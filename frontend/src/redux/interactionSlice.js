/*
  interactionSlice.js
  -------------------
  Redux slice for HCP interaction state.
  Manages the list of interactions, loading/error flags,
  and the currently-selected interaction for editing.

  Business logic (async thunks, reducers) will be added later.
*/

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  interactions: [],
  selectedInteraction: null,
  loading: false,
  error: null,
};

const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {},
});

export default interactionSlice.reducer;
