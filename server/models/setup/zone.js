const mongoose = require("mongoose");


const ZoneSchema = mongoose.Schema({
    code:{
        type:Number
    },
    zonename:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Zone = mongoose.model("Zone", ZoneSchema)
module.exports = Zone;