const createHttpError = require("http-errors");

const jwt = require("jsonwebtoken");
const { JWT_ACCESS_KEY } = require("../secret");
const User = require("../models/user.model");

/* 
    authinticated user checking
*/

exports.isAuthenticated = async (req, res, next) => {
  try {
    const access_token = req.cookies.accesstoken;

    if (!access_token) {
      throw createHttpError(404, "Access token missing.Please login first");
    }

    const decode = jwt.verify(access_token, JWT_ACCESS_KEY);

    if (!decode) {
      throw createHttpError(401, "Access token is not valid");
    }

    const user = await User.findById(decode._id);

    if (!user) {
      throw createHttpError(404, "User not found");
    }

    req.user = user;

    next();
  } catch (error) {
    next(error);
  }
};

/* 
    authorization user role
*/

exports.authorizeRole =
  (...roles) =>
  (req, res, next) => {
    try {
      if (!roles.includes(req.user.role)) {
        throw createHttpError(403, `Role ${req.user.role} is not allowed`);
      }

      next();
    } catch (error) {
      next(error);
    }
  };
