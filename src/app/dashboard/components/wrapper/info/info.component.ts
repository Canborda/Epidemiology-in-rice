import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  countExpanded: number = 0;

  constructor() {}

  ngOnInit(): void {}

  // #region AUX methods

  onPanelClicked(add: number) {
    this.countExpanded += add;
  }

  // #endregion
}
