
const payToVendor = require("../../models/payments/paytovendor")
const PurchaseDue = require("../../models/purchaseDue/purchaseValue")
const createVendorPay = async (req, res) => {
  try {
    const { pono, vendor, payamount, account,totalamount } = req.body;

    const purchaseDue = await PurchaseDue.findOne({ purchseOrderNo: pono });
    const payments = await payToVendor.find();
    
    if (!purchaseDue) {
      return res.json({ err: "Purchase order not found" });
    }

    if (payamount > purchaseDue.totalAmount) {
      return res.json({ err: "Payment amount exceeds due amount" });
    }

    // Payment save karna
    const newPayment = new payToVendor({ pono,remainingamount:purchaseDue.totalAmount -= payamount, vendor, payamount,totalamount, account,voucherno:`vono-000${payments.length + 1}` });
    await newPayment.save();

    // Amount minus karna
    purchaseDue.totalAmount -= payamount;
    await purchaseDue.save();

    res.status(201).json({ msg: "Payment saved successfully and purchase due updated" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const getVendorPayments = async (req, res) => {
  try {
    const { vendor } = req.params;
    const payments = await payToVendor.find({ vendor })
    return res.json(payments);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = {
    createVendorPay,
    getVendorPayments
}