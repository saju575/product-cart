const express = require("express");
const {
  getAllPromos,
  createPromo,
  updatePromo,
  checkPromoAndSendDiscount,
  decreaseUsages,
  getSinglePromo,
} = require("../controllers/promo/promo.controller");

const promoRouter = express.Router();

/* get all promos */
promoRouter.get("/", getAllPromos);

/* get one promo with id */
promoRouter.get("/:promoId", getSinglePromo);

/* create promos */
promoRouter.post("/create", createPromo);

/* update promos */
promoRouter.put("/update/:promoId", updatePromo);

/* check promos code */
promoRouter.post("/check-code", checkPromoAndSendDiscount);

/* decrease usages */
promoRouter.post("/decrease-usages/:promoId", decreaseUsages);
module.exports = promoRouter;
