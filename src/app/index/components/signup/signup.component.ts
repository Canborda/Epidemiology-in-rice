import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css'],
})
export class SignupComponent implements OnInit {
  hide = true;

  // Form variables
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [
    Validators.required,
    Validators.minLength(6),
  ]);
  name = new FormControl('', [
    Validators.required,
    Validators.pattern(/^[a-zA-Z ]{2,30}$/),
  ]);
  region = new FormControl('', [Validators.required]);
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
    'Valle',
    'Vaupés',
    'Vichada',
  ];
  filteredOptions: Observable<string[]> | undefined;

  send() {
    console.log(this.getRegionErrorMessage());
    
    if (
      !this.getEmailErrorMessage() &&
      !this.getPasswordErrorMessage() &&
      !this.getNameErrorMessage() &&
      !this.getRegionErrorMessage()
    ) {
      // TODO send request
      console.log('Form data is:', {
        email: this.email.value,
        password: this.password.value,
        name: this.name.value,
        region: this.region.value,
      });
    }
  }

  ngOnInit() {
    this.filteredOptions = this.region.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter((option) =>
      option.toLowerCase().includes(filterValue)
    );
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
