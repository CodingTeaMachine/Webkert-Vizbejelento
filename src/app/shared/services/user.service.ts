import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentData, DocumentSnapshot} from "@angular/fire/compat/firestore";
import {User} from "../../../types/User";
import firebase from "firebase/compat";
import DocumentReference = firebase.firestore.DocumentReference;

@Injectable({
	providedIn: 'root'
})
export class UserService {
	
	private readonly collectionName: string = "User";
	
	constructor(private db: AngularFirestore) {
	}
	
	
	getUserById(id: string): Promise<User> {
		return new Promise(resolve => {
			this.db.collection(this.collectionName).doc(id).valueChanges().subscribe(user => resolve(user as User));
		})
	}
	
	userExists(id: string): Promise<boolean> {
		return new Promise(resolve => {
			this.db.collection(this.collectionName).doc(id).valueChanges().subscribe(user => resolve(user !== undefined));
		})
	}
	
	createUser(newUser: User) {
		const {id, ...userWithoutId} = newUser;
		
		return this.db.collection(this.collectionName).doc(id).set(userWithoutId);
	}
}
