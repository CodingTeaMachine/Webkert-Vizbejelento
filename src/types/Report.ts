export interface Report {
	id: string
	start: Date
	end: Date
	amountUsed: number
	reporterId: string
}

export type CreateReport = Omit<Report, 'id'>;

export interface ExistingReport {
	id: string
	start: FirebaseDate
	end: FirebaseDate
	amountUsed: number
	reporterId: string
}

export interface FirebaseDate {
	milliseconds: number,
	seconds: number,
}
