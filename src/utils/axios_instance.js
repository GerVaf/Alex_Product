// src/app/utils/axios_instance.js

import axios from "axios";
import useUserStore from "../store/userStore";

const axiosInstance = axios.create({
  baseURL:
    import.meta.env.VITE_PUBLIC_API_URL || "http://localhost:8989/api/v1",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add a request interceptor to include the auth-token from Zustand state
axiosInstance.interceptors.request.use(
  (config) => {
    const { userToken } = useUserStore.getState();

    if (userToken) {
      config.headers["Authorization"] = `Bearer ${userToken}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
