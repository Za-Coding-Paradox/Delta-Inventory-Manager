// src/components/product-page/modals/cart-drawer.tsx
import { useState } from "react";
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
	List,
	ListItem,
	ListItemButton,
	ListItemText,
	ListItemIcon,
	Checkbox,
	LinearProgress,
} from "@mui/material";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import CloseIcon from "@mui/icons-material/Close";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined"; // Fixed import
import { useAppContext } from "../../../context/app-context";
import type { CartItem } from "../../../config/types";

const steps = ["Review Cart", "Select Items", "Checkout"];

export default function CartDrawer({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const { state, dispatch } = useAppContext();
	const [activeStep, setActiveStep] = useState(0);
	const [checkoutItems, setCheckoutItems] = useState<CartItem[]>([]);
	const [deliveryType, setDeliveryType] = useState("standard");
	const [deliveryDate, setDeliveryDate] = useState<Date | null>(null);

	const totalPrice = state.cart.reduce(
		(acc, item) => acc + item.product.price * item.quantity,
		0,
	);

	const handleToggle = (item: CartItem) => {
		const isAdded = checkoutItems.some(
			(i) => i.product.id === item.product.id,
		);
		if (isAdded) {
			setCheckoutItems(
				checkoutItems.filter((i) => i.product.id !== item.product.id),
			);
		} else {
			setCheckoutItems([...checkoutItems, item]);
		}
	};

	const handleNext = () => setActiveStep((prev) => prev + 1);
	const handleBack = () => setActiveStep((prev) => prev - 1);

	return (
		<LocalizationProvider dateAdapter={AdapterDateFns}>
			<Drawer anchor="right" open={open} onClose={onClose}>
				<Box
					sx={{
						width: { xs: "100%", sm: 450 },
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
						<IconButton onClick={onClose}>
							<CloseIcon />
						</IconButton>
					</Box>

					<LinearProgress
						variant="determinate"
						value={((activeStep + 1) / steps.length) * 100}
						sx={{ mb: 3, height: 6, borderRadius: 3 }}
					/>

					<Stepper activeStep={activeStep} sx={{ mb: 3 }}>
						{steps.map((label) => (
							<Step key={label}>
								<StepLabel>{label}</StepLabel>
							</Step>
						))}
					</Stepper>

					<Box sx={{ flexGrow: 1, overflowY: "auto" }}>
						{activeStep === 0 && (
							<>
								{state.cart.length === 0 ? (
									<Typography
										sx={{ textAlign: "center", mt: 5 }}
									>
										Your cart is empty.
									</Typography>
								) : (
									state.cart.map((item) => (
										<Paper
											key={item.product.id}
											sx={{
												p: 2,
												mb: 2,
												display: "flex",
												alignItems: "center",
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
													width: 60,
													height: 60,
													borderRadius: 1,
													mr: 2,
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
														alignItems: "center",
														mt: 1,
														border: 1,
														borderColor: "divider",
														borderRadius: 1,
														width: "fit-content",
													}}
												>
													<IconButton
														size="small"
														onClick={() =>
															dispatch({
																type: "UPDATE_CART_QTY",
																payload: {
																	productId:
																		item
																			.product
																			.id,
																	quantity:
																		item.quantity -
																		1,
																},
															})
														}
													>
														<RemoveIcon fontSize="small" />
													</IconButton>
													<Typography
														variant="body2"
														sx={{
															px: 1,
															fontWeight: 600,
														}}
													>
														{item.quantity}
													</Typography>
													<IconButton
														size="small"
														onClick={() =>
															dispatch({
																type: "UPDATE_CART_QTY",
																payload: {
																	productId:
																		item
																			.product
																			.id,
																	quantity:
																		item.quantity +
																		1,
																},
															})
														}
													>
														<AddIcon fontSize="small" />
													</IconButton>
												</Box>
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
															payload:
																item.product.id,
														})
													}
												>
													<DeleteOutlinedIcon />
												</IconButton>
											</Box>
										</Paper>
									))
								)}
							</>
						)}

						{activeStep === 1 && (
							<Box>
								<Typography variant="subtitle2" sx={{ mb: 2 }}>
									Select items to checkout:
								</Typography>
								<List>
									{state.cart.map((item) => {
										const isAdded = checkoutItems.some(
											(i) =>
												i.product.id ===
												item.product.id,
										);
										return (
											<ListItem
												key={item.product.id}
												disablePadding
												sx={{
													border: 1,
													borderColor: "divider",
													borderRadius: 2,
													mb: 1,
												}}
											>
												<ListItemButton
													onClick={() =>
														handleToggle(item)
													}
												>
													<ListItemIcon>
														<Checkbox
															edge="start"
															checked={isAdded}
															tabIndex={-1}
															disableRipple
														/>
													</ListItemIcon>
													<ListItemText
														primary={
															item.product.name
														}
														secondary={`Qty: ${item.quantity} • $${(item.product.price * item.quantity).toFixed(2)}`}
													/>
													{isAdded ? (
														<ArrowBackIcon
															fontSize="small"
															color="error"
														/>
													) : (
														<ArrowForwardIcon
															fontSize="small"
															color="primary"
														/>
													)}
												</ListItemButton>
											</ListItem>
										);
									})}
								</List>
							</Box>
						)}

						{activeStep === 2 && (
							<Box>
								<Typography variant="h6" gutterBottom>
									Checkout Details
								</Typography>
								<Divider sx={{ mb: 3 }} />

								<Typography variant="subtitle2" gutterBottom>
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
									}}
								>
									<ToggleButton
										value="standard"
										sx={{ flex: 1, py: 1.5 }}
									>
										Standard (5-7 Days)
									</ToggleButton>
									<ToggleButton
										value="express"
										sx={{ flex: 1, py: 1.5 }}
									>
										Express (2 Days)
									</ToggleButton>
								</ToggleButtonGroup>

								<Typography variant="subtitle2" gutterBottom>
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

								<Typography variant="subtitle2" gutterBottom>
									3. Order Summary
								</Typography>
								<Paper variant="outlined" sx={{ p: 2, mb: 3 }}>
									{checkoutItems.map((item) => (
										<Box
											key={item.product.id}
											sx={{
												display: "flex",
												justifyContent: "space-between",
												mb: 1,
											}}
										>
											<Typography variant="body2">
												{item.product.name} x{" "}
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
									<Typography variant="h6">Total</Typography>
									<Typography variant="h6" color="primary">
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
									sx={{ mt: 3 }}
								>
									Pay Now
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
									sx={{ mb: 2, textAlign: "right" }}
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
