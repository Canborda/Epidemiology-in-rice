import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { ApiSuccessI } from '../models/api.model';
import { IVariety } from '../models/admin.models';

@Injectable({ providedIn: 'root' })
export class VarietiesService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	getAll(): Observable<ApiSuccessI<IVariety[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.get<ApiSuccessI<IVariety[]>>(
			this.baseUrl + ROUTES.varieties,
			{ headers },
		);
	}

	create(variety: IVariety): Observable<ApiSuccessI<IVariety>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.post<ApiSuccessI<IVariety>>(
			this.baseUrl + ROUTES.varieties,
			variety,
			{ headers },
		);
	}

	updateName(varietyId: string, name: string): Observable<ApiSuccessI<IVariety>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.patch<ApiSuccessI<IVariety>>(
			this.baseUrl + ROUTES.varieties + `/${varietyId}`,
			{ name },
			{ headers },
		);
	}

	delete(varietyId: string): Observable<ApiSuccessI<void>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.delete<ApiSuccessI<void>>(
			this.baseUrl + ROUTES.varieties + `/${varietyId}`,
			{ headers },
		);
	}

}
