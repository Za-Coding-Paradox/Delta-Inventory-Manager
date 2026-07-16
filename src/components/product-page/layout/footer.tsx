import { Box, Typography, Container, Stack, IconButton, Link, Divider } from "@mui/material";
import FacebookIcon from "@mui/icons-material/Facebook";
import TwitterIcon from "@mui/icons-material/Twitter";
import InstagramIcon from "@mui/icons-material/Instagram";

export default function Footer() {
	return (
		<Box sx={{ bgcolor: "background.paper", pt: 8, pb: 4, mt: 8, borderTop: "1px solid", borderColor: "divider" }}>
			<Container maxWidth="lg">
				<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", mb: 6, gap: 4 }}>
					<Box sx={{ maxWidth: 300 }}>
						<Typography variant="h6" sx={{ fontWeight: 800, mb: 2, letterSpacing: "-0.5px" }}>
							Delta Store
						</Typography>
						<Typography variant="body2" color="text.secondary">
							Premium clothing and accessories for the modern minimalist. Ethically sourced and sustainably made.
						</Typography>
					</Box>
					
					<Box sx={{ display: "flex", gap: { xs: 4, md: 8 } }}>
						<Stack spacing={1.5}>
							<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Shop</Typography>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">New Arrivals</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Bestsellers</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Clothing</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Accessories</Link>
						</Stack>
						
						<Stack spacing={1.5}>
							<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Company</Typography>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">About Us</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Careers</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Sustainability</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Press</Link>
						</Stack>

						<Stack spacing={1.5}>
							<Typography variant="subtitle2" sx={{ fontWeight: 700, mb: 1 }}>Support</Typography>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Help Center</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Returns</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Shipping</Link>
							<Link href="#" color="text.secondary" underline="hover" variant="body2">Contact Us</Link>
						</Stack>
					</Box>
				</Box>

				<Divider sx={{ mb: 4 }} />

				<Box sx={{ display: "flex", flexDirection: { xs: "column", md: "row" }, justifyContent: "space-between", alignItems: "center", gap: 2 }}>
					<Typography variant="body2" color="text.secondary">
						&copy; {new Date().getFullYear()} Delta Inventory Manager. All rights reserved.
					</Typography>
					<Stack direction="row" spacing={1}>
						<IconButton size="small" color="inherit">
							<FacebookIcon fontSize="small" />
						</IconButton>
						<IconButton size="small" color="inherit">
							<TwitterIcon fontSize="small" />
						</IconButton>
						<IconButton size="small" color="inherit">
							<InstagramIcon fontSize="small" />
						</IconButton>
					</Stack>
				</Box>
			</Container>
		</Box>
	);
}
