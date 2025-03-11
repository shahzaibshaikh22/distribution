

const mongoose = require("mongoose")

const purchaseReturnSchema = mongoose.Schema(
    {
      vendor: {
        type: String,
        ref: "Vendor",
        required: true,
      },
      pono:{
        type:String
      },
      warehouse: {
        type: String,
        ref: "Warehouse",
        required: true,
      },
      vehicleno:{
          type:String,
          required: true,
      },
      dcno:{
          type:String,
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
            type:Number,
          },
          quantity: {
            type: Number,
            required: true,
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
        default: "Pending",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

const PurchaseReturn = mongoose.model("PurchaseReturn", purchaseReturnSchema)
module.exports = PurchaseReturn;