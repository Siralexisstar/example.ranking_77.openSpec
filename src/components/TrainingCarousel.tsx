import { useRef } from "react";
import type { TrainingSession } from "../types/models";

interface TrainingCarouselProps {
	sessions: TrainingSession[];
}

export function TrainingCarousel({ sessions }: TrainingCarouselProps) {
	const railRef = useRef<HTMLDivElement | null>(null);

	function scrollRail(direction: "back" | "forward") {
		const rail = railRef.current;
		if (!rail) {
			return;
		}

		const amount = rail.clientWidth * 0.8;
		rail.scrollBy({
			left: direction === "forward" ? amount : -amount,
			behavior: "smooth",
		});
	}

	return (
		<div className="carousel-shell">
			<nav aria-label="Controles de entrenos" className="carousel-actions">
				<button
					className="button button-secondary button-compact"
					onClick={() => scrollRail("back")}
					type="button"
				>
					Anterior
				</button>
				<button
					className="button button-secondary button-compact"
					onClick={() => scrollRail("forward")}
					type="button"
				>
					Siguiente
				</button>
			</nav>
			<div className="training-rail" ref={railRef}>
				{sessions.map((session) => (
					<article className="training-card" key={session.id}>
						<div className="training-card-head">
							<div>
								<p className="training-day">{session.weekday}</p>
								<h3>{session.title}</h3>
							</div>
							<span className="status-chip">{session.time}</span>
						</div>
						<ul className="training-meta">
							<li>{session.date}</li>
							<li>{session.coach}</li>
							<li>{session.lane}</li>
						</ul>
						<p className="training-focus">{session.focus}</p>
						<p className="training-notes">{session.notes}</p>
					</article>
				))}
			</div>
		</div>
	);
}
