const express = require("express");
const { addStaffCategory, addStaff, getStaffCategory, getStaff, deleteStaffCategory, deleteStaff } = require("../../controllers/setup/staffcategory");
const route = express.Router();

// add staff category
route.post("/add-category",addStaffCategory)
route.get("/get-staff-category", getStaffCategory)
route.get("/get-staff", getStaff)
// delete staff category
route.delete("/dlt-staff-cat/:id", deleteStaffCategory)
// delete staff 
route.delete("/dlt-staff/:id", deleteStaff)
// add staff
route.post("/add-staff",addStaff)





module.exports = route;