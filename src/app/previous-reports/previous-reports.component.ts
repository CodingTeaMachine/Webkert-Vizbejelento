import {Component, OnDestroy, OnInit} from '@angular/core';
import {Report} from "../../types/Report";
import {ReportService} from "../shared/services/report.service";
import {Observable, Subscription} from "rxjs";

@Component({
	selector: 'app-previous-reports',
	templateUrl: './previous-reports.component.html',
	styleUrls: ['./previous-reports.component.scss']
})
export class PreviousReportsComponent implements OnInit, OnDestroy {
	
	constructor(private reportService: ReportService) {
	}
	
	previousReports: Report[] = [];
	previousReportsSub: Subscription | null = null;
	
	avrgAmountUsed: number = 0;
	
	filterReportFromList(reportId: string) {
		this.previousReports = this.previousReports.filter(previousReport => previousReport.id !== reportId);
	}
	
	
	ngOnInit(): void {
		this.previousReportsSub = this.reportService.getAllReports().subscribe(reports => {
			this.previousReports = reports.docs.map(doc => ({
				...doc.data(),
				id: doc.id,
			}));

			const totalAmountUsed = this.previousReports.reduce((currentAvrg, currentReport): number => {
				return currentAvrg + currentReport.amountUsed
			}, 0);

			this.avrgAmountUsed = Number((totalAmountUsed / this.previousReports.length).toFixed(2));
		});
	}
	
	ngOnDestroy(): void {
		this.previousReportsSub?.unsubscribe();
	}
}
