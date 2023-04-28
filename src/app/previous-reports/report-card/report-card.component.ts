import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Report} from "../../../types/Report";
import {MatDialog} from "@angular/material/dialog";
import {DeleteDialogComponent} from "../delete-dialog/delete-dialog.component";
import {ReportService} from "../../shared/services/report.service";
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
	selector: 'app-report-card',
	templateUrl: './report-card.component.html',
	styleUrls: ['./report-card.component.scss']
})
export class ReportCardComponent {
	
	constructor(
		private snackBar: MatSnackBar,
		private reportService: ReportService,
		private dialog: MatDialog
	) {
	}
	
	@Input()
	report: Report | null = null;
	
	@Input()
	avrgAmountUsed: number = 0;
	
	@Output()
	deletedReport = new EventEmitter<void>();
	
	getFillPercentage(amountUsed: number = 0): number {
		return Math.min(Math.round((amountUsed / this.avrgAmountUsed) * 100), 100)
	}
	
	deleteReport() {
		this.dialog
		.open(DeleteDialogComponent, {
			data: {startDate: this.report?.start, endDate: this.report?.end},
			width: '450px',
			enterAnimationDuration: '100ms',
			exitAnimationDuration: '100ms',
		})
		.afterClosed()
		.subscribe(isDelete => {
			if (!isDelete) return;
			this.reportService.deleteReport(this.report?.id as string)
			.then(_ =>{
				this.deletedReport.emit();
				
				this.snackBar.open(
					'Sikeres törlés',
					'',
					{
						horizontalPosition: "right",
						verticalPosition: "top",
						duration: 2000,
					},
				)
			})
			
			.catch(_ =>
				this.snackBar.open(
					'Sikertelen törlés',
					'',
					{
						horizontalPosition: "right",
						verticalPosition: "top",
						duration: 2000,
					},
				)
			);
			
		});
	}
}
