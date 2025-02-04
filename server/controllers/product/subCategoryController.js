const SubCategory = require("../../models/product/subCategory")

// add new brand function
const addSubCategory = async (req, res) => {
    try {
        const { subcategory } = req.body;

        if(!subcategory){
            return res.json({err:"Please type subcategory"})
        }

        // Check if product type already exists
        const isSubCategory = await SubCategory.findOne({ subcategory });


        if (isSubCategory) {
            return res.json({ msg: "subcategory already exists" });
        }

        // Add new product type if not found
        const newSubCategory = new SubCategory({ subcategory });
        await newSubCategory.save();

        return res.status(200).json({
            msg: "subcategory added successfully",
            newSubCategory,
        });

    } catch (error) {
        res.json({ msg: "Something went wrong", error: error.message });
    }
};

// // update brand name
// // update product type
// const updateCategory = async (req, res) => {
//     try {
//         const { id } = req.params;
//         const { category } = req.body;
       
//         const isCategory = await Category.findById(id)
//         if(!category){
//             return res.json({err:"please type category name"})
//         }
//         if(!isCategory){
//             return res.json({err:"category not fond"})
//         }
//         if(isCategory){
//             isCategory.category = req.body.category || isCategory.category
//             await isCategory.save()
//             return res.json({
//                 msg:"category updated",
//                 isCategory
//             })
//         }

//     } catch (error) {
//         res.json({ err: "Something went wrong", error: error.message });
//     }
// };

// // delete product type
// const deleteCategory= async (req, res) => {
//     try {
//         const { id } = req.params;

//         // Check if Brand name exists
//         const isCategory = await Category.findById(id);
//         if (!isCategory) {
//             return resjson({ err: "category not found" });
//         }

//         // Delete the category
//         await Category.findByIdAndDelete(id);

//         return res.json({ err: "category deleted successfully" });

//     } catch (error) {
//         res.json({ msg: "Something went wrong", error: error.message });
//     }
// };

// // get all product type

// const getCategory = async (req,res)=>{
//     try {
//         const category = await Category.find();
//         if(category){
//             return res.json({
//                 category
//             })
           
//         }
//         if(category.length  <0){

//             return res.josn({msg:"could'nt find any product type"})
//         }
//     } catch (error) {
        
//     }
// }


module.exports = {
    addSubCategory,
    // updateCategory,
    // deleteCategory,
    // getCategory
}