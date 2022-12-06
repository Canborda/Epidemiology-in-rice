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
import { PointI } from 'src/app/models/chart.model';
import { tempSeries } from './chartOptions';

addMore(Highcharts);

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
            lineWidth: 3,
            color: '#0000FF',
            marker: {
              symbol: 'circle',
              radius: 5,
            },
            data: selectedSeries.standardized,
          },
          {
            name: 'Range',
            // TODO dynamic range?
            data: selectedSeries.standardized.map((point) => [
              point.x,
              point.y - 0.1,
              point.y + 0.1,
            ]),
            type: 'arearange',
            linkedTo: ':previous',
            lineWidth: 0,
            color: '#0000FF',
            fillOpacity: 0.2,
            marker: {
              enabled: false,
            },
          },
          {
            name: 'Pronosticado',
            type: 'line',
            lineWidth: 3,
            color: '#FF0000',
            marker: {
              symbol: 'circle',
              radius: 5,
            },
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
