const mongoose = require("mongoose");


const VendorSchema = mongoose.Schema({
    vendor:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Vendor = mongoose.model("Vendor", VendorSchema)
module.exports = Vendor;