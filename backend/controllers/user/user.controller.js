const { createJWTToken } = require("../../helper/jwt.helper");
const User = require("../../models/user.model");
const { JWT_ACCESS_KEY } = require("../../secret");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const { successResponse } = require("../response/response.controller");
const createHttpError = require("http-errors");

exports.signup = async (req, res, next) => {
  try {
    const { phone, password, role } = req.body;

    if (!phone || !password) {
      throw createHttpError(400, "All fields are required");
    }

    const existingUser = await User.findOne({ phone });

    if (existingUser) {
      throw createHttpError(409, "User already exists");
    }

    const newUser = await User.create({
      phone,
      password,
      role: role ? role : "user",
    });

    const accessToken = createJWTToken(
      { _id: newUser._id },
      JWT_ACCESS_KEY,
      "120 days"
    );

    // set cookies
    res.cookie("accesstoken", accessToken, {
      maxAge: 60 * 60 * 24 * 120 * 1000,
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
      path: "/",
    });

    // successful response
    return successResponse(res, {
      message: "SignUp successfully",
      payload: {
        user: { ...newUser._doc, password: undefined },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* login */
exports.login = async (req, res, next) => {
  try {
    // phone, password
    const { phone, password } = req.body;
    // isExist the account in DB
    const user = await User.findOne({ phone }).select("+password");

    if (!user) {
      throw createHttpError(404, "User not found.Please register first.");
    }

    // compare the password

    const isPasswordsMatch = await bcrypt.compare(password, user.password);
    if (!isPasswordsMatch) {
      throw createHttpError(401, "Phone/password mismatch");
    }

    const accessToken = createJWTToken(
      { _id: user._id },
      JWT_ACCESS_KEY,
      "120 days"
    );

    // set cookies
    res.cookie("accesstoken", accessToken, {
      maxAge: 60 * 60 * 24 * 120 * 1000,
      httpOnly: true,
      // sameSite: "None",
      // secure: true,
      path: "/",
    });

    // successful response
    return successResponse(res, {
      message: "Login successfully",
      payload: {
        user: { ...user._doc, password: undefined },
        accessToken: accessToken,
      },
    });
  } catch (error) {
    next(error);
  }
};

/* logout */
exports.logout = async (req, res, next) => {
  try {
    res.clearCookie("accesstoken");
    return successResponse(res, {
      message: "Logout successfully",
    });
  } catch (error) {
    next(error);
  }
};

/* get user profile */
exports.getUserProfile = async (req, res, next) => {
  try {
    const user = req.user;
    if (!user) {
      throw createHttpError(404, "User not found");
    }
    return successResponse(res, {
      message: "Get user profile successfully",
      payload: user,
    });
  } catch (error) {
    next(error);
  }
};
