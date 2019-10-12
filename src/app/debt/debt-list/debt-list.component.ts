import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Debt } from 'src/app/models/debt';
import { DebtService } from '../debt.service';
import { DeleteDebtOverviewDialog } from '../dialog/delete/delete-debt-overview-dialog';
import { EditDebtOverviewDialog } from '../dialog/edit/edit-debt-overview-dialog';

@Component({
	templateUrl: './debt-list.component.html',
	styleUrls: ['./debt-list.component.css']
})
export class DebtListComponent implements OnInit {

	debts = new Array<Debt>();
	isLastPage = false;
	page = 0;
	size = 3;
	totalAmountInThisMonth = 0;

	constructor(private debtService: DebtService, public dialog: MatDialog) { }

	ngOnInit(): void {
		this.getDebts();
	}

	getDebts(): void {
		this.debtService.findAllPageable(this.page++, this.size)
			.subscribe(
				res => {
					this.debts.push(...res.content);
					this.isLastPage = res.last;
					this.calcTotalAmountInThisMonth();
				},
				err => console.log(err)
			);
	}

	calcTotalAmountInThisMonth(): void {
		this.totalAmountInThisMonth = this.debts
			.filter(this.isDebtBeforeOrEqualsThisMonth)
			.reduce((sigma, currentValue) => sigma + currentValue.amount, 0)
	}

	isDebtBeforeOrEqualsThisMonth(debt: Debt): boolean {
		const debtDate = new Date(debt.dueDate);
		const today = new Date();
		return today.getMonth() == debtDate.getMonth() || today.getTime() >= debtDate.getTime();
	}

	openDialogForDelete(debt: Debt): void {
		const dialogRef = this.dialog.open(DeleteDebtOverviewDialog, {
			width: '250px',
			data: { debt }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.deleteDebt(debt.id);
			}
		});
	}

	private deleteDebt(debtId: string): void {
		this.debtService.deleteById(debtId)
			.subscribe(
				() => {
					this.debts = this.debts.filter(debt => debt.id != debtId);
					this.calcTotalAmountInThisMonth();
				},
				err => console.log(err)
			);
	}

	openDialogForEdit(debt: Debt): void {
		const { description, amount, currentInstallment, totalInstallment, dueDate, category } = debt;
		const dialogRef = this.dialog.open(EditDebtOverviewDialog, {
			width: '300px',
			data: { debt }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.editDialog(debt);
				this.calcTotalAmounLeft(debt);
				this.calcTotalAmountInThisMonth();
			} else {
				this.backupDebtData(debt, description, amount, currentInstallment,
					totalInstallment, dueDate, category);
			}
		});
	}

	private editDialog(debt: Debt): void {
		this.debtService.update(debt)
			.subscribe(
				() => console.log('sucesso na atualização da dívida'),
				err => console.log(err)
			);
	}

	private calcTotalAmounLeft(debt) {
		const factor = debt.totalInstallment - (debt.currentInstallment - 1);
		debt.totalAmountLeft = debt.amount * factor;
	}

	private backupDebtData(debt: Debt, description: string, amount: number, currentInstallment: number,
		totalInstallment: number, dueDate: number, category: string) {
		debt.description = description;
		debt.amount = amount;
		debt.currentInstallment = currentInstallment;
		debt.totalInstallment = totalInstallment;
		debt.dueDate = dueDate;
		debt.category = category;
	}
}