import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MapComponent } from '../map/map.component';
import { CropI } from 'src/app/models/crop.model';

import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.css'],
})
export class MapAddComponent implements OnInit {
  crops!: CropI[];
  // Form variables
  name = new UntypedFormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    private cropsService: CropsService
  ) {}

  ngOnInit(): void {
    this.cropsService.getCrops().subscribe((result) => {
      this.crops = result.data as CropI[];
    });
  }

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
