import {Component} from '@angular/core';
import {AuthenticationService} from "../shared/services/authentication.service";
import {UserService} from "../shared/services/user.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Router} from "@angular/router";
import {AbstractControl, FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";
import {CookieService} from "ngx-cookie-service";

@Component({
	selector: 'app-register',
	templateUrl: './register.component.html',
	styleUrls: ['./register.component.scss']
})
export class RegisterComponent {
	
	registerForm = new FormGroup({
		lastName: new FormControl('', Validators.required),
		firstName: new FormControl('', Validators.required),
		email: new FormControl('', [Validators.required, Validators.email]),
		password: new FormControl('', [Validators.required, Validators.min(8), this.matchingPasswordValidator()]),
		rePassword: new FormControl('', Validators.required),
		zip: new FormControl('', [Validators.required, Validators.maxLength(4)]),
		settlement: new FormControl('', Validators.required),
		street: new FormControl('', Validators.required),
		apartmentNumber: new FormControl('', Validators.required),
	});
	
	isRegistrationInProgress = false;
	
	
	constructor(
		private readonly authenticationService: AuthenticationService,
		private readonly userService: UserService,
		private snackBar: MatSnackBar,
		private router: Router,
		private cookieService: CookieService,
	) {
	}
	
	register() {
		const navigationTimout = 2000;
		
		this.isRegistrationInProgress = true;
		
		this.authenticationService.SignUp(this.registerForm.value.email as string, this.registerForm.value.password as string).then(result => {
			this.userService.createUser({
				id: result.user?.uid as string,
				firstName: this.registerForm.value.firstName as string,
				lastName: this.registerForm.value.lastName as string,
				email: this.registerForm.value.email as string,
				zip: Number(this.registerForm.value.zip),
				settlement: this.registerForm.value.settlement as string,
				street: this.registerForm.value.street as string,
				apartmentNumber: this.registerForm.value.apartmentNumber as string,
			}).then(_ => {
				this.authenticationService.SignIn(this.registerForm.value.email as string, this.registerForm.value.password as string)
				.then(authResponse => {
					
					this.snackBar.open(
						'Sikeres regisztráció',
						'',
						{
							horizontalPosition: "right",
							verticalPosition: "top",
							duration: navigationTimout,
						},
					)
					
					this.cookieService.set("userId", authResponse.user?.uid as string);
					AuthenticationService.notifyUserLoginState(true);
					
					this.isRegistrationInProgress = false;
					
					setTimeout(() => {
						this.router.navigateByUrl('/')
					}, navigationTimout)
				})
				.catch(_ => {
					this.isRegistrationInProgress = false;
				})
				
				
			})
			.catch(_ => {
				this.snackBar.open(
					'Sikertelen regisztráció',
					'',
					{
						horizontalPosition: "right",
						verticalPosition: "top",
						duration: navigationTimout,
					},
				)
				
				this.isRegistrationInProgress = false;
			});
		});
	}
	
	matchingPasswordValidator(): ValidatorFn {
		
		return (control: AbstractControl): { notMatchingPassword: string } | null => {
			// @ts-ignore
			const parentGroup = control._parent;
			
			if (parentGroup === null) return null;
			return parentGroup.value.rePassword === control.value ? null : {notMatchingPassword: 'hiba'}
		}
	}
}
