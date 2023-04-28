import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {PreviousReportsRoutingModule} from './previous-reports-routing.module';
import {PreviousReportsComponent} from './previous-reports.component';
import {MatButtonModule} from "@angular/material/button";
import {MatCardModule} from "@angular/material/card";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatInputModule} from "@angular/material/input";
import {MatIconModule} from "@angular/material/icon";
import {ReportCardComponent} from "./report-card/report-card.component";
import {DeleteDialogComponent} from "./delete-dialog/delete-dialog.component";
import {DateFormatPipe} from "../shared/pipes/date-format.pipe";
import {MatDialogModule} from "@angular/material/dialog";


@NgModule({
	declarations: [
		PreviousReportsComponent,
		ReportCardComponent,
		DeleteDialogComponent,
		DateFormatPipe
	],
	imports: [
		CommonModule,
		PreviousReportsRoutingModule,
		MatButtonModule,
		MatCardModule,
		MatFormFieldModule,
		MatInputModule,
		MatIconModule,
		MatDialogModule,
	]
})
export class PreviousReportsModule {
}
