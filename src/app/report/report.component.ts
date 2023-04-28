import {Component, OnInit} from '@angular/core';
import {CreateReport, Report} from "../../types/Report";
import {CookieService} from "ngx-cookie-service";
import {ReportService} from "../shared/services/report.service";
import {MatSnackBar} from "@angular/material/snack-bar";
import {FormControl, FormGroup, Validators} from "@angular/forms";

@Component({
	selector: 'app-report',
	templateUrl: './report.component.html',
	styleUrls: ['./report.component.scss']
})
export class ReportComponent implements OnInit {
	
	savingInProgress = false;
	private reportId: string | null = null;
	private editMode = false;
	private reportToUpdate: Report | null = null;
	
	reportForm = new FormGroup({
		startDate: new FormControl('', Validators.required),
		endDate: new FormControl('', Validators.required),
		amountUsed: new FormControl('', [Validators.required, Validators.min(1)])
	});
	
	constructor(
		private cookieService: CookieService,
		private reportService: ReportService,
		private snackBar: MatSnackBar,
	) {
	}
	
	saveReport() {
		this.editMode
			? this.updateReport()
			: this.createReport();
	}
	
	createReport() {
		this.savingInProgress = true;
		
		this.reportService.createReport(this.formatInputsToCreateReportType())
		.then( _ => {
			this.snackBar.open(
				'Sikeres bejelentés',
				'',
				{
					horizontalPosition: "right",
					verticalPosition: "top",
					duration: 2000,
				},
			)
		})
		.catch( _ => {
			this.snackBar.open(
				'Sikertelen bejelentés',
				'',
				{
					horizontalPosition: "right",
					verticalPosition: "top",
					duration: 2000,
				},
			)
		})
		.finally(() => {
			this.savingInProgress = false;
		})
	}
	
	updateReport() {
		this.savingInProgress = true;
		
		const reportToUpdate = this.reportToUpdate as Report;
		
		this.reportService.updateReport({id: reportToUpdate.id, ...this.formatInputsToCreateReportType()})
		.then( _ => {
			this.snackBar.open(
				'Sikeres bejelentés',
				'',
				{
					horizontalPosition: "right",
					verticalPosition: "top",
					duration: 2000,
				},
			)
		})
		.catch( _ => {
			this.snackBar.open(
				'Sikertelen bejelentés',
				'',
				{
					horizontalPosition: "right",
					verticalPosition: "top",
					duration: 2000,
				},
			)
		})
		.finally(() => {
			this.savingInProgress = false;
		})
	}
	
	formatInputsToCreateReportType(): CreateReport {
		return {
			reporterId: this.cookieService.get('userId'),
			start: new Date(this.reportForm.controls.startDate.value as string),
			end: new Date(this.reportForm.controls.endDate.value as string),
			amountUsed: Number(this.reportForm.controls.amountUsed.value),
		}
	}
	
	getReportId() {
		this.reportService
			.getReportById(this.reportId as string)
			.then(report => {
				
				this.reportForm.patchValue({
					endDate: new Date(report.end.seconds * 1000).toISOString(),
					startDate:  new Date(report.start.seconds * 1000).toISOString(),
					amountUsed: report.amountUsed.toString()
				})
				
				
				
				this.reportToUpdate = {...this.formatInputsToCreateReportType(), id: report.id, reporterId: report.reporterId};
				this.reportToUpdate.start = new Date(report.start.seconds * 1000);
				this.reportToUpdate.end = new Date(report.end.seconds * 1000);
			})
	}
	
	ngOnInit(): void {
		if(history.state.reportId) {
			this.reportId = history.state.reportId;
			this.editMode = true;
			this.getReportId();
		}
	}
}
