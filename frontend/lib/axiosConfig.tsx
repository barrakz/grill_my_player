import {AxiosRequestConfig} from "axios";
import {BASE_REST_URL} from "../constants";

export const defaultOptions: AxiosRequestConfig<any> = {
  baseURL: BASE_REST_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json'
}

export const defaultOptionsWithAutorization = (token: string): AxiosRequestConfig<any> =>  {
  return {
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      'Authorization': `Bearer ${token}`
    }
  }
}
