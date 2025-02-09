const express = require("express");
const { purchaseOrders } = require("../../controllers/purchase/purchaseOrderController");
const route = express.Router();

route.post("/order", purchaseOrders)

module.exports = route;
