import { Component, OnInit } from '@angular/core';
import { JwtService } from './auth/jwt/jwt.service';

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
	isMenuVisible = false;

	constructor(private jwtService: JwtService) { }

	ngOnInit(): void {
		this.jwtService.hasValidTokenSubject
			.subscribe(res => this.isMenuVisible = res);
	}
}
