import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';
import { Router } from '@angular/router';
import { AccountCredential } from 'src/app/models/account-credentials';
import { AuthService } from '../auth.service';

@Component({
	selector: 'dmf-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;

	constructor(private formBuilder: FormBuilder, private authService: AuthService,
		private router: Router, private snackBar: MatSnackBar) { }

	ngOnInit(): void {
		this.loginForm = this.formBuilder.group({
			email: ['', [
				Validators.email,
				Validators.required
			]],
			password: ['', Validators.required]
		});
	}

	handleSubmit(): void {
		const credentials = this.loginForm.getRawValue() as AccountCredential;
		this.authService.authenticate(credentials)
			.subscribe(
				() => this.router.navigate(['/debts', 'all']),
				err => {
					this.snackBar.open('Falha ao tentar fazer login, tente novamente mais tarde',
						'Fechar', { duration: 3000 });
					console.log(err.message);
				}
			);
	}
}