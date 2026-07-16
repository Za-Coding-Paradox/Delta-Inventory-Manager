// src/components/product-page/user-navbar.tsx
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
	Badge,
	Link,
	Divider,
	Tooltip,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import EmailIcon from "@mui/icons-material/Email";
import { useAppContext } from "../../../context/app-context";
import SearchBar from "./search-bar";

interface Props {
	onOpenCart: () => void;
	onOpenWishlist: () => void;
	onOpenContact: () => void;
}

export default function UserNavbar({
	onOpenCart,
	onOpenWishlist,
	onOpenContact,
}: Props) {
	const { state, dispatch } = useAppContext();
	const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<AppBar position="sticky" elevation={0}>
			<Toolbar sx={{ gap: 1 }}>
				<Typography
					variant="h6"
					sx={{
						cursor: "pointer",
						fontWeight: 800,
						mr: { xs: 1, md: 3 },
						letterSpacing: "-0.5px",
					}}
					onClick={() =>
						window.scrollTo({ top: 0, behavior: "smooth" })
					}
				>
					<Link href="/" underline="none" color="inherit">
						AURA
					</Link>
				</Typography>

				<SearchBar />

				<Box sx={{ flexGrow: 1 }} />

				<Box
					sx={{
						display: { xs: "none", md: "flex" },
						gap: 2.5,
						mr: 1,
						alignItems: "center",
					}}
				>
					<Link
						href="#products"
						underline="hover"
						color="inherit"
						sx={{ fontWeight: 500, fontSize: "0.9rem" }}
					>
						Products
					</Link>
					<Divider orientation="vertical" flexItem />
					<Link
						href="#trending"
						underline="hover"
						color="inherit"
						sx={{ fontWeight: 500, fontSize: "0.9rem" }}
					>
						Trending
					</Link>
					<Divider orientation="vertical" flexItem />
					<Link
						href="#faq"
						underline="hover"
						color="inherit"
						sx={{ fontWeight: 500, fontSize: "0.9rem" }}
					>
						FAQ
					</Link>
				</Box>

				<Tooltip title="Toggle Theme">
					<IconButton
						onClick={() => dispatch({ type: "TOGGLE_THEME" })}
						color="inherit"
						sx={{
							backgroundColor: (t) =>
								t.palette.mode === "light"
									? "rgba(0,0,0,0.04)"
									: "rgba(255,255,255,0.06)",
						}}
					>
						{state.theme === "light" ? (
							<DarkModeIcon />
						) : (
							<LightModeIcon />
						)}
					</IconButton>
				</Tooltip>

				<Tooltip title="Contact Us">
					<IconButton
						color="inherit"
						onClick={onOpenContact}
						sx={{
							backgroundColor: (t) =>
								t.palette.mode === "light"
									? "rgba(0,0,0,0.04)"
									: "rgba(255,255,255,0.06)",
						}}
					>
						<EmailIcon />
					</IconButton>
				</Tooltip>

				<Tooltip title="Wishlist">
					<IconButton
						color="inherit"
						onClick={onOpenWishlist}
						sx={{
							backgroundColor: (t) =>
								t.palette.mode === "light"
									? "rgba(0,0,0,0.04)"
									: "rgba(255,255,255,0.06)",
						}}
					>
						<Badge
							badgeContent={state.wishlist.length}
							color="secondary"
						>
							<FavoriteBorderIcon />
						</Badge>
					</IconButton>
				</Tooltip>

				<Tooltip title="Cart">
					<IconButton
						color="inherit"
						onClick={onOpenCart}
						sx={{
							backgroundColor: (t) =>
								t.palette.mode === "light"
									? "rgba(0,0,0,0.04)"
									: "rgba(255,255,255,0.06)",
						}}
					>
						<Badge
							key={cartCount}
							badgeContent={cartCount}
							color="secondary"
							sx={{
								"& .MuiBadge-badge": {
									animation: "pop 0.3s ease-in-out",
								},
							}}
						>
							<ShoppingCartOutlinedIcon />
						</Badge>
					</IconButton>
				</Tooltip>
			</Toolbar>
		</AppBar>
	);
}
