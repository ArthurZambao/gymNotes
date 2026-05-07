import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const apiClient = setupCache(axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
  withCredentials: true,
}), {
  ttl: 1000 * 60,
  location: 'client',
  cachePredicate: {
    statusCheck: (status) => status >= 200 && status < 300 || status === 404,
  }
});

apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;

    if (
      (error.response?.status === 401 || error.response?.status === 403) &&
      !originalRequest._retry &&
      originalRequest.url !== "/auth/refresh" &&
      originalRequest.url !== "/auth/login"
    ) {
      originalRequest._retry = true;

      try {
        await apiClient.post("/auth/refresh");

        return apiClient({
          ...originalRequest,
          cache: false,
        });
      } catch {
        localStorage.removeItem("user");
        window.location.href = "/login";
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;