import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

import { UserService } from 'src/app/services/user.service';

import { UserI } from 'src/app/models/user.model';
import { ApiSuccessI, ApiErrorI } from 'src/app/models/api.model';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide = true;
  options: string[] = [
    'Amazonas',
    'Antioquia',
    'Arauca',
    'Atlántico',
    'Bogotá',
    'Bolívar',
    'Boyacá',
    'Caldas',
    'Caquetá',
    'Casanare',
    'Cauca',
    'Cesar',
    'Chocó',
    'Córdoba',
    'Cundinamarca',
    'Guainía',
    'Guaviare',
    'Huila',
    'La Guajira',
    'Magdalena',
    'Meta',
    'Nariño',
    'Norte de Santander',
    'Putumayo',
    'Quindío',
    'Risaralda',
    'San Andrés y Providencia',
    'Santander',
    'Sucre',
    'Tolima',
    'Valle del Cauca',
    'Vaupés',
    'Vichada',
  ];
  filteredOptions: Observable<string[]> | undefined;
  // Form variables
  email = new UntypedFormControl('', [Validators.required, Validators.email]);
  password = new UntypedFormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  name = new UntypedFormControl('', [
    Validators.required,
    Validators.pattern(/^[A-zÀ-ú ]{2,30}$/),
  ]);
  region = new UntypedFormControl('', [Validators.required]);

  constructor(
    private router: Router,
    private userService: UserService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Update region array according to filter
    this.filteredOptions = this.region.valueChanges.pipe(
      startWith(''),
      map((value: string) => {
        const filterValue = value.toLowerCase();
        return this.options.filter((option) =>
          option.toLowerCase().includes(filterValue)
        );
      })
    );
  }

  // #region BUTTON ACTIONS

  onSubmit(): void {
    if (
      !this.getEmailErrorMessage() &&
      !this.getPasswordErrorMessage() &&
      !this.getNameErrorMessage() &&
      !this.getRegionErrorMessage()
    ) {
      const data: UserI = {
        email: this.email.value,
        password: this.password.value,
        name: this.name.value,
        region: this.region.value,
      };
      this.userService.signup(data).subscribe({
        next: (v: ApiSuccessI<UserI>) => {
          this.toastr.success('Usuario creado correctamente', 'SUCCESS');
          this.router.navigate(['home/login']);
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

  getNameErrorMessage() {
    if (this.name.hasError('required')) return 'Campo obligatorio';
    if (this.name.hasError('pattern')) return 'Formato incorrecto';
    return null;
  }

  getRegionErrorMessage() {
    if (this.region.hasError('required')) return 'Campo obligatorio';
    // TODO show region selection validation
    if (!this.options.includes(this.region.value)) return 'Selección no válida';
    return null;
  }

  // #endregion
}
