import React,{useState, useEffect} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteCustomerCategoryMutation, useGetCustomersCategoryQuery } from "../../redux/features/apiSlices/setup/customer";
import { setCustomerCaty } from "../../redux/features/slices/setup";
import { FaTrashAlt } from "react-icons/fa";



const CustomerCategoryView = () => {
  const { customerCategories } = useSelector((state)=>state.setup);

  const dispatch = useDispatch()

// product type submition
const {data:customerCatyData,refetch} = useGetCustomersCategoryQuery()
const [dltCusCat] = useDeleteCustomerCategoryMutation()


const handleDelete = async (id)=>{
    
    const res = await dltCusCat(id)
    if(res.data.msg){
        alert(res.data.msg)
        refetch()
    }
}

useEffect(()=>{
    if(customerCatyData){
        dispatch(setCustomerCaty(customerCatyData))  
              
    }
  },[dispatch,customerCatyData,refetch])
    

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
                        {customerCategories?.map((cat)=>{
                            return(
                                <tr key={cat._id} className="border-b border-gray-200  hover:bg-lightprimary">
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.code}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.category}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.code}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">
                                        <FaTrashAlt onClick={()=>handleDelete(cat._id.toString())} className="text-red-600"/>
                                    </td>
             
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </div>
            </div>
        </div>
    );
};

export default CustomerCategoryView;
