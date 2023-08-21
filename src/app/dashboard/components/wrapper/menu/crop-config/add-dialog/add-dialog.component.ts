import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CropConfigComponent } from '../crop-config.component';

@Component({
  selector: 'app-add-dialog',
  templateUrl: './add-dialog.component.html',
  styleUrls: ['./add-dialog.component.css'],
})
export class AddDialogComponent implements OnInit {
  entity!: string;
  list!: string[];
  // Form variables
  value = new UntypedFormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CropConfigComponent>
  ) {}

  ngOnInit(): void {
    this.entity = this.data.entity;
    this.list = this.data.list;
  }

  // #region BUTTON ACTIONS

  onSave(): void {
    if (!this.getValidationError()) {
      this.dialogRef.close(this.value.value);
    }
  }

  // #endregion

  // #region form validations

  getValidationError() {
    if (this.value.hasError('required'))
      return `Ingrese un nombre para la ${this.entity}`;
    if (this.list.includes(this.value.value))
      return `El nombre ya existe para la ${this.entity}`;
    return null;
  }

  // #endregion
}
