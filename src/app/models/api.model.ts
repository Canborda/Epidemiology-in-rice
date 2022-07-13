export interface ApiSuccessI {
  data: object;
  message: string;
}

export interface ApiErrorI {
  error: string;
  message: string;
  details: string[];
}
