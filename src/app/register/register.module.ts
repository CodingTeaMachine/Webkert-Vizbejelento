import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {RegisterRoutingModule} from './register-routing.module';
import {RegisterComponent} from './register.component';
import {MatCardModule} from "@angular/material/card";
import {MatButtonModule} from "@angular/material/button";
import {MatInputModule} from "@angular/material/input";
import {MatNativeDateModule} from "@angular/material/core";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {MatProgressSpinnerModule} from "@angular/material/progress-spinner";


@NgModule({
	declarations: [
		RegisterComponent,
	],
	imports: [
		CommonModule,
		RegisterRoutingModule,
		MatCardModule,
		MatButtonModule,
		MatInputModule,
		MatNativeDateModule,
		MatSnackBarModule,
		FormsModule,
		ReactiveFormsModule,
		MatProgressSpinnerModule,
	]
})
export class RegisterModule {
}
