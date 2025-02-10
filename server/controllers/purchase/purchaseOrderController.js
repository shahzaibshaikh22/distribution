const PurchaseOrder = require("../../models/purchase/purchaseOrderModel")

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

const getPurchaseOrder = async(req,res)=>{
  try {
    const purchaseOrder = await PurchaseOrder.find();
    if(purchaseOrder){
      return res.json(purchaseOrder);
    }else{
      return res.json({err:"could'nt find order"})
    }

  } catch (error) {
    return res.json({err:error.message})
  }
}
module.exports = {
    purchaseOrders,
    getPurchaseOrder
}