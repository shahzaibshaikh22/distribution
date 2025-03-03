const express = require("express");
const { createBooking, getAllBookings, deleteBooking,createOrderDetail,getBookingOrderByCustomerId, updateOrderStatus } = require("../../controllers/booking/bookingController")
const route = express.Router();

route.post("/new-order", createBooking)
route.get("/get-bookings", getAllBookings)
route.delete("/delete-booking/:id", deleteBooking)
route.put("/booking-delivered/:id", updateOrderStatus)
route.post("/booking-summary", createOrderDetail)
route.get("/get-customer-order/:customer", getBookingOrderByCustomerId)

module.exports = route