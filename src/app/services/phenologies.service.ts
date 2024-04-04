import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { IApiSuccess } from '../models/api.model';
import { IPhenology } from '../models/admin.models';

@Injectable({ providedIn: 'root' })
export class PhenologiesService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	getAll(): Observable<IApiSuccess<IPhenology[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.get<IApiSuccess<IPhenology[]>>(
			this.baseUrl + ROUTES.phenologies,
			{ headers },
		);
	}

	updateDays(phenologyId: string, days: number): Observable<IApiSuccess<IPhenology>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.patch<IApiSuccess<IPhenology>>(
			this.baseUrl + ROUTES.phenologies + `/${phenologyId}`,
			{ days },
			{ headers },
		);
	}

}
