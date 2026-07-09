/*
  api.js
  ------
  Pre-configured Axios instance pointing to the FastAPI backend.
  All future service calls will import this instance
  so the base URL and headers are set in one place.
*/

import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
