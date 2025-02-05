const mongoose = require("mongoose");


const productTypeSchema = mongoose.Schema({
    producttype:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const ProductType = mongoose.model("ProductType", productTypeSchema)
module.exports = ProductType;