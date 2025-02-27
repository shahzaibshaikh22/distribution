const mongoose = require("mongoose");

// Payment Model
const payToVendorSchema = new mongoose.Schema({
  pono: { type: String, required: true },
  vendor: { type: String, required: true },
  payamount: { type: Number, required: true },
  account: { type: String, required: true },
},{timestamps:true});

const PayToVendor = mongoose.model("PayToVendor", payToVendorSchema);
module.exports = PayToVendor