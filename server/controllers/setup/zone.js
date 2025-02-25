const Zone = require("../../models/setup/zone")

// create town
const createZone = async (req, res) => {
    try {
        const { zonename } = req.body;
        const zones = await Zone.find()
        const isZone = await Zone.findOne({zonename})
        if(isZone){
            return res.json({msg :"zone is already exists..."})
        }
        if(!zonename){
            return res.json({msg :"please type zone name"})
        }
        const newTown = new Zone({ zonename, code:zones.length + 1 });
        await newTown.save();
        res.status(201).json({ msg: "Zone created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to create Zone" });
    }
};
// get all town
const getAllZone = async (req, res) => {
    try {
        const zones = await Zone.find();
        res.status(200).json(zones);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch zones" });
    }
};
// update town 
const updatedZone = async (req, res) => {
    try {
        const zone = await Zone.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!zone) {
            return res.status(404).json({ msg: "Customer not found" });
        }
        res.status(200).json({ msg: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update customer" });
    }
};
// delete town
const deleteZone = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the vendor exists
        const zone = await Zone.findById(id);
        if (!zone) {
            return res.status(404).json({ msg: "zone not found" });
        }

        // Delete the vendor
        await Zone.findByIdAndDelete(id);

        res.status(200).json({ msg: "zone deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}



//  Export all functions
module.exports = {
    createZone,
    getAllZone,
    updatedZone,
    deleteZone

};
