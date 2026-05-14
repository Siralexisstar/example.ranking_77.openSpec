import type {
	AuthSession,
	JoinRequest,
	JoinRequestDraft,
	WodResultDraft,
	WodResultSubmission,
} from "../types/models";

const STORAGE_KEYS = {
	session: "ranking77.session",
	joinRequests: "ranking77.joinRequests",
	wodResults: "ranking77.wodResults",
} as const;

function createId(prefix: string) {
	return `${prefix}-${Math.random().toString(36).slice(2, 10)}`;
}

function safeRead<T>(key: string, fallback: T): T {
	if (typeof window === "undefined") {
		return fallback;
	}

	try {
		const raw = window.localStorage.getItem(key);
		if (!raw) {
			return fallback;
		}

		return JSON.parse(raw) as T;
	} catch {
		return fallback;
	}
}

function safeWrite<T>(key: string, value: T) {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.setItem(key, JSON.stringify(value));
}

export function loadSession() {
	return safeRead<AuthSession | null>(STORAGE_KEYS.session, null);
}

export function saveSession(session: AuthSession) {
	safeWrite(STORAGE_KEYS.session, session);
}

export function clearSession() {
	if (typeof window === "undefined") {
		return;
	}

	window.localStorage.removeItem(STORAGE_KEYS.session);
}

export function loadJoinRequests() {
	return safeRead<JoinRequest[]>(STORAGE_KEYS.joinRequests, []);
}

export function appendJoinRequest(draft: JoinRequestDraft) {
	const request: JoinRequest = {
		...draft,
		id: createId("join"),
		createdAt: new Date().toISOString(),
		status: "pending",
	};
	const requests = [request, ...loadJoinRequests()];
	safeWrite(STORAGE_KEYS.joinRequests, requests);

	return request;
}

export function loadWodResults() {
	return safeRead<WodResultSubmission[]>(STORAGE_KEYS.wodResults, []);
}

export function appendWodResult(
	draft: WodResultDraft,
	submittedBy: string,
): WodResultSubmission {
	const submission: WodResultSubmission = {
		...draft,
		id: createId("wod"),
		submittedBy,
		submittedAt: new Date().toISOString(),
	};
	const storedResults = [submission, ...loadWodResults()];
	safeWrite(STORAGE_KEYS.wodResults, storedResults);

	return submission;
}
