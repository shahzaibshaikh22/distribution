const express = require("express");
const { purchaseOrders, getPurchaseOrder, AddpurchaseOrders, getPurchases, getInventoryItems, deleteInventoryItem } = require("../../controllers/purchase/purchaseOrderController");
const route = express.Router();
// create purchase order
route.post("/order", purchaseOrders)
route.get("/order", getPurchaseOrder)

// add purchase order
route.post("/add-order",AddpurchaseOrders)
route.get("/get-inventory",getInventoryItems)
route.delete("/dlt-invitem",deleteInventoryItem)

module.exports = route;
