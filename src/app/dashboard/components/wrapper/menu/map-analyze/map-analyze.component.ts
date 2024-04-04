import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from '../menu.component';

import { GeeService } from 'src/app/services/gee.service';

import { IApiSuccess, IApiError } from 'src/app/models/api.model';
import { GeeRequestI } from 'src/app/models/gee.model';

@Component({
  selector: 'app-map-analyze',
  templateUrl: './map-analyze.component.html',
  styleUrls: ['./map-analyze.component.css'],
})
export class MapAnalyzeComponent implements OnInit {
  indexList!: string[];
  // Form variables
  cloudyPercentage = new UntypedFormControl('', [Validators.required]);
  index = new UntypedFormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<MenuComponent>,
    private geeService: GeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Load index list from backend info
    if (!this.indexList) {
      this.geeService.getIndexes().subscribe({
        next: (v: IApiSuccess<string[]>) => {
          this.indexList = v.data;
        },
        error: (e: HttpErrorResponse) => {
          const error: IApiError = e.error;
          this.toastr.error(error.message, 'ERROR');
        },
      });
    }
  }

  // #region BUTTON ACTIONS

  onGenerate(): void {
    if (
      !this.getIndexErrorMessage() &&
      !this.getCloudyPercentageErrorMessage()
    ) {
      // Build request info (map_id added on WrapperComponent)
      const data: GeeRequestI = {
        map_id: '',
        index: this.index.value,
        cloudyPercentage: this.cloudyPercentage.value,
      };
      this.dialogRef.close(data);
    }
  }

  // #endregion

  // #region form validations

  formatLabel(value: number): string {
    return `${value}%`;
  }

  getIndexErrorMessage() {
    if (this.index.hasError('required')) return 'Campo obligatorio';
    return null;
  }

  getCloudyPercentageErrorMessage() {
    if (this.cloudyPercentage.hasError('required')) return 'Campo obligatorio';
    return null;
  }

  // #endregion
}
