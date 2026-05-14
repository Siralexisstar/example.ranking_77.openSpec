import "./App.css";

const leaderboard = [
	{
		rank: "01",
		name: "Mika Torres",
		division: "Elite Women",
		score: "97.4",
		change: "+2 positions",
		highlight: "Sprint engine",
	},
	{
		rank: "02",
		name: "Jonas Vale",
		division: "Elite Men",
		score: "96.8",
		change: "Holds top snatch",
		highlight: "Heavy lift",
	},
	{
		rank: "03",
		name: "Sora Bennett",
		division: "Teams",
		score: "95.9",
		change: "Won last event",
		highlight: "Pacing control",
	},
	{
		rank: "04",
		name: "Ari Navarro",
		division: "Masters 35-39",
		score: "94.7",
		change: "Top 3 in endurance",
		highlight: "Engine depth",
	},
];

const divisions = ["Elite", "Teams", "Masters", "Rookies", "Adaptive"];

const signals = [
	{
		label: "Weekly movement score",
		value: "12",
		copy: "Benchmarks blend strength, pacing, and repeatability into a single ranking language.",
	},
	{
		label: "Tracked gyms",
		value: "64",
		copy: "Local leaderboards can grow into regional narratives without redesigning the shell.",
	},
	{
		label: "Verified event windows",
		value: "03",
		copy: "Competition blocks keep rankings timely and credible for athletes checking in on mobile.",
	},
];

const pillars = [
	{
		title: "Competition Clarity",
		copy: "Ordered performance surfaces keep movement, score, and momentum visible at a glance.",
	},
	{
		title: "Benchmarks That Matter",
		copy: "Strength, engine, and skill work show up as distinct signals instead of collapsing into generic totals.",
	},
	{
		title: "Built For The Floor",
		copy: "Touch-friendly layouts let athletes, coaches, and communities scan standings between heats.",
	},
];

