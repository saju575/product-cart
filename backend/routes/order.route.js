const express = require("express");
const {
  createOrder,
  getAllOrders,
  updateOrder,
} = require("../controllers/order/order.controller");

const orderRouter = express.Router();

/* get all orders */
orderRouter.get("/", getAllOrders);

/* create orders */
orderRouter.post("/create", createOrder);

/* order update */
orderRouter.put("/update/:orderId", updateOrder);

module.exports = orderRouter;
