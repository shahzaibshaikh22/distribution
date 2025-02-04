const express = require("express");
const { addProduct } = require("../../controllers/product/product");
const route = express.Router();

route.post("/add-product", addProduct)

module.exports = route;