import { Component, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from '../menu.component';
import { GeeService } from 'src/app/services/gee.service';

import { IGeeRequest } from 'src/app/models/gee.model';

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
		private toastr: ToastrService,
		private geeService: GeeService,
	) { }

	ngOnInit(): void {
		this.geeService.getIndexes().subscribe({
			next: s => {
				this.indexList = s.data;
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
	}

	// #region BUTTON ACTIONS

	onGenerate(): void {
		if (!this.hasErrors()) {
			// Build request info (map_id added on WrapperComponent)
			const data: IGeeRequest = {
				mapId: '',
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

	hasErrors() {
		return (
			this.getIndexErrorMessage() ||
			this.getCloudyPercentageErrorMessage()
		);
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
