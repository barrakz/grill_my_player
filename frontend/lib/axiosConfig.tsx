import {AxiosRequestConfig} from "axios";
import {BASE_REST_URL} from "../constants";

export const token = '6f8ac33db25eeeed598019c6ce24b0a60c3e1710'

export const defaultOptions: AxiosRequestConfig<any> = {
  baseURL: BASE_REST_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json'
}

export const defaultOptionsWithAutorization: AxiosRequestConfig<any> = {
  ...defaultOptions,
  headers: {
    ...defaultOptions.headers,
    'Authorization': `Bearer ${token}`
  }
}
