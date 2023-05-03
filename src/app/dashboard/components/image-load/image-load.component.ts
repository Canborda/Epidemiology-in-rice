import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';

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

  constructor() {}

  ngOnInit(): void {
    // TODO load index list from db?
    this.indexList = ['Index1', 'Index2'];
  }

  onSend() {
    if (!this.getIndexErrorMessage()) {
      console.log('SEND REQUEST');
    }
  }

  // #region form validations

  getIndexErrorMessage() {
    if (this.index.hasError('required')) return 'Campo obligatorio';
    return null;
  }

  // #endregion
}
