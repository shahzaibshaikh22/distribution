const mongoose = require("mongoose");


const PattyExpenceSchema = mongoose.Schema({
    code:{
        type:Number
    },
    category:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const PattyExpence = mongoose.model("PattyExpence", PattyExpenceSchema)
module.exports = PattyExpence;