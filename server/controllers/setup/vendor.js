const Vendor = require("../../models/setup/vendor")

// add new brand function
const addVendor = async (req, res) => {
    try {
        const vendors = await Vendor.find()
        const { name, address, email, phone, openingbalance, mobile, fax, gst, contactperson, designation, ntn } = req.body;
        if (!name || !address || !email || !phone) {
            return res.json({ err: "fields are required" })
        }

        // Check if product type already exists
        const isVendor = await Vendor.findOne({ name })


        if (isVendor) {
            return res.json({ err: "vendor already exists" });
        }

        // Add new product type if not found
        const newVendor = new Vendor({ name, address, email, openingbalance, phone, code: vendors.length + 1, mobile, fax, gst, contactperson, designation, ntn });
        await newVendor.save();

        return res.status(200).json({
            msg: "vendor added successfully"});

    } catch (error) {
        res.json({ err: "Something went wrong", });
    }
};

const getVendor = async (req, res) => {
    try {
        const vendor = await Vendor.find()
        if (vendor) {
            return res.json(vendor)

        }
        if (vendor.length < 0) {

            return res.josn({ msg: "could'nt find any vendor" })
        }
    } catch (error) {

    }
}
const updatedVendor = async (req, res) => {
    try {
        const vendor = await Vendor.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!vendor) {
            return res.status(404).json({ msg: "vendor not found" });
        }
        res.status(200).json({ msg: "vendor updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Failed to update vendor" });
    }
};
const deleteVendor = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the vendor exists
        const vendor = await Vendor.findById(id);
        if (!vendor) {
            return res.status(404).json({ msg: "Vendor not found" });
        }

        // Delete the vendor
        await Vendor.findByIdAndDelete(id);

        res.status(200).json({ msg: "Vendor deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}



module.exports = {
    addVendor,
    getVendor,
    deleteVendor,
    updatedVendor
}