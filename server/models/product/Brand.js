const mongoose = require("mongoose");


const BrandSchema = mongoose.Schema({
    brand:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Brand = mongoose.model("Brand", BrandSchema)
module.exports = Brand;