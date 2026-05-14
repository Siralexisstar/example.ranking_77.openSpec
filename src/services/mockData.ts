import type {
	Athlete,
	DashboardMetric,
	JoinRequest,
	LoginAccount,
	RankingEntry,
	TrainingSession,
	WodResultSubmission,
} from "../types/models";

export const athletes: Athlete[] = [
	{
		id: "ath-01",
		name: "Ines Garcia",
		division: "RX Women",
		initials: "IG",
		avatarColor: "#d76c52",
		highlight: "Strong pace on mixed modal workouts",
		attendanceRate: 96,
	},
	{
		id: "ath-02",
		name: "Pablo Romero",
		division: "RX Men",
		initials: "PR",
		avatarColor: "#73937e",
		highlight: "Top barbell consistency this month",
		attendanceRate: 92,
	},
	{
		id: "ath-03",
		name: "Sara Molina",
		division: "Scaled Women",
		initials: "SM",
		avatarColor: "#5970a8",
		highlight: "Best improvement in gymnastics volume",
		attendanceRate: 89,
	},
	{
		id: "ath-04",
		name: "Mario Lopez",
		division: "Masters 35+",
		initials: "ML",
		avatarColor: "#9274b0",
		highlight: "Most stable finish positions",
		attendanceRate: 94,
	},
	{
		id: "ath-05",
		name: "Clara Navas",
		division: "RX Women",
		initials: "CN",
		avatarColor: "#b8883b",
		highlight: "Fastest transitions in benchmark days",
		attendanceRate: 91,
	},
];

export const rankingEntries: RankingEntry[] = [
	{
		athleteId: "ath-01",
		rank: 1,
		score: 97.8,
		trend: "+2 since last week",
		lastResult: "24.3 in 8:14",
		weeklyDelta: 8,
	},
	{
		athleteId: "ath-02",
		rank: 2,
		score: 96.4,
		trend: "Holding second place",
		lastResult: "Clean ladder won",
		weeklyDelta: 3,
	},
	{
		athleteId: "ath-05",
		rank: 3,
		score: 95.2,
		trend: "+1 on engine sessions",
		lastResult: "Top split in team chipper",
		weeklyDelta: 6,
	},
	{
		athleteId: "ath-04",
		rank: 4,
		score: 93.7,
		trend: "No misses in 3 weeks",
		lastResult: "Front squat PR +5 kg",
		weeklyDelta: 2,
	},
	{
		athleteId: "ath-03",
		rank: 5,
		score: 91.9,
		trend: "+3 in attendance bonus",
		lastResult: "First toes-to-bar set unbroken",
		weeklyDelta: 7,
	},
];

export const weeklyTrainingSessions: TrainingSession[] = [
	{
		id: "mon-build",
		date: "2026-05-18",
		weekday: "Mon",
		title: "Back squat + interval row",
		focus: "Lower body strength and pacing",
		time: "19:00",
		coach: "Marta",
		lane: "Strength lane",
		notes: "Finish with 5 x 250 m row at controlled effort.",
	},
	{
		id: "tue-gym",
		date: "2026-05-19",
		weekday: "Tue",
		title: "Gymnastics density",
		focus: "Pull-ups, wall walks, handstand hold work",
		time: "18:30",
		coach: "Javi",
		lane: "Skill lane",
		notes: "Scaled options stay on strict volume quality.",
	},
	{
		id: "wed-bench",
		date: "2026-05-20",
		weekday: "Wed",
		title: "Partner benchmark day",
		focus: "Shared pacing and communication",
		time: "20:00",
		coach: "Marta",
		lane: "Main floor",
		notes: "Score posted to the weekly ranking board.",
	},
	{
		id: "thu-oly",
		date: "2026-05-21",
		weekday: "Thu",
		title: "Snatch wave + short burner",
		focus: "Technique under fatigue",
		time: "19:30",
		coach: "Luis",
		lane: "Platform lane",
		notes: "Every athlete logs best successful lift.",
	},
	{
		id: "fri-open",
		date: "2026-05-22",
		weekday: "Fri",
		title: "Friday throwdown",
		focus: "Internal ranking points session",
		time: "20:15",
		coach: "Equipo coach",
		lane: "Heat format",
		notes: "Results can be loaded the same night or later.",
	},
];

export const loginAccounts: LoginAccount[] = [
	{
		id: "coach-marta",
		displayName: "Marta (Coach)",
		role: "coach",
		accessCode: "R77-BOX",
	},
	{
		id: "ath-01",
		displayName: "Ines Garcia",
		role: "athlete",
		athleteId: "ath-01",
		accessCode: "R77-BOX",
	},
	{
		id: "ath-02",
		displayName: "Pablo Romero",
		role: "athlete",
		athleteId: "ath-02",
		accessCode: "R77-BOX",
	},
	{
		id: "ath-03",
		displayName: "Sara Molina",
		role: "athlete",
		athleteId: "ath-03",
		accessCode: "R77-BOX",
	},
];

export const joinDivisions = [
	"RX Women",
	"RX Men",
	"Scaled Women",
	"Scaled Men",
	"Masters 35+",
];

export const experienceLevels = [
	"Menos de 6 meses",
	"6 a 12 meses",
	"1 a 3 anos",
	"Mas de 3 anos",
];

export const resultUnits = ["Time", "Reps", "Kg", "Rounds + reps"];

export function getAthleteById(athleteId: string) {
	return athletes.find((athlete) => athlete.id === athleteId);
}

export function getRankedAthletes() {
	return rankingEntries
		.map((entry) => ({
			...entry,
			athlete: getAthleteById(entry.athleteId),
		}))
		.filter((entry) => entry.athlete);
}

function countTodayResults(results: WodResultSubmission[]) {
	const today = new Date().toISOString().slice(0, 10);

	return results.filter((result) => result.workoutDate === today).length;
}

export function buildDashboardMetrics(
	joinRequests: JoinRequest[],
	wodResults: WodResultSubmission[],
): DashboardMetric[] {
	return [
		{
			label: "Atletas en ranking",
			value: `${rankingEntries.length}`,
			detail: "Participacion activa esta semana",
		},
		{
			label: "Entrenos de la semana",
			value: `${weeklyTrainingSessions.length}`,
			detail: "Planificados para el box",
		},
		{
			label: "Resultados cargados hoy",
			value: `${countTodayResults(wodResults)}`,
			detail: "Registrados desde el panel interno",
		},
		{
			label: "Solicitudes pendientes",
			value: `${joinRequests.length}`,
			detail: "Atletas esperando entrar en ranking",
		},
	];
}
