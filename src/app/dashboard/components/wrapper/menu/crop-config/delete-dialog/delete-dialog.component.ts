import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

import { CropConfigComponent } from '../crop-config.component';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent implements OnInit {
  entity!: string;
  // Form variables
  value = new UntypedFormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<CropConfigComponent>
  ) {}

  ngOnInit(): void {
    this.entity = this.data.entity;
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
    if (this.value.hasError('required')) {
      return `Ingrese un nombre para la ${this.entity}`;
    }
    return null;
  }

  // #endregion
}
