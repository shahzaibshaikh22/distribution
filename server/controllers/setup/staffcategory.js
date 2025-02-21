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



module.exports = {
    addStaffCategory,
    addStaff,
    getStaffCategory
}