const express = require("express");
const { createBooking, getAllBookings, deleteBooking } = require("../../controllers/booking/bookingController")
const route = express.Router();

route.post("/new-order", createBooking)
route.get("/get-bookings", getAllBookings)
route.delete("/delete-booking/:id", deleteBooking)

module.exports = route