import { Injectable } from '@angular/core';
import {AngularFireAuth} from "@angular/fire/compat/auth";
import {Subject} from "rxjs";

@Injectable({
	providedIn: 'root'
})
export class AuthenticationService {
	
	public static loginNotification = new Subject<boolean>()
	
	constructor(public afAuth: AngularFireAuth) { }
	
	SignUp(email: string, password: string) {
		return this.afAuth.createUserWithEmailAndPassword(email, password);
	}
	
	SignIn(email: string, password: string) {
		return this.afAuth.signInWithEmailAndPassword(email, password);
	}
	
	SignOut() {
		return  this.afAuth.signOut();
	}
	
	static notifyUserLoginState(loginState: boolean) {
		AuthenticationService.loginNotification.next(loginState);
	}
	
}
