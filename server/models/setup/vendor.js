const mongoose = require("mongoose");


const VendorSchema = mongoose.Schema({

    code:{
        type:Number
    },
    openingbalance:{
        type:Number
    },
    vendor:{
        type:String,
    },
    address:{
        type:String
    },
    phone:{
        type:Number
    },
    email:{
        type:String
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Vendor = mongoose.model("Vendor", VendorSchema)
module.exports = Vendor;