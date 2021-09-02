import axios, { AxiosRequestConfig } from "axios";

export const api = axios.create({
  baseURL: "http://localhost:3333/",
});

api.interceptors.request.use(
  (
    config: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    const { origin } = new URL(config.baseURL as string);
    const allowedOrigins = config.baseURL as string;
    const token = localStorage.getItem("@appfin:token");
    const headerCopy = config;

    if (allowedOrigins.includes(origin)) {
      headerCopy.headers.authorization = `Bearer ${token}`;
    }

    return headerCopy;
  },
  (error) => {
    return Promise.reject(error);
  }
);
