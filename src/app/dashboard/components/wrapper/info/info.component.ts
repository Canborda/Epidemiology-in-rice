import { Component, OnInit, ViewChild } from '@angular/core';

import { CropInfoComponent } from './crop-info/crop-info.component';
import { IndexInfoComponent } from './index-info/index-info.component';
import { MessageInfoComponent } from './message-info/message-info.component';

import { MESSAGE_TYPES } from 'src/utils/enums';

@Component({
	selector: 'app-info',
	templateUrl: './info.component.html',
	styleUrls: ['./info.component.css'],
})
export class InfoComponent implements OnInit {
	// Children
	@ViewChild(CropInfoComponent) cropInfo!: CropInfoComponent;
	@ViewChild(IndexInfoComponent) indexInfo!: IndexInfoComponent;
	@ViewChild(MessageInfoComponent) messageInfo!: MessageInfoComponent;
	// Component-level variables
	countExpanded: number = 0;
	currentIndex: string = 'NDVI'; // TODO replace hardcoded value for variable from mapAnalyze

	constructor() { }

	ngOnInit(): void { }

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
		// TODO replace hardcoded values for stored messages (from endpoint?)
		this.messageInfo.messageList = [
			{
				text: 'This is an INFORMATION message. To omit click on card.',
				type: MESSAGE_TYPES.INFORMATION,
				read: false,
			},
			{
				text: 'This is a SUCCESS message. To omit click on card.',
				type: MESSAGE_TYPES.SUCCESS,
				read: false,
			},
			{
				text: 'This is a WARNING message. To omit click on card.',
				type: MESSAGE_TYPES.WARNING,
				read: false,
			},
			{
				text: 'This is a DANGER message. To omit click on card.',
				type: MESSAGE_TYPES.DANGER,
				read: false,
			},
		];
	}

	// #endregion

	// #region AUX methods

	onPanelClicked(add: number) {
		this.countExpanded += add;
	}

	// #endregion
}
