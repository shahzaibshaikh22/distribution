const express = require("express");
const { addBrandName, updateBrandName, deleteBrand, getBrands } = require("../../controllers/product/brandController");
const route = express.Router();

// add brand route
route.post("/add-name",addBrandName)

// update brand route
route.put("/update-name/:id",updateBrandName)

// delete brand route
route.delete("/delete-brand/:id",deleteBrand)

// get all brand route
route.get("/get-brand",getBrands)

module.exports = route;