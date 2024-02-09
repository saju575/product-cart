const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const createHttpError = require("http-errors");
const { errorResponse } = require("./controllers/response/response.controller");
const productRouter = require("./routes/product.route");
const orderRouter = require("./routes/order.route");
const promoRouter = require("./routes/promo.router");
const userRouter = require("./routes/user.route");

/* 
    making express app
*/
const app = express();

/* 
    default middlewares
*/
app.use(
  cors({
    origin: ["https://product-cart2.netlify.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

/* product router */
app.use("/api/products", productRouter);

/* order router */
app.use("/api/orders", orderRouter);

/* promos */
app.use("/api/promos", promoRouter);

/* user */
app.use("/api/users", userRouter);

/*
    Client error handler
 */
app.use((req, res, next) => {
  next(createHttpError(404, "Route Not Found"));
});

/**
Server error handler
-> all the error comes here
*/
app.use((err, req, res, next) => {
  return errorResponse(res, { statusCode: err.status, message: err.message });
});

/* 
          exporting express app
      */
module.exports = app;
