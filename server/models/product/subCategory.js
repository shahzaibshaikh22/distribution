const mongoose = require("mongoose");


const SubCategorySchema = mongoose.Schema({
    subcategory:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const SubCategory = mongoose.model("SubCategory", SubCategorySchema)
module.exports = SubCategory;