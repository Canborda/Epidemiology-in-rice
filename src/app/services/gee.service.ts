import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { IApiSuccess } from '../models/api.model';
import {
  GeeRequestI,
  GeeImageResponseI,
  GeeDataResponseI,
} from '../models/gee.model';

@Injectable({ providedIn: 'root' })
export class GeeService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getIndexes(): Observable<IApiSuccess<string[]>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    return this.http.get<IApiSuccess<string[]>>(
      this.baseUrl + ROUTES.gee.indexes,
      {
        headers,
      }
    );
  }

  getImage(data: GeeRequestI): Observable<IApiSuccess<GeeImageResponseI>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    const params = data as {};
    return this.http.get<IApiSuccess<GeeImageResponseI>>(
      this.baseUrl + ROUTES.gee.images,
      { headers, params }
    );
  }

  getPhenology(data: GeeRequestI): Observable<IApiSuccess<GeeDataResponseI[]>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    const params = data as {};
    return this.http.get<IApiSuccess<GeeDataResponseI[]>>(
      this.baseUrl + ROUTES.gee.phenology,
      { headers, params }
    );
  }
}
