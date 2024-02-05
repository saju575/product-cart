const mongoose = require("mongoose");

// Define the Product schema
const productSchema = new mongoose.Schema({
  img: {
    url: String,
    public_id: String,
    // default: null, // Optional field
  },
  name: {
    type: String,
    required: true,
  },
  main_price: {
    type: Number,
    required: true,
  },
  discount_rate: {
    type: Number,
    required: true,
  },
  shipping_charge: {
    type: Number,
    required: true,
  },
  color: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ["active", "inactive"],
    // Add more status options as needed
    default: "active",
  },
});

// Create the Product model
const Product = mongoose.model("Product", productSchema);

// Export the Product model for use in other files
module.exports = Product;
