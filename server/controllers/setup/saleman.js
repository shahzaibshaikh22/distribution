const Saleman = require("../../models/setup/saleman")

// create town
const createSaleman = async (req, res) => {
    try {
        const { saleman } = req.body;
        const salemans = await Saleman.find()
        const isSaleman = await Saleman.findOne({saleman})
        if(isSaleman){
            return res.json({msg :"saleman is already exists..."})
        }
        if(!saleman){
            return res.json({msg :"please type saleman name"})
        }
        const newSaleman = new Saleman({ saleman, code:salemans.length + 1 });
        await newSaleman.save();
        res.status(201).json({ msg: "Saleman created successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to create Saleman" });
    }
};
// get all town
const getAllSaleman = async (req, res) => {
    try {
        const salesman = await Saleman.find();
        res.status(200).json(salesman);
    } catch (error) {
        res.status(500).json({ error: "Failed to fetch salesman" });
    }
};
// update town 
const updatedSaleman = async (req, res) => {
    try {
        const saleman = await Saleman.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!saleman) {
            return res.status(404).json({ msg: "saleman not found" });
        }
        res.status(200).json({ msg: "saleman updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update saleman" });
    }
};
// delete town
const deleteSaleman = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the vendor exists
        const saleman = await Saleman.findById(id);
        if (!saleman) {
            return res.status(404).json({ msg: "saleman not found" });
        }

        // Delete the vendor
        await Saleman.findByIdAndDelete(id);

        res.status(200).json({ msg: "saleman deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}



//  Export all functions
module.exports = {
    createSaleman,
    getAllSaleman,
    updatedSaleman,
    deleteSaleman

};
