const express = require("express");
const { addCategory, getCategory, updateCategory, deleteCategory } = require("../../controllers/product/categoryController");
const route = express.Router();

// add
route.post("/add-category",addCategory)

// get all type
route.get("/get-category", getCategory)

// update
route.put("/update-category/:id", updateCategory)

// update
route.delete("/delete-category/:id", deleteCategory)

module.exports = route;