const mongoose = require("mongoose");

// Payment Model
const PattyPaymentSchema = new mongoose.Schema({
  voucherno: { type: String},
  category:{type:String},
  amount: { type: Number, required: true },
  account: { type: String, required: true },
  description: { type: String, required: true },
},{timestamps:true});

const PattyPayment = mongoose.model("PattyPayment",PattyPaymentSchema);
module.exports = PattyPayment