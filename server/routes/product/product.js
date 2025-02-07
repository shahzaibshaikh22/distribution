const express = require("express");
const { addProduct, upload, getProducts, getSingleProduct, deleteProduct, updateProduct } = require("../../controllers/product/product");
const route = express.Router();

// add new product
route.post("/add-product", upload.single("image"), addProduct);

// get all products
route.get("/get-products", getProducts)

// update product
route.put("/update-product/:id",upload.single("image"), updateProduct)

// delete product
route.delete("/delete-product/:id", deleteProduct)

// get single product
route.get("/product/:id", getSingleProduct)

module.exports = route;