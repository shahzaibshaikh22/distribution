const express = require("express");
const { addStaffCategory, addStaff } = require("../../controllers/setup/staffcategory");
const route = express.Router();

// add staff category
route.post("/add-category",addStaffCategory)
// add staff
route.post("/add-staff",addStaff)





module.exports = route;