// import mongoose from "mongoose";

// const purchaseOrderSchema = new mongoose.Schema(
//   {
//     vendor: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Vendor",
//       required: true,
//     },
//     warehouse: {
//       type: mongoose.Schema.Types.ObjectId,
//       ref: "Warehouse",
//       required: true,
//     },
//     vehicleno:{
//         type:String,
//         required: true,
//     },
//     dcno:{
//         type:String,
//         required: true,
//     },
//     products: [
//       {
//         product: {
//           type: mongoose.Schema.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         quantity: {
//           type: Number,
//           required: true,
//           min: 1,
//         },
//         total: {
//           type: Number,
//           required: true,
//         },
//       },
//     ],
//     totalAmount: {
//       type: Number,
//       required: true,
//     },
//     status: {
//       type: String,
//       default: "Pending",
//     },
//     createdAt: {
//       type: Date,
//       default: Date.now,
//     },
//   },
//   { timestamps: true }
// );

// const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema);
// module.exports = PurchaseOrder;

const mongoose = require("mongoose")

const purchaseOrderSchema = mongoose.Schema(
    {
      vendor: {
        type: String,
        ref: "Vendor",
        required: true,
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
          required: true,
      },
      products: [
        {
          product: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Product",
            required: true,
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
        default: "Pending",
      },
      createdAt: {
        type: Date,
        default: Date.now,
      },
    },
    { timestamps: true }
  );

const PurchaseOrder = mongoose.model("PurchaseOrder", purchaseOrderSchema)
module.exports = PurchaseOrder;