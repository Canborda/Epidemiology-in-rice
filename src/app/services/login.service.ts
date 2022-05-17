import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

import { environment } from 'src/environments/environment';
import { ROUTES } from 'src/utils/constants';

@Injectable({
  providedIn: 'root',
})
export class LoginService {
  private API_URL = environment.API_URL;

  constructor(private _http: HttpClient, private _router: Router) {}

  login(credentials: any) {
    return this._http.post<any>(this.API_URL + ROUTES.user.login, credentials);
  }
}
