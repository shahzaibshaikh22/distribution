

const mongoose = require("mongoose")

const AddpurchaseOrderSchema = mongoose.Schema(
    {
      vendor: {
        type: String,
        ref: "Vendor",
        required: true,
      },
      pono:{
        type:String
      },
      paymentType:{
        type:String,
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
        default: "In Stock",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

const AddPurchaseOrder = mongoose.model("AddPurchaseOrder", AddpurchaseOrderSchema)
module.exports = AddPurchaseOrder;