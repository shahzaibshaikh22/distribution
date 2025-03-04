const mongoose = require("mongoose");

// Payment Model
const HandInCashSchema = new mongoose.Schema({
  balance: { type: Number},
  title: { type: String},
},{timestamps:true});

const HandInCash = mongoose.model("HandInCash",HandInCashSchema);
module.exports = HandInCash