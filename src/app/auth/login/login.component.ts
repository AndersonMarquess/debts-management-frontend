import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountCredential } from 'src/app/models/account-credentials';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
	selector: 'dmf-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	timer;

	constructor(private formBuilder: FormBuilder, private authService: AuthService,
		private router: Router) { }

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
		clearTimeout(this.timer);
		this.timer = setTimeout(() => {
			const credentials = this.loginForm.getRawValue() as AccountCredential;
			this.authService.authenticate(credentials)
				.subscribe(
					() => this.router.navigate(['/debts','all']),
					err => console.log(err.message)
				);
		}, 500);
	}
}