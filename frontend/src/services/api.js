import axios from "axios";

const LOCAL_API = "http://localhost:5000/api";
const REMOTE_API = "https://e-comerse-ki0s.onrender.com/api";

// Dynamic baseURL using ternary operator
const api = axios.create({
  baseURL: window.location.hostname === "localhost" ? LOCAL_API : REMOTE_API,
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
