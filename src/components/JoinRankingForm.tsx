import { useState } from "react";
import { experienceLevels, joinDivisions } from "../services/mockData";
import type { JoinRequestDraft } from "../types/models";
import { validateJoinRequest } from "../utils/validation";

interface JoinRankingFormProps {
	onSubmit: (draft: JoinRequestDraft) => void;
	pendingCount: number;
}

const initialDraft: JoinRequestDraft = {
	athleteName: "",
	division: "",
	experienceLevel: "",
	notes: "",
};

export function JoinRankingForm({
	onSubmit,
	pendingCount,
}: JoinRankingFormProps) {
	const [draft, setDraft] = useState(initialDraft);
	const [feedback, setFeedback] = useState("");
	const [errors, setErrors] = useState<ReturnType<typeof validateJoinRequest>>(
		{},
	);

	function updateField<Key extends keyof JoinRequestDraft>(
		field: Key,
		value: JoinRequestDraft[Key],
	) {
		setDraft((current) => ({ ...current, [field]: value }));
	}

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		const nextErrors = validateJoinRequest(draft);
		setErrors(nextErrors);

		if (Object.keys(nextErrors).length > 0) {
			setFeedback("");
			return;
		}

		onSubmit(draft);
		setDraft(initialDraft);
		setErrors({});
		setFeedback("Solicitud enviada. La revision queda pendiente del staff.");
	}

	return (
		<div className="join-layout">
			<div className="join-sidecard">
				<p className="eyebrow">Estado interno</p>
				<h3>{pendingCount} solicitudes pendientes</h3>
				<p>
					El staff revisa altas nuevas una vez por semana antes de moverlas al
					ranking activo.
				</p>
			</div>
			<form className="form-card" noValidate onSubmit={handleSubmit}>
				<div className="form-grid">
					<label>
						<span>Nombre del atleta</span>
						<input
							onChange={(event) =>
								updateField("athleteName", event.target.value)
							}
							placeholder="Ej. Lucia Torres"
							value={draft.athleteName}
						/>
						{errors.athleteName ? (
							<small className="field-error">{errors.athleteName}</small>
						) : null}
					</label>
					<label>
						<span>Division</span>
						<select
							onChange={(event) => updateField("division", event.target.value)}
							value={draft.division}
						>
							<option value="">Selecciona una division</option>
							{joinDivisions.map((division) => (
								<option key={division} value={division}>
									{division}
								</option>
							))}
						</select>
						{errors.division ? (
							<small className="field-error">{errors.division}</small>
						) : null}
					</label>
					<label>
						<span>Experiencia</span>
						<select
							onChange={(event) =>
								updateField("experienceLevel", event.target.value)
							}
							value={draft.experienceLevel}
						>
							<option value="">Selecciona un nivel</option>
							{experienceLevels.map((level) => (
								<option key={level} value={level}>
									{level}
								</option>
							))}
						</select>
						{errors.experienceLevel ? (
							<small className="field-error">{errors.experienceLevel}</small>
						) : null}
					</label>
					<label className="form-span-2">
						<span>Notas para el staff</span>
						<textarea
							onChange={(event) => updateField("notes", event.target.value)}
							placeholder="Benchmark reciente, disponibilidad o categoria objetivo"
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
						Enviar solicitud
					</button>
					{feedback ? <p className="form-feedback">{feedback}</p> : null}
				</div>
			</form>
		</div>
	);
}
