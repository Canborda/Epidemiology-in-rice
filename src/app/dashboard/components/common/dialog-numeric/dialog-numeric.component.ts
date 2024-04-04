import { Component, Inject } from '@angular/core';
import { UntypedFormControl, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
	selector: 'app-dialog-numeric',
	templateUrl: './dialog-numeric.component.html',
	styleUrls: ['./dialog-numeric.component.css']
})
export class DialogNumericComponent {
	error?: string;
	value = new UntypedFormControl('', [Validators.required]);

	constructor(
		@Inject(MAT_DIALOG_DATA) public data: { label: string, value?: number },
		public dialogRef: MatDialogRef<unknown>,
	) {
		this.value.setValue(data.value);
	}

	onValueChanges(): void {
		if (this.value.value === null) this.error = 'Debe ingresar un valor válido';
		else this.error = undefined;
	}

	onSave(): void {
		this.dialogRef.close(this.value.value);
	}

}
