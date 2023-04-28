import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from '@angular/material/icon';
import {LoginModule} from "./login/login.module";
import {MatMenuModule} from '@angular/material/menu';
import {MatButtonModule} from "@angular/material/button";
import {PreviousReportsModule} from "./previous-reports/previous-reports.module";
import {RegisterModule} from "./register/register.module";
import {ReportModule} from "./report/report.module";
import {AngularFireModule} from "@angular/fire/compat";
import {firebaseConfig} from "../environment";
import {AngularFireAuthModule} from "@angular/fire/compat/auth";
import {AuthenticationService} from "./shared/services/authentication.service";
import {AngularFirestoreModule} from "@angular/fire/compat/firestore";
import {CookieService} from "ngx-cookie-service";
import {MatCardModule} from "@angular/material/card";

@NgModule({
	declarations: [
		AppComponent,
	],
	imports: [
		BrowserModule,
		AppRoutingModule,
		BrowserAnimationsModule,
		MatToolbarModule,
		MatIconModule,
		LoginModule,
		PreviousReportsModule,
		RegisterModule,
		ReportModule,
		MatMenuModule,
		MatButtonModule,
		AngularFireModule.initializeApp(firebaseConfig),
		AngularFireAuthModule,
		AngularFirestoreModule,
		MatCardModule,
	],
	providers: [AuthenticationService, CookieService],
	bootstrap: [AppComponent]
})
export class AppModule {
}
