const express = require("express");
//const {  } = require('../controller/category');
const {
    requireSignin,
    vendeurMiddleware,
} = require("../common-middleware");
const {
    createJoinRequest,
    getAllRequests,
    getJoinRequestByCalendarId,

} = require("../controller/joinRequest");
const router = express.Router();

router.post(
    "/calendar/createJoinRequest",
    requireSignin,
    vendeurMiddleware,
    createJoinRequest
);
//router.get('/category/getcategory', getCategories);
router.get("/calendar/joinRequest/:calendrierId", getJoinRequestByCalendarId);
// router.delete(
//     "/product/deleteProductById",
//     requireSignin,
//     vendeurMiddleware,
//     deleteProductById
// );
router.get(
    "/allRequests",
    requireSignin,
    vendeurMiddleware,
    getAllRequests,
);


module.exports = router;
