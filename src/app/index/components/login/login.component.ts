import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';
import { AuthI, LoginI } from 'src/app/models/user.model';
import { ApiErrorI } from 'src/app/models/api.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;

  // Form variables
  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  password = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  constructor(
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  onSubmit() {
    if (!this.getEmailErrorMessage() && !this.getPasswordErrorMessage()) {
      const data: LoginI = {
        email: this.email.value,
        password: this.password.value,
      };
      this.userService.login(data).subscribe({
        next: (v: AuthI) => {
          this.toastr.success('Iniciando sesión', 'SUCCESS');
          // TODO Redirect to dashboard
        },
        error: (e: HttpErrorResponse) => {
          const error: ApiErrorI = e.error;
          this.toastr.error(error.message, 'ERROR');
        },
      });
    }
  }

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
