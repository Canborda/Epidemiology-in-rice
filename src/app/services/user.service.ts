import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';
import { AuthI, LoginI, SignupI } from '../models/user.model';
import { ApiUserSuccessI } from '../models/api.model';

@Injectable({ providedIn: 'root' })
export class UserService {
  private baseUrl: string = environment.API_URL;

  constructor(private http: HttpClient) {}

  login(data: LoginI): Observable<AuthI> {
    return this.http.post<AuthI>(this.baseUrl + ROUTES.users.login, data);
  }

  signup(data: SignupI): Observable<ApiUserSuccessI> {
    return this.http.post<ApiUserSuccessI>(
      this.baseUrl + ROUTES.users.signup,
      data
    );
  }

  getUser(): Observable<ApiUserSuccessI> {
    const access_token = localStorage.getItem('access_token');
    const headers = { Authorization: `Bearer ${access_token}` };
    return this.http.get<ApiUserSuccessI>(this.baseUrl + ROUTES.users.BASE, {
      headers,
    });
  }
}
