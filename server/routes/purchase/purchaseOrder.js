const express = require("express");
const { purchaseOrders, getPurchaseOrder,getPorderByVendor, AddpurchaseOrders, getPurchases, getInventoryItems, deleteInventoryItem, getAllAddPurchaseOrdersTotal } = require("../../controllers/purchase/purchaseOrderController");
const route = express.Router();
// create purchase order
route.post("/order", purchaseOrders)
route.get("/order", getPurchaseOrder)
// get purchase order by vendor name
route.get("/vendor-orders/:vendor", getPorderByVendor)

// add purchase order
route.post("/add-order",AddpurchaseOrders)
route.get("/get-inventory",getInventoryItems)
route.delete("/dlt-invitem",deleteInventoryItem)

route.get("/get-total",getAllAddPurchaseOrdersTotal)

module.exports = route;
