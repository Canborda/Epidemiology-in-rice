import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AppComponent } from 'src/app/app.component';
import { LoginService } from 'src/app/services/login.service';
import { ROUTES } from 'src/utils/constants';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  public loginForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required),
  });

  constructor(
    private _loginService: LoginService,
    private _router: Router,
    private _appComponent: AppComponent
  ) {}

  ngOnInit(): void {}

  login() {
    if (!this.loginForm.value.email || !this.loginForm.value.password) {
      alert('Datos incompletos');
    } else {
      this._loginService.login(this.loginForm.value).subscribe({
        next: (res) => {
          localStorage.setItem('access_token', res.access_token);
          alert('Autenticación exitosa. Bienvenido!');
          this._router.navigate(['/dashboard']);
        },
        error: (err) => {
          alert('Error en autenticación');
          this._router.navigate(['/dashboard']); //FIXME remove redirection on error
        },
      });
    }
  }
}
