const express = require("express");
const { addProduct, upload, getProducts } = require("../../controllers/product/product");
const route = express.Router();

// add new product
route.post("/add-product", upload.single("image"), addProduct);

// get all products
route.get("/get-products", getProducts)

module.exports = route;