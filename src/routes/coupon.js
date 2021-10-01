const express = require("express");
const { requireSignin, vendeurMiddleware } = require("../common-middleware");
const { createCoupon, getCoupons } = require("../controller/coupon");
const router = express.Router();

router.post("/coupon/create", requireSignin, vendeurMiddleware, createCoupon);

router.post("/coupon/getCoupons", requireSignin, vendeurMiddleware, getCoupons);

module.exports = router;
