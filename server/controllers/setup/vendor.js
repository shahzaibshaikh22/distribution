const Vendor = require("../../models/setup/vendor")

// add new brand function
const addVendor = async (req, res) => {
    try {
        const { vendor } = req.body;

        if(!vendor){
            return res.json({err:"Please type vendor"})
        }

        // Check if product type already exists
        const isVendor = await Vendor.findOne({ vendor });


        if (isVendor) {
            return res.json({ msg: "vendor already exists" });
        }

        // Add new product type if not found
        const newVendor = new Vendor({ vendor });
        await newVendor.save();

        return res.status(200).json({
            msg: "vendor added successfully",
            newVendor,
        });

    } catch (error) {
        res.json({ msg: "Something went wrong", error: error.message });
    }
};

const getVendor = async (req,res)=>{
    try {
        const vendor = await Vendor.find();
        if(vendor){
            return res.json({
                vendor
            })
           
        }
        if(vendor.length  <0){

            return res.josn({msg:"could'nt find any vendor"})
        }
    } catch (error) {
        
    }
}



module.exports = {
    addVendor,
    getVendor
}