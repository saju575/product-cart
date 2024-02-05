const mongoose = require("mongoose");

// Define the Product schema
const orderSchema = new mongoose.Schema(
  {
    items_price: {
      type: Number,
      required: true,
    },

    status: {
      type: String,
      required: true,
      enum: ["pending", "cancel", "confirm"],
      // Add more status options as needed
      default: "pending",
    },
  },
  { timestamps: true, versionKey: false }
);

// Create the Product model
const Order = mongoose.model("Order", orderSchema);

// Export the Product model for use in other files
module.exports = Order;
