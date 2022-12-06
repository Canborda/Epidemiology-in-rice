import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';

import * as Highcharts from 'highcharts';
import { Options } from 'highcharts';
import { PointI } from 'src/app/models/chart.model';
import { tempSeries } from './chartOptions';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('mainChart') mainChartRef!: ElementRef<HTMLDivElement>;
  constructor() {}

  ngAfterViewInit(): void {}

  ngOnInit(): void {}

  plotPolygonInfo(index: string) {
    // TODO get chart series from API
    const selectedSeries = tempSeries.find((serie) => serie.index === index);
    if (selectedSeries) {
      const options: Options = {
        chart: {
          borderColor: '#BBBBBB',
        },
        title: {
          text: `Índice ${selectedSeries.index} estandarizado vs. pronosticado`,
        },
        xAxis: {
          type: 'datetime',
          minPadding: 0,
          maxPadding: 0.05,
          plotLines: selectedSeries.standardized.map((point: PointI) => {
            return {
              value: point.x,
              color: '#000000',
              dashStyle: 'Dash',
            };
          }),
        },
        series: [
          {
            name: 'Modelo estándar',
            type: 'line',
            color: '#0000FF',
            data: selectedSeries.standardized,
          },
          {
            name: 'Pronosticado',
            type: 'line',
            color: '#FF0000',
            data: selectedSeries.estimated,
          },
        ],
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
}
