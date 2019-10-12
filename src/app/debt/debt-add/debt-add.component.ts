import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewDebt } from 'src/app/models/new-debt';
import { DebtService } from '../debt.service';
import { Router } from '@angular/router';

@Component({
	templateUrl: './debt-add.component.html',
	styleUrls: ['./debt-add.component.css']
})
export class DebtAddComponent implements OnInit {
	createDebtForm: FormGroup;
	categories = [
		'Lazer', 'Alimentação', 'Educação', 'Saúde',
		'Vestuário', 'Reparos', 'Eletrônicos', 'Outros'
	];

	constructor(private formBuilder: FormBuilder, private debtService: DebtService, 
		private router: Router) { }

	ngOnInit(): void {
		this.createDebtForm = this.formBuilder.group({
			description: ['', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(60)
			]],
			category: ['', [
				Validators.required
			]],
			amount: ['', [
				Validators.required
			]],
			totalInstallment: [1, [
				Validators.required,
				Validators.min(1),
				Validators.max(999)
			]],
			dueDate: ['', [
				Validators.required
			]]
		});
	}

	normalizeAmount() {
		let amount = this.createDebtForm.get('amount');
		let normalized = amount.value.replace(',', '.');
		amount.setValue(normalized);
	}

	handleSubmit(): void {
		const newDebt = this.createDebtForm.getRawValue() as NewDebt;
		this.debtService.submitNewDebt(newDebt)
			.subscribe(
				() => this.router.navigate(['/debts','all']),
				err => console.log(err)
			);
	}
}