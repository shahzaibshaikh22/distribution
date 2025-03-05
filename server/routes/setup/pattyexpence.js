const express = require("express");
const { addPattyExpence, getPattyCategory, deletePattyCategory, updatePattyCategory } = require("../../controllers/setup/pattyexpence");
const route = express.Router();

// add staff category
route.post("/add-category",addPattyExpence)
route.get("/get-category",getPattyCategory)
route.delete("/delete-category/:id",deletePattyCategory)
route.put("/update-category/:id",updatePattyCategory)






module.exports = route;