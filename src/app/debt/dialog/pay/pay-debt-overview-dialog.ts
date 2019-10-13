import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
	templateUrl: './pay-debt-overview-dialog.html',
	styleUrls: ['./pay-debt-overview-dialog.css']
})
export class PayDebtOverviewDialog {

	confirmPayment = true;

	constructor(public dialogRef: MatDialogRef<PayDebtOverviewDialog>,
		@Inject(MAT_DIALOG_DATA) public data: any) { }

	handleCancel(): void {
		this.confirmPayment = false;
		this.dialogRef.close();
	}

	handleConfirm(): void {
		this.confirmPayment = true;
		this.dialogRef.close();
	}
}