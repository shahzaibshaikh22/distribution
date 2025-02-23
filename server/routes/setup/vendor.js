const express = require("express");
const { addVendor, getVendor, deleteVendor } = require("../../controllers/setup/vendor");
const route = express.Router();

// add vendor route
route.post("/add-vendor",addVendor)

// add vendor route
route.get("/get-vendor",getVendor)

// delete vendor
route.delete("/delete-vendor/:id",deleteVendor)



module.exports = route;