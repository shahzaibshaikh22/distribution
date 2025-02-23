import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { FaTrashAlt } from "react-icons/fa";
import { setVendors } from "../../redux/features/slices/productSlice"
import { useDeleteVendorMutation, useGetVendorQuery } from "../../redux/features/apiSlices/setup/vendor";



const VendorView = () => {
  const { vendors } = useSelector((state)=>state.product);
  const dispatch = useDispatch()

const {data:vendorData, refetch} = useGetVendorQuery()

// handle delete vendor 
const [dltvendor] = useDeleteVendorMutation();

const handleDelete = async (id)=>{
    const res = await dltvendor(id)
    if(res.data.msg){
        alert(res.data.msg)
        refetch()
    }
}
useEffect(()=>{
    if(vendorData){
        dispatch(setVendors(vendorData.vendor))        
    }
  },[dispatch,vendorData,refetch])


    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Vendors"secRedirect="/vendor" view="/vendor-view"/>
                {/* form section */}

                <div className="w-full my-4 rounded-md p-2 bg-white text-gray-800 overflow-x-auto">
                <table className="w-full text-sm ">
                    <thead className="text-left">
                        <tr className="bg-gray-100 print:bg-gray-100 text-xs">
                            <th className="print:border border-gray-300 px-4 py-2">code</th>
                            <th className="print:border border-gray-300 px-4 py-2">Name</th>
                            <th className="print:border border-gray-300 px-4 py-2">Address</th>
                            <th className="print:border border-gray-300 px-4 py-2">Phone</th>
                            <th className="print:border border-gray-300 px-4 py-2">Mobile</th>
                            <th className="print:border border-gray-300 px-4 py-2">Fax NO</th>
                            <th className="print:border border-gray-300 px-4 py-2">Gst NO</th>
                            <th className="print:border border-gray-300 px-4 py-2">Ntn NO</th>
                            <th className="print:border border-gray-300 px-4 py-2">Designation</th>
                            <th className="print:border border-gray-300 px-4 py-2">Opening balance</th>
                            <th className="print:border border-gray-300 px-4 py-2">Contact Person</th>
                            <th className="print:border border-gray-300 px-4 py-2">Email</th>
                            <th className="print:border border-gray-300 px-4 py-2">Remove</th>
                        </tr>
                    </thead>
                    <tbody>
                        {vendors?.map((v)=>{
                            return(
                                <tr key={v._id} className="border-b border-gray-200 hover:bg-lightprimary">
                                    <td className="print:border border-gray-300 px-4 py-2">{v.code}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.name}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.address}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.phone}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.mobile}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.fax}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.gst}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.ntn}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.designation}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.openingbalance}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.contactperson}</td>
                                    <td className="print:border border-gray-300 px-4 py-2">{v.email}</td>
                      
                                    <td className="print:border border-gray-300 px-4 py-2">
                                        <FaTrashAlt onClick={()=>handleDelete(v._id.toString())} className="text-red-600"/>
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

export default VendorView;
