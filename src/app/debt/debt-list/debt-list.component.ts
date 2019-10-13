import { Component, OnInit } from '@angular/core';
import { MatSnackBar } from '@angular/material';
import { MatDialog } from '@angular/material/dialog';
import { Debt } from 'src/app/models/debt';
import { DebtService } from '../debt.service';
import { DeleteDebtOverviewDialog } from '../dialog/delete/delete-debt-overview-dialog';
import { EditDebtOverviewDialog } from '../dialog/edit/edit-debt-overview-dialog';
import { PayDebtOverviewDialog } from '../dialog/pay/pay-debt-overview-dialog';

@Component({
	templateUrl: './debt-list.component.html',
	styleUrls: ['./debt-list.component.css']
})
export class DebtListComponent implements OnInit {

	debts;
	isLastPage;
	page;
	size;
	totalAmountInThisMonth;

	constructor(private debtService: DebtService, public dialog: MatDialog, private snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.page = 0;
		this.size = 3;
		this.isLastPage = false;
		this.debts = new Array<Debt>();
		this.totalAmountInThisMonth = 0;
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
				err => {
					this.snackBar.open('Falha ao tentar buscar dívidas', 'Fechar', { duration: 3000 });
					console.log(err);
				}
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

	openDialogForPayment(debt: Debt): void {
		const dialogRef = this.dialog.open(PayDebtOverviewDialog, {
			width: '280px',
			data: { debt }
		});

		dialogRef.afterClosed().subscribe(result => {
			if (result) {
				this.submitPayment(debt.id);
			}
		});
	}

	private submitPayment(debtId: String): void {
		this.debtService.submitPayment(debtId)
			.subscribe(
				() => {
					this.snackBar.open('Sucesso ao confirmar pagamento da dívida', 'Fechar', { duration: 3000 });
					this.ngOnInit();
				},
				err => {
					this.snackBar.open('Erro ao tentar confirmar pagamento da dívida', 'Fechar', { duration: 3000 });
					console.log(err);
				}
			);
	}

	openDialogForDelete(debt: Debt): void {
		const dialogRef = this.dialog.open(DeleteDebtOverviewDialog, {
			width: '280px',
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
					this.snackBar.open('Sucesso ao apagar dívida', 'Fechar', { duration: 3000 });
					this.debts = this.debts.filter(debt => debt.id != debtId);
					this.calcTotalAmountInThisMonth();
				},
				err => {
					this.snackBar.open('Erro ao tentar apagar dívida', 'Fechar', { duration: 3000 });
					console.log(err);
				}
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
				() => {
					this.snackBar.open('Sucesso ao atualizar dívida', 'Fechar', { duration: 3000 });
				},
				err => {
					this.snackBar.open('Erro ao tentar atualizar dívida', 'Fechar', { duration: 3000 });
					console.log(err);
				}
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