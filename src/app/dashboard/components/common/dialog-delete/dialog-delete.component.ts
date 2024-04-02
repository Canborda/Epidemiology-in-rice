import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-delete',
	templateUrl: './dialog-delete.component.html',
	styleUrls: ['./dialog-delete.component.css']
})
export class DialogDeleteComponent {

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { entity: string, value?: string },
		public dialogRef: MatDialogRef<unknown>,) { }

	onDelete(): void {
		this.dialogRef.close(true);
	}


}
