const mongoose = require("mongoose");


const TownSchema = mongoose.Schema({
    code:{
        type:Number
    },
    townname:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Town = mongoose.model("Town", TownSchema)
module.exports = Town;