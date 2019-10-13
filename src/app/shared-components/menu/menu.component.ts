import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/auth/jwt/jwt.service';

@Component({
	selector: 'dmf-menu',
	templateUrl: './menu.component.html',
	styleUrls: ['./menu.component.css']
})
export class MenuComponent implements OnInit{
	user = "Usuário";

	constructor(private jwtService: JwtService) {}

	ngOnInit(): void {
		this.user = this.jwtService.getAuthenticatedUserEmail();
	}
}