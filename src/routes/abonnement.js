const express = require("express");
const {
    requireSignin,
    vendeurMiddleware,
} = require("../common-middleware");
const { createAbonnement, getAbonnements } = require("../controller/abonnement");
const router = express.Router();

router.post(
    "/abonnement/create",
    requireSignin,
    vendeurMiddleware,
    createAbonnement
);

router.post(
    "/abonnement/abonnements",
    requireSignin,
    vendeurMiddleware,
    getAbonnements
);

module.exports = router;
