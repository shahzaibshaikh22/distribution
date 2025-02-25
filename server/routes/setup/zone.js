const express = require("express");
const { createZone, getAllZone, updatedZone, deleteZone } = require("../../controllers/setup/zone");
const route = express.Router();

// create new town
route.post("/add-zone",createZone)
route.get("/get-zones",getAllZone)
route.put("/update-zone/:id",updatedZone)
route.delete("/delete-zone/:id",deleteZone)



module.exports = route;