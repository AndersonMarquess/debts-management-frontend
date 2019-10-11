import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { JwtService } from './jwt/jwt.service';

@Injectable({ providedIn: 'root' })
export class CanActivePageGuard implements CanActivate {

	constructor(private jwtService: JwtService, private router: Router) { }

	canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot):
		Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

		if (this.jwtService.hasValidToken()) {
			return true;
		}

		return this.router.navigate(['/']);
	}
}