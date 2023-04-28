import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {PreviousReportsComponent} from "./previous-reports.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
	{path: 'korabbi-bejelentesek', component: PreviousReportsComponent, canActivate: [AuthGuard]}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PreviousReportsRoutingModule { }
