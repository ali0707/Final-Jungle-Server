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
  updateProduct,
} = require("../controller/product");
const router = express.Router();

router.post(
  "/product/create",
  requireSignin,
  vendeurMiddleware,
  upload.array("productPicture"),
  createProduct
);
router.get("/products/:slug", getProductsBySlug);
//router.get('/category/getcategory', getCategories);
router.get("/product/:productId", getProductDetailsById);
router.delete(
  "/product/deleteProductById",
  requireSignin,
  vendeurMiddleware,
  deleteProductById
);
router.post(
  "/product/getProducts",
  requireSignin,
  vendeurMiddleware,
  getProducts
);

router.put(
  "/product/update",
  requireSignin,
  vendeurMiddleware,
  upload.array("productPicture"),
  updateProduct
);

module.exports = router;
