import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { JwtService } from '../jwt/jwt.service';

@Component({
	template: "Saindo"
})
export class LogoutComponent implements OnInit {

	constructor(private jwtService: JwtService, private router: Router) { }

	ngOnInit(): void {
		if (this.jwtService.deleteToken()) {
			this.router.navigate(['']);
		}
	}
}