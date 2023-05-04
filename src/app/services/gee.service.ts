import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { ApiSuccessI } from '../models/api.model';
import { ImageRequestI, ImageResponseI } from '../models/gee.model';

@Injectable({ providedIn: 'root' })
export class GeeService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getIndexes(): Observable<ApiSuccessI<string[]>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    return this.http.get<ApiSuccessI<string[]>>(
      this.baseUrl + ROUTES.gee.indexes,
      {
        headers,
      }
    );
  }

  getImage(data: ImageRequestI): Observable<ApiSuccessI<ImageResponseI>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    const params = data as {};
    return this.http.get<ApiSuccessI<ImageResponseI>>(
      this.baseUrl + ROUTES.gee.images,
      {
        headers,
        params,
      }
    );
  }
}
