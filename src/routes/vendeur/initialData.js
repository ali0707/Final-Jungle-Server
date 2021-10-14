const express = require("express");
const { requireSignin, vendeurMiddleware } = require("../../common-middleware");
const { initialData } = require("../../controller/vendeur/initialData");

const router = express.Router();

router.post("/initialdata", requireSignin, vendeurMiddleware, initialData);

module.exports = router;
