import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';
import { ApiGeeSuccessI } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class GeeService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getNdviImage(map_id: string): Observable<ApiGeeSuccessI> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    const params = { map_id };
    return this.http.get<ApiGeeSuccessI>(this.baseUrl + ROUTES.gee.ndvi, {
      headers,
      params,
    });
  }
}
