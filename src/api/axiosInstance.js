import axios from "axios";

const DB_URL = import.meta.env.VITE_API_BASE_URL;

const api = axios.create({
  baseURL: DB_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
