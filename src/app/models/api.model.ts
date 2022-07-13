import { SignupI } from './user.model';

export interface ApiUserSuccessI {
  data: SignupI;
  message: string;
}

export interface ApiErrorI {
  error: string;
  message: string;
  details: string[];
}
