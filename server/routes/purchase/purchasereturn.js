const express = require("express");
const { purchaseReturn } = require("../../controllers/purchase/purchaseOrderController");
const route = express.Router();
// create purchase order
route.post("/purchase-return",purchaseReturn)


module.exports = route;
