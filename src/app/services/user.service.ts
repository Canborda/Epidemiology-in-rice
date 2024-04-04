import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

import { IApiSuccess } from '../models/api.model';
import { IAuth, ILogin, IUser } from '../models/user.model';

@Injectable({ providedIn: 'root' })
export class UserService {
	private baseUrl: string = environment.API_URL;

	constructor(private http: HttpClient) { }

	login(data: ILogin): Observable<IAuth> {
		return this.http.post<IAuth>(this.baseUrl + ROUTES.users.login, data);
	}

	signup(data: IUser): Observable<IApiSuccess<IUser>> {
		return this.http.post<IApiSuccess<IUser>>(
			this.baseUrl + ROUTES.users.signup,
			data
		);
	}

	getUser(): Observable<IApiSuccess<IUser>> {
		const access_token = localStorage.getItem('access_token');
		const headers = { Authorization: `Bearer ${access_token}` };
		return this.http.get<IApiSuccess<IUser>>(
			this.baseUrl + ROUTES.users.BASE,
			{ headers },
		);
	}
}
