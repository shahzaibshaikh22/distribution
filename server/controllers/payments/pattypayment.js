const PattyPayment = require("../../models/payments/pattypayment");
const HandInCash = require("../../models/accounts/handincash");

// Create a new Journal Payment
const createPayment = async (req, res) => {
    try {
      const { category, amount, account, description } = req.body;
      
      // Update HandInCash balance
      let handInCash = await HandInCash.findOne();
      
      if (handInCash.balance < Number(amount)) {
        return res.json({ msg: "Insufficient balance in HandInCash" });
      }
      
      // Generate voucher number
      const payments = await PattyPayment.find();
      const newPayment = new PattyPayment({ voucherno:`vono-000${payments.length + 1}`, category, amount, account, description });
    
    handInCash.balance -= Number(amount);
      await handInCash.save();
      await newPayment.save();
      
     return res.status(201).json({ msg: "Payment completed"});
    } catch (error) {
     return res.json({ msg: error.message });
    }
  };

// Get all Journal Payments
const getPayments = async (req, res) => {
  try {
    const payments = await PattyPayment.find();
   return res.status(201).json(payments);
  } catch (error) {
    res.status(500).json({ msg:error.message });
  }
};

// Get a single Journal Payment by ID
const getPaymentById = async (req, res) => {
  try {
    const payment = await JournalPayment.findById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: payment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Update a Journal Payment
const updatePayment = async (req, res) => {
  try {
    const updatedPayment = await JournalPayment.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!updatedPayment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, data: updatedPayment });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Delete a Journal Payment
const deletePayment = async (req, res) => {
  try {
    const deletedPayment = await JournalPayment.findByIdAndDelete(req.params.id);
    if (!deletedPayment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.status(200).json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = {
    createPayment,
    getPayments,
    getPaymentById,
    updatePayment,
    deletePayment
}