import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-analysis',
  templateUrl: './analysis.component.html',
  styleUrls: ['./analysis.component.css'],
})
export class AnalysisComponent implements OnInit {
  countExpanded: number = 0;

  constructor() {}

  ngOnInit(): void {}

  // #region AUX methods

  onPanelClicked(add: number) {
    this.countExpanded += add;
  }

  // #endregion
}
