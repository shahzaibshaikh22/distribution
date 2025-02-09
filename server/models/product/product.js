const mongoose = require("mongoose");


const ProductSchema = mongoose.Schema({
    producttype:{
        type:String
    },
    productname:{
        type:String
    },
    barcode:{
        type:Number
    },
    hscode:{
        type:String
    },
    brand:{
        type:String
    },
    category:{
        type:String
    },
    subcategory:{
        type:String
    },
    remarks:{
        type:String
    },
    unit:{
        type:String
    },
    weight:{
        type:Number
    },
    stocklevel:{
        type:Number
    },
    openingbalance:{
        type:Number
    },
    retailprice:{
        type:Number
    },
    wholesaleprice:{
        type:Number
    },
    openingcost:{
        type:Number
    },
    costprice:{
        type:Number
    },
    distributionprice:{
        type:String
    },
    image:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Product = mongoose.model("Product", ProductSchema)
module.exports = Product;