import { JoinRankingForm } from "../components/JoinRankingForm";
import { RankingList } from "../components/RankingList";
import { SectionHeading } from "../components/SectionHeading";
import { TrainingCarousel } from "../components/TrainingCarousel";
import {
	athletes,
	buildDashboardMetrics,
	rankingEntries,
	weeklyTrainingSessions,
} from "../services/mockData";
import type {
	AuthSession,
	JoinRequest,
	JoinRequestDraft,
	WodResultSubmission,
} from "../types/models";

interface DashboardPageProps {
	joinRequests: JoinRequest[];
	onGoToLogin: () => void;
	onGoToResults: () => void;
	onSubmitJoinRequest: (draft: JoinRequestDraft) => void;
	session: AuthSession | null;
	wodResults: WodResultSubmission[];
}

export function DashboardPage({
	joinRequests,
	onGoToLogin,
	onGoToResults,
	onSubmitJoinRequest,
	session,
	wodResults,
}: DashboardPageProps) {
	const metrics = buildDashboardMetrics(joinRequests, wodResults);
	const nextTraining = weeklyTrainingSessions[0];

	return (
		<div className="page-stack">
			<header className="hero-panel">
				<nav className="topbar" aria-label="Principal">
					<div className="brand-lockup">
						<div className="brand-mark" aria-hidden="true">
							R77
						</div>
						<div>
							<p className="eyebrow">Ranking 77</p>
							<p className="brand-subtitle">
								Panel interno para seguir ranking, entrenos y WODs del box
							</p>
						</div>
					</div>
					<div className="topbar-actions">
						<a className="ghost-link" href="#ranking">
							Ver ranking
						</a>
						<button
							className="button button-primary"
							onClick={session ? onGoToResults : onGoToLogin}
							type="button"
						>
							{session ? "Registrar WOD" : "Login"}
						</button>
					</div>
				</nav>

				<div className="hero-grid">
					<div className="hero-copy">
						<p className="section-kicker">Semana operativa del box</p>
						<h1>Ranking, entrenos y resultados sin capa comercial.</h1>
						<p className="hero-text">
							Este panel resume quien esta activo en el ranking, que sesiones
							toca preparar esta semana y como registrar resultados cuando el
							WOD se carga en el momento o mas tarde.
						</p>
						<div className="hero-actions">
							<button
								className="button button-primary"
								onClick={onGoToResults}
								type="button"
							>
								Cargar resultado
							</button>
							<a className="button button-secondary" href="#join">
								Unirse al ranking
							</a>
						</div>
						<ul className="metric-grid" aria-label="Resumen del box">
							{metrics.map((metric) => (
								<li className="metric-card" key={metric.label}>
									<span>{metric.label}</span>
									<strong>{metric.value}</strong>
									<p>{metric.detail}</p>
								</li>
							))}
						</ul>
					</div>

					<aside className="summary-card">
						<p className="eyebrow">Siguiente bloque</p>
						<h3>{nextTraining.title}</h3>
						<ul className="summary-list">
							<li>{nextTraining.weekday}</li>
							<li>{nextTraining.time}</li>
							<li>{nextTraining.coach}</li>
						</ul>
						<p className="summary-copy">{nextTraining.notes}</p>
						{session ? (
							<div className="status-banner">
								Sesion iniciada como {session.displayName}
							</div>
						) : (
							<div className="status-banner status-banner-muted">
								Login requerido para registrar WODs
							</div>
						)}
					</aside>
				</div>
			</header>

			<section className="section-card">
				<SectionHeading
					copy="Las sesiones se muestran como un rail semanal para que atletas y coaches vean rapido que toca esta semana."
					eyebrow="Entrenos de la semana"
					title="Carrusel semanal con foco, horario y contexto."
				/>
				<TrainingCarousel sessions={weeklyTrainingSessions} />
			</section>

			<section className="section-card" id="ranking">
				<SectionHeading
					copy="El ranking aparece antes que cualquier alta nueva porque sigue siendo la referencia principal del box."
					eyebrow="Ranking actual"
					title="Listado de atletas con lectura rapida y miniatura reconocible."
				/>
				<RankingList athletes={athletes} rankings={rankingEntries} />
			</section>

			<section className="section-card" id="join">
				<SectionHeading
					copy="Si alguien del box quiere entrar en el seguimiento, puede dejar una solicitud breve para la siguiente revision interna."
					eyebrow="Alta de atletas"
					title="Unirse al ranking sin convertirlo en una pagina de captacion."
				/>
				<JoinRankingForm
					onSubmit={onSubmitJoinRequest}
					pendingCount={joinRequests.length}
				/>
			</section>
		</div>
	);
}
