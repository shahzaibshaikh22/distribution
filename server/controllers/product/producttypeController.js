// add product type
const ProductType = require("../../models/product/productTypeModel");

// add new product type
const addProductType = async (req, res) => {
    try {
        const { producttype } = req.body;

        if(!producttype){
            return res.json({err:"please type product name"})
        }

        // Check if product type already exists
        const isProductType = await ProductType.findOne({ producttype });

        if (isProductType) {
            return res.json({ err: "Product type already exists" });
        }

        // Add new product type if not found
        const newProductType = new ProductType({ producttype });
        await newProductType.save();

        return res.status(200).json({
            msg: "Product type added successfully",
            newProductType,
        });

    } catch (error) {
        res.status(500).json({ err: "Something went wrong", error: error.message });
    }
};

// update product type
 const updateProductType = async (req, res) => {
    try {
        const { id } = req.params;

        const isProductType = await ProductType.findById(id)
        if(!isProductType){
            return res.json({msg:"type not fond"})
        }
        if(isProductType){
            isProductType.producttype = req.body.producttype || isProductType.producttype
            await isProductType.save()
            return res.json({
                isProductType
            })
        }

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};

// delete product type
const deleteProductType = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if product type exists
        const isProductType = await ProductType.findById(id);
        if (!isProductType) {
            return res.status(404).json({ msg: "Product type not found" });
        }

        // Delete the product type
        await ProductType.findByIdAndDelete(id);

        return res.status(200).json({ msg: "Product type deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};

// get all product type

const getProductType = async (req,res)=>{
    try {
        const producttype = await ProductType.find();
        if(producttype){
            return res.json({
                producttype
            })
           
        }
        if(producttype.length  <0){

            return res.josn({msg:"could'nt find any product type"})
        }
    } catch (error) {
        
    }
}




module.exports = {
    addProductType,
    updateProductType,
    deleteProductType,
    getProductType
}