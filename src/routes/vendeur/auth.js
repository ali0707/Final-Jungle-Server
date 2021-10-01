const express = require("express");
const { getUserProfile } = require("../../controller/vendeur/auth");

const { signup, signin, signout } = require("../../controller/vendeur/auth");
const {
  validateSignupRequest,
  isRequestValid,
  validateSigninRequest,
} = require("../../validators/vendeur/auth");

const { requireSignin, vendeurMiddleware } = require("../../common-middleware");
const router = express.Router();

router.post("/vendeur/signin", validateSigninRequest, isRequestValid, signin);

router.post(
  "/vendeur/myProfile",
  requireSignin,
  vendeurMiddleware,
  getUserProfile
);

router.post("/vendeur/signup", validateSignupRequest, isRequestValid, signup);

router.post("/vendeur/signout", signout);

// router.post('/profile', requireSignin, (req,res)=>{
//     res.status(200).json({user: 'profile'})
// });

module.exports = router;
