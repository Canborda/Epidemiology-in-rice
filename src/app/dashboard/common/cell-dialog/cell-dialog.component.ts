import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';

import { CropListComponent } from '../../modals/crop-list/crop-list.component';

import { INDEXES } from 'src/utils/enums';

@Component({
  selector: 'app-cell-dialog',
  templateUrl: './cell-dialog.component.html',
  styleUrls: ['./cell-dialog.component.css'],
})
export class CellDialogComponent implements OnInit {
  row!: any;
  col!: string;
  keys!: string[];
  // Form variables
  value = new UntypedFormControl('', [
    Validators.required,
    Validators.pattern('^[0-9]*$'),
  ]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CropListComponent>
  ) {}

  ngOnInit(): void {
    this.row = this.data.row;
    this.col = this.data.col;
    this.keys = this.data.keys;
    this.value.setValue(this.data.row[this.col]);
  }

  // #region BUTTON ACTIONS

  onSave(): void {
    if (!this.getValidationError()) {
      this.row[this.col] =
        this.col !== this.keys[0] && this.value.value
          ? Number(this.value.value)
          : this.value.value || null;
      this.dialogRef.close(this.row);
    }
  }

  // #endregion

  // #region form validations

  getValidationError() {
    if (this.col === this.keys[0] && this.value.hasError('required'))
      return 'Ingrese un nombre para la etapa fenológica';
    if (this.col === this.keys[1] && this.value.hasError('required'))
      return 'Ingrese un valor para los días';
    if (this.col === this.keys[1] && this.value.hasError('pattern'))
      return 'El valor debe ser un entero';
    if (
      Object.values(INDEXES).find((idx) => idx === this.col) &&
      this.value.value &&
      this.value.value?.length &&
      !String(this.value.value).match(/^[0-9]+\.[0-9]+$/)
    )
      return 'Debe ingresar un décimal válido';
    return null;
  }

  // #endregion
}
