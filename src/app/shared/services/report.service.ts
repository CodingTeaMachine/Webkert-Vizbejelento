import {Injectable} from '@angular/core';
import {AngularFirestore, DocumentReference, QuerySnapshot} from "@angular/fire/compat/firestore";
import {CookieService} from "ngx-cookie-service";
import {Observable} from "rxjs";
import {CreateReport, ExistingReport, Report} from "../../../types/Report";

@Injectable({
	providedIn: 'root'
})
export class ReportService {
	
	private readonly collectionName = 'Report';
	
	constructor(
		private db: AngularFirestore,
		private cookieService: CookieService
	) {
	}
	
	getAllReports(): Observable<QuerySnapshot<Report>> {
		const userId = this.cookieService.get("userId");
		
		return this.db
		.collection<Report>(this.collectionName, ref => ref.where('reporterId', '==', userId))
		.get();
	}
	
	getReportById(id: string): Promise<ExistingReport> {
		return new Promise(resolve => {
			const userId = this.cookieService.get("userId");
			
			this.db
			.collection<ExistingReport>(this.collectionName, ref => ref.where('reporterId', '==', userId))
			.doc(id)
			.valueChanges()
			.subscribe(value => resolve({...value, id} as ExistingReport));
		})
	}
	
	createReport(report: CreateReport): Promise<DocumentReference<Report>> {
		return this.db.collection(this.collectionName).add(report) as Promise<DocumentReference<Report>>;
	}
	
	updateReport(report: Report) {
		const {id, ...reportWithoutId} = report;
		return this.db.collection(this.collectionName).doc(id).update(reportWithoutId);
	}
	
	deleteReport(reportId: string) {
		return this.db.collection(this.collectionName).doc(reportId).delete();
	}
}
