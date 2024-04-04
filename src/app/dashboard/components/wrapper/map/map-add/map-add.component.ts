import { Component, Inject, OnInit } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { MapComponent } from '../map.component';

import { IMap } from 'src/app/models/map.model';
import { VarietiesService } from 'src/app/services/varieties.service';
import { ICluster, IVariety } from 'src/app/models/admin.models';
import { ClustersService } from 'src/app/services/clusters.service';

@Component({
	selector: 'app-map-add',
	templateUrl: './map-add.component.html',
	styleUrls: ['./map-add.component.css'],
})
export class MapAddComponent implements OnInit {
	varietiesList!: IVariety[];
	clustersList!: ICluster[];
	varietyClusters?: ICluster[];
	today: Date = new Date();
	// Form variables
	name = new UntypedFormControl('', [Validators.required]);
	variety = new UntypedFormControl('', [Validators.required]);
	cluster = new UntypedFormControl('', [Validators.required]);
	date = new UntypedFormControl('', [Validators.required]);

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { polygon?: Float32List[], map?: IMap },
		public dialogRef: MatDialogRef<MapComponent>,
		private toastr: ToastrService,
		private varietiesService: VarietiesService,
		private clustersService: ClustersService,
	) { }

	ngOnInit(): void {
		this.varietiesService.getAll().subscribe({
			next: s => {
				this.varietiesList = s.data;
				this.variety.setValue(this.varietiesList.find(v => v._id === this.data.map?.varietyId));
				this.toastr.success(`Obtenidas ${s.count} variedades`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
		this.clustersService.getAll().subscribe({
			next: s => {
				this.clustersList = s.data;
				this.cluster.setValue(this.clustersList.find(c => c._id === this.data.map?.clusterId));
				this.toastr.success(`Obtenidos ${s.count} clusters`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
		// FIXME Auto update varietyClusters on init from onEditMap (cluster is not being set)
		this.name.setValue(this.data?.map?.name);
		this.date.setValue(this.data?.map?.seedDate);
	}

	// #region BUTTON ACTIONS

	onVarietyChange(): void {
		this.varietyClusters = this.clustersList.filter(cluster => cluster.varietyId === this.variety.value._id);
		this.cluster.setValue(undefined);
	}

	onSave(): void {
		if (!this.hasErrors()) {
			const data: IMap = {
				_id: this.data.map?._id,
				varietyId: this.variety.value._id,
				clusterId: this.cluster.value._id,
				name: this.name.value,
				seedDate: this.date.value,
				polygon: this.data.polygon ?? this.data.map?.polygon ?? [],
			};
			this.dialogRef.close(data);
		}
	}

	// #endregion

	// #region form validations

	hasErrors() {
		return (
			this.getNameErrorMessage() ||
			this.getVarietyErrorMessage() ||
			this.getClusterErrorMessage() ||
			this.getDateErrorMessage()
		);
	}

	getNameErrorMessage() {
		if (this.name.hasError('required')) return 'Campo obligatorio';
		return null;
	}

	getVarietyErrorMessage() {
		if (this.variety.hasError('required')) return 'Campo obligatorio';
		return null;
	}

	getClusterErrorMessage() {
		if (this.cluster.hasError('required')) return 'Campo obligatorio';
		return null;
	}

	getDateErrorMessage() {
		if (this.date.hasError('required')) return 'Campo obligatorio';
		return null;
	}

	// #endregion
}
