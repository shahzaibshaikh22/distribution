const Zone = require("../../models/setup/zone")

// create town
const createTown = async (req, res) => {
    try {
        const { zonename } = req.body;
        const zones = await Zone.find()
        const isZone = await Zone.findOne({zonename})
        if(isTowns){
            return res.json({msg :"town is already exists..."})
        }
        if(!zonename){
            return res.json({msg :"please type town name"})
        }
        const newTown = new Zone({ zonename, code:zones.length + 1 });
        await newTown.save();
        res.status(201).json({ msg: "Town created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create Town" });
    }
};
// get all town
const getAllTown = async (req, res) => {
    try {
        const zones = await Zone.find();
        res.status(200).json(zones);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch zones" });
    }
};
// update town 
const updatedTown = async (req, res) => {
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
const deleteTown = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the vendor exists
        const town = await Zone.findById(id);
        if (!town) {
            return res.status(404).json({ msg: "town not found" });
        }

        // Delete the vendor
        await Town.findByIdAndDelete(id);

        res.status(200).json({ msg: "town deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}



//  Export all functions
module.exports = {
    createTown,
    getAllTown,
    updatedTown,
    deleteTown

};
