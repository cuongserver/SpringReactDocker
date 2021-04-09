import axios, { AxiosError, AxiosRequestConfig } from "axios";
export class BaseApiHandler {
  readonly baseUrl = process.env.REACT_APP_API_URL;
  headers: { [key: string]: string } = {};
  retryIfFailed = 0;
  appendHeader(key: string, value: string) {
    this.headers[key] = value;
    return this;
  }
  setHeaders(headers: { [key: string]: string }) {
    this.headers = { ...headers };
    return this;
  }
  setRetry(attempts: number) {
    this.retryIfFailed = attempts;
    return this;
  }
  async send<T = any>(request: AxiosRequestConfig) {
    let retry = this.retryIfFailed;
    const unifiedRequest = {
      ...request,
      headers: { ...this.headers },
      baseURL: this.baseUrl,
    };

    if (retry <= 0) {
      try {
        return (await axios.request<T>(unifiedRequest)).data;
      } catch (e) {
        return { ...(e as AxiosError).response, hasError: true };
      }
    }
    let result;
    while (retry > 0) {
      try {
        result = (await axios.request<T>(unifiedRequest)).data;
        retry = 0;
      } catch (e) {
        result = { ...(e as AxiosError).response, hasError: true };
        if (retry > 0) {
          retry -= 1;
        }
      }
    }
    return result;
  }
}