function App() {
	return (
		<div className="site-shell" id="top">
			<header className="hero-section">
				<nav className="topbar" aria-label="Primary">
					<div className="brand-lockup">
						<span className="brand-mark" aria-hidden="true">
							R77
						</span>
						<div>
							<p className="eyebrow">Ranking 77</p>
							<p className="brand-subtitle">
								Performance standings for modern CrossFit competition
							</p>
						</div>
					</div>
					<a className="ghost-link" href="#leaderboard">
						View leaderboard
					</a>
				</nav>

				<div className="hero-grid">
					<div className="hero-copy">
						<p className="section-kicker">
							Competitive ranking, not generic fitness content
						</p>
						<h1>
							Track the athletes setting the standard across every division.
						</h1>
						<p className="hero-text">
							A premium ranking surface for gyms, events, and communities that
							want clear standings, sharp storytelling, and momentum you can
							read in seconds.
						</p>
						<div className="hero-actions">
							<a className="button button-primary" href="#leaderboard">
								Explore the top 10
							</a>
							<a className="button button-secondary" href="#spotlight">
								See this week&apos;s spotlight
							</a>
						</div>
						<ul className="hero-metrics" aria-label="Platform highlights">
							<li>
								<strong>240+</strong>
								<span>athletes ranked this cycle</span>
							</li>
							<li>
								<strong>08</strong>
								<span>benchmark categories tracked</span>
							</li>
							<li>
								<strong>24h</strong>
								<span>average leaderboard refresh cadence</span>
							</li>
						</ul>
					</div>

					<aside className="hero-panel" aria-label="Featured ranking snapshot">
						<div className="panel-head">
							<p className="eyebrow">Current pulse</p>
							<span className="status-chip">Updated after Open Heat 5</span>
						</div>
						<div className="panel-score">
							<span className="panel-score-label">Overall leader index</span>
							<strong>97.4</strong>
						</div>
						<div className="panel-grid">
							<div>
								<span>Best climb</span>
								<strong>+7 spots</strong>
							</div>
							<div>
								<span>Most stable</span>
								<strong>4 events</strong>
							</div>
							<div>
								<span>Top region</span>
								<strong>Madrid East</strong>
							</div>
							<div>
								<span>Next lock</span>
								<strong>18:00 CET</strong>
							</div>
						</div>
					</aside>
				</div>
			</header>

			<main>
				<section className="section leaderboard-section" id="leaderboard">
					<div className="section-heading">
						<div>
							<p className="section-kicker">Ranking preview</p>
							<h2>
								The leaderboard sits near the top because it is the product.
							</h2>
						</div>
						<p className="section-copy">
							Rows stay readable on smaller screens while still carrying score,
							division, and momentum.
						</p>
					</div>

					<div className="leaderboard-layout">
						<ol className="leaderboard-card">
							{leaderboard.map((athlete) => (
								<li className="leaderboard-row" key={athlete.rank}>
									<div className="leaderboard-rank" aria-hidden="true">
										{athlete.rank}
									</div>
									<div className="leaderboard-athlete">
										<div className="leaderboard-identity">
											<h3>{athlete.name}</h3>
											<p>{athlete.division}</p>
										</div>
										<div className="leaderboard-meta">
											<span>{athlete.highlight}</span>
											<span>{athlete.change}</span>
										</div>
									</div>
									<div className="leaderboard-score">
										<span>Index</span>
										<strong>{athlete.score}</strong>
									</div>
								</li>
							))}
						</ol>

						<div className="support-card">
							<p className="eyebrow">Division spread</p>
							<ul className="division-list" aria-label="Available divisions">
								{divisions.map((division) => (
									<li key={division}>{division}</li>
								))}
							</ul>
							<p className="support-copy">
								The shell already makes room for multiple ranking states without
								turning into a cramped desktop table.
							</p>
						</div>
					</div>
				</section>

				<section
					className="section signal-section"
					aria-labelledby="signals-heading"
				>
					<div className="section-heading">
						<div>
							<p className="section-kicker">Performance signals</p>
							<h2 id="signals-heading">
								Metrics that keep the experience grounded in competition.
							</h2>
						</div>
					</div>
					<div className="signal-grid">
						{signals.map((signal) => (
							<article className="signal-card" key={signal.label}>
								<p>{signal.label}</p>
								<strong>{signal.value}</strong>
								<span>{signal.copy}</span>
							</article>
						))}
					</div>
				</section>

				<section className="section pillars-section">
					<div className="section-heading">
						<div>
							<p className="section-kicker">Why it feels different</p>
							<h2>
								Athletic atmosphere delivered through hierarchy, contrast, and
								disciplined surfaces.
							</h2>
						</div>
						<p className="section-copy">
							Instead of leaning on media-heavy effects, the layout uses cards,
							texture, spacing, and clear calls to action.
						</p>
					</div>
					<div className="pillar-grid">
						{pillars.map((pillar) => (
							<article className="pillar-card" key={pillar.title}>
								<h3>{pillar.title}</h3>
								<p>{pillar.copy}</p>
							</article>
						))}
					</div>
				</section>

				<section className="section spotlight-section" id="spotlight">
					<div className="spotlight-card">
						<div className="spotlight-copy">
							<p className="section-kicker">Athlete spotlight</p>
							<h2>
								Momentum belongs to athletes who can hold intensity after the
								board tightens.
							</h2>
							<p>
								This week&apos;s featured story centers on composure under
								fatigue: clean execution, fast transitions, and scoring that
								holds up when the event window gets crowded.
							</p>
						</div>
						<div className="spotlight-quote">
							<p>
								&ldquo;I don&apos;t need a louder feed. I need a board that
								tells me who is moving, who is steady, and where I stand before
								the next heat starts.&rdquo;
							</p>
							<span>Featured athlete note</span>
						</div>
					</div>
				</section>
			</main>

			<footer className="section cta-section">
				<div>
					<p className="section-kicker">Ready for live rankings</p>
					<h2>
						Build the ranking home your community checks before and after every
						event.
					</h2>
				</div>
				<a className="button button-primary" href="#top">
					Request early access
				</a>
			</footer>
		</div>
	);
}

export default App;
