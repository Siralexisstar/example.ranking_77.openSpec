interface SectionHeadingProps {
	eyebrow: string;
	title: string;
	copy?: string;
}

export function SectionHeading({ eyebrow, title, copy }: SectionHeadingProps) {
	return (
		<div className="section-heading">
			<div>
				<p className="section-kicker">{eyebrow}</p>
				<h2>{title}</h2>
			</div>
			{copy ? <p className="section-copy">{copy}</p> : null}
		</div>
	);
}
