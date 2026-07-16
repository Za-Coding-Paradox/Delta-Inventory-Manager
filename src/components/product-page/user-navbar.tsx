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
import EmailIcon from "@mui/icons-material/Email"; // Fixed import
import { useAppContext } from "../../context/app-context";
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
		<AppBar position="static" elevation={0}>
			<Toolbar>
				<Typography
					variant="h6"
					sx={{ cursor: "pointer", fontWeight: 800, mr: 4 }}
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
						gap: 2,
						mr: 2,
						alignItems: "center",
					}}
				>
					<Link href="#products" underline="hover" color="inherit">
						Products
					</Link>
					<Divider orientation="vertical" flexItem />
					<Link href="#trending" underline="hover" color="inherit">
						Trending
					</Link>
					<Divider orientation="vertical" flexItem />
					<Link href="#faq" underline="hover" color="inherit">
						FAQ
					</Link>
				</Box>

				<Tooltip title="Toggle Theme">
					<IconButton
						onClick={() => dispatch({ type: "TOGGLE_THEME" })}
						color="inherit"
					>
						{state.theme === "light" ? (
							<DarkModeIcon />
						) : (
							<LightModeIcon />
						)}
					</IconButton>
				</Tooltip>

				<Tooltip title="Contact Us">
					<IconButton color="inherit" onClick={onOpenContact}>
						<EmailIcon />
					</IconButton>
				</Tooltip>

				<Tooltip title="Wishlist">
					<IconButton color="inherit" onClick={onOpenWishlist}>
						<Badge
							badgeContent={state.wishlist.length}
							color="secondary"
						>
							<FavoriteBorderIcon />
						</Badge>
					</IconButton>
				</Tooltip>

				<Tooltip title="Cart">
					<IconButton color="inherit" onClick={onOpenCart}>
						{/* Pure CSS animation on key change */}
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
			<style>{`@keyframes pop { 0% { transform: scale(0); } 50% { transform: scale(1.2); } 100% { transform: scale(1); } }`}</style>
		</AppBar>
	);
}
