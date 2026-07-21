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
	getRemainingStock,
} from "../../../utils/cart-sync";

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
							<>
								{state.cart.length === 0 ? (
									<Typography
										sx={{ textAlign: "center", mt: 5 }}
										color="text.secondary"
									>
										Your cart is empty.
									</Typography>
								) : (
									state.cart.map((item) => {
										const live = getLiveProduct(
											state.products,
											item.product.id,
										);
										const remaining = live
											? getRemainingStock(
													state,
													item.product.id,
												) + item.quantity
											: 0;
										const atMax =
											live &&
											item.quantity >=
												clampCartItemQty(
													state.cart,
													item,
													live,
													remaining,
												);

										return (
											<Paper
												key={cartItemKey(
													item.product.id,
													item.selectedColorName,
												)}
												elevation={0}
												sx={{
													p: 2,
													mb: 2,
													display: "flex",
													alignItems: "center",
													borderRadius: "16px",
													border: 1,
													borderColor: "divider",
												}}
											>
												<Box
													component="img"
													src={
														item.product.colors.find(
															(c) =>
																c.name ===
																item.selectedColorName,
														)?.imageUrl
													}
													sx={{
														width: 64,
														height: 64,
														borderRadius: "12px",
														mr: 2,
														objectFit: "cover",
													}}
												/>
												<Box sx={{ flexGrow: 1 }}>
													<Typography
														variant="body2"
														sx={{ fontWeight: 600 }}
													>
														{item.product.name}
													</Typography>
													<Typography
														variant="caption"
														color="text.secondary"
													>
														{item.selectedColorName}
													</Typography>

													<Box
														sx={{
															display: "flex",
															alignItems:
																"center",
															mt: 1,
															border: 1,
															borderColor:
																"divider",
															borderRadius:
																"12px",
															width: "fit-content",
															overflow: "hidden",
														}}
													>
														<IconButton
															size="small"
															onClick={() =>
																handleQtyChange(
																	item,
																	-1,
																)
															}
														>
															<RemoveIcon fontSize="small" />
														</IconButton>
														<Typography
															variant="body2"
															sx={{
																px: 1.5,
																fontWeight: 700,
																minWidth: 24,
																textAlign:
																	"center",
															}}
														>
															{item.quantity}
														</Typography>
														<IconButton
															size="small"
															disabled={!!atMax}
															onClick={() =>
																handleQtyChange(
																	item,
																	1,
																)
															}
														>
															<AddIcon fontSize="small" />
														</IconButton>
													</Box>
													{live && (
														<Typography
															variant="caption"
															color="text.secondary"
															sx={{
																mt: 0.5,
																display:
																	"block",
															}}
														>
															{remaining} in stock
														</Typography>
													)}
												</Box>
												<Box
													sx={{
														display: "flex",
														flexDirection: "column",
														alignItems: "flex-end",
													}}
												>
													<Typography
														variant="body2"
														sx={{
															mb: 1,
															fontWeight: 700,
															color: "primary.main",
														}}
													>
														$
														{(
															item.product.price *
															item.quantity
														).toFixed(2)}
													</Typography>
													<IconButton
														size="small"
														color="error"
														onClick={() =>
															dispatch({
																type: "REMOVE_FROM_CART",
																payload: {
																	productId:
																		item
																			.product
																			.id,
																	selectedColorName:
																		item.selectedColorName,
																},
															})
														}
													>
														<DeleteOutlinedIcon fontSize="small" />
													</IconButton>
												</Box>
											</Paper>
										);
									})
								)}
							</>
						)}

						{activeStep === 1 && (
							<Box>
								<Typography
									variant="subtitle2"
									sx={{ mb: 2, fontWeight: 600 }}
								>
									Select items to checkout:
								</Typography>
								<Box
									sx={{
										display: "flex",
										flexWrap: "wrap",
										gap: 1,
									}}
								>
									{state.cart.map((item) => {
										const key = cartItemKey(
											item.product.id,
											item.selectedColorName,
										);
										const isAdded = checkoutItems.some(
											(i) =>
												cartItemKey(
													i.product.id,
													i.selectedColorName,
												) === key,
										);
										return (
											<Chip
												key={key}
												label={`${item.product.name} (×${item.quantity})`}
												clickable
												color={
													isAdded
														? "primary"
														: "default"
												}
												variant={
													isAdded
														? "filled"
														: "outlined"
												}
												onClick={() =>
													handleToggleCheckout(item)
												}
												sx={{ py: 2.5, height: "auto" }}
											/>
										);
									})}
								</Box>
							</Box>
						)}

						{activeStep === 2 && (
							<Box>
								<Typography
									variant="h6"
									gutterBottom
									sx={{ fontWeight: 700 }}
								>
									Checkout Details
								</Typography>
								<Divider sx={{ mb: 3 }} />

								<Typography
									variant="subtitle2"
									gutterBottom
									sx={{ fontWeight: 600 }}
								>
									1. Select Delivery Type
								</Typography>
								<ToggleButtonGroup
									value={deliveryType}
									exclusive
									onChange={(_e, val) =>
										val && setDeliveryType(val)
									}
									size="small"
									sx={{
										mb: 4,
										width: "100%",
										display: "flex",
										gap: 1,
									}}
								>
									<ToggleButton
										value="standard"
										sx={{
											flex: 1,
											py: 1.5,
											borderRadius: "12px !important",
										}}
									>
										Standard (5–7 Days)
									</ToggleButton>
									<ToggleButton
										value="express"
										sx={{
											flex: 1,
											py: 1.5,
											borderRadius: "12px !important",
										}}
									>
										Express (2 Days)
									</ToggleButton>
								</ToggleButtonGroup>

								<Typography
									variant="subtitle2"
									gutterBottom
									sx={{ fontWeight: 600 }}
								>
									2. Choose Delivery Date
								</Typography>
								<DatePicker
									label="Delivery Date"
									value={deliveryDate}
									onChange={(newValue) =>
										setDeliveryDate(newValue)
									}
									disablePast
									slotProps={{
										textField: {
											size: "small",
											fullWidth: true,
											sx: { mb: 4 },
										},
									}}
								/>

								<Typography
									variant="subtitle2"
									gutterBottom
									sx={{ fontWeight: 600 }}
								>
									3. Order Summary
								</Typography>
								<Paper
									variant="outlined"
									sx={{ p: 2, mb: 3, borderRadius: "16px" }}
								>
									{checkoutItems.map((item) => (
										<Box
											key={cartItemKey(
												item.product.id,
												item.selectedColorName,
											)}
											sx={{
												display: "flex",
												justifyContent: "space-between",
												mb: 1,
											}}
										>
											<Typography variant="body2">
												{item.product.name} ×{" "}
												{item.quantity}
											</Typography>
											<Typography variant="body2">
												$
												{(
													item.product.price *
													item.quantity
												).toFixed(2)}
											</Typography>
										</Box>
									))}
									<Divider sx={{ my: 1 }} />
									<Box
										sx={{
											display: "flex",
											justifyContent: "space-between",
											mb: 1,
										}}
									>
										<Typography
											variant="body2"
											color="text.secondary"
										>
											Delivery Type:
										</Typography>
										<Typography
											variant="body2"
											sx={{ textTransform: "capitalize" }}
										>
											{deliveryType}
										</Typography>
									</Box>
									{deliveryDate && (
										<Box
											sx={{
												display: "flex",
												justifyContent: "space-between",
												mb: 1,
											}}
										>
											<Typography
												variant="body2"
												color="text.secondary"
											>
												Delivery Date:
											</Typography>
											<Typography variant="body2">
												{deliveryDate.toLocaleDateString()}
											</Typography>
										</Box>
									)}
								</Paper>

								<Box
									sx={{
										display: "flex",
										justifyContent: "space-between",
									}}
								>
									<Typography
										variant="h6"
										sx={{ fontWeight: 700 }}
									>
										Total
									</Typography>
									<Typography
										variant="h6"
										color="primary"
										sx={{ fontWeight: 800 }}
									>
										$
										{checkoutItems
											.reduce(
												(a, i) =>
													a +
													i.product.price *
														i.quantity,
												0,
											)
											.toFixed(2)}
									</Typography>
								</Box>
								<Button
									variant="contained"
									color="secondary"
									fullWidth
									size="large"
									disabled={checkoutItems.length === 0}
									onClick={handlePlaceOrder}
									sx={{
										mt: 3,
										borderRadius: "14px",
										py: 1.5,
									}}
								>
									Place Order
								</Button>
							</Box>
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
