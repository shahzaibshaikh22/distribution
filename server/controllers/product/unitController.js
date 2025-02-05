const Unit = require("../../models/product/units")

// add new brand function
const addUnit = async (req, res) => {
    try {
        const { unit } = req.body;

        if(!unit){
            return res.json({err:"Please type unit"})
        }

        // Check if product type already exists
        const isUnit = await Unit.findOne({ unit });


        if (isUnit) {
            return res.json({ msg: "unit already exists" });
        }

        // Add new product type if not found
        const newUnit = new Unit({ unit });
        await newUnit.save();

        return res.status(200).json({
            msg: "unit added successfully",
            newUnit,
        });

    } catch (error) {
        res.json({ msg: "Something went wrong", error: error.message });
    }
};



const getUnits = async (req,res)=>{
    try {
        const units = await Unit.find();
        if(units){
            return res.json({
                units
            })
           
        }
        if(units.length  <0){

            return res.josn({msg:"could'nt find any unit"})
        }
    } catch (error) {
        
    }
}


module.exports = {
    addUnit,
    getUnits
    // updateCategory,
    // deleteCategory,
    // getCategory
}