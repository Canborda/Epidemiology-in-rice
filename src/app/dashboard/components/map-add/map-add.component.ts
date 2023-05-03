import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';

import { MapComponent } from '../map/map.component';
import { CropI } from 'src/app/models/crop.model';
import { MapI } from 'src/app/models/map.model';

import { CropsService } from 'src/app/services/crops.service';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.css'],
})
export class MapAddComponent implements OnInit {
  cropList!: CropI[];
  crops: string[] = [];
  varieties: string[] = [];
  today = new Date();
  // Form variables
  name = new UntypedFormControl('', [Validators.required]);
  crop = new UntypedFormControl('', [Validators.required]);
  variety = new UntypedFormControl('', [Validators.required]);
  date = new UntypedFormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<MapComponent>,
    private cropsService: CropsService
  ) {}

  ngOnInit(): void {
    this.cropsService.getCrops().subscribe((result) => {
      this.cropList = result.data as CropI[];
      this.crops = this.cropList
        .map((crop) => crop.name)
        .filter((v, i, a) => a.indexOf(v) === i);
      // Update varieties for selected crop
      this.crop.valueChanges.subscribe((selectedCrop) => {
        this.varieties = this.cropList
          .filter((crop) => crop.name === selectedCrop)
          .map((crop) => crop.variety);
      });
    });
  }

  onSave() {
    if (
      !this.getNameErrorMessage() &&
      !this.getCropErrorMessage() &&
      !this.getVarietyErrorMessage() &&
      !this.getDateErrorMessage()
    ) {
      // Extract cropId from crop-variety combination
      const selectedCrop = this.cropList
        .filter((crop) => crop.name === this.crop.value)
        .filter((crop) => crop.variety === this.variety.value);
      // Build map info (polygon points added on MapComponent)
      const data: MapI = {
        name: this.name.value,
        crop: selectedCrop[0]._id!,
        seedDate: this.date.value,
        polygon: [],
      };
      this.dialogRef.close(data);
    }
  }

  // #region form validations

  getNameErrorMessage() {
    if (this.name.hasError('required')) return 'Campo obligatorio';
    return null;
  }

  getCropErrorMessage() {
    if (this.crop.hasError('required')) return 'Campo obligatorio';
    return null;
  }

  getVarietyErrorMessage() {
    if (this.variety.hasError('required')) return 'Campo obligatorio';
    return null;
  }

  getDateErrorMessage() {
    if (this.date.hasError('required')) return 'Campo obligatorio';
    return null;
  }

  // #endregion
}
