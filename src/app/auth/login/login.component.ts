import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AccountCredential } from 'src/app/models/account-credentials';
import { AuthService } from '../auth.service';

@Component({
	selector: 'dmf-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

	loginForm: FormGroup;
	timer;

	constructor(private formBuilder: FormBuilder, private authService: AuthService) { }

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
					() => console.log('sucesso no login'),
					err => console.log(err.message)
				);
		}, 500);
	}
}