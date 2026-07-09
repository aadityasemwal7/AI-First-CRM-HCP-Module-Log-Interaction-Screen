/*
  interactionSlice.js
  -------------------
  Redux slice for HCP interaction state.
  Connects to FastAPI backend via Axios.
  Supports fetching, logging, updating, and optimistic deleting.
*/

import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { interactionService } from "../services/api";

// Async Thunks
export const fetchInteractions = createAsyncThunk(
  "interaction/fetchInteractions",
  async () => {
    const data = await interactionService.getAll();
    return data;
  }
);

export const logInteraction = createAsyncThunk(
  "interaction/logInteraction",
  async (interactionData) => {
    const data = await interactionService.create(interactionData);
    return data;
  }
);

export const updateInteraction = createAsyncThunk(
  "interaction/updateInteraction",
  async ({ id, updateData }) => {
    const data = await interactionService.update(id, updateData);
    return data;
  }
);

export const deleteInteraction = createAsyncThunk(
  "interaction/deleteInteraction",
  async (id, { rejectWithValue }) => {
    try {
      await interactionService.delete(id);
      return id;
    } catch (err) {
      return rejectWithValue(err.message || "Failed to delete");
    }
  }
);

// Initial State
const initialState = {
  interactions: [],
  selectedInteraction: null,
  loading: false,
  error: null,
};

// Slice
const interactionSlice = createSlice({
  name: "interaction",
  initialState,
  reducers: {
    setSelectedInteraction: (state, action) => {
      state.selectedInteraction = action.payload;
    },
    clearSelectedInteraction: (state) => {
      state.selectedInteraction = null;
    },
  },
  extraReducers: (builder) => {
    // Fetch
    builder.addCase(fetchInteractions.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(fetchInteractions.fulfilled, (state, action) => {
      state.loading = false;
      state.interactions = action.payload;
    });
    builder.addCase(fetchInteractions.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Log (Create)
    builder.addCase(logInteraction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(logInteraction.fulfilled, (state, action) => {
      state.loading = false;
      state.interactions.unshift(action.payload); // Add to beginning
    });
    builder.addCase(logInteraction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Update
    builder.addCase(updateInteraction.pending, (state) => {
      state.loading = true;
      state.error = null;
    });
    builder.addCase(updateInteraction.fulfilled, (state, action) => {
      state.loading = false;
      const index = state.interactions.findIndex((i) => i.id === action.payload.id);
      if (index !== -1) {
        state.interactions[index] = action.payload;
      }
    });
    builder.addCase(updateInteraction.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message;
    });

    // Delete (Optimistic UI)
    builder.addCase(deleteInteraction.pending, (state, action) => {
      // Optimistically remove from UI
      state.interactions = state.interactions.filter(
        (interaction) => interaction.id !== action.meta.arg
      );
      state.error = null;
    });
    builder.addCase(deleteInteraction.rejected, (state, action) => {
      // On failure, set error (could also re-fetch here if needed)
      state.error = action.payload || action.error.message;
    });
  },
});

export const { setSelectedInteraction, clearSelectedInteraction } = interactionSlice.actions;
export default interactionSlice.reducer;
