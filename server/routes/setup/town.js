const express = require("express");
const { createTown, getAllTown, updatedTown, deleteTown } = require("../../controllers/setup/town");
const route = express.Router();

// create new town
route.post("/add-town",createTown)
route.get("/get-towns",getAllTown)
route.put("/update-town/:id",updatedTown)
route.delete("/delete-town/:id",deleteTown)



module.exports = route;