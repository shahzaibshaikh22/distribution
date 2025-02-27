
const payToVendor = require("../../models/payments/paytovendor")
const PurchaseDue = require("../../models/purchaseDue/purchaseValue")
const createVendorPay = async (req, res) => {
  try {
    const { pono, vendor, payamount, account } = req.body;

    const purchaseDue = await PurchaseDue.findOne({ purchseOrderNo: pono });
    
    if (!purchaseDue) {
      return res.json({ err: "Purchase order not found" });
    }

    if (payamount > purchaseDue.totalAmount) {
      return res.json({ err: "Payment amount exceeds due amount" });
    }

    // Payment save karna
    const newPayment = new payToVendor({ pono, vendor, payamount, account });
    await newPayment.save();

    // Amount minus karna
    purchaseDue.totalAmount -= payamount;
    await purchaseDue.save();

    res.status(201).json({ msg: "Payment saved successfully and purchase due updated" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const getVendorPayments = async (req,res)=>{
  try {
    const {vendor} = req.params
    const payments = await payToVendor.find({vendor});
    if(payments.length < 1 || !payments){
      return res.json({msg:"not fonund"})
    }
    return res.json(payments)
  } catch (error) {
    res.json({ msg: error.message });
  }
}

module.exports = {
    createVendorPay,
    getVendorPayments
}