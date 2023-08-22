import { Component, OnInit, ViewChild } from '@angular/core';

import { ChartComponent } from './chart/chart.component';

@Component({
  selector: 'app-index-info',
  templateUrl: './index-info.component.html',
  styleUrls: ['./index-info.component.css'],
})
export class IndexInfoComponent implements OnInit {
  // Children
  @ViewChild(ChartComponent) chart?: ChartComponent;

  constructor() {}

  ngOnInit(): void {}
}
