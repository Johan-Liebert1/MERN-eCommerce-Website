import asyncHandler from "express-async-handler"; // custom error handler
import Order from "../models/orderModel.js";

const addOrderItems = asyncHandler(async (req, res) => {
	const {
		orderItems,
		shippingAddress,
		paymentMethod,
		itemsPrice,
		taxPrice,
		shippingPrice,
		totalPrice
	} = req.body;

	if (orderItems && orderItems.length === 0) {
		res.status(400); // bad request
		throw new Error("No order Items");
	} else {
		const order = new Order({
			user: req.user._id,
			orderItems,
			shippingAddress,
			paymentMethod,
			itemsPrice,
			taxPrice,
			shippingPrice,
			totalPrice
		});

		const createdOrder = await order.save();
		// console.log("orderController, createdOrder", createdOrder)
		res.status(201); // something was created
		res.json(createdOrder);
	}
});

const getOrderById = asyncHandler(async (req, res) => {
	//                                                we want name and email from user
	const order = await Order.findById(req.params.id).populate("user", "name, email");

	if (order) {
		res.json(order);
	} else {
		res.status(404);
		throw new Error("Order not Found");
	}
});

const updateOrderToPaid = asyncHandler(async (req, res) => {
	const order = await Order.findById(req.params.id);

	if (order) {
		order.isPaid = true;
		order.paidAt = Date.now();
		order.paymentResult = {
			id: req.body.id,
			status: req.body.status,
			update_time: req.body.update_time,
			email_address: req.body.payer.email_address
		};

		const updatedOrder = await order.save();

		res.json(updatedOrder);
	} else {
		res.status(404);
		throw new Error("Order not found");
	}
});

export { addOrderItems, getOrderById, updateOrderToPaid };
