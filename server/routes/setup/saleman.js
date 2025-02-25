const express = require("express");
const { createSaleman, getAllSaleman, updatedSaleman, deleteSaleman } = require("../../controllers/setup/saleman");
const route = express.Router();

// create new town
route.post("/add-saleman",createSaleman)
route.get("/get-salemans",getAllSaleman)
route.put("/update-saleman/:id",updatedSaleman)
route.delete("/delete-saleman/:id",deleteSaleman)



module.exports = route;