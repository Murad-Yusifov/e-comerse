import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use(
  (config) => {
    const auth = JSON.parse(localStorage.getItem("auth"));
    if (auth && auth.token) {
      if (new Date().getTime() <= auth.expiresAt) {
        config.headers.Authorization = `Bearer ${auth.token}`;
      } else {
        localStorage.removeItem("auth"); // token expired
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
