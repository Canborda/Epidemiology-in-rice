import { Component } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  hide = true;

  // Form variables
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);

  send() {
    if (!this.getEmailErrorMessage() && !this.getPasswordErrorMessage()) {
      // TODO send request
      console.log('Form data is:', {
        email: this.email.value,
        password: this.password.value,
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
