export type SessionRole = "athlete" | "coach";

export interface Athlete {
	id: string;
	name: string;
	division: string;
	initials: string;
	avatarColor: string;
	highlight: string;
	attendanceRate: number;
}

export interface RankingEntry {
	athleteId: string;
	rank: number;
	score: number;
	trend: string;
	lastResult: string;
	weeklyDelta: number;
}

export interface TrainingSession {
	id: string;
	date: string;
	weekday: string;
	title: string;
	focus: string;
	time: string;
	coach: string;
	lane: string;
	notes: string;
}

export interface JoinRequestDraft {
	athleteName: string;
	division: string;
	experienceLevel: string;
	notes: string;
}

export interface JoinRequest extends JoinRequestDraft {
	id: string;
	createdAt: string;
	status: "pending";
}

export interface AuthSession {
	accountId: string;
	displayName: string;
	role: SessionRole;
	athleteId?: string;
	createdAt: string;
}

export interface LoginAccount {
	id: string;
	displayName: string;
	role: SessionRole;
	athleteId?: string;
	accessCode: string;
}

export interface WodResultDraft {
	athleteId?: string;
	athleteName: string;
	workoutDate: string;
	workoutName: string;
	resultValue: string;
	resultUnit: string;
	notes: string;
}

export interface WodResultSubmission extends WodResultDraft {
	id: string;
	submittedBy: string;
	submittedAt: string;
}

export interface DashboardMetric {
	label: string;
	value: string;
	detail: string;
}
