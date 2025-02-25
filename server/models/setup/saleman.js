const mongoose = require("mongoose");


const SalemanSchema = mongoose.Schema({
    code:{
        type:Number
    },
    saleman:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Saleman = mongoose.model("Saleman", SalemanSchema)
module.exports = Saleman;