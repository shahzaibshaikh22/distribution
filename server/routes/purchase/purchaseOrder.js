const express = require("express");
const { purchaseOrders, getPurchaseOrder } = require("../../controllers/purchase/purchaseOrderController");
const route = express.Router();

route.post("/order", purchaseOrders)
route.get("/order", getPurchaseOrder)

module.exports = route;
