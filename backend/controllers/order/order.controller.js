const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const Order = require("../../models/order.model");
const { successResponse } = require("../response/response.controller");

/** create order */
exports.createOrder = async (req, res, next) => {
  try {
    // Extract the necessary information from the request body
    const { items_price, status } = req.body;

    if (!items_price) {
      throw createHttpError(400, "All fields are required");
    }

    const orderInfo = {
      items_price,
    };
    if (status) {
      orderInfo.status = status;
    }

    // Create a new order
    const newOrder = await Order.create(orderInfo);

    return successResponse(res, { payload: newOrder });
  } catch (error) {
    next(error);
  }
};

/* get all orders */
exports.getAllOrders = async (req, res, next) => {
  try {
    // Extract the status query parameter, if provided
    const { status } = req.query;

    // Build a query object based on the provided status
    const query = status ? { status } : {};

    // Find orders based on the query, sort by createdAt in descending order
    const orders = await Order.find(query).sort({ createdAt: -1 });

    return successResponse(res, { payload: orders });
  } catch (error) {
    next(error);
  }
};

/* update order */
exports.updateOrder = async (req, res, next) => {
  try {
    // Extract the order ID from the request parameters
    const { orderId } = req.params;
    // Validate if orderId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(orderId)) {
      throw createHttpError(400, "Invalid order ID");
    }
    // Extract the information to update from the request body
    const { items_price, status } = req.body;

    const newData = {};
    if (items_price) {
      newData.items_price = items_price;
    }
    if (status) {
      newData.status = status;
    }

    // Find the order by ID and update its fields
    const updatedOrder = await Order.findByIdAndUpdate(
      orderId,
      newData,
      { new: true } // This option returns the updated document
    );

    // Check if the order was found and updated
    if (!updatedOrder) {
      throw createHttpError(404, "Order not found");
    }

    return successResponse(res, { payload: updatedOrder });
  } catch (error) {
    next(error);
  }
};
