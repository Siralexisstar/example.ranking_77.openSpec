interface AvatarProps {
	color: string;
	initials: string;
}

export function Avatar({ color, initials }: AvatarProps) {
	return (
		<span
			aria-hidden="true"
			className="avatar"
			style={{ "--avatar-color": color } as React.CSSProperties}
		>
			{initials}
		</span>
	);
}
