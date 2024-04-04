import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { IApiSuccess } from '../models/api.model';
import { IMap } from '../models/map.model';

@Injectable({ providedIn: 'root' })
export class MapsService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	getAll(): Observable<IApiSuccess<IMap[]>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.get<IApiSuccess<IMap[]>>(
			this.baseUrl + ROUTES.maps.BASE,
			{ headers },
		);
	}

	create(map: IMap): Observable<IApiSuccess<IMap>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.post<IApiSuccess<IMap>>(
			this.baseUrl + ROUTES.maps.BASE,
			map,
			{ headers }
		);
	}

	update(map: IMap): Observable<IApiSuccess<IMap>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		const mapId = map._id;
		delete map._id;
		return this.http.patch<IApiSuccess<IMap>>(
			this.baseUrl + ROUTES.maps.BASE + `/${mapId}`,
			map,
			{ headers }
		);
	}

	delete(mapId: string): Observable<IApiSuccess<void>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.delete<IApiSuccess<void>>(
			this.baseUrl + ROUTES.maps.BASE + `/${mapId}`,
			{ headers },
		);
	}
}
