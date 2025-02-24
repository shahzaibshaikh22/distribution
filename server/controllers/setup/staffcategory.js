const staffCategory = require("../../models/setup/staffcategory")
const Staff = require("../../models/setup/staff")

// add new brand function
const addStaffCategory = async (req, res) => {
    try {
        const staffCategories = await staffCategory.find()
        const { category } = req.body;

        if(!category){
            return res.json({err:"Please type warehouse"})
        }

        // Check if product type already exists
        const isWarehouse = await staffCategory.findOne({ category});


        if (isWarehouse) {
            return res.json({ msg: "category already exists" });
        }

        // Add new product type if not found
        const newstaffCategories = new staffCategory({ category,code:staffCategories.length + 1  });
        await newstaffCategories.save();

        return res.status(200).json({
            msg: "category added successfully",
        });

    } catch (error) {
        res.json({  error: error.message });
    }
};

const addStaff = async (req, res) => {
    try {
        const staffCategories = await Staff.find()
        const { name,category,phone,mobile,nic,openingbalance,address,email } = req.body;

        if(!category || !name || !phone || !mobile || !nic || !openingbalance || !address || !email){
            return res.json({err:"fields are required"})
        }
        const newstaff = new Staff({ name,category,phone,mobile,nic,openingbalance,address,email ,code:staffCategories.length + 1  });
        await newstaff.save();

        return res.status(200).json({
            msg: "staff added successfully",
        });

    } catch (error) {
        res.json({  error: error.message });
    }
};

const getStaffCategory = async (req,res)=>{
    try {
        const category = await staffCategory.find();
        if(category){
            return res.json({
                category
            })
           
        }
        if(category.length  <0){

            return res.josn({msg:"could'nt find any category"})
        }
    } catch (error) {
        
    }
}
const getStaff = async (req,res)=>{
    try {
        const staff = await Staff.find();
        if(staff){
            return res.json({
                staff
            })
           
        }
        if(staff.length  <0){

            return res.josn({msg:"could'nt find any staff"})
        }
    } catch (error) {
        
    }
}
const deleteStaffCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the staff category by ID
        const staffCate = await staffCategory.findById(id);
        if (!staffCate) {
            return res.status(404).json({ msg: "Category not found" });
        }

        // Delete the category using the model, not the instance
        await staffCategory.findByIdAndDelete(id);

        res.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};
const deleteStaff = async (req, res) => {
    try {
        const { id } = req.params;

        // Check if the vendor exists
        const staff = await Staff.findById(id);
        if (!staff) {
            return res.status(404).json({ msg: "Staff not found" });
        }

        // Delete the category
        await Staff.findByIdAndDelete(id);

        res.status(200).json({ msg: "Staff deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: "Internal Server Error" });
    }
}
const updateStaffCategory = async (req, res) => {
    try {
        const updatestfCat = await staffCategory.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatestfCat) {
            return res.status(404).json({ msg: "Customer not found" });
        }
        res.status(200).json({ msg: "Customer updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};



module.exports = {
    addStaffCategory,
    addStaff,
    getStaffCategory,
    getStaff,
    deleteStaffCategory,
    deleteStaff,
    updateStaffCategory
}