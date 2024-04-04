import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';
import { INDEXES } from 'src/utils/enums';

import { IApiSuccess } from '../models/api.model';
import { IStandarizedValue } from '../models/values.model';

@Injectable({ providedIn: 'root' })
export class ValuesService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	getStandarized(mapId: string, index: INDEXES): Observable<IApiSuccess<IStandarizedValue[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		const params = { mapId, index };
		return this.http.get<IApiSuccess<IStandarizedValue[]>>(
			this.baseUrl + ROUTES.values.standarized,
			{ headers, params },
		);
	}

}
