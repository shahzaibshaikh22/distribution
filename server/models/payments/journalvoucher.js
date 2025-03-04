const mongoose = require("mongoose");

// Payment Model
const JournalPaymentSchema = new mongoose.Schema({
  voucherno: { type: String},
  paymentType:{type:String},
  amount: { type: Number, required: true },
  account: { type: String, required: true },
  description: { type: String, required: true },
},{timestamps:true});

const JournalPayment = mongoose.model("JournalPayment",JournalPaymentSchema);
module.exports = JournalPayment