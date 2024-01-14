import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from 'axios';
import { showNotification } from './showNotification';
import { keycloak } from '../consts';

// const API_BASE_URL = import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:3000';
const SERVER_NOT_RESPONDING_MSG = 'The server took too long to respond.';
const TIMEOUT = 6000;
const EMAIL_TRIGGER_TIMEOUT = 20000;

const apiClient = axios.create();

apiClient.interceptors.response.use(
  (response) => {
    // Extract the tokens from the response headers
    const accessToken = response.headers['access-token'];
    const refreshToken = response.headers['refresh-token'];

    // If both tokens are present, update the Axios instance headers
    if (accessToken && refreshToken) {
      apiClient.defaults.headers.common['access-token'] = `Bearer ${accessToken}`;
      apiClient.defaults.headers.common['refresh-token'] = `Bearer ${refreshToken}`;
    }

    return response;
  },
  (error: AxiosError) => {
    showNotification(error.message, 'error');

    if (error.code === 'ERR_NETWORK') {
      return {
        data: { message: SERVER_NOT_RESPONDING_MSG },
        status: error.status,
      };
    }

    return {
      data: error.response?.data,
      status: error.status,
    };
  },
);

// email triggering requests take more time because of the template compilation
const apiRequest = async (
  url: string,
  requestInit?: AxiosRequestConfig,
  willTriggerEmail?: boolean,
): Promise<AxiosResponse> => {
  const { token, refreshToken } = keycloak;

  const _requestInit: AxiosRequestConfig = requestInit ?? {};
  const _headers = _requestInit.headers ?? {};
  const _method = _requestInit.method ?? 'GET';
  // const url = new URL(url, API_BASE_URL).toString();

  if (token && refreshToken) {
    _headers['access-token'] = `Bearer ${token}`;
    _headers['refresh-token'] = `Bearer ${refreshToken}`;
  }

  return await apiClient.request({
    ..._requestInit,
    method: _method,
    url,
    timeout: willTriggerEmail ? EMAIL_TRIGGER_TIMEOUT : TIMEOUT,
    timeoutErrorMessage: SERVER_NOT_RESPONDING_MSG,
    headers: {
      'Content-Type': 'application/json',
      ..._headers,
    },
    withCredentials: true,
  });
};

export { apiRequest };
