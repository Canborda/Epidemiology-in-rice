import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';

import { DialogAddComponent } from '../../../common/dialog-add/dialog-add.component';
import { DialogDeleteComponent } from '../../../common/dialog-delete/dialog-delete.component';
import { VarietiesService } from 'src/app/services/varieties.service';

import { IVariety } from 'src/app/models/admin.models';

@Component({
	selector: 'app-admin-varieties',
	templateUrl: './admin-varieties.component.html',
	styleUrls: ['./admin-varieties.component.css']
})
export class AdminVarietiesComponent implements OnInit {
	varietiesList!: IVariety[];

	constructor(
		private dialog: MatDialog,
		private toastr: ToastrService,
		private varietiesService: VarietiesService,
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
	}

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
					this.varietiesService.create({ name }).subscribe({
						next: s => {
							this.varietiesList.push(s.data);
							this.toastr.success(`Variedad "${s.data.name}" creada`);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
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
					variety.name = name;
					this.varietiesService.update(variety).subscribe({
						next: s => {
							this.toastr.success(`Variedad "${s.data.name}" actualizada`);
						},
						error: e => {
							this.toastr.error(e.error.message);
						},
					});
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
					this.varietiesService.delete(variety).subscribe({
						next: s => {
							this.varietiesList = this.varietiesList.filter(v => v != variety);
							this.toastr.success(`Variedad "${variety.name}" eliminada`);
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
