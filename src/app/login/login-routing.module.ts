import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {LoginComponent} from "./login.component";
import {RegisterComponent} from "../register/register.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
	{path: 'bejelentkezes', component: LoginComponent, canActivate: [AuthGuard]},
	{path: 'regisztracio', component: RegisterComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class LoginRoutingModule { }
