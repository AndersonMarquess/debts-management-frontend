import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../environments/environment';
import { AccountCredential } from '../models/account-credentials';
import { JwtService } from './jwt/jwt.service';

const ApiBaseUrl = environment.ApiUrl;

@Injectable()
export class AuthService {

	constructor(private httpClient: HttpClient, private jwtService: JwtService) { }

	authenticate(credentials: AccountCredential): Observable<any> {
		return this.httpClient
			.post(`${ApiBaseUrl}/login`, credentials, { observe: 'response' })
			.pipe(tap((res: HttpResponse<any>) => {
				const token = res.headers.get('Authorization');
				console.log(token);
				this.jwtService.setToken(token);
			}));
	}
}