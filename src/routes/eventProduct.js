const express = require("express");
//const {  } = require('../controller/category');
const {
    requireSignin,
    vendeurMiddleware,
} = require("../common-middleware");
const {
    createEventProduct, getEventProducts,
} = require("../controller/eventProduct");
const router = express.Router();

router.post(
    "/calendar/createEventProduct",
    requireSignin,
    vendeurMiddleware,
    createEventProduct
);

router.get(
    "/calendar/getProducts",
    requireSignin,
    vendeurMiddleware,
    getEventProducts
);


module.exports = router;
