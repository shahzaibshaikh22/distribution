const express = require("express");
const { createCustomer, getAllCustomers, createCustomerCategory, deleteCustomerCategory, getCustomerCategory, updatedCustomerCategory, deleteCustomer, updateCustomer } = require("../../controllers/setup/customer");
const route = express.Router();

// create customer  route
route.post("/add",createCustomer)
route.get("/get",getAllCustomers)
route.post("/add-category", createCustomerCategory)
route.get("/get-category", getCustomerCategory)
route.delete("/delete-category/:id", deleteCustomerCategory)
route.put("/update-customer-category/:id", updatedCustomerCategory)
route.delete("/delete-customer/:id", deleteCustomer)
route.put("/update-customer/:id", updateCustomer)




module.exports = route;