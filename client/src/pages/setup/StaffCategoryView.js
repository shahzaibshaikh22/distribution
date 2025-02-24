import React,{ useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteStaffCatMutation, useGetStaffCategoryQuery, useUpdateStaffCategoryMutation } from "../../redux/features/apiSlices/setup/staffCategory";
import { setStaffCaty } from "../../redux/features/slices/setup";
import { FaTrashAlt,FaPencilAlt } from "react-icons/fa";
import InputField from "../../components/InputField";



const StaffCategoryView = () => {
  const { staffCategories } = useSelector((state)=>state.setup);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [category, setCategory] = useState("");
  const [code, setCode] = useState("");

  const dispatch = useDispatch()

// product type submition
const {data:staffCatyData,refetch} = useGetStaffCategoryQuery()

const [dltstfcat] = useDeleteStaffCatMutation()

const handleDelete = async (id)=>{
    const res = await dltstfcat(id)
    if(res.data.msg){
        alert(res.data.msg)
        refetch()
    }
}
const [updateCategory] = useUpdateStaffCategoryMutation()

const handleEdit = (category) => {
    setSelectedCategory(category);
    setCategory(category.category);
    setCode(category.code);
    setIsModalOpen(true);
    
  };
  const handleUpdate = async () => {
    if (selectedCategory) {
      await updateCategory({ id: selectedCategory._id.toString(), category });
      setIsModalOpen(false);
      refetch()
    }
  };

useEffect(()=>{
    if(staffCatyData){
        dispatch(setStaffCaty(staffCatyData.category))  
              
    }
  },[dispatch,staffCatyData,refetch])
    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Staff Category" />
                {/* form section */}
                <div className="w-full my-4 rounded-md p-6 bg-white text-gray-800">
                <table className="w-full text-sm ">
                    <thead className="text-left">
                        <tr className="bg-gray-100 print:bg-gray-100">
                            <th className="print:border border-gray-300 px-4 py-2">#Serial No</th>
                            <th className="print:border border-gray-300 px-4 py-2">Category</th>
                            <th className="print:border border-gray-300 px-4 py-2">Code</th>
                            <th className="print:border border-gray-300 px-4 py-2">Remove</th>

                        </tr>
                    </thead>
                    <tbody>
                        {staffCategories?.map((cat)=>{
                            return(
                                <tr key={cat._id} className="border-b border-gray-200  hover:bg-lightprimary">
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.code}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.category}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.code}</td>
                                    <td className="print:border flex items-center gap-2 border-gray-300 px-4 py-2">
                                        <FaTrashAlt onClick={()=>handleDelete(cat._id.toString())} className="text-red-600"/>
                                        <FaPencilAlt onClick={() => handleEdit(cat)} className="text-blue-600 cursor-pointer" />
                                    </td>
             
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>

            {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white flex flex-col  items-center gap-2 p-6 rounded-md shadow-md md:w-[40%] w-[80%] text-black">
              <h2 className="text-lg font-bold mb-4">Edit Town</h2>
             <InputField
              value={category}
              onChangeFunction={(e)=>setCategory(e.target.value)}
              placeholderText="Category"
              LabelText="Category:"
              inputName="category"
              inputType="text"
             />
             <InputField
                    placeholderText="code"
                  value={code}
                  readOnly
                  onChangeFunction={(e)=>e.target.value}
                  LabelText="Code:"
                  inputName="address"
                  inputType="text"
             />
              <div className="flex justify-end gap-2">
                <button className="bg-gray-400 px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        )}
            </div>
        </div>
    );
};

export default StaffCategoryView;
