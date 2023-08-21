import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MapComponent } from '../map.component';

import { CropsService } from 'src/app/services/crops.service';

import { ApiSuccessI, ApiErrorI } from 'src/app/models/api.model';
import { CropI } from 'src/app/models/crop.model';
import { MapI } from 'src/app/models/map.model';

@Component({
  selector: 'app-map-add',
  templateUrl: './map-add.component.html',
  styleUrls: ['./map-add.component.css'],
})
export class MapAddComponent implements OnInit {
  map?: MapI;
  cropList!: CropI[];
  varieties: string[] = [];
  today = new Date();
  // Form variables
  name = new UntypedFormControl('', [Validators.required]);
  variety = new UntypedFormControl('', [Validators.required]);
  date = new UntypedFormControl('', [Validators.required]);

  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    public dialogRef: MatDialogRef<MapComponent>,
    private cropsService: CropsService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.map = this.data?.map;
    this.cropsService.getCrops().subscribe({
      next: (v: ApiSuccessI<CropI[]>) => {
        this.cropList = v.data;
        this.varieties = this.cropList.map((crop) => crop.variety);
        if (this.map) {
          this.name.setValue(this.map.name);
          this.variety.setValue(
            this.cropList.find((crop) => crop._id === this.map!.crop)?.variety
          );
          this.date.setValue(new Date(this.map.seedDate));
        }
      },
      error: (e: HttpErrorResponse) => {
        const error: ApiErrorI = e.error;
        this.toastr.error(error.message, 'ERROR');
      },
    });
  }

  // #region BUTTON ACTIONS

  onSave(): void {
    if (
      !this.getNameErrorMessage() &&
      !this.getVarietyErrorMessage() &&
      !this.getDateErrorMessage()
    ) {
      // Extract cropId from crop-variety combination
      const selectedCrop = this.cropList.find(
        (crop) => crop.variety === this.variety.value
      )!;
      // Build map info (polygon points added on MapComponent)
      const data: MapI = {
        _id: this.map?._id,
        name: this.name.value,
        crop: selectedCrop._id!,
        seedDate: this.date.value,
        polygon: this.map?.polygon ?? [],
      };
      this.dialogRef.close(data);
    }
  }

  // #endregion

  // #region form validations

  getNameErrorMessage() {
    if (this.name.hasError('required')) return 'Campo obligatorio';
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
