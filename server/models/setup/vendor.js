const mongoose = require("mongoose");


const VendorSchema = mongoose.Schema({

    code:{
        type:Number
    },
    openingbalance:{
        type:Number
    },
    name:{
        type:String,
    },
    address:{
        type:String
    },
    phone:{
        type:String
    },
    mobile:{
        type:String
    },
    fax:{
        type:String
    },
    gst:{
        type:String
    },
    contactperson:{
        type:String
    },
    ntn:{
        type:String
    },
    designation:{
        type:String
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