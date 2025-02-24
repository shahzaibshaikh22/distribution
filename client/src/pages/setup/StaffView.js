import React,{useEffect} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import {  useDeleteStaffMutation, useGetStaffCategoryQuery, useGetStaffQuery } from "../../redux/features/apiSlices/setup/staffCategory";
import {setStaffCaty, setStaff } from "../../redux/features/slices/setup"
import { FaTrashAlt } from "react-icons/fa";



const StaffView = () => {
  const { staffs } = useSelector((state)=>state.setup);
  const dispatch = useDispatch()

  const {data:staffCatyData} = useGetStaffCategoryQuery();
  const {data:staffData, refetch} = useGetStaffQuery()
  const [dltstaff] = useDeleteStaffMutation()

  const handleDelete = async (id)=>{
    const res = await dltstaff(id)
    if(res.data.msg){
        alert(res.data.msg)
        refetch()
    }
}





useEffect(()=>{
    if(staffCatyData){
        dispatch(setStaffCaty(staffCatyData.category))        
    }
  },[dispatch,staffCatyData,refetch])
useEffect(()=>{
    if(staffData){
        dispatch(setStaff(staffData.staff))        
    }
  },[dispatch,staffData, refetch])
    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Staff" />
                {/* form section */}

                <div className="w-full my-4 rounded-md p-6 bg-white text-gray-800">
                <table className="w-full text-sm ">
                    <thead className="text-left">
                        <tr className="bg-gray-100 print:bg-gray-100 ">
                            <th className="print:border border-gray-300 px-4 py-2">#Serial No</th>
                            <th className="print:border border-gray-300 px-4 py-2">Name</th>
                            <th className="print:border border-gray-300 px-4 py-2">Address</th>
                            <th className="print:border border-gray-300 px-4 py-2">Phone</th>
                            <th className="print:border border-gray-300 px-4 py-2">Mobile</th>
                            <th className="print:border border-gray-300 px-4 py-2">NIC</th>
                            <th className="print:border border-gray-300 px-4 py-2">Email</th>
                            <th className="print:border border-gray-300 px-4 py-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {staffs?.map((cat)=>{
                            return(
                                <tr key={cat._id} className="border-b border-gray-200 hover:bg-lightprimary">
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.code}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.name}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.address}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.phone}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.mobile}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.nic}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{cat.email}</td>
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

export default StaffView;
