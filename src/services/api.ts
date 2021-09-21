import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios";
import { setCookie, parseCookies } from "nookies";

import * as auth from "./auth";

interface IQueue {
  onSuccess: (token: string) => void;
  onFailure: (error: AxiosError) => void;
}

let isRefreshing = false;
let failedRequestQueue: IQueue[] = [];

export const api = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL,
  withCredentials: true,
});

api.interceptors.request.use(
  (
    config: AxiosRequestConfig
  ): AxiosRequestConfig | Promise<AxiosRequestConfig> => {
    const { "appfin.token": token } = parseCookies();
    config.headers.Authorization = token ? `Bearer ${token}` : "";
    return config;
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);

api.interceptors.response.use(
  (response) => response,
  (error: AxiosError): Promise<AxiosResponse> | void => {
    if (error.response?.status === 401) {
      if (error.response.data.message === "Token inválido!") {
        const originalConfig = error.config;

        if (!isRefreshing) {
          isRefreshing = true;

          auth
            .refreshToken()
            .then(({ token, refreshToken }) => {
              setCookie(null, "appfin.token", token, {
                path: "/",
                secure: true,
                sameSite: "none",
              });
              setCookie(null, "appfin.refreshToken", refreshToken, {
                path: "/",
                secure: true,
                sameSite: "none",
              });
              failedRequestQueue.forEach((request) => request.onSuccess(token));
              failedRequestQueue = [];
            })
            .catch((error) => {
              failedRequestQueue.forEach((request) => request.onFailure(error));
              failedRequestQueue = [];
            })
            .finally(() => {
              isRefreshing = false;
            });
        }

        return new Promise((resolve, reject) => {
          failedRequestQueue.push({
            onSuccess: (token: string) => {
              originalConfig.headers.Authorization = `Bearer ${token}`;
              resolve(api(originalConfig));
            },
            onFailure: (error: AxiosError) => {
              reject(error);
            },
          });
        });
      }
      auth.signOut();
    }

    return Promise.reject(error);
  }
);
