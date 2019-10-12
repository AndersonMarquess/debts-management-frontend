import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	templateUrl: './edit-debt-overview-dialog.html',
	styleUrls: ['./edit-debt-overview-dialog.css']
})
export class EditDebtOverviewDialog {

	confirmChanges = true;
	categories = [
		'Lazer', 'Alimentação', 'Educação', 'Saúde',
		'Vestuário', 'Reparos', 'Eletrônicos', 'Outros'
	];

	constructor(public dialogRef: MatDialogRef<EditDebtOverviewDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	handleCancel(): void {
		this.confirmChanges = false;
		this.dialogRef.close();
	}

	handleConfirm(): void {
		this.confirmChanges = true;
		this.dialogRef.close();
	}

	normalizeAmount() {
		const amount = Number(this.data.debt.amount.replace(',', '.'));
		if(amount && amount != NaN) {
			this.data.debt.amount = amount;
		}
	}
}