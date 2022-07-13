import { Component } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';
import { AuthI, LoginI } from 'src/app/models/user.model';
import { HttpErrorResponse } from '@angular/common/http';

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

  constructor(private userService: UserService) {}

  onSubmit() {
    if (!this.getEmailErrorMessage() && !this.getPasswordErrorMessage()) {
      const data: LoginI = {
        email: this.email.value,
        password: this.password.value,
      };
      this.userService.login(data).subscribe({
        next: (v: AuthI) => {
          console.log('SUCCESS');
          console.log(v);
        },
        error: (e: HttpErrorResponse) => {
          console.log('ERROR');
          console.log(e.error);
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
