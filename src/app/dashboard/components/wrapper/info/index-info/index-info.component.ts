import { Component, OnInit, ViewChild } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

import { ChartComponent } from './chart/chart.component';
import { INDEXES } from 'src/utils/enums';

import { IMap } from 'src/app/models/map.model';
import { ValuesService } from 'src/app/services/values.service';
import { IGeeRequest } from 'src/app/models/gee.model';
import { GeeService } from 'src/app/services/gee.service';

@Component({
	selector: 'app-index-info',
	templateUrl: './index-info.component.html',
	styleUrls: ['./index-info.component.css'],
})
export class IndexInfoComponent implements OnInit {
	// Children
	@ViewChild(ChartComponent) chart?: ChartComponent;

	constructor(
		private toastr: ToastrService,
		private valuesService: ValuesService,
		private geeService: GeeService,
	) { }

	ngOnInit(): void { }

	updateStandarizedValues(index: INDEXES, map: IMap) {
		if (this.chart) {
			this.valuesService.getStandarized(map._id!, index).subscribe({
				next: s => {
					this.toastr.success(`Obtenidos ${s.count} valores estándar para el índice ${index}`);
					if (this.chart) {
						this.chart.stdData = s.data;
						this.chart.updateChart(index);
					}
				},
				error: e => {
					this.toastr.error(e.error.message);
				},
			});
		}
	}

	updateGeeValues(data: IGeeRequest) {
		this.geeService.getValuesByDate(data).subscribe({
			next: s => {
				this.toastr.success(`Obtenidos ${s.count} valores a partir de imágenes de GoogleEarthEngine para el índice ${data.index}`);
				if (this.chart) {
					this.chart.geeData = s.data
					this.chart.updateChart(data.index);
				}
			},
			error: e => {
				this.toastr.error(e.error.message);
			},
		});

	}

	resetChart() {
		if (this.chart){
			this.chart.stdData = undefined;
			this.chart.geeData = undefined;
			this.chart.isProcessing = false;
			this.chart.updateChart();
		}
	}

}
