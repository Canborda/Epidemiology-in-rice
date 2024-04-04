import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';
import addMore from 'highcharts/highcharts-more';
import { Options } from 'highcharts';

import { IStandarizedValue } from 'src/app/models/values.model';
import { IGeeValueByDate } from 'src/app/models/gee.model';
import { INDEXES } from 'src/utils/enums';

addMore(Highcharts);

@Component({
	selector: 'app-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
	// Children
	@ViewChild('mainChart') mainChartRef!: ElementRef<HTMLDivElement>;
	// Component-level vaiables
	isProcessing: boolean;
	stdData?: IStandarizedValue[];
	geeData?: IGeeValueByDate[];

	constructor() {
		this.isProcessing = false;
	}

	ngOnInit(): void { }

	// #region HIGHCHART features

	updateChart(index?: INDEXES) {
		if (this.stdData && this.geeData) this.isProcessing = false;
		const selectedSeries: Highcharts.SeriesOptionsType[] =
			this.buildChartData();
		if (selectedSeries.length) {
			const options: Options = {
				title: {
					text: '',
				},
				subtitle: {
					text: `Índice ${index} estandarizado vs. real`,
				},
				xAxis: this.buildXAxis(),
				series: selectedSeries,
				legend: {
					layout: 'horizontal',
					align: 'center',
					verticalAlign: 'bottom',
					floating: false,
				},
			};
			Highcharts.chart({
				...options,
				chart: { ...options, renderTo: this.mainChartRef.nativeElement },
			});
		}
	}

	// #endregion

	// #region AUX methods

	private buildChartData(): Highcharts.SeriesOptionsType[] {
		const series: Highcharts.SeriesOptionsType[] = [];
		if (this.stdData) {
			// Add standardized serie
			const cropSerie: Highcharts.SeriesOptionsType = {
				type: 'line',
				name: 'Modelo Estándar',
				lineWidth: 3,
				color: '#0000FF',
				marker: {
					symbol: 'circle',
					radius: 5,
				},
				data: this.stdData.map((data: IStandarizedValue) => {
					return { x: new Date(data.date).getTime(), y: data.mean };
				}),
			};
			series.push(cropSerie);
			// Add range for standardized serie
			const cropRange: Highcharts.SeriesOptionsType = {
				type: 'arearange',
				name: 'Valores límite',
				linkedTo: ':previous',
				lineWidth: 0,
				color: '#0000FF',
				fillOpacity: 0.2,
				marker: {
					enabled: false,
				},
				data: this.stdData.map((data: IStandarizedValue) => [
					new Date(data.date).getTime(),
					data.min,
					data.max,
				]),
			};
			series.push(cropRange);
		}
		if (this.geeData) {
			// Add estimated serie
			const geeSerie: Highcharts.SeriesOptionsType = {
				type: 'line',
				name: 'Índice Real',
				lineWidth: 3,
				color: '#FF0000',
				marker: {
					symbol: 'circle',
					radius: 5,
				},
				data: this.geeData.map((data) => {
					return { x: new Date(data.date).getTime(), y: data.value };
				}),
			};
			series.push(geeSerie);
		}
		return series;
	}

	private buildXAxis(): Highcharts.XAxisOptions | undefined {
		if (this.stdData) {
			const axis: Highcharts.XAxisOptions = {
				type: 'datetime',
				minPadding: 0,
				maxPadding: 0.05,
				plotLines: this.stdData.map((data) => {
					// TODO add phenology stage name to vertical lines
					return {
						value: new Date(data.date).getTime(),
						color: '#000000',
						dashStyle: 'Dash',
					};
				}),
				labels: { align: 'right' },
			};
			return axis;
		} else {
			return undefined;
		}
	}

	// #endregion
}
