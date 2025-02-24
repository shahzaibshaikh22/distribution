const express = require("express");
const { createTown, getAllTown, updatedTown, deleteTown } = require("../../controllers/setup/town");
const route = express.Router();

// create new town
route.post("/add-zone",createTown)
route.get("/get-zones",getAllTown)
route.put("/update-zone/:id",updatedTown)
route.delete("/delete-zone/:id",deleteTown)



module.exports = route;