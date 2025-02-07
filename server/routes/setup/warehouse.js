const express = require("express");
const route = express.Router();
const { addWarehouse,getWarehouse } = require("../../controllers/setup/warehouse")

// add vendor route
route.post("/add-warehouse",addWarehouse)

// add vendor route
route.get("/get-warehouse",getWarehouse)



module.exports = route;