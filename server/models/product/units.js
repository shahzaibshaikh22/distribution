const mongoose = require("mongoose");


const UnitSchema = mongoose.Schema({
    unit:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Unit = mongoose.model("Unit", UnitSchema)
module.exports = Unit;