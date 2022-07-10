import {BASE_REST_URL} from "../constants";

export const defaultOptions: any = {
  baseURL: BASE_REST_URL,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  },
  responseType: 'json'
}

export const defaultOptionsWithAutorization = (token: string): any =>  {
  return {
    ...defaultOptions,
    headers: {
      ...defaultOptions.headers,
      'Authorization': `Bearer ${token}`
    }
  }
}
