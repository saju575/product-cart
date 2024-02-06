const mongoose = require("mongoose");

// Define Promo schema
const promoSchema = new mongoose.Schema(
  {
    code: {
      type: String,
      required: true,
      unique: true,
    },
    usages: {
      type: Number,
      required: true,
    },
    start_time: {
      type: Date,
      required: true,
    },
    end_time: {
      type: Date,
      required: true,
    },
    status: {
      type: String,
      enum: ["active", "inactive"],
      default: "active",
    },
    discount_rate: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true, versionKey: false }
);

// Create Promo model
const Promo = mongoose.model("Promo", promoSchema);

module.exports = Promo;
