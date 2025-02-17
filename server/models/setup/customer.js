const mongoose = require("mongoose");


const CustomerSchema = mongoose.Schema({
    username:{
        type:String,
    },
    address:{
        type:String,
    },
    phone:{
        type:Number,
    },
    nten:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Customer = mongoose.model("Customer", CustomerSchema)
module.exports = Customer;