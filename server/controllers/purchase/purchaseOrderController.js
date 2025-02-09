const PurchaseOrder = require("../../models/purchase/purchaseOrderModel")

const purchaseOrders = async (req,res)=>{
  console.log("Received Purchase Order Data:", req.body); // Check data structure
  try {
    const newOrder = await PurchaseOrder.create(req.body);
    res.status(201).json(newOrder);
  } catch (error) {
    console.error("Error saving order:", error);
    res.status(500).json({ message: "Failed to save order" });
  }
}

module.exports = {
    purchaseOrders
}