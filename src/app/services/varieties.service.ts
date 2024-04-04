import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { IApiSuccess } from '../models/api.model';
import { IVariety } from '../models/admin.models';

@Injectable({ providedIn: 'root' })
export class VarietiesService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	getAll(): Observable<IApiSuccess<IVariety[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.get<IApiSuccess<IVariety[]>>(
			this.baseUrl + ROUTES.varieties,
			{ headers },
		);
	}

	create(variety: IVariety): Observable<IApiSuccess<IVariety>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.post<IApiSuccess<IVariety>>(
			this.baseUrl + ROUTES.varieties,
			variety,
			{ headers },
		);
	}

	updateName(varietyId: string, name: string): Observable<IApiSuccess<IVariety>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.patch<IApiSuccess<IVariety>>(
			this.baseUrl + ROUTES.varieties + `/${varietyId}`,
			{ name },
			{ headers },
		);
	}

	delete(varietyId: string): Observable<IApiSuccess<void>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.delete<IApiSuccess<void>>(
			this.baseUrl + ROUTES.varieties + `/${varietyId}`,
			{ headers },
		);
	}

}
