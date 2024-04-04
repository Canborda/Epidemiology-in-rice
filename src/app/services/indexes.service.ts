import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { IApiSuccess } from '../models/api.model';
import { IIndex } from '../models/admin.models';

@Injectable({ providedIn: 'root' })
export class IndexesService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	getAll(): Observable<IApiSuccess<IIndex[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.get<IApiSuccess<IIndex[]>>(
			this.baseUrl + ROUTES.indexes,
			{ headers },
		);
	}

	create(index: IIndex): Observable<IApiSuccess<IIndex>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.post<IApiSuccess<IIndex>>(
			this.baseUrl + ROUTES.indexes,
			index,
			{ headers },
		);
	}

	updateValue(indexId: string, value: number, field: 'min' | 'mean' | 'max'): Observable<IApiSuccess<IIndex>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.patch<IApiSuccess<IIndex>>(
			this.baseUrl + ROUTES.indexes + `/${indexId}`,
			{ [field]: value },
			{ headers },
		);
	}

}
