import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Debt } from 'src/app/models/debt';

@Component({
	templateUrl: './delete-debt-overview-dialog.html',
	styleUrls: ['./delete-debt-overview-dialog.css']
})
export class DeleteDebtOverviewDialog {

	debt: Debt;
	confirmDelete = true;

	constructor(public dialogRef: MatDialogRef<DeleteDebtOverviewDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) {
		this.debt = data.debt;
	}

	handleCancel(): void {
		this.confirmDelete = false;
		this.dialogRef.close();
	}

	handleConfirm(): void {
		this.confirmDelete = true;
		this.dialogRef.close();
	}
}