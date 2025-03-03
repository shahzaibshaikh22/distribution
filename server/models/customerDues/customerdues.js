const mongoose = require("mongoose")

const CustomerDueSchema = mongoose.Schema(
    {
        customer: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Customer",
        },
        bono: {
            type: String
        },
        paymentType: {
            type: String,
        },
        products: [
            {
                product: {
                    type: mongoose.Schema.Types.ObjectId,
                    ref: "Product",
                    required: true,
                },
                price: {
                    type: Number
                },
                quantity: {
                    type: Number,
                    required: true,
                    min: 1,
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

const CustomerDue = mongoose.model("CustomerDue", CustomerDueSchema)
module.exports = CustomerDue;