

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
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        price:{
          type:Number
        },
        quantity: {
          type: Number,
          required: true,
          min: 1,
        },
        total: {
          type: Number,
          required: true,
        },
      },
    ],
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