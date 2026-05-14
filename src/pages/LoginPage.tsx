import { useState } from "react";
import { loginAccounts } from "../services/mockData";

interface LoginPageProps {
	errorMessage: string;
	onBack: () => void;
	onLogin: (accountId: string, accessCode: string) => boolean;
}

export function LoginPage({ errorMessage, onBack, onLogin }: LoginPageProps) {
	const [accountId, setAccountId] = useState(loginAccounts[0]?.id ?? "");
	const [accessCode, setAccessCode] = useState("");
	const [localError, setLocalError] = useState("");

	function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
		event.preventDefault();
		setLocalError("");

		if (!accountId || !accessCode.trim()) {
			setLocalError("Selecciona un usuario e introduce el codigo interno.");
			return;
		}

		const success = onLogin(accountId, accessCode);
		if (!success) {
			setLocalError("No se pudo iniciar sesion con esos datos.");
		}
	}

	return (
		<section className="auth-shell">
			<div className="auth-card">
				<p className="section-kicker">Login interno</p>
				<h1 className="page-title">Acceso al registro de resultados</h1>
				<p className="auth-copy">
					Selecciona un perfil del box y usa el codigo interno para entrar al
					panel de carga de WODs.
				</p>
				<p className="auth-hint">Codigo demo interno: R77-BOX</p>
				<form className="form-card" noValidate onSubmit={handleSubmit}>
					<div className="form-grid">
						<label className="form-span-2">
							<span>Perfil</span>
							<select
								onChange={(event) => setAccountId(event.target.value)}
								value={accountId}
							>
								{loginAccounts.map((account) => (
									<option key={account.id} value={account.id}>
										{account.displayName}
									</option>
								))}
							</select>
						</label>
						<label className="form-span-2">
							<span>Codigo del box</span>
							<input
								onChange={(event) => setAccessCode(event.target.value)}
								placeholder="Introduce el codigo interno"
								type="password"
								value={accessCode}
							/>
						</label>
					</div>
					<div className="form-footer form-footer-spread">
						<button
							className="button button-secondary"
							onClick={onBack}
							type="button"
						>
							Volver al dashboard
						</button>
						<button className="button button-primary" type="submit">
							Entrar
						</button>
					</div>
					{errorMessage || localError ? (
						<p className="field-error auth-error">
							{localError || errorMessage}
						</p>
					) : null}
				</form>
			</div>
		</section>
	);
}
