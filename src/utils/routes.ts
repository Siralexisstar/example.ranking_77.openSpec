export const routes = ["dashboard", "login", "results"] as const;

export type AppRoute = (typeof routes)[number];

export function parseRoute(hash: string): AppRoute {
	const normalized = hash.replace(/^#\/?/, "");

	if (normalized === "login" || normalized === "results") {
		return normalized;
	}

	return "dashboard";
}

export function getRouteHref(route: AppRoute) {
	return `#/${route}`;
}
