import type { AuthSession } from "../types/models";
import { loginAccounts } from "./mockData";

export function authenticateUser(accountId: string, accessCode: string) {
	const account = loginAccounts.find((candidate) => candidate.id === accountId);

	if (!account || account.accessCode !== accessCode.trim()) {
		return {
			ok: false as const,
			error: "El usuario o el codigo interno no son validos.",
		};
	}

	const session: AuthSession = {
		accountId: account.id,
		displayName: account.displayName,
		role: account.role,
		athleteId: account.athleteId,
		createdAt: new Date().toISOString(),
	};

	return {
		ok: true as const,
		session,
	};
}
