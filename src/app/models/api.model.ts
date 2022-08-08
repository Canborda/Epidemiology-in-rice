import { SignupI } from './user.model';
import { MapI } from './map.model';
import { NdviI } from './gee.model';

export interface ApiUserSuccessI {
  data: SignupI;
  message: string;
}

export interface ApiMapSuccessI {
  data: MapI[] | MapI;
  message: string;
}

export interface ApiGeeSuccessI {
  data: NdviI;
  message: string;
}

export interface ApiErrorI {
  error: string;
  message: string;
  details: string[];
}
