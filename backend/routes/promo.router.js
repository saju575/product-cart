const express = require("express");
const {
  getAllPromos,
  createPromo,
  updatePromo,
  checkPromoAndSendDiscount,
  decreaseUsages,
  getSinglePromo,
} = require("../controllers/promo/promo.controller");
const {
  isAuthenticated,
  authorizeRole,
} = require("../middlewares/auth.middleware");

const promoRouter = express.Router();

/* get all promos */
promoRouter.get("/", isAuthenticated, authorizeRole("admin"), getAllPromos);

/* get one promo with id */
promoRouter.get(
  "/:promoId",
  isAuthenticated,
  authorizeRole("admin"),
  getSinglePromo
);

/* create promos */
promoRouter.post(
  "/create",
  isAuthenticated,
  authorizeRole("admin"),
  createPromo
);

/* update promos */
promoRouter.put(
  "/update/:promoId",
  isAuthenticated,
  authorizeRole("admin"),
  updatePromo
);

/* check promos code */
promoRouter.post("/check-code", isAuthenticated, checkPromoAndSendDiscount);

/* decrease usages */
promoRouter.post("/decrease-usages/:promoId", isAuthenticated, decreaseUsages);
module.exports = promoRouter;
