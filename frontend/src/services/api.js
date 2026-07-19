import axios from "axios";
import toast from "react-hot-toast";

const api = axios.create({
  baseURL: "http://localhost:5000/api",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

let hasShownNetworkError = false;

api.interceptors.response.use(
  (response) => {
    hasShownNetworkError = false;
    return response;
  },
  (error) => {
    if (!error.response) {
      if (!hasShownNetworkError) {
        toast.error("Can't reach the server. Please check your connection and try again.");
        hasShownNetworkError = true;
        setTimeout(() => { hasShownNetworkError = false; }, 5000);
      }
      return Promise.reject(error);
    }

    const isLoginRequest = error.config?.url?.includes("/auth/login");
    const isRegisterRequest = error.config?.url?.includes("/auth/register");

    if (error.response.status === 401 && !isLoginRequest && !isRegisterRequest) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      window.dispatchEvent(new Event("authChange"));
      toast.error("Your session has expired. Please log in again.");

      if (window.location.pathname !== "/login") {
        window.location.href = "/login";
      }
    }

    return Promise.reject(error);
  }
);

export default api;