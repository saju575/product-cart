const express = require("express");
const {
  createOrder,
  getAllOrders,
  updateOrder,
} = require("../controllers/order/order.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const orderRouter = express.Router();

/* get all orders */
orderRouter.get("/", isAuthenticated, getAllOrders);

/* create orders */
orderRouter.post("/create", isAuthenticated, createOrder);

/* order update */
orderRouter.put("/update/:orderId", isAuthenticated, updateOrder);

module.exports = orderRouter;
