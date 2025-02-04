const Product = require("../../models/product/product")

// add new brand function
const addProduct = async (req, res) => {
    try {
        const requiredFields = ["producttype", "productname","distributionprice", "barcode", "hscode", "brand", "category", "subcategory","remarks", "unit", "weight", "stocklevel", "openingbalance", "openingcost", "retailprice",
        "wholesaleprice", "costprice"];

        for (let field of requiredFields) {
            if (!req.body[field] || req.body[field].toString().trim() === "") {
                return res.json({ 
                    err: `${field} is required`
                });
            }
        }

        const existingProduct = await Product.findOne({productname:req.body.productname});

        if (existingProduct) {
            return res.json({
                msg: "Product already exists"
            });
        }

        const newProduct = new Product(req.body);
        await newProduct.save();

        res.status(201).json({  msg: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({  msg: "Server error", error: error.message });
    }
};




module.exports = {
    addProduct
}