import { useEffect, useState } from "react";
import "./App.css";
import { DashboardPage } from "./pages/DashboardPage";
import { LoginPage } from "./pages/LoginPage";
import { ResultsPage } from "./pages/ResultsPage";
import { authenticateUser } from "./services/auth";
import {
	appendJoinRequest,
	appendWodResult,
	clearSession,
	loadJoinRequests,
	loadSession,
	loadWodResults,
	saveSession,
} from "./services/storage";
import type {
	AuthSession,
	JoinRequest,
	JoinRequestDraft,
	WodResultDraft,
	WodResultSubmission,
} from "./types/models";
import { type AppRoute, getRouteHref, parseRoute } from "./utils/routes";

function App() {
	const [route, setRoute] = useState<AppRoute>(() =>
		parseRoute(window.location.hash),
	);
	const [session, setSession] = useState<AuthSession | null>(() =>
		loadSession(),
	);
	const [joinRequests, setJoinRequests] = useState<JoinRequest[]>(() =>
		loadJoinRequests(),
	);
	const [wodResults, setWodResults] = useState<WodResultSubmission[]>(() =>
		loadWodResults(),
	);
	const [loginError, setLoginError] = useState("");

	useEffect(() => {
		if (!window.location.hash) {
			window.location.hash = getRouteHref("dashboard");
		}

		function handleHashChange() {
			setRoute(parseRoute(window.location.hash));
		}

		window.addEventListener("hashchange", handleHashChange);

		return () => window.removeEventListener("hashchange", handleHashChange);
	}, []);

	useEffect(() => {
		if (route === "results" && !session) {
			setLoginError("Necesitas iniciar sesion para registrar resultados.");
			window.location.hash = getRouteHref("login");
		}
	}, [route, session]);

	function goTo(nextRoute: AppRoute) {
		window.location.hash = getRouteHref(nextRoute);
	}

	function handleLogin(accountId: string, accessCode: string) {
		const result = authenticateUser(accountId, accessCode);

		if (!result.ok) {
			setLoginError(result.error);
			return false;
		}

		saveSession(result.session);
		setSession(result.session);
		setLoginError("");
		goTo("results");

		return true;
	}

	function handleLogout() {
		clearSession();
		setSession(null);
		goTo("dashboard");
	}

	function handleJoinRequest(draft: JoinRequestDraft) {
		const request = appendJoinRequest(draft);
		setJoinRequests((current) => [request, ...current]);
	}

	function handleWodResult(draft: WodResultDraft) {
		if (!session) {
			return;
		}

		const submission = appendWodResult(draft, session.displayName);
		setWodResults((current) => [submission, ...current]);
	}

	return (
		<div className="app-shell">
			{route === "dashboard" ? (
				<DashboardPage
					joinRequests={joinRequests}
					onGoToLogin={() => goTo("login")}
					onGoToResults={() => goTo(session ? "results" : "login")}
					onSubmitJoinRequest={handleJoinRequest}
					session={session}
					wodResults={wodResults}
				/>
			) : null}

			{route === "login" ? (
				<LoginPage
					errorMessage={loginError}
					onBack={() => goTo("dashboard")}
					onLogin={handleLogin}
				/>
			) : null}

			{route === "results" && session ? (
				<ResultsPage
					onBack={() => goTo("dashboard")}
					onLogout={handleLogout}
					onSubmitResult={handleWodResult}
					results={wodResults}
					session={session}
				/>
			) : null}
		</div>
	);
}

export default App;
