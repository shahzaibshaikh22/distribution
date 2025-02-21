

const mongoose = require("mongoose")

const purchaseDueSchema = mongoose.Schema(
    {
      vendor:{
        type:String
      },
      purchseOrderNo:{
        type: String
      },
      paymentType:{
        type:String,
    },
      totalAmount: {
        type: Number,
        required: true,
      },
      status: {
        type: String,
        default: "pending",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

const PurchaseDue = mongoose.model("PurchaseDue", purchaseDueSchema)
module.exports = PurchaseDue;