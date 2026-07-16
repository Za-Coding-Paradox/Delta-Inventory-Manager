// src/components/product-page/modals/wishlist-drawer.tsx
import {
	Drawer,
	Box,
	Typography,
	IconButton,
	Button,
	Divider,
	Card,
	CardMedia,
	CardContent,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DeleteOutlined as DeleteOutlinedIcon } from '@mui/icons-material';
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";
import { useAppContext } from "../../../context/app-context";

export default function WishlistDrawer({
	open,
	onClose,
}: {
	open: boolean;
	onClose: () => void;
}) {
	const { state, dispatch } = useAppContext();

	return (
		<Drawer anchor="right" open={open} onClose={onClose}>
			<Box sx={{ width: 400, p: 3 }}>
				<Box
					sx={{
						display: "flex",
						justifyContent: "space-between",
						mb: 2,
					}}
				>
					<Typography variant="h6" sx={{ fontWeight: 700 }}>
						Your Wishlist
					</Typography>
					<IconButton onClick={onClose}>
						<CloseIcon />
					</IconButton>
				</Box>
				<Divider sx={{ mb: 2 }} />

				{state.wishlist.length === 0 ? (
					<Typography sx={{ textAlign: "center", mt: 5 }}>
						Your wishlist is empty.
					</Typography>
				) : (
					state.wishlist.map((item) => (
						<Card
							key={item.id}
							sx={{
								display: "flex",
								mb: 2,
								p: 1,
								alignItems: "center",
							}}
						>
							<CardMedia
								component="img"
								image={item.defaultImageUrl}
								sx={{ width: 80, height: 80, borderRadius: 1 }}
							/>
							<CardContent sx={{ flexGrow: 1 }}>
								<Typography
									variant="body2"
									sx={{ fontWeight: 600 }}
								>
									{item.name}
								</Typography>
								<Typography variant="body2" color="primary">
									${item.price.toFixed(2)}
								</Typography>
								<Box sx={{ mt: 1 }}>
									<Button
										size="small"
										variant="contained"
										startIcon={<ShoppingCartOutlinedIcon />}
										disabled={
											item.status === "OUT_OF_STOCK"
										}
										onClick={() =>
											dispatch({
												type: "ADD_TO_CART",
												payload: {
													product: item,
													selectedColorName:
														item.colors[0].name,
													quantity: 1,
												},
											})
										}
									>
										Move to Cart
									</Button>
								</Box>
							</CardContent>
							<IconButton
								onClick={() =>
									dispatch({
										type: "TOGGLE_WISHLIST",
										payload: item,
									})
								}
								color="error"
							>
								<DeleteOutlinedIcon />
							</IconButton>
						</Card>
					))
				)}
			</Box>
		</Drawer>
	);
}
