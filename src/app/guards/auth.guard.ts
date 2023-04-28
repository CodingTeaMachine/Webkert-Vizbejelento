import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Route, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import {Observable} from 'rxjs';
import {CookieService} from "ngx-cookie-service";
import {UserService} from "../shared/services/user.service";

@Injectable({
	providedIn: 'root'
})
export class AuthGuard implements CanActivate {
	
	constructor(
		private cookieService: CookieService,
		private userService: UserService,
	) {
	}
	
	canActivate(
		route: ActivatedRouteSnapshot,
		state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
		return new Observable<boolean>((subscriber) => {
			new Promise<boolean>(async (resolve) => {
				const userId = this.cookieService.get('userId');
				resolve(userId !== '' && await this.userService.userExists(userId));
			})
			.then(isUserLoggedIn => {
				
				const {routeConfig} = route;
				const {path} = routeConfig as Route;
				
				if (!isUserLoggedIn && path?.includes('bejelentkezes') || path?.includes('regisztracio')) {
					subscriber.next(!isUserLoggedIn);
					subscriber.complete();
				} else {
					subscriber.next(isUserLoggedIn);
					subscriber.complete();
				}
			})
			.catch(error => {
				console.log(error);
				subscriber.next(false)
				subscriber.complete();
			});
		})
	}
	
}
