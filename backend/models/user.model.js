const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Define Promo schema
const userSchema = new mongoose.Schema(
  {
    phone: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      set: (v) => bcrypt.hashSync(v, bcrypt.genSaltSync(10)),
      select: false,
    },

    role: {
      type: String,
      enum: ["admin", "user"],
      default: "user",
    },
  },
  { timestamps: true, versionKey: false }
);

// Create Promo model
const User = mongoose.model("User", userSchema);

module.exports = User;
