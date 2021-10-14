const express = require("express");
//const {  } = require('../controller/category');
const { requireSignin, vendeurMiddleware } = require("../common-middleware");
const { CreateCommande, getCommande } = require("../controller/Commande");
const router = express.Router();

// const storage = multer.diskStorage({
//   destination: function (req, file, cb) {
//     cb(null, path.join(path.dirname(__dirname), "uploads"));
//   },
//   filename: function (req, file, cb) {
//     cb(null, shortid.generate() + "-" + file.originalname);
//   },
// });

// const upload = multer({ storage });

router.post(
  "/commande/create",
  requireSignin,
  vendeurMiddleware,
  CreateCommande
);
router.post(
  "/commande/getcommandes",
  requireSignin,
  vendeurMiddleware,
  getCommande
);
// router.get("/products/:slug", getProductsBySlug);
//router.get('/category/getcategory', getCategories);
// router.get("/product/:productId", getProductDetailsById);

module.exports = router;
