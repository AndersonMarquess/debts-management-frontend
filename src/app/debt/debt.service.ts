import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../auth/jwt/jwt.service';
import { Debt } from '../models/debt';

const ApiBaseUrl = environment.ApiUrl;

@Injectable()
export class DebtService {
	constructor(private jwtService: JwtService, private client: HttpClient) { }

	findAllPageable(page: number, size: number): Observable<any> {
		return this.client.get<Debt>(`${ApiBaseUrl}/v1/debts?page=${page}&size=${size}`, {
			headers: {
				'userId': this.jwtService.getAuthenticatedUserId(),
				'Authorization': this.jwtService.getToken()
			}
		});
	}
}