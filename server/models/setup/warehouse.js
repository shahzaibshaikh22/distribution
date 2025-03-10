const mongoose = require("mongoose");


const WarehouseSchema = mongoose.Schema({
    code:{
        type:Number
    },
    warehouse:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Warehouse = mongoose.model("Warehouse", WarehouseSchema)
module.exports = Warehouse;