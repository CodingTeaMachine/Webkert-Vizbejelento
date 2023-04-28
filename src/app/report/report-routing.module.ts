import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ReportComponent} from "./report.component";
import {AuthGuard} from "../guards/auth.guard";

const routes: Routes = [
    {path: 'bejelentes', component: ReportComponent, canActivate: [AuthGuard]}
];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class ReportRoutingModule {
}
