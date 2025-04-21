import axios from "axios";

const api = axios.create({
  baseURL: process.env.VITE_API_URL || 'http://localhost:8080'
});

// Attach JWT token to every request if it exists
api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('token');
  if (token) cfg.headers.Authorization = `Bearer ${token}`;
  return cfg;
});

export default api;