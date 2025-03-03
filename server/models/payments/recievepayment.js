const mongoose = require("mongoose");

// Payment Model
const recieveCustomerPaymentSchema = new mongoose.Schema({

  bono: { type: String, required: true },
  voucherno: { type: String},
  customer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Customer",
},
  totalamount: { type: Number, required: true },
  remainingamount: { type: Number},
  recieveamount: { type: Number, required: true },
  account: { type: String, required: true },
},{timestamps:true});

const RecieveCustomerPay = mongoose.model("RecieveCustomerPay",recieveCustomerPaymentSchema);
module.exports = RecieveCustomerPay