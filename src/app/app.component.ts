import {Component, OnInit} from '@angular/core';
import {CookieService} from "ngx-cookie-service";
import {UserService} from "./shared/services/user.service";
import {AuthenticationService} from "./shared/services/authentication.service";
import {Router} from "@angular/router";

@Component({
	selector: 'app-root',
	templateUrl: './app.component.html',
	styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{

	isUserLoggedIn = false;
	
	constructor(
		private userService: UserService,
		private cookieService: CookieService,
		private authenticationService: AuthenticationService,
		private router: Router
	) {
	}
	
	logout() {
		this.authenticationService.SignOut()
			.then(_ => {
				this.cookieService.delete('userId');
				AuthenticationService.notifyUserLoginState(false);
				this.router.navigateByUrl('bejelentkezes');
			});
		
	}
	
	async ngOnInit() {
		AuthenticationService.loginNotification.subscribe(value => this.isUserLoggedIn = value);
		
		const userId = this.cookieService.get('userId');
		const userExists = userId !== '' && await this.userService.userExists(userId);
		AuthenticationService.notifyUserLoginState(userExists);
	}
	
}
