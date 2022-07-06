import axios, { AxiosInstance, AxiosRequestConfig } from "axios";

export interface AxiosResponse<T = never> {
  data: T;
  status: number;
  statusText: string;
  headers: Record<string, string>;
  config: AxiosRequestConfig<T>;
  request?: any;
}

class API {
  constructor(private axios: AxiosInstance) {}

  get<T = never>(url: string, config: AxiosRequestConfig = {}) {
    return this.axios.get<T>(url, config);
  }
  delete<T>(url: string, config: AxiosRequestConfig = {}) {
    return this.axios.delete<T>(url, config);
  }
  post<T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
    return this.axios.post<T>(url, body, config);
  }
  patch<T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
    return this.axios.patch<T>(url, body, config);
  }
  put<T>(url: string, body: unknown, config: AxiosRequestConfig = {}) {
    return this.axios.put<T>(url, body, config);
  }
}

const axiosInstance = axios.create({
  baseURL: "/",
});

export default new API(axiosInstance);
