import {Component} from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {CookieService} from "ngx-cookie-service";

@Component({
	selector: 'app-login',
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.scss']
})
export class LoginComponent {
	
	loginForm = new FormGroup({
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', Validators.required)
	})
	
	loggingInInProgress = false;
	
	constructor(
		protected readonly authenticationService: AuthenticationService,
		private snackBar: MatSnackBar,
		private router: Router,
		private cookieService: CookieService,
	) {
	}
	
	login() {
		this.loggingInInProgress = true;
		const toastTimeOut = 2000;
		
		this.authenticationService.SignIn(
			this.loginForm.value.email as string,
			this.loginForm.value.password as string
		)
			.then(result => {
				
				this.snackBar.open(
					'Sikeres bejelentkezés',
					'',
					{
						horizontalPosition: "right",
						verticalPosition: "top",
						duration: toastTimeOut,
					},
				)
				
				this.cookieService.set('userId', result.user?.uid as string);
				AuthenticationService.notifyUserLoginState(true);
				
				this.loggingInInProgress = false;
				
				setTimeout(() => {
					this.router.navigateByUrl('/');
				}, toastTimeOut)
			})
			.catch(_ => {
				this.snackBar.open(
					'Sikertelen bejelentkezés',
					'',
					{
						horizontalPosition: "right",
						verticalPosition: "top",
						duration: toastTimeOut,
					},
				)
				
				this.loggingInInProgress = false;
			});
	}
	
}
