import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';
import { ApiCropSuccessI } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class CropsService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getCrops(): Observable<ApiCropSuccessI> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    return this.http.get<ApiCropSuccessI>(this.baseUrl + ROUTES.crops.BASE, {
      headers,
    });
  }
}
