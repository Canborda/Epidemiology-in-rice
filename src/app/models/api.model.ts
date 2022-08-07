import { SignupI } from './user.model';
import { MapI } from './map.model';

export interface ApiUserSuccessI {
  data: SignupI;
  message: string;
}

export interface ApiMapSuccessI {
  data: MapI[] | MapI;
  message: string;
}

export interface ApiErrorI {
  error: string;
  message: string;
  details: string[];
}
