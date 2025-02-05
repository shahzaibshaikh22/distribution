const express = require("express");
const { addSubCategory, getSubCategory } = require("../../controllers/product/subCategoryController");
const route = express.Router();

// add
route.post("/add-subcategory",addSubCategory)

// get all sub category
route.get("/get-subcategory", getSubCategory)

// // update
// route.put("/update-category/:id", updateCategory)

// // update
// route.delete("/delete-category/:id", deleteCategory)

module.exports = route;