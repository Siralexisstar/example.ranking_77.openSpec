import type { JoinRequestDraft, WodResultDraft } from "../types/models";

type JoinRequestField =
	| "athleteName"
	| "division"
	| "experienceLevel"
	| "notes";

type WodResultField =
	| "athleteId"
	| "athleteName"
	| "workoutDate"
	| "workoutName"
	| "resultValue"
	| "resultUnit"
	| "notes";

export type FieldErrors<T extends string> = Partial<Record<T, string>>;

export function validateJoinRequest(draft: JoinRequestDraft) {
	const errors: FieldErrors<JoinRequestField> = {};

	if (!draft.athleteName.trim()) {
		errors.athleteName = "Introduce el nombre del atleta.";
	}

	if (!draft.division.trim()) {
		errors.division = "Selecciona una division.";
	}

	if (!draft.experienceLevel.trim()) {
		errors.experienceLevel = "Indica el nivel de experiencia.";
	}

	if (draft.notes.trim().length > 180) {
		errors.notes = "Limita las notas a 180 caracteres.";
	}

	return errors;
}

interface ValidateWodResultOptions {
	requireAthleteSelection?: boolean;
}

export function validateWodResult(
	draft: WodResultDraft,
	options: ValidateWodResultOptions = {},
) {
	const errors: FieldErrors<WodResultField> = {};
	const { requireAthleteSelection = false } = options;

	if (requireAthleteSelection && !draft.athleteId?.trim()) {
		errors.athleteId = "Selecciona el atleta.";
	}

	if (!draft.athleteName.trim()) {
		errors.athleteName = "Selecciona o indica el atleta.";
	}

	if (!draft.workoutDate.trim()) {
		errors.workoutDate = "Selecciona la fecha del WOD.";
	} else {
		const today = new Date().toISOString().slice(0, 10);
		if (draft.workoutDate > today) {
			errors.workoutDate =
				"Solo se pueden registrar WODs de hoy o dias anteriores.";
		}
	}

	if (!draft.workoutName.trim()) {
		errors.workoutName = "Introduce el nombre del WOD.";
	}

	if (!draft.resultValue.trim()) {
		errors.resultValue = "Introduce el resultado del atleta.";
	}

	if (!draft.resultUnit.trim()) {
		errors.resultUnit = "Selecciona el formato del resultado.";
	}

	if (draft.notes.trim().length > 240) {
		errors.notes = "Limita las notas a 240 caracteres.";
	}

	return errors;
}
