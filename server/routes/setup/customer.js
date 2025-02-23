const express = require("express");
const { createCustomer, getAllCustomers, createCustomerCategory, deleteCustomerCategory, getCustomerCategory } = require("../../controllers/setup/customer");
const route = express.Router();

// create customer  route
route.post("/add",createCustomer)
route.get("/get",getAllCustomers)
route.post("/add-category", createCustomerCategory)
route.get("/get-category", getCustomerCategory)
route.delete("/delete-category/:id", deleteCustomerCategory)




module.exports = route;