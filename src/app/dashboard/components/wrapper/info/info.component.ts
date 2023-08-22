import { Component, OnInit, ViewChild } from '@angular/core';

import { CropInfoComponent } from './crop-info/crop-info.component';
import { IndexInfoComponent } from './index-info/index-info.component';
import { MessageInfoComponent } from './message-info/message-info.component';

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
  // Children
  @ViewChild(CropInfoComponent) cropInfo?: CropInfoComponent;
  @ViewChild(IndexInfoComponent) indexInfo?: IndexInfoComponent;
  @ViewChild(MessageInfoComponent) messageInfo?: MessageInfoComponent;
  // Component-level variables
  countExpanded: number = 0;
  currentIndex: string = 'NDVI'; // TODO replace hardcoded value for variable from mapAnalyze

  constructor() {}

  ngOnInit(): void {}

  // #region PANEL_ACTIONS methods

  onInfoOpened(): void {
    console.log('INFO PANEL OPENED');
    // TODO implement update info table
  }

  onIndexOpened(): void {
    console.log('INDEX PANEL OPENED');
    // TODO implement update chart (data source?)
    this.indexInfo?.chart?.updateChart(this.currentIndex);
  }

  onMessageOpened(): void {
    console.log('MESSAGE PANEL OPENED');
    // TODO implement update messages
  }

  // #endregion

  // #region AUX methods

  onPanelClicked(add: number) {
    this.countExpanded += add;
  }

  // #endregion
}
