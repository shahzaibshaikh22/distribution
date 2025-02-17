const express = require("express");
const { createCustomer, getAllCustomers } = require("../../controllers/setup/customer");
const route = express.Router();

// create customer  route
route.post("/add",createCustomer)
route.get("/get",getAllCustomers)




module.exports = route;