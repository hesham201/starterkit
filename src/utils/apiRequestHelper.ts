import axios, {
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from "axios";

// Create instance
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || "https://api.example.com",
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
apiClient.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers = config.headers || {}; // Ensure headers is not undefined
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

// Response interceptor
apiClient.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error: AxiosError) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/login";
    }
    return Promise.reject(error);
  }
);
// Utility function to make GET requests
const get = (url: string, params = {}) => {
  return apiClient.get(url, { params });
};

// Utility function to make POST requests
const post = (url: string, data = {}, isMultipart = false) => {
  console.log(url);
  const headers = isMultipart ? { "Content-Type": "multipart/form-data" } : {};
  return apiClient.post(url, data, { headers });
};

// Utility function to make PUT requests
const put = (url: string, data = {}, isMultipart = false) => {
  const headers = isMultipart ? { "Content-Type": "multipart/form-data" } : {};
  return apiClient.put(url, data, { headers });
};

// Utility function to make DELETE requests
const del = (url: string) => {
  return apiClient.delete(url);
};
export default {
  get,
  post,
  put,
  del,
};
