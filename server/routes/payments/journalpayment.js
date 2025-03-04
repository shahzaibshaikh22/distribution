const express = require("express");
const { createPayment, getPayments } = require("../../controllers/payments/journalpayment");
const route = express.Router();

route.post("/add",createPayment)
route.get("/get",getPayments)

module.exports = route