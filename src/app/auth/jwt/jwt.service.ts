import { Injectable } from '@angular/core';
import * as jwtDecode from 'jwt-decode';
import { PayloadJwt } from 'src/app/models/payload.jwt';

@Injectable({
	providedIn: "root"
})
export class JwtService {
	constructor() { }

	setToken(token: string): void {
		localStorage.setItem('token', token);
	}

	getToken(): string {
		return localStorage.getItem('token');
	}

	hasToken(): boolean {
		return this.getToken().trim() != null;
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

	private decodePayloadFromJwt(): PayloadJwt {
		return jwtDecode<PayloadJwt>(this.getToken());
	}
}