// src/components/product-page/user-layout.tsx
import { useState } from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import UserNavbar from "./user-navbar";
import CartDrawer from "../modals/cart-drawer";
import WishlistDrawer from "../modals/wishlist-drawer";
import ProductOverviewModal from "../modals/product-overview-modal";
import ContactModal from "../modals/contact-modal";
import type { Product } from "../../../config/types";
import { useAppContext } from "../../../context/app-context";
import {
	canAddToCart,
	getMaxAddableQty,
	getLiveProduct,
} from "../../../utils/cart-sync";

export default function UserLayout() {
	const { state, dispatch } = useAppContext();
	const [isCartOpen, setIsCartOpen] = useState(false);
	const [cartInitialStep, setCartInitialStep] = useState(0);
	const [isWishlistOpen, setIsWishlistOpen] = useState(false);
	const [isContactOpen, setIsContactOpen] = useState(false);
	const [selectedProduct, setSelectedProduct] = useState<Product | null>(
		null,
	);

	const handleMoveToCheckout = (product: Product) => {
		const live = getLiveProduct(state.products, product.id) ?? product;
		if (!canAddToCart(live)) return;

		const qty = getMaxAddableQty(
			state.cart,
			live,
			live.colors[0].name,
			1,
		);
		if (qty <= 0) return;

		dispatch({
			type: "ADD_TO_CART",
			payload: {
				product: live,
				selectedColorName: live.colors[0].name,
				quantity: qty,
			},
		});

		setIsWishlistOpen(false);
		setCartInitialStep(2);
		setIsCartOpen(true);
	};

	return (
		<Box
			sx={{
				display: "flex",
				flexDirection: "column",
				minHeight: "100vh",
				backgroundColor: "background.default",
			}}
		>
			<UserNavbar
				onOpenCart={() => {
					setCartInitialStep(0);
					setIsCartOpen(true);
				}}
				onOpenWishlist={() => setIsWishlistOpen(true)}
				onOpenContact={() => setIsContactOpen(true)}
			/>

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
				onClose={() => {
					setIsCartOpen(false);
					setCartInitialStep(0);
				}}
				initialStep={cartInitialStep}
			/>
			<WishlistDrawer
				open={isWishlistOpen}
				onClose={() => setIsWishlistOpen(false)}
				onMoveToCheckout={handleMoveToCheckout}
			/>
			<ContactModal
				open={isContactOpen}
				onClose={() => setIsContactOpen(false)}
			/>
		</Box>
	);
}
