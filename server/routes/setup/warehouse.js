const express = require("express");
const route = express.Router();
const { addWarehouse,getWarehouse, updateWarehouse, deleteWarehouse } = require("../../controllers/setup/warehouse")

// add warehouse route
route.post("/add-warehouse",addWarehouse)

// add warehouse route
route.get("/get-warehouse",getWarehouse)

// add warehouse route
route.put("/update-warehouse/:id",updateWarehouse)

// add warehouse route
route.delete("/delete-warehouse/:id",deleteWarehouse)



module.exports = route;