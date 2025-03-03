const express = require("express");
const { createCustomerPay, getCustomerPayments } = require("../../controllers/payments/recievepayments");
const route = express.Router();

route.post("/recieve-customer-payment",createCustomerPay)
route.get("/get-customer-payment/:customer",getCustomerPayments)

module.exports = route