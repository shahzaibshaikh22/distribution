const mongoose = require("mongoose")
const orderBookingReturnSchema = new mongoose.Schema(
  {
    customer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Customer", 
    },
    bono:{
      type:String
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
        },
        price: {
          type: Number,
          required: true,
        },
        totalAmount: {
          type: Number,
          required: true,
        },
      },
    ],

    totalAmount: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);



const OrderBookingReturn = mongoose.model("OrderBookingReturn", orderBookingReturnSchema);
module.exports = OrderBookingReturn
