const express = require("express");
const { addUnit } = require("../../controllers/product/unitController");
const route = express.Router();

// add
route.post("/add-unit",addUnit)

// // get all type
// route.get("/get-category", getCategory)

// // update
// route.put("/update-category/:id", updateCategory)

// // update
// route.delete("/delete-category/:id", deleteCategory)

module.exports = route;