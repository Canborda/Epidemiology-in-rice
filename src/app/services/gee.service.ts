import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';
import { INDEXES } from 'src/utils/enums';

import { IApiSuccess } from '../models/api.model';
import { IGeeRequest, IGeeImage, IGeeValueByDate } from '../models/gee.model';

@Injectable({ providedIn: 'root' })
export class GeeService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	getIndexes(): Observable<IApiSuccess<INDEXES[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.get<IApiSuccess<INDEXES[]>>(
			this.baseUrl + ROUTES.gee.indexes,
			{ headers },
		);
	}

	getImage(data: IGeeRequest): Observable<IApiSuccess<IGeeImage>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		const params = data as {};
		return this.http.get<IApiSuccess<IGeeImage>>(
			this.baseUrl + ROUTES.gee.images,
			{ headers, params },
		);
	}

	getValuesByDate(data: IGeeRequest): Observable<IApiSuccess<IGeeValueByDate[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		const params = data as {};
		return this.http.get<IApiSuccess<IGeeValueByDate[]>>(
			this.baseUrl + ROUTES.gee.valuesByDate,
			{ headers, params },
		);
	}
}
