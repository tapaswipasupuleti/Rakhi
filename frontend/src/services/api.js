import axios from "axios";

// Change this IP if your laptop's IP changes
const BASE_URL = "http://192.168.10.42:8000";

const api = axios.create({
  baseURL: `${BASE_URL}/api/`,
});

api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("access");

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  },
  (error) => Promise.reject(error)
);

api.interceptors.response.use(
  (response) => response,

  async (error) => {
    const originalRequest = error.config;

    if (
      error.response &&
      error.response.status === 401 &&
      !originalRequest._retry
    ) {
      originalRequest._retry = true;

      try {
        const refresh = localStorage.getItem("refresh");

        const response = await axios.post(
          `${BASE_URL}/api/token/refresh/`,
          {
            refresh,
          }
        );

        localStorage.setItem("access", response.data.access);

        originalRequest.headers.Authorization = `Bearer ${response.data.access}`;

        return api(originalRequest);

      } catch (err) {
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;