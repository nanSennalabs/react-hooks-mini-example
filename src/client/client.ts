import axios, {
  AxiosInstance,
  AxiosRequestHeaders,
  InternalAxiosRequestConfig,
} from "axios";

export class Client {
  _client: AxiosInstance;

  constructor(private client: AxiosInstance) {
    this._client = this.client;
    this._client.interceptors.request.use(
      (config: InternalAxiosRequestConfig): InternalAxiosRequestConfig => {
        if (this.accessToken !== null) {
          return {
            ...config,
            headers: {
              ...config.headers,
              Authorization: `Bearer ${this.accessToken}`,
            } as AxiosRequestHeaders,
          };
        }
        return config;
      }
    );

    this._client.interceptors.response.use(
      (response) => {
        return response;
      },
      async (error) => {
        const request = error.config;
        // Handle token expiration and retry the request with a refreshed token
        if (
          error.response &&
          error.response.status === 401 &&
          !request._retry &&
          !!this.refreshToken
        ) {
          request._retry = true;
          const isRefreshSuccess = await this.refreshAccessToken();
          if (isRefreshSuccess) {
            return this._client(request);
          }
        }
        return Promise.reject(error);
      }
    );
  }

  async refreshAccessToken() {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_API_URL}auth/refresh`,
        {
          headers: {
            Authorization: `Bearer ${this.refreshToken}`,
          } as AxiosRequestHeaders,
        }
      );
      this.accessToken = response.data.accessToken;
      this.refreshToken = response.data.refreshToken;
      return !!this.accessToken;
    } catch (_) {
      return false;
    }
  }

  get accessToken() {
    return localStorage.getItem("act");
  }

  set accessToken(token) {
    if (typeof token === "undefined" || token === null) {
      localStorage.removeItem("act");
      return;
    }
    localStorage.setItem("act", token ?? "");
  }

  get refreshToken() {
    return localStorage.getItem("rft");
  }

  set refreshToken(token) {
    if (typeof token === "undefined" || token === null) {
      localStorage.removeItem("rft");
      return;
    }
    localStorage.setItem("rft", token);
  }
}
