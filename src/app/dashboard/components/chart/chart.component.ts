import { AfterViewInit, Component, ElementRef, OnInit, ViewChild } from '@angular/core';

import * as Highcharts from 'highcharts';
import { tempChartOptions } from './chartOptions';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit, AfterViewInit {
  @ViewChild('mainChart') mainChartRef!: ElementRef<HTMLDivElement>;
  constructor() {}

  ngAfterViewInit(): void {
    Highcharts.chart({
      ...tempChartOptions,
      chart: { ...tempChartOptions, renderTo: this.mainChartRef.nativeElement },
    });
  }

  ngOnInit(): void {}
}
