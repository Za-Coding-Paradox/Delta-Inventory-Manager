// src/components/product-page/modals/cart-drawer.tsx
import { useState, useEffect } from "react";
import {
	Drawer,
	Box,
	Typography,
	IconButton,
	Button,
	Divider,
	Stepper,
	Step,
	StepLabel,
	Paper,
	ToggleButton,
	ToggleButtonGroup,
	Chip,
	LinearProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useAppContext } from "../../../context/app-context";
import type { CartItem, Order } from "../../../config/types";
import {
	cartItemKey,
	clampCartItemQty,
	getLiveProduct,
} from "../../../utils/cart-sync";
import { CartReviewStep } from "./components/CartReviewStep";
import { CartSelectItemsStep } from "./components/CartSelectItemsStep";
import { CartCheckoutStep } from "./components/CartCheckoutStep";

const steps = ["Review Cart", "Select Items", "Checkout"];

interface Props {
	open: boolean;
	onClose: () => void;
	initialStep?: number;
}

export default function CartDrawer({ open, onClose, initialStep = 0 }: Props) {
	const { state, dispatch } = useAppContext();
	const [activeStep, setActiveStep] = useState(initialStep);
	const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
	const [deliveryType, setDeliveryType] = useState("standard");
	const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

	useEffect(() => {
		if (open) setActiveStep(initialStep);
	}, [open, initialStep]);

	const totalPrice = state.cart.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0,
	);

	const handleToggleCheckout = (item: CartItem) => {
		const key = cartItemKey(item.product.id, item.selectedColorName);
		const isAdded = checkoutItems.some(
			(i) => cartItemKey(i.product.id, i.selectedColorName) === key,
		);
		if (isAdded) {
			setCheckoutItems(
				checkoutItems.filter(
					(i) =>
						cartItemKey(i.product.id, i.selectedColorName) !== key,
				),
			);
		} else {
			setCheckoutItems([...checkoutItems, item]);
		}
	};

	const handleQtyChange = (item: CartItem, delta: number) => {
		const live = getLiveProduct(state.products, item.product.id);
		if (!live) return;
		const newQty = clampCartItemQty(
			state.cart,
			item,
			live,
			item.quantity + delta,
		);
		dispatch({
			type: "UPDATE_CART_QTY",
			payload: {
				productId: item.product.id,
				selectedColorName: item.selectedColorName,
				quantity: newQty,
			},
		});
	};

	const handleNext = () => setActiveStep((prev) => prev + 1);
	const handleBack = () => setActiveStep((prev) => prev - 1);

	const handlePlaceOrder = () => {
		if (checkoutItems.length === 0) return;

		// Build the Order object from checkoutItems.
		// This snapshots the current price and selected options into a permanent historical record.
		const order: Order = {
			id: `order_${Date.now()}`,
			items: checkoutItems.map((item) => ({
				productId: item.product.id,
				productName: item.product.name,
				selectedColorName: item.selectedColorName,
				quantity: item.quantity,
				priceAtOrder: item.product.price,
			})),
			total: checkoutItems.reduce(
				(sum, item) => sum + item.product.price * item.quantity,
				0,
			),
			deliveryType: deliveryType as "standard" | "express",
			deliveryDate: deliveryDate ? deliveryDate.toISOString() : null,
			timestamp: new Date().toISOString(),
			status: "PENDING",
			customerName: "Guest Customer", // In a real app, this would be the logged-in user
		};

		// Dispatch the order to state — this triggers notification + snackbar
		dispatch({ type: "PLACE_ORDER", payload: order });

		// Remove only the checked-out items from cart
		checkoutItems.forEach((item) => {
			dispatch({
				type: "REMOVE_FROM_CART",
				payload: {
					productId: item.product.id,
					selectedColorName: item.selectedColorName,
				},
			});
		});

		// Reset drawer state and close
		setCheckoutItems([]);
		setDeliveryDate(null);
		setDeliveryType("standard");
		setActiveStep(0);
		onClose();
	};

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Drawer anchor="right" open={open} onClose={onClose}>
				<Box
					sx={{
						width: { xs: "100vw", sm: 460 },
						p: 3,
						display: "flex",
						flexDirection: "column",
						height: "100%",
					}}
				>
					<Box
						sx={{
							display: "flex",
							justifyContent: "space-between",
							mb: 2,
						}}
					>
						<Typography variant="h6" sx={{ fontWeight: 700 }}>
							Your Cart
						</Typography>
						<IconButton onClick={onClose} size="small">
							<CloseIcon />
						</IconButton>
					</Box>

					<LinearProgress
						variant="determinate"
						value={((activeStep + 1) / steps.length) * 100}
						sx={{ mb: 3, height: 6, borderRadius: 3 }}
					/>

					<Stepper
						activeStep={activeStep}
						sx={{ mb: 3 }}
						alternativeLabel
					>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					<Box sx={{ flexGrow: 1, overflowY: "auto", pr: 0.5 }}>
						{activeStep === 0 && (
							<CartReviewStep
								state={state}
								handleQtyChange={handleQtyChange}
								handleRemove={(item) =>
									dispatch({
										type: "REMOVE_FROM_CART",
										payload: {
											productId: item.product.id,
											selectedColorName: item.selectedColorName,
										},
									})
								}
							/>
						)}

						{activeStep === 1 && (
							<CartSelectItemsStep
								state={state}
								checkoutItems={checkoutItems}
								handleToggleCheckout={handleToggleCheckout}
							/>
						)}

						{activeStep === 2 && (
							<CartCheckoutStep
								checkoutItems={checkoutItems}
								deliveryType={deliveryType}
								setDeliveryType={setDeliveryType}
								deliveryDate={deliveryDate}
								setDeliveryDate={setDeliveryDate}
								handlePlaceOrder={handlePlaceOrder}
							/>
						)}
					</Box>

					{state.cart.length > 0 && (
						<Box
							sx={{ pt: 2, borderTop: 1, borderColor: "divider" }}
						>
							{activeStep === 0 && (
								<Typography
									variant="h6"
									sx={{
										mb: 2,
										textAlign: "right",
										fontWeight: 700,
									}}
								>
									Total: ${totalPrice.toFixed(2)}
								</Typography>
							)}
							<Box
								sx={{
									display: "flex",
									justifyContent: "space-between",
								}}
							>
								<Button
									disabled={activeStep === 0}
									onClick={handleBack}
								>
									Back
								</Button>
								{activeStep < 2 ? (
									<Button
										variant="contained"
										onClick={handleNext}
										disabled={
											activeStep === 1 &&
											checkoutItems.length === 0
										}
									>
										{activeStep === 0
											? "Proceed to Selection"
											: "Go to Checkout"}
									</Button>
								) : null}
							</Box>
						</Box>
					)}
				</Box>
			</Drawer>
		</LocalizationProvider>
	);
}
