const cloudinary = require("cloudinary").v2;
const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const Product = require("../../models/product.model");
const { successResponse } = require("../response/response.controller");
const { resizeImage } = require("../../middlewares/multer.middleware");

/**
 * Get all products controller
 *
 */
exports.getAllProducts = async (req, res, next) => {
  try {
    const { name } = req.query;
    let query = {};

    // If there is a name in the query, use it for searching
    if (name) {
      query.name = { $regex: new RegExp(name, "i") }; // Case-insensitive search
    }

    const products = await Product.find(query);

    return successResponse(res, { payload: products });
  } catch (error) {
    next(error);
  }
};

/**
 * Get single product controller
 */

exports.getSingleProduct = async (req, res, next) => {
  try {
    const { id } = req.params;
    const product = await Product.findById(id);
    return successResponse(res, { payload: product });
  } catch (error) {
    next(error);
  }
};

/* create new product */
exports.createProduct = async (req, res, next) => {
  try {
    // Extract product data from request body
    const {
      name,
      main_price,
      discount_rate,
      shipping_charge,
      color,
      size,
      status,
    } = req.body;

    // Check if all required fields are present
    if (
      !name ||
      !main_price ||
      !discount_rate ||
      !shipping_charge ||
      !color ||
      !size ||
      !req.file
    ) {
      throw createHttpError(
        400,
        "All fields are required, including the image."
      );
    }
    // process image
    const processedImageBuffer = await resizeImage(req.file.buffer);

    // upload image to cloudinary

    // Create a Promise to handle the Cloudinary upload
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "product_images" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(processedImageBuffer);
    });

    // Create the product in the database with Cloudinary image URL
    const product = new Product({
      img: {
        url: cloudinaryResponse.secure_url,
        public_id: cloudinaryResponse.public_id,
      },
      name,
      main_price,
      discount_rate,
      shipping_charge,
      color,
      size,
      status,
    });

    // Save the product to the database
    await product.save();

    return successResponse(res, {
      payload: product,
    });
  } catch (error) {
    next(error);
  }
};

/* update product */
exports.updateProductInfo = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const updatedProductData = req.body;

    // Validate if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // Find the product by ID and update its fields
    const updatedProduct = await Product.findByIdAndUpdate(
      productId,
      updatedProductData,
      { new: true }
    );

    if (!updatedProduct) {
      throw createHttpError(404, "Product not found");
    }

    return successResponse(res, { payload: updatedProduct });
  } catch (error) {
    next(error);
  }
};

/* update product image */
exports.updateProductImage = async (req, res, next) => {
  try {
    const productId = req.params.productId;

    // Validate if productId is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(productId)) {
      return res.status(400).json({ error: "Invalid product ID" });
    }

    // check product available
    const existingProduct = await Product.findById(productId);

    if (!existingProduct) {
      throw createHttpError(404, "Product not found");
    }

    // process image
    const processedImageBuffer = await resizeImage(req.file.buffer);

    // delete from cloudinary if there is any
    if (existingProduct.img.public_id) {
      await cloudinary.uploader.destroy(existingProduct.img.public_id);
    }

    // upload image to cloudinary
    if (!req.file) {
      throw createHttpError(400, "Image not found");
    }
    // Create a Promise to handle the Cloudinary upload
    const cloudinaryResponse = await new Promise((resolve, reject) => {
      cloudinary.uploader
        .upload_stream({ folder: "product_images" }, (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        })
        .end(processedImageBuffer);
    });

    existingProduct.img = {
      url: cloudinaryResponse.secure_url,
      public_id: cloudinaryResponse.public_id,
    };

    await existingProduct.save();

    return successResponse(res, { payload: existingProduct });
  } catch (error) {
    next(error);
  }
};
