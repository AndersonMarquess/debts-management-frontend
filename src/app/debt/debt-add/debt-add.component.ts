import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NewDebt } from 'src/app/models/new-debt';
import { DebtService } from '../debt.service';

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
		private router: Router, private snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.createDebtForm = this.formBuilder.group({
			description: ['', [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(60)
			]],
			category: ['', [
				Validators.required
			]],
			amount: ['', [
				Validators.required
			]],
			fixedCost: new FormControl(false),
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
				() => {
					this.snackBar.open('Sucesso ao criar dívida', 'Fechar', { duration: 3000 });
					this.router.navigate(['/debts', 'all']);
				},
				err => {
					this.snackBar.open('Erro ao criar dívida', 'Fechar', { duration: 3000 });
					console.log(err);
				}
			);
	}
}