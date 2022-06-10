import { Component, OnInit } from '@angular/core';

import * as Highcharts from 'highcharts';
import { testChartOptions1, testChartOptions2 } from './chartOptions';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnInit {
  highcharts = Highcharts;
  chartOptions1 = testChartOptions1;
  chartOptions2 = testChartOptions2;

  constructor() {}

  ngOnInit(): void {}
}
