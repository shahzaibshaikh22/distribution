const mongoose = require("mongoose")
const orderBookingSchema = new mongoose.Schema(
  {
    customer: {
      type: String, 
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
    totalQuantity: {
      type: Number,
      required: true,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    netPayableAmount: {
      type: Number,
      required: true,
    },
    paymentType: {
      type: String,
      enum: ["cash", "card"],
      required: true,
    },
    deliveryCharges: {
      type: Number,
      default: 0,
    },
    extraCharges: {
      type: Number,
      default: 0,
    },
    changeAmount: {
      type: Number,
      default: 0,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

// const OrderBooking = mongoose.model("OrderBooking", orderBookingSchema);
// module.exports = OrderBooking;


const OrderBooking = mongoose.model("OrderBooking", orderBookingSchema);
module.exports = OrderBooking
