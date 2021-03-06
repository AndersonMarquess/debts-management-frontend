import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { NewAccount } from 'src/app/models/new-account';
import { AuthService } from '../auth.service';
import { passwordNotEqualsValidator } from './equals-password.validator.service';

@Component({
	selector: 'dmf-create-account',
	templateUrl: './create-account.component.html',
	styleUrls: ['create-account.component.css']
})
export class CreateAccountComponent implements OnInit {

	createAccountForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router,
		private snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.createAccountForm = this.formBuilder.group({
			name: ['', [
				Validators.required,
				Validators.minLength(5),
				Validators.maxLength(20)
			]],
			email: ['', [
				Validators.required,
				Validators.email,
				Validators.maxLength(60)
			]],
			password: ['', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(60)
			]],
			confirm: ['', [
				Validators.required,
				Validators.minLength(3),
				Validators.maxLength(60)
			]],
		},
			{
				validators: passwordNotEqualsValidator
			}
		);
	}

	handleSubmit(): void {
		const newAccount = this.createAccountForm.getRawValue() as NewAccount;
		this.authService.createAccount(newAccount)
			.subscribe(
				() => {
					this.snackBar.open('Sucesso ao criar conta', 'Fechar', { duration: 3000 });
					this.router.navigate(['/']);
				},
				err => {
					this.snackBar.open('Erro ao tentar criar conta, tente novamente mais tarde',
						'Fechar', { duration: 3000 });
					console.log(err);
				}
			);
	}
}