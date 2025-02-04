const mongoose = require("mongoose");


const CategorySchema = mongoose.Schema({
    category:{
        type:String,
    },
    createdAt:{
        type:Date,
        default:new Date()
    }
},{timestamps:true})

const Category = mongoose.model("Category", CategorySchema)
module.exports = Category;