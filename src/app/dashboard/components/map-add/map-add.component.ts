import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MapComponent } from '../map/map.component';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.css'],
})
export class MapAddComponent implements OnInit {
  // Form variables
  name = new UntypedFormControl('', [Validators.required]);

  constructor(public dialogRef: MatDialogRef<MapComponent>) {}

  ngOnInit(): void {}

  onSave() {
    if (!this.getNameErrorMessage()) {
      this.dialogRef.close(this.name.value);
    }
  }

  // #region form validations

  getNameErrorMessage() {
    if (this.name.hasError('required')) return 'Campo Obligatorio';
    return null;
  }

  // #endregion
}
