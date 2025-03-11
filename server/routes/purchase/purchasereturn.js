const express = require("express");
const { purchaseReturn, getPurchaseReturn, deletePurchaseReturn } = require("../../controllers/purchase/purchaseOrderController");
const route = express.Router();
// create purchase order
route.post("/purchase-return",purchaseReturn)
route.get("/get-purchase-return",getPurchaseReturn)
route.delete("/delete/:id",deletePurchaseReturn)


module.exports = route;
