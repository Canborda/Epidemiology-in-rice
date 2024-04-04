import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';

import { IAuth, ILogin } from 'src/app/models/user.model';
import { IApiError } from 'src/app/models/api.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  hide = true;
  // Form variables
  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  password = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {}

  // #region BUTTON ACTIONS

  onSubmit(): void {
    if (!this.getEmailErrorMessage() && !this.getPasswordErrorMessage()) {
      const data: ILogin = {
        email: this.email.value,
        password: this.password.value,
      };
      this.userService.login(data).subscribe({
        next: (v: IAuth) => {
          this.toastr.success('Bienvenido(a)', 'SUCCESS');
          localStorage.setItem('access_token', v.access_token);
          this.router.navigate(['dashboard']);
        },
        error: (e: HttpErrorResponse) => {
          const error: IApiError = e.error;
          this.toastr.error(error.message, 'ERROR');
        },
      });
    }
  }

  // #endregion

  // #region form validations

  getEmailErrorMessage() {
    if (this.email.hasError('required')) return 'Campo obligatorio';
    if (this.email.hasError('email')) return 'Email no válido';
    return null;
  }

  getPasswordErrorMessage() {
    if (this.password.hasError('required')) return 'Campo obligatorio';
    if (this.password.hasError('minlength')) return 'Minimo 6 caracteres';
    return null;
  }

  // #endregion
}
