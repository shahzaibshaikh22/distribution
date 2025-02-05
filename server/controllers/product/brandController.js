const Brand = require("../../models/product/Brand")

// add new brand function
const addBrandName = async (req, res) => {
    try {
        const { brand } = req.body;

        if(!brand){
            return res.json({err:"Please type brand name"})
        }

        // Check if product type already exists
        const isBrand = await Brand.findOne({ brand });


        if (isBrand) {
            return res.json({ msg: "Brand name already exists" });
        }

        // Add new product type if not found
        const newBrand = new Brand({ brand });
        await newBrand.save();

        return res.status(200).json({
            msg: "Brand name added successfully",
            newBrand,
        });

    } catch (error) {
        res.json({ msg: "Something went wrong", error: error.message });
    }
};

// update brand name
// update product type
const updateBrandName = async (req, res) => {
    try {
        const { id } = req.params;
        const { brand } = req.body;
       
        const isBrand = await Brand.findById(id)
        if(!brand){
            return res.json({err:"please type brand name"})
        }
        if(!isBrand){
            return res.json({err:"Brand not fond"})
        }
        if(isBrand){
            isBrand.brand = req.body.brand || isBrand.brand
            await isBrand.save()
            return res.json({
                msg:"brand name updated",
                isBrand
            })
        }

    } catch (error) {
        res.json({ err: "Something went wrong", error: error.message });
    }
};

// delete product type
const deleteBrand= async (req, res) => {
    try {
        const { id } = req.params;

        // Check if Brand name exists
        const isBrand = await Brand.findById(id);
        if (!isBrand) {
            return res.status(404).json({ msg: "Brand name not found" });
        }

        // Delete the Brand name
        await Brand.findByIdAndDelete(id);

        return res.status(200).json({ msg: "Brand name deleted successfully" });

    } catch (error) {
        res.status(500).json({ msg: "Something went wrong", error: error.message });
    }
};

// get all product type

const getBrands = async (req,res)=>{
    try {
        const brands = await Brand.find();
        if(brands){
            return res.json({
                brands
            })
           
        }
        if(brands.length  <0){

            return res.josn({msg:"could'nt find any product type"})
        }
    } catch (error) {
        
    }
}


module.exports = {
    addBrandName,
    updateBrandName,
    deleteBrand,
    getBrands
}