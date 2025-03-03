
const RecieveCustomerPay = require("../../models/payments/recievepayment")
const CustomerDue = require("../../models/customerDues/customerdues")


const createCustomerPay = async (req, res) => {
  try {
    const { bono, customer, recieveamount, account,totalamount } = req.body;

    const purchaseDue = await CustomerDue.findOne({ bono });
    const payments = await RecieveCustomerPay.find();
    
    if (!purchaseDue) {
      return res.json({ err: "Booking order not found" });
    }

    if (recieveamount > purchaseDue.totalAmount) {
      return res.json({ err: "Payment amount exceeds due amount" });
    }

    // Payment save karna
    const newPayment = new RecieveCustomerPay({ bono,remainingamount:purchaseDue.totalAmount -= recieveamount, customer, recieveamount,totalamount, account,voucherno:`vono-000${payments.length + 1}` });
    await newPayment.save();

    // Amount minus karna
    purchaseDue.totalAmount - recieveamount;
    await purchaseDue.save();

    res.status(201).json({ msg: "Payment saved successfully and purchase due updated" });
  } catch (error) {
    res.status(500).json({ err: error.message });
  }
};

const getCustomerPayments = async (req, res) => {
  try {
    const { customer } = req.params;
    const payments = await RecieveCustomerPay.find({ customer }).populate({
      path: "customer", // yahan customer ka data populate hoga
      select: "name email phone address", // jo fields chahiye unka selection
    });
    return res.json(payments);
  } catch (error) {
    res.json({ msg: error.message });
  }
};

module.exports = {
    createCustomerPay,
    getCustomerPayments
}