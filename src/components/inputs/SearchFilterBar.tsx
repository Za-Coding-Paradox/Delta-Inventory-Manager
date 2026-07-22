import { Box, TextField, Button, Menu, MenuItem } from "@mui/material";
import { SearchRounded as SearchRoundedIcon, FilterListRounded as FilterListRoundedIcon } from "@mui/icons-material";
import { useTheme } from "@mui/material/styles";
import { useState } from "react";

export interface FilterOption {
	label: string;
	value: string | null;
}

export interface FilterConfig {
	key: string;
	label: string;
	options: FilterOption[];
	currentValue: string | null;
	onChange: (val: string | null) => void;
}

export interface SearchFilterBarProps {
	searchValue: string;
	onSearchChange: (val: string) => void;
	searchPlaceholder?: string;
	filters?: FilterConfig[];
	rightContent?: React.ReactNode;
}

export function SearchFilterBar({
	searchValue,
	onSearchChange,
	searchPlaceholder = "Search...",
	filters = [],
	rightContent,
}: SearchFilterBarProps) {
	const theme = useTheme();

	return (
		<Box
			sx={{
				p: 2,
				borderBottom: `1px solid ${theme.palette.divider}`,
				display: "flex",
				gap: 2,
				alignItems: "center",
			}}
		>
			<TextField
				placeholder={searchPlaceholder}
				size="small"
				value={searchValue}
				onChange={(e) => onSearchChange(e.target.value)}
				sx={{ width: 280 }}
				slotProps={{
					input: {
						startAdornment: <SearchRoundedIcon color="action" fontSize="small" sx={{ mr: 1 }} />,
					},
				}}
			/>

			{filters.map((filter) => (
				<FilterDropdown key={filter.key} filter={filter} />
			))}

			<Box sx={{ flexGrow: 1 }} />

			{rightContent && <Box>{rightContent}</Box>}
		</Box>
	);
}

function FilterDropdown({ filter }: { filter: FilterConfig }) {
	const theme = useTheme();
	const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

	const activeLabel =
		filter.options.find((o) => o.value === filter.currentValue)?.label ||
		filter.label;

	return (
		<>
			<Button
				variant="outlined"
				size="small"
				startIcon={!filter.currentValue && <FilterListRoundedIcon />}
				onClick={(e) => setAnchorEl(e.currentTarget)}
				sx={{
					borderRadius: "10px",
					borderColor: filter.currentValue ? theme.palette.primary.main : undefined,
				}}
			>
				{activeLabel}
			</Button>
			<Menu
				anchorEl={anchorEl}
				open={Boolean(anchorEl)}
				onClose={() => setAnchorEl(null)}
			>
				{filter.options.map((opt) => (
					<MenuItem
						key={opt.label}
						onClick={() => {
							filter.onChange(opt.value);
							setAnchorEl(null);
						}}
					>
						{opt.label}
					</MenuItem>
				))}
			</Menu>
		</>
	);
}
