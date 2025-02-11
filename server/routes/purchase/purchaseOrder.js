const express = require("express");
const { purchaseOrders, getPurchaseOrder, AddpurchaseOrders, getPurchases } = require("../../controllers/purchase/purchaseOrderController");
const route = express.Router();
// create purchase order
route.post("/order", purchaseOrders)
route.get("/order", getPurchaseOrder)

// add purchase order
route.post("/add-order",AddpurchaseOrders)
route.get("/get-purchase",getPurchases)

module.exports = route;
