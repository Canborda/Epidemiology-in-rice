export interface ApiSuccessI<T> {
  count?: number;
  data: T;
}

export interface ApiErrorI {
  error: string;
  message: string;
  details: string[];
}
