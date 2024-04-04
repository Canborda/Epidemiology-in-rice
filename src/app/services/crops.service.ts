import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { IApiSuccess } from '../models/api.model';
import { CropI } from '../models/crop.model';
import { IGeeValueByDate, IGeeRequest } from '../models/gee.model';

@Injectable({ providedIn: 'root' })
export class CropsService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  getCrops(): Observable<IApiSuccess<CropI[]>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    return this.http.get<IApiSuccess<CropI[]>>(
      this.baseUrl + ROUTES.crops.BASE,
      { headers }
    );
  }

  getPhenology(data: IGeeRequest): Observable<IApiSuccess<IGeeValueByDate[]>> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    const params = { map_id: data.mapId, index: data.index };
    return this.http.get<IApiSuccess<IGeeValueByDate[]>>(
      this.baseUrl + ROUTES.crops.phenology,
      { headers, params }
    );
  }

  updateAllCrops(cropList: CropI[]) {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    const body = { cropList };
    return this.http.put(this.baseUrl + ROUTES.crops.BASE, body, { headers });
  }
}
