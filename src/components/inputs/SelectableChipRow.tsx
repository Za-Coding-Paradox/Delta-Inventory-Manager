import { Box, Chip, SxProps, Theme } from "@mui/material";

export interface ChipOption {
	label: string;
	value: string | null;
}

export interface SelectableChipRowProps {
	options: ChipOption[];
	value: string | null;
	onChange: (value: string | null) => void;
	sx?: SxProps<Theme>;
}

export function SelectableChipRow({
	options,
	value,
	onChange,
	sx,
}: SelectableChipRowProps) {
	return (
		<Box
			sx={{
				display: "flex",
				gap: 1.5,
				flexWrap: "wrap",
				...sx,
			}}
		>
			{options.map((opt) => {
				const isSelected = value === opt.value;
				return (
					<Chip
						key={opt.value ?? "null"}
						label={opt.label}
						clickable
						color={isSelected ? "primary" : "default"}
						onClick={() => onChange(opt.value)}
						sx={{
							py: 2.5,
							px: 1,
							fontSize: "0.95rem",
							borderRadius: "12px",
							fontWeight: 600,
						}}
					/>
				);
			})}
		</Box>
	);
}
