const express = require("express");
const { createVendorPay, getVendorPayments } = require("../../controllers/payments/paytovendor");
const route = express.Router();

route.post("/pay-to-vendor",createVendorPay)
route.get("/get-vendors-payment/:vendor",getVendorPayments)

module.exports = route