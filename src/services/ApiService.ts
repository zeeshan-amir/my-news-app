import axios, {AxiosInstance, AxiosRequestConfig, AxiosResponse} from 'axios';
import { toast } from 'react-toastify';

type ResponseData<T> = Promise<T>;

class ApiService {
  private http: AxiosInstance;

  constructor(baseURL: string) {
    this.http = axios.create({
      baseURL,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.http.interceptors.request.use(
      config => {
        return config;
      },
      error => {
        return Promise.reject(error);
      }
    );

    this.http.interceptors.response.use(
      response => response,
      error => {
        if (error.response) {
          const status = error.response.status;
          const errorMessage = this.getErrorMessage(status);
          toast.error(errorMessage)
          console.error(`HTTP Error ${status}: ${errorMessage}`);
          return Promise.reject(new Error(errorMessage));
        } else if (error.request) {
          console.error('No response received:', error.request);
          return Promise.reject(new Error('No response received from server.'));
        } else {
          console.error('Error', error.message);
          return Promise.reject(
            new Error('An error occurred while setting up the request.')
          );
        }
      }
    );
  }

  private getErrorMessage(status: number): string {
    switch (status) {
      case 400:
        return 'Bad Request. Please check your input.';
      case 401:
        return 'Unauthorized. Please log in again.';
      case 403:
        return 'Forbidden. You do not have permission to access this resource.';
      case 404:
        return 'Not Found. The requested resource could not be found.';
      case 429:
        return 'Too many request.';
      case 500:
        return 'Internal Server Error. Please try again later.';
      case 502:
        return 'Bad Gateway. The server received an invalid response.';
      case 503:
        return 'Service Unavailable. The server is currently unable to handle the request.';
      default:
        return 'An error occurred. Please try again.';
    }
  }

  async request<T>(
    method: 'get' | 'post' | 'put' | 'patch' | 'delete',
    endpoint: string,
    data: any = null,
    config: AxiosRequestConfig = {}
  ): ResponseData<T> {
    try {
      const response: AxiosResponse<T> = await this.http.request({
        method,
        url: `${endpoint}`,
        data,
        ...config,
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  get<T>(endpoint: string, config: AxiosRequestConfig = {}): ResponseData<T> {
    return this.request<T>('get', endpoint, null, config);
  }

  post<T>(
    endpoint: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): ResponseData<T> {
    return this.request<T>('post', endpoint, data, config);
  }

  put<T>(
    endpoint: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): ResponseData<T> {
    return this.request<T>('put', endpoint, data, config);
  }

  patch<T>(
    endpoint: string,
    data: any,
    config: AxiosRequestConfig = {}
  ): ResponseData<T> {
    return this.request<T>('patch', endpoint, data, config);
  }

  delete<T>(
    endpoint: string,
    config: AxiosRequestConfig = {}
  ): ResponseData<T> {
    return this.request<T>('delete', endpoint, null, config);
  }
}

export default ApiService;
