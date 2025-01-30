import axios from "axios";

const token = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

token.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default token;
