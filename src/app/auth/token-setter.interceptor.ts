import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Injectable, NgModule } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtService } from './jwt/jwt.service';

@Injectable({ providedIn: 'root' })
export class TokenSetterInterceptor implements HttpInterceptor {
	constructor(private jwtService: JwtService) { }

	intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
		if (this.jwtService.hasValidToken()) {
			const reqClone = req.clone({
				headers: req.headers.set('Authorization', this.jwtService.getToken()),
			});
			return next.handle(reqClone);
		}
		return next.handle(req);
	}
}

@NgModule({
	providers: [
		{
			provide: HTTP_INTERCEPTORS,
			useClass: TokenSetterInterceptor,
			multi: true
		}
	]
})
export class TokenSetterModule { }