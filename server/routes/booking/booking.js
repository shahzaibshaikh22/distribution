const express = require("express");
const { createBooking } = require("../../controllers/booking/bookingController")
const route = express.Router();

route.post("/new-order", createBooking)

module.exports = route