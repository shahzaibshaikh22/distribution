const Product = require("../../models/product/product")
const multer = require("multer");
const path = require("path");

// add new brand function
// Multer storage setup
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/"); // Folder where images will be saved
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
    }
});

const upload = multer({ storage: storage });
const addProduct = async (req, res) => {
    try {
        const requiredFields = [
            "producttype", "productname", "distributionprice", "barcode",
            "hscode", "brand", "category", "subcategory", "remarks",
            "unit", "weight", "stocklevel", "openingbalance",
            "openingcost", "retailprice", "wholesaleprice", "costprice"
        ];

        for (let field of requiredFields) {
            if (!req.body[field] || req.body[field].toString().trim() === "") {
                return res.json({ err: `${field} is required` });
            }
        }

        const existingProduct = await Product.findOne({ productname: req.body.productname });

        if (existingProduct) {
            return res.json({ msg: "Product already exists" });
        }

        // Check if file is uploaded
        let imagePath = "";
        if (req.file) {
            imagePath = `${req.file.filename}`; // Saving file path
        }

        // Create product with image
        const newProduct = new Product({ ...req.body, image: imagePath });
        await newProduct.save();

        res.status(201).json({ msg: "Product added successfully", product: newProduct });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};
const getProducts = async (req,res)=>{
    try {
        const products = await Product.find();
        if(!products){
            return res.json({err:"could'nt find any product"})
        }
        if(products){
            return res.json({
                products
            })
        }
    } catch (error) {
       return res.json({err:"something went wrong", error:error.message})
    }
}
// update product
const updateProduct = async (req, res) => {
    try {
        const { id } = req.params; 
        
        let product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ msg: "Product not found" });
        }

        let imagePath = product.image; 
        if (req.file) {
            imagePath = `${req.file.filename}`;             
        }
        console.log(imagePath);


        // Update the product
        const updatedProduct = await Product.findByIdAndUpdate(
            id,
            { ...req.body, image: imagePath },
            { new: true, runValidators: true } 
        );

        res.status(200).json({ msg: "Product updated successfully", product: updatedProduct });
    } catch (error) {
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

const deleteProduct= async (req, res) => {
    try {
        const { id } = req.params;

        // Check if Brand name exists
        const isProduct = await Product.findById(id);
        if (!isProduct) {
            return res.status(404).json({ msg: "could'nt delete product" });
        }

        // Delete the Brand name
        await Product.findByIdAndDelete(id);

        return res.status(200).json({ msg: "product deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};

// get single product
const getSingleProduct = async (req,res)=>{
    try {
        
    } catch (error) {
        
    }
}
// const addProduct = async (req, res) => {
//     try {
//         const requiredFields = ["producttype", "productname","distributionprice", "barcode", "hscode", "brand", "category", "subcategory","remarks", "unit", "weight", "stocklevel", "openingbalance", "openingcost", "retailprice",
//         "wholesaleprice", "costprice"];

//         for (let field of requiredFields) {
//             if (!req.body[field] || req.body[field].toString().trim() === "") {
//                 return res.json({ 
//                     err: `${field} is required`
//                 });
//             }
//         }

//         const existingProduct = await Product.findOne({productname:req.body.productname});

//         if (existingProduct) {
//             return res.json({
//                 msg: "Product already exists"
//             });
//         }

//         const newProduct = new Product(req.body);
//         await newProduct.save();

//         res.status(201).json({  msg: "Product added successfully", product: newProduct });
//     } catch (error) {
//         res.status(500).json({  msg: "Server error", error: error.message });
//     }
// };




module.exports = {
    addProduct,
    upload,
    getProducts,
    getSingleProduct,
    deleteProduct,
    updateProduct
}