import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { IApiSuccess } from '../models/api.model';
import { ICluster } from '../models/admin.models';

@Injectable({ providedIn: 'root' })
export class ClustersService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	getAll(): Observable<IApiSuccess<ICluster[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.get<IApiSuccess<ICluster[]>>(
			this.baseUrl + ROUTES.clusters,
			{ headers },
		);
	}

	create(cluster: ICluster): Observable<IApiSuccess<ICluster>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.post<IApiSuccess<ICluster>>(
			this.baseUrl + ROUTES.clusters,
			cluster,
			{ headers },
		);
	}

	updateName(clusterId: string, name: string): Observable<IApiSuccess<ICluster>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.patch<IApiSuccess<ICluster>>(
			this.baseUrl + ROUTES.clusters + `/${clusterId}`,
			{ name },
			{ headers },
		);
	}

	delete(clusterId: string): Observable<IApiSuccess<void>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.delete<IApiSuccess<void>>(
			this.baseUrl + ROUTES.clusters + `/${clusterId}`,
			{ headers },
		);
	}

}
