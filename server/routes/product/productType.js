const  express = require("express") ;
const { addProductType, updateProductType, deleteProductType, getProductType } = require("../../controllers/product/producttypeController");
const route = express.Router();

// add
route.post("/type",addProductType)

// get all type
route.get("/type", getProductType)

// update
route.put("/type/:id", updateProductType)

// update
route.delete("/type/:id", deleteProductType)

module.exports = route;