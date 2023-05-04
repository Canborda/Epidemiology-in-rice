import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

import { WrapperComponent } from '../wrapper/wrapper.component';
import { ApiSuccessI, ApiErrorI } from 'src/app/models/api.model';
import { ImagesRequestI } from 'src/app/models/gee.model';

import { GeeService } from 'src/app/services/gee.service';

@Component({
  selector: 'app-image-load',
  templateUrl: './image-load.component.html',
  styleUrls: ['./image-load.component.css'],
})
export class ImageLoadComponent implements OnInit {
  indexList!: string[];
  // Form variables
  cloudyPercentage = new UntypedFormControl('', [Validators.required]);
  index = new UntypedFormControl('', [Validators.required]);

  constructor(
    public dialogRef: MatDialogRef<WrapperComponent>,
    private geeService: GeeService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    // Load index list from backend info
    if (!this.indexList) {
      this.geeService.getIndexes().subscribe({
        next: (v: ApiSuccessI<string[]>) => {
          this.indexList = v.data;
        },
        error: (e: HttpErrorResponse) => {
          const error: ApiErrorI = e.error;
          this.toastr.error(error.message, 'ERROR');
        },
      });
    }
  }

  onSend() {
    if (
      !this.getIndexErrorMessage() &&
      !this.getCloudyPercentageErrorMessage()
    ) {
      // Build request info (map_id added on WrapperComponent)
      const data: ImagesRequestI = {
        map_id: '',
        index: this.index.value,
        cloudyPercentage: this.cloudyPercentage.value,
      };
      this.dialogRef.close(data);
    }
  }

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
