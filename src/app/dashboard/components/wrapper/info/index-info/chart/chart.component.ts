import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';
import addMore from 'highcharts/highcharts-more';
import { Options } from 'highcharts';

import { ChartDatabaseI, ChartGeeI } from 'src/app/models/chart.model';

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
	// TODO replace hardcoded dbData values for http responses
	dbData?: ChartDatabaseI[] = [
		{
			name: 'Emergencia',
			date: new Date('2023-05-02T05:00:00.000Z'),
			value: 0.1,
			min: 0.08,
			max: 0.2,
		},
		{
			name: 'Primordio',
			date: new Date('2023-05-17T05:00:00.000Z'),
			value: 0.25,
			min: 0.22,
			max: 0.29,
		},
		{
			name: 'Floración',
			date: new Date('2023-05-22T05:00:00.000Z'),
			value: 0.5,
			min: 0.4,
			max: 0.6,
		},
		{
			name: 'Cosecha',
			date: new Date('2023-06-21T05:00:00.000Z'),
			value: 0.4,
			min: 0.32,
			max: 0.43,
		},
	];
	// TODO replace hardcoded geeData values for http responses
	geeData?: ChartGeeI[] = [
		{
			date: new Date('2023-05-03T15:31:45.490Z'),
			value: 0.1685908450687934,
		},
		{
			date: new Date('2023-05-18T15:31:49.875Z'),
			value: 0.03840523722937094,
		},
		{
			date: new Date('2023-06-12T15:31:49.241Z'),
			value: 0.07687465609431005,
		},
	];

	constructor() { }

	ngOnInit(): void { }

	// #region HIGHCHART features

	updateChart(index: string) {
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
		if (this.dbData) {
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
				data: this.dbData.map((data: ChartDatabaseI) => {
					return { x: new Date(data.date).getTime(), y: data.value };
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
				data: this.dbData.map((data: ChartDatabaseI) => [
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
		if (this.dbData) {
			const axis: Highcharts.XAxisOptions = {
				type: 'datetime',
				minPadding: 0,
				maxPadding: 0.05,
				plotLines: this.dbData.map((data) => {
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
