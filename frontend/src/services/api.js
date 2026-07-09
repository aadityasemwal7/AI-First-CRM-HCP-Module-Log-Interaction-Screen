/*
  api.js
  ------
  Axios API layer.
  Configures the base Axios instance and exports reusable 
  service functions for interactions and chat.
*/

import axios from "axios";

// 1. Configure base instance
const api = axios.create({
  baseURL: "http://127.0.0.1:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

// 2. Interaction Service API Calls
export const interactionService = {
  // GET /interactions/
  getAll: async () => {
    const response = await api.get("/interactions/");
    return response.data;
  },

  // POST /interactions/
  create: async (interactionData) => {
    const response = await api.post("/interactions/", interactionData);
    return response.data;
  },

  // PUT /interactions/{id}
  update: async (id, updateData) => {
    const response = await api.put(`/interactions/${id}`, updateData);
    return response.data;
  },

  // DELETE /interactions/{id}
  delete: async (id) => {
    const response = await api.delete(`/interactions/${id}`);
    return response.data;
  },
};

// 3. Chat Service API Calls
export const chatService = {
  // POST /chat/
  sendMessage: async (data, config = {}) => {
    const response = await api.post("/chat/", data, config);
    return response.data;
  },
};

export default api;
