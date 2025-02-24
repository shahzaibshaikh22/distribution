const Town = require("../../models/setup/town")

// create town
const createTown = async (req, res) => {
    try {
        const { townname } = req.body;
        const towns = await Town.find()
        const isTowns = await Town.findOne({townname})
        if(isTowns){
            return res.json({msg :"town is already exists..."})
        }
        if(!townname){
            return res.json({msg :"please type town name"})
        }
        const newTown = new Town({ townname, code:towns.length + 1 });
        await newTown.save();
        res.status(201).json({ msg: "Town created successfully" });
    } catch (error) {
        res.status(500).json({ error: "Failed to create Town" });
    }
};
// get all town
const getAllTown = async (req, res) => {
    try {
        const towns = await Town.find();
        res.status(200).json(towns);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch towns" });
    }
};
// update town 
const updatedTown = async (req, res) => {
    try {
        const updatedTown = await Town.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedTown) {
            return res.status(404).json({ msg: "Customer not found" });
        }
        res.status(200).json({ msg: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
// delete town
const deleteTown = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the vendor exists
        const town = await Town.findById(id);
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
