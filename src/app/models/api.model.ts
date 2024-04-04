export interface IApiSuccess<T> {
  count?: number;
  data: T;
}

export interface IApiError {
  error: string;
  message: string;
  details: string[];
}
