const express = require("express");
const { addVendor, getVendor } = require("../../controllers/setup/vendor");
const route = express.Router();

// add vendor route
route.post("/add-vendor",addVendor)

// add vendor route
route.get("/get-vendor",getVendor)



module.exports = route;