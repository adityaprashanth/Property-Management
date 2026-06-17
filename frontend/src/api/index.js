import axios from "axios";

const api = axios.create({ baseURL: "http://localhost:8080/api" });

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) config.headers.Authorization = `Bearer ${token}`;
  return config;
});

export const signup = (data) => api.post("/auth/signup", data);
export const login  = (data) => api.post("/auth/login",  data);

export const getCustomer    = (id)       => api.get(`/customers/${id}`);
export const updateCustomer = (id, data) => api.put(`/customers/${id}`, data);