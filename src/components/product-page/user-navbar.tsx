// src/components/layout/UserNavbar.tsx
import { useEffect, useState } from "react";
import {
	AppBar,
	Toolbar,
	Typography,
	IconButton,
	Box,
	Badge,
	Button,
} from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import { useAppContext } from "../../context/app-context";

export default function UserNavbar() {
	const { state, dispatch } = useAppContext();
	const [navVisible, setNavVisible] = useState(true);
	const [prevScrollPos, setPrevScrollPos] = useState(0);

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollPos = window.scrollY;

			if (currentScrollPos < 10) {
				setNavVisible(true);
			} else if (prevScrollPos > currentScrollPos) {
				setNavVisible(true); // Scrolling Up
			} else {
				setNavVisible(false); // Scrolling Down
			}
			setPrevScrollPos(currentScrollPos);
		};

		window.addEventListener("scroll", handleScroll);
		return () => window.removeEventListener("scroll", handleScroll);
	}, [prevScrollPos]);

	const scrollToTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

	const cartCount = state.cart.reduce((acc, item) => acc + item.quantity, 0);

	return (
		<AppBar
			position="fixed"
			sx={{
				transform: navVisible ? "translateY(0)" : "translateY(-100%)",
				transition: "transform 0.3s ease-in-out",
			}}
		>
			<Toolbar>
				<Typography
					variant="h6"
					component="div"
					sx={{
						flexGrow: 1,
						cursor: "pointer",
						fontWeight: 800,
						letterSpacing: "-0.5px",
					}}
					onClick={scrollToTop}
				>
					AURA
				</Typography>

				<Box
					sx={{ display: { xs: "none", md: "flex" }, gap: 2, mr: 4 }}
				>
					<Button color="inherit" href="#products">
						Products
					</Button>
					<Button color="inherit" href="#trending">
						Trending
					</Button>
					<Button color="inherit" href="#faq">
						FAQ
					</Button>
					<Button color="inherit" href="#contact">
						Contact
					</Button>
				</Box>

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

				<IconButton color="inherit">
					<Badge
						badgeContent={state.wishlist.length}
						color="secondary"
					>
						<FavoriteBorderIcon />
					</Badge>
				</IconButton>

				<IconButton color="inherit">
					<Badge badgeContent={cartCount} color="secondary">
						<ShoppingCartOutlinedIcon />
					</Badge>
				</IconButton>
			</Toolbar>
		</AppBar>
	);
}
