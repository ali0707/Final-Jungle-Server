const express = require("express");
const {
  requireSignin,
  vendeurMiddleware,
  adminMiddleware,
} = require("../common-middleware");
const { createCalendar, getCalendars } = require("../controller/calendar");
const router = express.Router();

router.post(
  "/calendar/create",
  requireSignin,
  vendeurMiddleware,
  createCalendar
);

router.post(
  "/calendar/getCalendars",
  requireSignin,
  vendeurMiddleware,
  getCalendars
);

module.exports = router;
