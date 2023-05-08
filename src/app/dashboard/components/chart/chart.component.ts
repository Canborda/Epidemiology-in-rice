import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as Highcharts from 'highcharts';
import addMore from 'highcharts/highcharts-more';
import { Options } from 'highcharts';

import { GeeDataResponseI } from 'src/app/models/gee.model';

addMore(Highcharts);

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  cropData?: GeeDataResponseI[];
  geeData?: GeeDataResponseI[];

  @ViewChild('mainChart') mainChartRef!: ElementRef<HTMLDivElement>;

  constructor() {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  updateChart(index: string) {
    const selectedSeries: Highcharts.SeriesOptionsType[] =
      this.buildChartData();
    if (selectedSeries.length) {
      const options: Options = {
        title: {
          text: `Índice ${index} estandarizado vs. real`,
        },
        subtitle: {
          text: 'Región: Caribe Seco  |  Variedad: Fedearroz 67',
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

  private buildChartData(): Highcharts.SeriesOptionsType[] {
    const series: Highcharts.SeriesOptionsType[] = [];
    if (this.cropData) {
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
        data: this.cropData.map((data) => {
          return { x: new Date(data.date).getTime(), y: data.value };
        }),
      };
      series.push(cropSerie);
      // Add range for standardized serie
      const cropRange: Highcharts.SeriesOptionsType = {
        type: 'arearange',
        linkedTo: ':previous',
        lineWidth: 0,
        color: '#0000FF',
        fillOpacity: 0.2,
        marker: {
          enabled: false,
        },
        data: this.cropData.map((data) => [
          new Date(data.date).getTime(),
          data.value - 0.1,
          data.value + 0.1,
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
    if (this.cropData) {
      const axis: Highcharts.XAxisOptions = {
        type: 'datetime',
        minPadding: 0,
        maxPadding: 0.05,
        plotLines: this.cropData.map((data) => {
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
}
