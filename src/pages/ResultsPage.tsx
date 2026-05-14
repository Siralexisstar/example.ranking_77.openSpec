import { useState } from "react";
import { athletes, resultUnits } from "../services/mockData";
import type {
	AuthSession,
	WodResultDraft,
	WodResultSubmission,
} from "../types/models";
import { validateWodResult } from "../utils/validation";

interface ResultsPageProps {
	onBack: () => void;
	onLogout: () => void;
	onSubmitResult: (draft: WodResultDraft) => void;
	results: WodResultSubmission[];
	session: AuthSession;
}

function createInitialDraft(session: AuthSession): WodResultDraft {
	const athlete = athletes.find(
		(candidate) => candidate.id === session.athleteId,
	);

	return {
		athleteId: athlete?.id,
		athleteName:
			athlete?.name ?? (session.role === "coach" ? "" : session.displayName),
		workoutDate: new Date().toISOString().slice(0, 10),
		workoutName: "",
		resultValue: "",
		resultUnit: resultUnits[0],
		notes: "",
	};
}

export function ResultsPage({
	onBack,
	onLogout,
	onSubmitResult,
	results,
	session,
}: ResultsPageProps) {
	const [draft, setDraft] = useState(() => createInitialDraft(session));
	const [errors, setErrors] = useState<ReturnType<typeof validateWodResult>>(
		{},
	);
	const [feedback, setFeedback] = useState("");

	function updateField<Key extends keyof WodResultDraft>(
		field: Key,
		value: WodResultDraft[Key],
	) {
		setDraft((current) => ({ ...current, [field]: value }));
	}

	function handleAthleteChange(athleteId: string) {
		const athlete = athletes.find((candidate) => candidate.id === athleteId);
		setDraft((current) => ({
			...current,
			athleteId,
			athleteName: athlete?.name ?? "",
		}));
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validateWodResult(draft, {
			requireAthleteSelection: session.role === "coach",
		});
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			setFeedback("");
			return;
		}

		onSubmitResult(draft);
		setFeedback(
			`Resultado guardado para ${draft.athleteName} en ${draft.workoutDate}.`,
		);
		setDraft({
			...createInitialDraft(session),
			workoutDate: draft.workoutDate,
		});
		setErrors({});
	}

	const visibleResults = results.slice(0, 5);

	return (
		<div className="results-layout">
			<header className="results-topbar">
				<div>
					<p className="section-kicker">Registro interno</p>
					<h1 className="page-title">Carga de WODs del dia o atrasados</h1>
					<p className="section-copy">
						Sesion activa como {session.displayName}. Los resultados se guardan
						en el navegador para poder revisar altas recientes.
					</p>
				</div>
				<div className="topbar-actions">
					<button
						className="button button-secondary"
						onClick={onBack}
						type="button"
					>
						Volver
					</button>
					<button
						className="button button-secondary"
						onClick={onLogout}
						type="button"
					>
						Cerrar sesion
					</button>
				</div>
			</header>

			<div className="results-grid">
				<form className="form-card" noValidate onSubmit={handleSubmit}>
					<div className="form-grid">
						{session.role === "coach" ? (
							<label className="form-span-2">
								<span>Atleta</span>
								<select
									onChange={(event) => handleAthleteChange(event.target.value)}
									value={draft.athleteId}
								>
									<option value="">Selecciona atleta</option>
									{athletes.map((athlete) => (
										<option key={athlete.id} value={athlete.id}>
											{athlete.name}
										</option>
									))}
								</select>
								{errors.athleteId || errors.athleteName ? (
									<small className="field-error">
										{errors.athleteId || errors.athleteName}
									</small>
								) : null}
							</label>
						) : (
							<label className="form-span-2">
								<span>Atleta</span>
								<input readOnly value={draft.athleteName} />
							</label>
						)}
						<label>
							<span>Fecha del WOD</span>
							<input
								onChange={(event) =>
									updateField("workoutDate", event.target.value)
								}
								type="date"
								value={draft.workoutDate}
							/>
							{errors.workoutDate ? (
								<small className="field-error">{errors.workoutDate}</small>
							) : null}
						</label>
						<label>
							<span>Formato</span>
							<select
								onChange={(event) =>
									updateField("resultUnit", event.target.value)
								}
								value={draft.resultUnit}
							>
								{resultUnits.map((unit) => (
									<option key={unit} value={unit}>
										{unit}
									</option>
								))}
							</select>
							{errors.resultUnit ? (
								<small className="field-error">{errors.resultUnit}</small>
							) : null}
						</label>
						<label className="form-span-2">
							<span>Nombre del WOD</span>
							<input
								onChange={(event) =>
									updateField("workoutName", event.target.value)
								}
								placeholder="Ej. Friday throwdown heat 2"
								value={draft.workoutName}
							/>
							{errors.workoutName ? (
								<small className="field-error">{errors.workoutName}</small>
							) : null}
						</label>
						<label className="form-span-2">
							<span>Resultado</span>
							<input
								onChange={(event) =>
									updateField("resultValue", event.target.value)
								}
								placeholder="Ej. 8:14, 126 reps o 87 kg"
								value={draft.resultValue}
							/>
							{errors.resultValue ? (
								<small className="field-error">{errors.resultValue}</small>
							) : null}
						</label>
						<label className="form-span-2">
							<span>Notas</span>
							<textarea
								onChange={(event) => updateField("notes", event.target.value)}
								placeholder="Escalado, observaciones o heat"
								rows={4}
								value={draft.notes}
							/>
							{errors.notes ? (
								<small className="field-error">{errors.notes}</small>
							) : null}
						</label>
					</div>
					<div className="form-footer">
						<button className="button button-primary" type="submit">
							Guardar resultado
						</button>
						{feedback ? <p className="form-feedback">{feedback}</p> : null}
					</div>
				</form>

				<aside className="history-card">
					<p className="eyebrow">Ultimos registros</p>
					<h3>Historial reciente en este navegador</h3>
					{visibleResults.length === 0 ? (
						<p className="history-empty">
							Todavia no hay resultados guardados en esta sesion local.
						</p>
					) : (
						<ul className="history-list">
							{visibleResults.map((result) => (
								<li className="history-item" key={result.id}>
									<div>
										<strong>{result.athleteName}</strong>
										<p>{result.workoutName}</p>
									</div>
									<div className="history-meta">
										<span>{result.workoutDate}</span>
										<span>{result.resultValue}</span>
										<span>{result.resultUnit}</span>
									</div>
								</li>
							))}
						</ul>
					)}
				</aside>
			</div>
		</div>
	);
}
