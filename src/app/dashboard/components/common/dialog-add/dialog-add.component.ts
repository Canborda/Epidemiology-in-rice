import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-add',
	templateUrl: './dialog-add.component.html',
	styleUrls: ['./dialog-add.component.css']
})
export class DialogAddComponent {
	error?: string;
	value = new UntypedFormControl('', [Validators.required]);

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { entity: string, value?: string, list: string[] },
		public dialogRef: MatDialogRef<unknown>,
	) {
		this.error = '';
		this.value.setValue(data.value);
	}

	onValueChanges(): void {
		if (!this.value.value) this.error = 'Debe ingresar un nombre';
		else if (this.value.value === this.data.value) this.error = 'El nombre debe ser distinto';
		else if (this.data.list.includes(this.value.value)) this.error = `El nombre ya existe`;
		else this.error = undefined;
	}

	onSave(): void {
		this.dialogRef.close(this.value.value);
	}

}
