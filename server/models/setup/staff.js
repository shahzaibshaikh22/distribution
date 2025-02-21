const mongoose = require("mongoose");


const staffSchema = mongoose.Schema({
    code:{
        type:Number
    },
    name:{
        type:String,
    },
    address:{
        type:String,
    },
    category:{
        type:String,
    },
    phone:{
        type:String,
    },
    mobile:{
        type:String,
    },
    email:{
        type:String,
    },
    nic:{
        type:String,
    },
    openingbalance:{
        type:Number,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Staff = mongoose.model("Staff", staffSchema)
module.exports = Staff;