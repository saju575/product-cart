const express = require("express");
const {
  signup,
  login,
  logout,
  getUserProfile,
} = require("../controllers/user/user.controller");
const { isAuthenticated } = require("../middlewares/auth.middleware");

const userRouter = express.Router();

/* sign up */
userRouter.post("/signup", signup);

userRouter.post("/login", login);

userRouter.post("/logout", logout);

userRouter.get("/profile", isAuthenticated, getUserProfile);

module.exports = userRouter;
