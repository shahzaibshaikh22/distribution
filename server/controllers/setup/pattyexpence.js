const PattyExpence = require("../../models/setup/pattyexpencecategory")

// add new brand function
const addPattyExpence = async (req, res) => {
    try {
        const pattyExpence = await PattyExpence.find()
        const { category } = req.body;

        if(!category){
            return res.json({err:"Please type warehouse"})
        }

        // Check if product type already exists
        const isCategory = await PattyExpence.findOne({ category});


        if (isCategory) {
            return res.json({ msg: "category already exists" });
        }

        // Add new product type if not found
        const newpattyExpence = new PattyExpence({ category,code:pattyExpence.length + 1  });
        await newpattyExpence.save();

        return res.status(200).json({
            msg: "category added successfully",
        });

    } catch (error) {
        res.json({  error: error.message });
    }
};
const getPattyCategory = async (req,res)=>{
    try {
        const category = await PattyExpence.find();
        if(category){
            return res.json(category)
           
        }
        if(category.length  <0){

            return res.josn({msg:"could'nt find any category"})
        }
    } catch (error) {
        
    }
}

const deletePattyCategory = async (req, res) => {
    try {
        const { id } = req.params;

        // Find the staff category by ID
        const pattyCate = await PattyExpence.findById(id);
        if (!pattyCate) {
            return res.status(404).json({ msg: "Category not found" });
        }

        // Delete the category using the model, not the instance
        await PattyExpence.findByIdAndDelete(id);

        res.status(200).json({ msg: "Category deleted successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};

const updatePattyCategory = async (req, res) => {
    try {
        const updatepattyCat = await PattyExpence.findByIdAndUpdate(
            req.params.id,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatepattyCat) {
            return res.json({ msg: "category not found" });
        }
        res.status(200).json({ msg: "category updated successfully" });
    } catch (error) {
        res.status(500).json({ msg: error.message });
    }
};




module.exports = {
    addPattyExpence,
    getPattyCategory,
    deletePattyCategory,
    updatePattyCategory,
}