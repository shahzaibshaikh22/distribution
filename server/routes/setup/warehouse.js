const express = require("express");
const { addWarehouse, getWarehouse } = require("../../controllers/setup/warehouse");
const route = express.Router();

// add vendor route
route.post("/add-warehouse",addWarehouse)

// add vendor route
route.get("/get-warehouse",getWarehouse)



module.exports = route;