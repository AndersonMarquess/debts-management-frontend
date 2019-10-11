import { Component, OnInit } from '@angular/core';
import { Debt } from 'src/app/models/debt';
import { DebtService } from '../debt.service';

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

	constructor(private debtService: DebtService) { }

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
}