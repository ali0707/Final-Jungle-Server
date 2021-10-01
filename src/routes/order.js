const { addOrder, getOrders, getOrder } = require("../controller/order");

const express = require("express");
//const {  } = require('../controller/category');
const {
  requireSignin,
  vendeurMiddleware,
  upload,
} = require("../common-middleware");
const {
  createProduct,
  getProductsBySlug,
  getProductDetailsById,
  deleteProductById,
  getProducts,
} = require("../controller/product");
const multer = require("multer");
const router = express.Router();
const shortid = require("shortid");
const path = require("path");

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });


router.post("/addOrder", requireSignin, vendeurMiddleware, addOrder);
router.get("/getOrders", requireSignin, vendeurMiddleware, getOrders);
router.post("/getOrder", requireSignin, vendeurMiddleware, getOrder);

module.exports = router;
