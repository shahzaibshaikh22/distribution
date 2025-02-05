const express = require("express");
const { addProduct, upload } = require("../../controllers/product/product");
const route = express.Router();

route.post("/add-product", upload.single("image"), addProduct)

module.exports = route;