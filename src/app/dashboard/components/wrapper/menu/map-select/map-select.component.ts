import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { MenuComponent } from '../menu.component';
import { MapAddComponent } from '../../map/map-add/map-add.component';
import { DialogDeleteComponent } from '../../../common/dialog-delete/dialog-delete.component';
import { VarietiesService } from 'src/app/services/varieties.service';
import { ClustersService } from 'src/app/services/clusters.service';
import { MapsService } from 'src/app/services/maps.service';

import { IMap } from 'src/app/models/map.model';
import { ICluster, IVariety } from 'src/app/models/admin.models';

@Component({
	selector: 'app-map-select',
	templateUrl: './map-select.component.html',
	styleUrls: ['./map-select.component.css'],
})
export class MapSelectComponent implements OnInit {
	varietiesList!: IVariety[];
	clustersList!: ICluster[];
	mapList!: IMap[];

	constructor(
		public dialogRef: MatDialogRef<MenuComponent>,
		private dialog: MatDialog,
		private toastr: ToastrService,
		private varietiesService: VarietiesService,
		private clustersService: ClustersService,
		private mapsService: MapsService,
	) { }

	ngOnInit(): void {
		this.varietiesService.getAll().subscribe({
			next: s => {
				this.varietiesList = s.data;
				this.toastr.success(`Obtenidas ${s.count} variedades`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
		this.clustersService.getAll().subscribe({
			next: s => {
				this.clustersList = s.data;
				this.toastr.success(`Obtenidos ${s.count} clusters`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
		this.mapsService.getAll().subscribe({
			next: s => {
				this.mapList = s.data;
				this.toastr.success(`Obtenidos ${s.count} lotes`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
	}

	// #region BUTTON ACTIONS

	onSelectMap(map: IMap): void {
		const variety = this.varietiesList.find(v => v._id === map.varietyId);
		const cluster = this.clustersList.find(c => c._id === map.clusterId);
		if (!variety) this.toastr.error(`No se encuentra la variedad. Debe actualizar lote`);
		if (!cluster) this.toastr.error(`No se encuentra el clúster. Debe actualizar lote`);
		if (variety && cluster) this.dialogRef.close(map);
	}

	onEditMap(oldMap: IMap): void {
		this.dialog
			.open(MapAddComponent, {
				data: {
					map: oldMap,
				},
			}).afterClosed()
			.subscribe((newMap: IMap) => {				
				if (newMap) {
					this.mapsService.update(newMap).subscribe({
						next: s => {
							this.mapList[this.mapList.indexOf(oldMap)] = newMap;
							this.toastr.success(`Lote "${newMap.name}" actualizado exitosamente`);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
				}
			});
	}

	onDeleteMap(map: IMap): void {
		this.dialog
			.open(DialogDeleteComponent, {
				data: {
					entity: 'Lote',
					value: map.name,
				},
			}).afterClosed()
			.subscribe((flag: boolean) => {
				if (flag) {
					this.mapsService.delete(map._id!).subscribe({
						next: s => {
							this.mapList = this.mapList.filter((m) => m._id !== map._id);
							this.toastr.success(`Lote "${map.name}" eliminado exitosamente`);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
				}
			});
	}

	// #endregion

	// #region AUX methods

	// #endregion
}
