const express = require("express");
const {
  getAllProducts,
  getSingleProduct,
  createProduct,
  updateProductImage,
  updateProductInfo,
} = require("../controllers/product/product.controller");
const { upload } = require("../middlewares/multer.middleware");
const productRouter = express.Router();

/* get all products */
productRouter.get("/", getAllProducts);

/* get single product */
productRouter.get("/:id", getSingleProduct);

/* create product */
productRouter.post("/create", upload.single("img"), createProduct);

/* update product image */
productRouter.put(
  "/update-image/:productId",
  upload.single("img"),
  updateProductImage
);

/* update product info */
productRouter.put("/update-info/:productId", updateProductInfo);

module.exports = productRouter;
