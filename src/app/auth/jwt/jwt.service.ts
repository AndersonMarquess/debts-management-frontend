import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { BehaviorSubject } from 'rxjs';
import { PayloadJwt } from 'src/app/models/payload.jwt';

@Injectable({
	providedIn: "root"
})
export class JwtService {

	hasValidTokenSubject = new BehaviorSubject(false);

	constructor() { }

	setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	getToken(): string {
		return localStorage.getItem('token');
	}

	hasToken(): boolean {
		return this.getToken() != null;
	}

	getAuthenticatedUserId(): string {
		if (this.hasToken()) {
			return this.decodePayloadFromJwt().id;
		}
		return '';
	}

	getAuthenticatedUserEmail(): string {
		if (this.hasToken()) {
			return this.decodePayloadFromJwt().sub;
		}
		return '';
	}

	hasValidToken(): boolean {
		if (this.hasToken()) {
			const expiration = this.decodePayloadFromJwt().exp
			const isValid = new Date().getTime() < expiration * 1000;
			this.hasValidTokenSubject.next(isValid);
			return isValid;
		}
		return false;
	}

	private decodePayloadFromJwt(): PayloadJwt {
		return jwtDecode<PayloadJwt>(this.getToken());
	}

	deleteToken(): boolean {
		if (this.hasToken()) {
			localStorage.removeItem('token');
			this.hasValidTokenSubject.next(false);
			return true;
		}
		return false;
	}
}