const PurchaseOrder = require("../../models/purchase/purchaseOrderModel")
const AddPurchaseOrder = require("../../models/purchase/addpurchaseOrder")

const purchaseOrders = async (req,res)=>{
  try {
    const { warehouse,vendor,products,vehicleno } = req.body;

    const purchaseOrder = await PurchaseOrder.find();
    if(!warehouse || !vendor || !products || !vehicleno){
      return res.json({err:"fields are required"})
    }
    const newOrder = await PurchaseOrder.create(req.body);
    res.status(201).json({msg:"order created successfully",newOrder});
  } catch (error) {
    res.status(500).json({ message: "Failed to save order" });
  }
}
const getPurchaseOrder = async (req, res) => {
  try {
    const purchaseOrder = await PurchaseOrder.find().populate({
      path: "products.product",
      select: "productname image brand category costprice", 
    });

    if (purchaseOrder.length > 0) {
      return res.json(purchaseOrder);
    } else {
      return res.json({ err: "Couldn't find order" });
    }
  } catch (error) {
    return res.json({ err: error.message });
  }
};
// add purchase order
const AddpurchaseOrders = async (req,res)=>{
  try {
    const { warehouse,vendor,products,vehicleno,dcno,pono } = req.body;

    const purchaseOrder = await AddPurchaseOrder.find();
    if(!warehouse || !vendor || !products || !vehicleno || !dcno || !pono){
      return res.json({err:"fields are required"})
    }
    const newOrder = await AddPurchaseOrder.create(req.body);
    res.status(201).json({msg:"order created successfully",newOrder});
  } catch (error) {
    res.status(500).json({ message: "Failed to save order" });
  }
}
const getPurchases = async (req, res) => {
  try {
    const purchaseOrder = await AddPurchaseOrder.find();

    if (purchaseOrder.length > 0) {
      return res.json(purchaseOrder);
    } else {
      return res.json({ err: "Couldn't find order" });
    }
  } catch (error) {
    return res.json({ err: error.message });
  }
};
module.exports = {
    purchaseOrders,
    getPurchaseOrder,
    AddpurchaseOrders,
    getPurchases
}