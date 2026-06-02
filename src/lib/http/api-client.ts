import axios from 'axios';
import { setupCache } from 'axios-cache-interceptor';

const apiClient = setupCache(axios.create({
  baseURL: '/api',
  withCredentials: true,
}), {
  ttl: 1000 * 60,
  location: 'client',
  cachePredicate: {
    statusCheck: (status) => (status >= 200 && status < 300) || status === 404,
    responseMatch: ({ config }) => {
      const url = config.url ?? "";
      const authRoutes = ["/auth/login", "/auth/refresh", "/auth/logout"];
      return !authRoutes.some(route => url.includes(route));
    },
  },
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
        await apiClient.post("/auth/refresh", {}, { cache: false });

        if (originalRequest.id) {
          await apiClient.storage.remove(originalRequest.id);
        }

        return apiClient({
          ...originalRequest,
          cache: false,
        });
      } catch {
        localStorage.removeItem("user");
        const publicRoutes = ["/login", "/register", "/", "/landing"];
        if (typeof window !== "undefined" && !publicRoutes.includes(window.location.pathname)) {
          window.location.href = "/login";
        }
      }
    }
    return Promise.reject(error);
  }
);

export default apiClient;