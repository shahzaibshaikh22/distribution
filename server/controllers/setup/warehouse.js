const Warehouse = require("../../models/setup/warehouse")

// add new brand function
const addWarehouse = async (req, res) => {
    try {
        const { warehouse } = req.body;
        const warehouses = await Warehouse.find()

        if(!warehouse){
            return res.json({err:"Please type warehouse"})
        }

        // Check if product type already exists
        const isWarehouse = await Warehouse.findOne({ warehouse });


        if (isWarehouse) {
            return res.json({ msg: "warehouse already exists" });
        }

        // Add new product type if not found
        const newWarehouse = new Warehouse({ warehouse, code:warehouses.length + 1 });
        await newWarehouse.save();

        return res.status(200).json({
            msg: "warehouse added successfully"});

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

// update town 
const updateWarehouse = async (req, res) => {
    try {
        const updatewarehouse = await Warehouse.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatewarehouse) {
            return res.status(404).json({ msg: "warehouse not found" });
        }
        res.status(200).json({ msg: "warehouse updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
// delete town
const deleteWarehouse = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the vendor exists
        const warehouse = await Warehouse.findById(id);
        if (!warehouse) {
            return res.status(404).json({ msg: "warehouse not found" });
        }

        // Delete the vendor
        await Warehouse.findByIdAndDelete(id);

        res.status(200).json({ msg: "warehouse deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}


module.exports = {
    addWarehouse,
    getWarehouse,
    updateWarehouse,
    deleteWarehouse
}