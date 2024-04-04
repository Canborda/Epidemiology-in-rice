import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { DialogNumericComponent } from '../../../common/dialog-numeric/dialog-numeric.component';
import { VarietiesService } from 'src/app/services/varieties.service';
import { ClustersService } from 'src/app/services/clusters.service';
import { PhenologiesService } from 'src/app/services/phenologies.service';
import { IndexesService } from 'src/app/services/indexes.service';

import { ICluster, IIndex, IPhenology, IVariety } from 'src/app/models/admin.models';
import { ITableCol, ITableRow } from 'src/app/models/table.model';
import { INDEXES } from 'src/utils/enums';

@Component({
	selector: 'app-admin-indexes',
	templateUrl: './admin-indexes.component.html',
	styleUrls: ['./admin-indexes.component.css']
})
export class AdminIndexesComponent implements OnInit {
	varietiesList!: IVariety[];
	clustersList!: ICluster[];
	phenologiesList!: IPhenology[];
	indexesList!: IIndex[];
	varietyClusters?: ICluster[];
	selectedVariety?: IVariety;
	selectedCluster?: ICluster;
	indexesNames!: INDEXES[];
	currentIndexName?: INDEXES;
	tableHeaders: ITableCol[];
	tableContents?: any;

	constructor(
		private dialog: MatDialog,
		private toastr: ToastrService,
		private varietiesService: VarietiesService,
		private clustersService: ClustersService,
		private phenologiesService: PhenologiesService,
		private indexesService: IndexesService,
	) {
		this.tableHeaders = [
			{ label: 'Etapa Fenológica', value: 'name' },
			{ label: 'Días', value: 'days' },
			{ label: 'Límite inferior', value: 'min' },
			{ label: 'Valor medio', value: 'mean' },
			{ label: 'Límite superior', value: 'max' },
		];
		this.indexesNames = Object.values(INDEXES);
		this.currentIndexName = this.indexesNames[0];
	}

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
		this.phenologiesService.getAll().subscribe({
			next: s => {
				this.phenologiesList = s.data;
				this.toastr.success(`Obtenidas ${s.count} fenologías`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
		this.indexesService.getAll().subscribe({
			next: s => {
				this.indexesList = s.data;
				this.toastr.success(`Obtenidos ${s.count} índices`);
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});
	}

	// #region BUTTONS actions

	onVarietyChange(): void {
		this.varietyClusters = this.clustersList.filter(cluster => cluster.varietyId === this.selectedVariety?._id);
		this.selectedCluster = undefined;
	}

	onClusterChange(): void {
		this.updateTable();
	}

	onIndexChange(index: number): void {
		this.currentIndexName = this.indexesNames[index];
		this.updateTable();
	}

	onCellClick(row: ITableRow, col: ITableCol): void {
		if (col.value === this.tableHeaders[0].value)
			return;
		else if (col.value === this.tableHeaders[1].value)
			this.updatePhenologyDays(row);
		else
			this.updateIndex(row, col);
	}

	// #endregion

	// #region AUX methods

	updatePhenologyDays(row: ITableRow): void {
		const phenology = this.getSelectedPhenology(row)
		this.dialog
			.open(DialogNumericComponent, {
				data: {
					label: this.tableHeaders[1].label,
					value: phenology.days
				},
			}).afterClosed()
			.subscribe((value: number) => {
				if (typeof value == 'number') {
					this.phenologiesService.updateDays(phenology._id!, value).subscribe({
						next: s => {
							phenology.days = value;
							this.updateTable();
							this.toastr.success(`Fenología "${s.data.name}" actualizada`);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
				}
			});
	}

	updateIndex(row: ITableRow, col: ITableCol): void {
		const index = this.getSelectedIndex(row);
		const field = col.value as 'min' | 'mean' | 'max';
		this.dialog
			.open(DialogNumericComponent, {
				data: {
					label: col.label,
					value: index?.[field],
				},
			}).afterClosed()
			.subscribe((value: number) => {
				if (typeof value == 'number') {
					if (index) {
						this.indexesService.updateValue(index._id!, value, field).subscribe({
							next: s => {
								index[field] = value;
								this.updateTable();
								this.toastr.success(`Índice ${index.name}, ${col.label}  actualizado`);
							},
							error: e => {
								this.toastr.error(e.error.message);
							},
						});
					} else {
						const newIndex: IIndex = {
							varietyId: this.selectedVariety!._id!,
							clusterId: this.selectedCluster!._id!,
							phenologyId: this.getSelectedPhenology(row)._id!,
							name: this.currentIndexName!,
							[field]: value,
						};
						this.indexesService.create(newIndex).subscribe({
							next: s => {
								this.indexesList.push(s.data);
								this.updateTable();
								this.toastr.success(`Índice ${newIndex.name}, ${col.label}  creado`);
							},
							error: e => {
								this.toastr.error(e.error.message)
							},
						});

					}
				}
			});
	}

	getSelectedPhenology(row: ITableRow): IPhenology {
		return this.phenologiesList.find(phenology =>
			phenology.varietyId === this.selectedVariety?._id &&
			phenology.clusterId === this.selectedCluster?._id &&
			phenology.name === row.name
		)!;
	}

	getSelectedIndex(row: ITableRow): IIndex | undefined {
		return this.indexesList.find(index =>
			index.varietyId === this.selectedVariety?._id &&
			index.clusterId === this.selectedCluster?._id &&
			index.phenologyId === this.getSelectedPhenology(row)._id &&
			index.name === this.currentIndexName
		);
	}

	updateTable(): void {
		this.tableContents = this.phenologiesList
			.filter(
				(phenology: IPhenology) =>
					phenology.varietyId === this.selectedVariety?._id &&
					phenology.clusterId === this.selectedCluster?._id
			)
			.map((phenology: IPhenology) => {
				const currentIndex: IIndex | undefined = this.indexesList.find(
					(index: IIndex) =>
						index.varietyId === this.selectedVariety?._id &&
						index.clusterId === this.selectedCluster?._id &&
						index.phenologyId === phenology._id &&
						index.name === this.currentIndexName
				);
				const currentRow: ITableRow = {
					name: phenology.name,
					days: phenology.days,
					min: currentIndex?.min,
					mean: currentIndex?.mean,
					max: currentIndex?.max,
				};
				return currentRow;
			});
	}

	// #endregion

}
