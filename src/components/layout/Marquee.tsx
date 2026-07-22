import { Box, SxProps, Theme } from "@mui/material";
import { keyframes } from "@mui/system";
import { ReactNode } from "react";

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(calc(-50% - 12px)); }
`;

export interface MarqueeProps {
	children: ReactNode;
	speed?: number; // duration in seconds
	pauseOnHover?: boolean;
	sx?: SxProps<Theme>;
}

export function Marquee({
	children,
	speed = 25,
	pauseOnHover = true,
	sx,
}: MarqueeProps) {
	return (
		<Box
			sx={{
				display: "flex",
				gap: 3,
				width: "max-content",
				animation: `${scrollAnimation} ${speed}s linear infinite`,
				px: 3,
				"&:hover": pauseOnHover
					? {
							animationPlayState: "paused",
					  }
					: {},
				...sx,
			}}
		>
			{children}
		</Box>
	);
}
