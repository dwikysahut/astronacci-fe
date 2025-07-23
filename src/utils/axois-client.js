import axios from "axios";

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://api.example.com",
  timeout: 5000, // 5 seconds timeout
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptors if needed
axiosInstance.interceptors.request.use(
  (config) => {
    // Add Authorization header if token exists
    if (config.url.includes("/auth/login") || config.url.includes("/auth/register")) {
      return config; // Skip adding Authorization header for login
    }

    const token = localStorage.getItem("token") || "";
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    console.log("error", error);
    Promise.reject(error);
  }
);
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const originalRequest = error.config;
    const isLoginRoute = originalRequest?.url?.includes("/auth");

    if (error.response?.status === 401 && !isLoginRoute) {
      const errorName = error.response?.data?.name;

      if (errorName === "TokenExpiredError" || errorName === "JsonWebTokenError") {
        console.error("Session expired. Logging out...");
        localStorage.removeItem("token");
        // window.location.href = "/auth/login";
      }

      window.location.href = "/auth";
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
