const Warehouse = require("../../models/setup/warehouse")

// add new brand function
const addWarehouse = async (req, res) => {
    try {
        const { warehouse } = req.body;

        if(!warehouse){
            return res.json({err:"Please type warehouse"})
        }

        // Check if product type already exists
        const isWarehouse = await Warehouse.findOne({ warehouse });


        if (isWarehouse) {
            return res.json({ msg: "warehouse already exists" });
        }

        // Add new product type if not found
        const newWarehouse = new Warehouse({ warehouse });
        await newWarehouse.save();

        return res.status(200).json({
            msg: "warehouse added successfully",
            newWarehouse,
        });

    } catch (error) {
        res.json({ msg: "Something went wrong", error: error.message });
    }
};

const getWarehouse = async (req,res)=>{
    try {
        const warehouse = await Warehouse.find();
        if(warehouse){
            return res.json({
                warehouse
            })
           
        }
        if(warehouse.length  <0){

            return res.josn({msg:"could'nt find any warehouse"})
        }
    } catch (error) {
        
    }
}



module.exports = {
    addWarehouse,
    getWarehouse
}