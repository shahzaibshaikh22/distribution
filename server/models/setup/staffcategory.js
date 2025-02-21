const mongoose = require("mongoose");


const staffCategorySchema = mongoose.Schema({
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

const StaffCategory = mongoose.model("StaffCategory", staffCategorySchema)
module.exports = StaffCategory;