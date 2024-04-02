import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { DialogAddComponent } from '../../../common/dialog-add/dialog-add.component';
import { DialogDeleteComponent } from '../../../common/dialog-delete/dialog-delete.component';
import { VarietiesService } from 'src/app/services/varieties.service';
import { ClustersService } from 'src/app/services/clusters.service';

import { ICluster, IVariety } from 'src/app/models/admin.models';

@Component({
	selector: 'app-admin-clusters',
	templateUrl: './admin-clusters.component.html',
	styleUrls: ['./admin-clusters.component.css']
})
export class AdminClustersComponent implements OnInit {
	selectedVariety?: IVariety;
	selectedClusters?: ICluster[];
	varietiesList!: IVariety[];
	clustersList!: ICluster[];

	constructor(
		private dialog: MatDialog,
		private toastr: ToastrService,
		private varietiesService: VarietiesService,
		private clustersService: ClustersService,
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
	}

	// #region BUTTONS actions

	onSelectedVariety(): void {
		this.selectedClusters = this.clustersList.filter(cluster => cluster.varietyId === this.selectedVariety?._id);
	}

	onAdd(): void {
		this.dialog
			.open(DialogAddComponent, {
				data: {
					entity: 'Clúster',
					list: this.selectedClusters!.map(cluster => cluster.name),
				}
			}).afterClosed()
			.subscribe((name: string) => {
				if (name) {
					const cluster: ICluster = {
						varietyId: this.selectedVariety!._id!,
						name: name,
						polygon: [],
					};
					this.clustersService.create(cluster).subscribe({
						next: s => {
							this.clustersList.push(s.data);
							this.onSelectedVariety();
							this.toastr.success(`Clúster "${s.data.name}" creado`);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
				}
			});
	}

	onEditName(cluster: ICluster): void {
		this.dialog
			.open(DialogAddComponent, {
				data: {
					entity: 'Clúster',
					value: cluster.name,
					list: this.selectedClusters!.map(cluster => cluster.name),
				}
			}).afterClosed()
			.subscribe((name: string) => {
				if (name) {
					cluster.name = name;
					this.clustersService.update(cluster).subscribe({
						next: s => {
							this.toastr.success(`Clúster "${s.data.name}" actualizado`);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
				}
			});
	}

	onEditPolygon(cluster: ICluster): void {
		console.log('EDIT POLYGON');
		// TODO Implement edit polygon
	}

	onDelete(cluster: ICluster): void {
		this.dialog
			.open(DialogDeleteComponent, {
				data: {
					entity: 'Clúster',
					value: cluster.name,
				},
			}).afterClosed()
			.subscribe((flag: boolean) => {
				if (flag) {
					this.clustersService.delete(cluster).subscribe({
						next: s => {
							this.clustersList = this.clustersList.filter(c => c != cluster);
							this.onSelectedVariety();
							this.toastr.success(`Clúster "${cluster.name}" eliminado`);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
				}
			});
	}

	// #endregion

}
