const express = require("express");
const { addSubCategory } = require("../../controllers/product/subCategoryController");
const route = express.Router();

// add
route.post("/add-subcategory",addSubCategory)

// // get all type
// route.get("/get-category", getCategory)

// // update
// route.put("/update-category/:id", updateCategory)

// // update
// route.delete("/delete-category/:id", deleteCategory)

module.exports = route;