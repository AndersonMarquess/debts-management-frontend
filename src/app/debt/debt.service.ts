import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtService } from '../auth/jwt/jwt.service';
import { Debt } from '../models/debt';
import { NewDebt } from '../models/new-debt';

const ApiBaseUrl = environment.ApiUrl;

@Injectable()
export class DebtService {
	constructor(private jwtService: JwtService, private client: HttpClient) { }

	findAllPageable(page: number, size: number): Observable<any> {
		return this.client.get<Debt>(`${ApiBaseUrl}/v1/debts?page=${page}&size=${size}`, {
			headers: {
				'userId': this.jwtService.getAuthenticatedUserId()
			}
		});
	}

	submitNewDebt(newDebt: NewDebt): Observable<Debt> {
		return this.client.post<Debt>(`${ApiBaseUrl}/v1/debts`, newDebt);
	}

	deleteById(debtId: string): Observable<any> {
		return this.client.delete(`${ApiBaseUrl}/v1/debts/${debtId}`);
	}

	update(debt: Debt): Observable<any> {
		return this.client.put(`${ApiBaseUrl}/v1/debts`, debt);
	}

	submitPayment(debtId: String): Observable<any> {
		return this.client.post(`${ApiBaseUrl}/v1/debts/pay/${debtId}`, null);
	}

	isDebtBeforeOrEqualsThisMonth(debt: Debt): boolean {
		const debtDate = new Date(debt.dueDate);
		const today = new Date();
		return today.getMonth() == debtDate.getMonth() || today.getTime() >= debtDate.getTime();
	}
}