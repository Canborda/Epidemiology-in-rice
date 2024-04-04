import { Component, OnInit } from '@angular/core';

import { MessageI } from 'src/app/models/message.model';

@Component({
	selector: 'app-message-info',
	templateUrl: './message-info.component.html',
	styleUrls: ['./message-info.component.css'],
})
export class MessageInfoComponent implements OnInit {
	// Component-level variables
	messageList: MessageI[] = [];

	constructor() { }

	ngOnInit(): void { }

	// #region AUX methods

	onCardClick(card: MessageI): void {
		card.read = !card.read;
		this.messageList = this.messageList.filter((msg: MessageI) => msg !== card);
		if (card.read) this.messageList.push(card);
		else this.messageList.unshift(card);
	}

	// #endregion
}
