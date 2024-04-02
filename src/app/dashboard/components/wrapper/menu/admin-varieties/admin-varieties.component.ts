import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { IVariety } from 'src/app/models/admin.models';
import { DialogAddComponent } from '../../../common/dialog-add/dialog-add.component';
import { DialogDeleteComponent } from '../../../common/dialog-delete/dialog-delete.component';

@Component({
	selector: 'app-admin-varieties',
	templateUrl: './admin-varieties.component.html',
	styleUrls: ['./admin-varieties.component.css']
})
export class AdminVarietiesComponent implements OnInit {
	varietiesList: IVariety[] = [
		{ _id: 'varietyId_1', name: 'GENEROSA' },
		{ _id: 'varietyId_2', name: 'FEDEARROZ 70' },
	];

	constructor(private dialog: MatDialog) { }

	ngOnInit(): void { }

	// #region BUTTONS actions

	onAdd(): void {
		this.dialog
			.open(DialogAddComponent, {
				data: {
					entity: 'Variedad',
					list: this.varietiesList.map(variety => variety.name),
				}
			}).afterClosed()
			.subscribe((name: string) => {
				if (name) {
					console.log('ADD');
					console.log(name);
				}
			});
	}

	onEditName(variety: IVariety): void {
		this.dialog
			.open(DialogAddComponent, {
				data: {
					entity: 'Variedad',
					value: variety.name,
					list: this.varietiesList.map(variety => variety.name),
				},
			}).afterClosed()
			.subscribe((name: string) => {
				if (name) {
					console.log('EDIT NAME');
					console.log(name);
				}
			});
	}

	onDelete(variety: IVariety): void {
		this.dialog
			.open(DialogDeleteComponent, {
				data: {
					entity: 'Variedad',
					value: variety.name,
				},
			}).afterClosed()
			.subscribe((flag: boolean) => {
				if (flag) {
					console.log('DELETE');
					console.log(variety);

				}
			});
	}

	// #endregion

}
