const mongoose = require("mongoose");


const customerCategorySchema = mongoose.Schema({
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

const CustomerCategory = mongoose.model("CustomerCategory", customerCategorySchema)
module.exports = CustomerCategory;