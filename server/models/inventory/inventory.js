const mongoose = require("mongoose")


const inventorySchema = mongoose.Schema({
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
        },
      ],
})

const Inventory = mongoose.model("Inventory", inventorySchema);
module.exports = Inventory