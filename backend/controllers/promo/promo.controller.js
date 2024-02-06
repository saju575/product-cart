const mongoose = require("mongoose");
const createHttpError = require("http-errors");
const Promo = require("../../models/promo.model");
const { successResponse } = require("../response/response.controller");

exports.createPromo = async (req, res, next) => {
  try {
    const {
      code,
      usages,
      start_time,
      end_time,
      discount_rate,
      status: st,
    } = req.body;

    if (!code || !usages || !start_time || !end_time || !discount_rate) {
      throw createHttpError(400, "All fields are required");
    }

    // Parse the "M/D/YYYY" date format into a JavaScript Date object
    const startDate = new Date(start_time);
    const endDate = new Date(end_time);

    // Create a new promo data object
    const newData = {
      code,
      usages,
      start_time: startDate,
      end_time: endDate,
      status: st ? st : "active",
      discount_rate,
    };

    // Create a new promo
    const newPromo = await Promo.create(newData);

    return successResponse(res, { payload: newPromo });
  } catch (error) {
    next(error);
  }
};

/* get all promos */
exports.getAllPromos = async (req, res, next) => {
  try {
    const promos = await Promo.find().sort({ createdAt: -1 });

    return successResponse(res, { payload: promos });
  } catch (error) {
    next(error);
  }
};

/**
 * get promo by id
 */
exports.getSinglePromo = async (req, res, next) => {
  try {
    const { promoId } = req.params;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(promoId)) {
      throw createHttpError(400, "Invalid Promo ID");
    }

    // Find the Promo by ID
    const promo = await Promo.findById(promoId);

    // If the promo doesn't exist, return a 404 error
    if (!promo) {
      throw createHttpError(404, "Promo not found");
    }

    return successResponse(res, { payload: promo });
  } catch (error) {
    next(error);
  }
};

/* update promo */
exports.updatePromo = async (req, res, next) => {
  try {
    const { promoId } = req.params;
    const { end_time, status, discount_rate, usages } = req.body;

    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(promoId)) {
      throw createHttpError(400, "Invalid Promo ID");
    }

    // Find the Promo by ID
    const promo = await Promo.findById(promoId);

    // If the promo doesn't exist, return a 404 error
    if (!promo) {
      throw createHttpError(404, "Promo not found");
    }

    // Update fields if provided
    if (end_time) {
      promo.end_time = end_time;
    }
    if (status) {
      promo.status = status;
    }
    if (discount_rate) {
      promo.discount_rate = discount_rate;
    }
    if (usages) {
      promo.usages = usages;
    }

    // Save the updated Promo
    await promo.save();

    return successResponse(res, { payload: promo });
  } catch (error) {
    next(error);
  }
};

/* Check promo and send discount */
exports.checkPromoAndSendDiscount = async (req, res, next) => {
  try {
    const { code } = req.body;
    if (!code) {
      throw createHttpError(400, "Code is required");
    }
    const promo = await Promo.findOne({ code });
    if (!promo) {
      throw createHttpError(404, "Promo not found");
    }

    // Check if the promo is active
    if (promo.status !== "active") {
      throw createHttpError(400, "Coupon is not active");
    }

    // Check if the promo has expired
    const currentDate = new Date();

    if (currentDate < promo.start_time || currentDate > promo.end_time) {
      throw createHttpError(400, "Coupon has expired");
    }

    // Check if the promo has reached its usage limit
    if (promo.usages === 0) {
      throw createHttpError(400, "Coupon has reached its usage limit");
    }

    return successResponse(res, {
      payload: { _id: promo._id, discount_rate: promo.discount_rate },
    });
  } catch (error) {
    next(error);
  }
};

/* decrease usages */
exports.decreaseUsages = async (req, res, next) => {
  try {
    const { promoId } = req.params;
    // Check if the provided ID is valid
    if (!mongoose.Types.ObjectId.isValid(promoId)) {
      throw createHttpError(400, "Invalid Promo ID");
    }

    const promo = await Promo.findById(promoId);
    if (!promo) {
      throw createHttpError(404, "Promo not found");
    }
    if (promo.usages === 0) {
      throw createHttpError(400, "Coupon has reached its usage limit");
    }
    promo.usages--;
    await promo.save();
    return successResponse(res, { payload: promo });
  } catch (error) {
    next(error);
  }
};
