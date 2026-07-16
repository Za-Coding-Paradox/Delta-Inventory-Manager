// src/components/product-page/user-layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Toolbar, Box } from "@mui/material";
import UserNavbar from "./user-navbar";
import CartDrawer from "./modals/cart-drawer";
import WishlistDrawer from "./modals/wishlist-drawer";
import ProductOverviewModal from "./modals/product-overview-modal";
import ContactModal from "./modals/contact-modal";
import type { Product } from "../../config/types";

export default function UserLayout() {
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [isWishlistOpen, setIsWishlistOpen] = useState(false);
	const [isContactOpen, setIsContactOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null,
	);

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
			}}
		>
			<UserNavbar
				onOpenCart={() => setIsCartOpen(true)}
				onOpenWishlist={() => setIsWishlistOpen(true)}
				onOpenContact={() => setIsContactOpen(true)}
			/>
			<Toolbar />

			<Box component="main" sx={{ flexGrow: 1 }}>
				<Outlet context={{ onQuickView: setSelectedProduct }} />
			</Box>

			<ProductOverviewModal
				product={selectedProduct}
				open={!!selectedProduct}
				onClose={() => setSelectedProduct(null)}
				onQuickView={setSelectedProduct}
			/>
			<CartDrawer
				open={isCartOpen}
				onClose={() => setIsCartOpen(false)}
			/>
			<WishlistDrawer
				open={isWishlistOpen}
				onClose={() => setIsWishlistOpen(false)}
			/>
			<ContactModal
				open={isContactOpen}
				onClose={() => setIsContactOpen(false)}
			/>
		</Box>
	);
}
