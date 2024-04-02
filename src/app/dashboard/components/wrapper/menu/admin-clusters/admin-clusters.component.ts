import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICluster, IVariety } from 'src/app/models/admin.models';
import { DialogAddComponent } from '../../../common/dialog-add/dialog-add.component';
import { DialogDeleteComponent } from '../../../common/dialog-delete/dialog-delete.component';

@Component({
	selector: 'app-admin-clusters',
	templateUrl: './admin-clusters.component.html',
	styleUrls: ['./admin-clusters.component.css']
})
export class AdminClustersComponent implements OnInit {
	selectedVariety?: IVariety;
	selectedClusters?: ICluster[];
	varietiesList: IVariety[] = [
		{ _id: 'varietyId_1', name: 'GENEROSA' },
		{ _id: 'varietyId_2', name: 'FEDEARROZ 70' },
		{ _id: 'varietyId_3', name: 'FEDEARROZ 68' },
	];
	clustersList: ICluster[] = [
		{
			_id: 'clusterId_1',
			varietyId: 'varietyId_1',
			name: 'Caribe',
			polygon: [],
		},
		{
			_id: 'clusterId_2',
			varietyId: 'varietyId_2',
			name: 'Llanos',
			polygon: [],
		},
		{
			_id: 'clusterId_3',
			varietyId: 'varietyId_1',
			name: 'Cluster 3',
			polygon: [],
		}
	];

	constructor(private dialog: MatDialog) { }

	ngOnInit(): void { }

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
					console.log('ADD');
					console.log(name);
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
					console.log('EDIT NAME');
					console.log(name);
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
					console.log('DELETE');
					console.log(cluster);

				}
			});
	}

	// #endregion

}
