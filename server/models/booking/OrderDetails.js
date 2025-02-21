const mongoose = require("mongoose");

const OrderDetailsSchema = new mongoose.Schema(
  {
    responsiblePerson: {
      type: String,
      required: true,
    },
    driverName: {
      type: String,
      required: true,
    },
    vehicleNo: {
      type: String,
      required: true,
    },
    orderId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Order", 
      required: true,
    },
  },
  { timestamps: true }
);

const OrderDetail =  mongoose.model("OrderDetail", OrderDetailsSchema);

module.exports = OrderDetail
