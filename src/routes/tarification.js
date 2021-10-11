const express = require("express");
const { requireSignin, vendeurMiddleware } = require("../common-middleware");
const { CreateTarif, getTarif } = require("../controller/tarification");
const router = express.Router();

router.post(
  "/tarification/create",
  requireSignin,
  vendeurMiddleware,
  CreateTarif
);
router.post("/tarif/nosTarif", getTarif);

module.exports = router;
