import type { Athlete, RankingEntry } from "../types/models";
import { Avatar } from "./Avatar";

interface RankingListProps {
	athletes: Athlete[];
	rankings: RankingEntry[];
}

export function RankingList({ athletes, rankings }: RankingListProps) {
	const athleteMap = new Map(athletes.map((athlete) => [athlete.id, athlete]));

	return (
		<ol className="ranking-list">
			{rankings.map((entry) => {
				const athlete = athleteMap.get(entry.athleteId);
				if (!athlete) {
					return null;
				}

				return (
					<li className="ranking-row" key={entry.athleteId}>
						<div className="ranking-rank">
							<span>{entry.rank.toString().padStart(2, "0")}</span>
						</div>
						<div className="ranking-athlete">
							<Avatar color={athlete.avatarColor} initials={athlete.initials} />
							<div className="ranking-identity">
								<h3>{athlete.name}</h3>
								<p>{athlete.division}</p>
							</div>
						</div>
						<div className="ranking-summary">
							<strong>{entry.score.toFixed(1)}</strong>
							<span>Indice</span>
						</div>
						<div className="ranking-details">
							<p>{athlete.highlight}</p>
							<ul>
								<li>{entry.lastResult}</li>
								<li>{entry.trend}</li>
								<li>Asistencia {athlete.attendanceRate}%</li>
							</ul>
						</div>
					</li>
				);
			})}
		</ol>
	);
}
