import { Component, Input, OnInit } from '@angular/core';
import { ThemeService } from 'ng2-charts';
import { DebtService } from '../debt/debt.service';
import { Debt } from '../models/debt';

@Component({
	selector: 'dmf-chart',
	templateUrl: './chart.component.html',
	styleUrls: ['./chart.component.css']
})
export class ChartComponent implements OnInit {

	@Input() public debts: Array<Debt>;
	dataLoaded = false;

	public doughnutChartLabels = [];
	public doughnutChartData = [[], []];
	public doughnutChartType = 'doughnut';
	private categories = [
		'Lazer', 'Alimentação', 'Educação', 'Saúde',
		'Vestuário', 'Reparos', 'Eletrônicos', 'Outros'
	];

	constructor(private theme: ThemeService, private debtService: DebtService) { }

	ngOnInit(): void {
		this.defineColorsSchemesOptions();

		this.categories.forEach(cat => {
			const debtCategoryTotalAmount = this.getTotalAmountWithCategory(cat);

			if (debtCategoryTotalAmount > 0) {
				this.doughnutChartLabels.push(cat);
				this.doughnutChartData[0].push(debtCategoryTotalAmount);

				const totalAmountThisMonth = this.getTotalAmountWithCategoryInThisMonth(cat);
				if (totalAmountThisMonth > 0) {
					this.doughnutChartData[1].push(totalAmountThisMonth);
				}

				setTimeout(() => {
					this.dataLoaded = true;
				}, 100);
			}
		});
	}

	private getTotalAmountWithCategory(category: String): number {
		return this.debts
			.filter(d => d.category === category)
			.reduce((sigma, debt) => sigma + debt.amount, 0);
	}

	private getTotalAmountWithCategoryInThisMonth(category: String): number {
		return this.debts
			.filter(d => d.category === category && this.debtService.isDebtBeforeOrEqualsThisMonth(d))
			.reduce((sigma, debt) => sigma + debt.amount, 0);
	}

	private defineColorsSchemesOptions(): void {
		this.theme.setColorschemesOptions({
			legend: {
				labels: { fontColor: 'white' }
			},
			title: {
				display: true,
				text: 'Total por categoria',
				fontColor: 'white',
				fontSize: 20,
				fontFamily: "'Roboto', sans-serif",
				fontStyle: 'normal'
			}
		});
	}
}