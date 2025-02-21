import React, { useEffect } from "react"
import TopBar from "../../components/TopBar"
import { useGetVendorQuery } from "../../redux/features/apiSlices/setup/vendor"
import { useDispatch, useSelector } from "react-redux";
import { setVendors } from "../../redux/features/slices/productSlice";

const PurchaseValue = () =>{
    const {data:vendorData} = useGetVendorQuery();
    const dispatch = useDispatch()
    const { vendors } = useSelector((state)=>state.product)

    useEffect(()=>{
        if(vendorData){
           dispatch(setVendors(vendorData.vendor))
        }
    },[vendorData,dispatch])


    return(
        <div className="w-full">
            <TopBar/>
       <div className="w-full bg-white rounded-md my-4 p-6">
        <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0 mb-4" />
       <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 text-xs px-4">Vendor</th>
                <th className="py-3 text-xs px-4">Address</th>
                <th className="py-3 text-xs px-4">Phone</th>
                <th className="py-3 text-xs px-4">Email</th>
                <th className="py-3 text-xs px-4">Action</th>
              </tr>
            </thead>
            <tbody>
               {vendors?.map((v)=>{
                return(
                    <tr key={v._id}  className="border-b p-1">
                    <td className="py-3 text-xs px-4">{v.vendor}</td>
                    <td className="py-3 text-xs px-4">{v.address}</td>
                    <td className="py-3 text-xs px-4">{v.phone}</td>
                    <td className="py-3 text-xs px-4">{v.email}</td>
                    <td className="py-3 text-xs px-4 ">
                        <span className="px-4 py-2 bg-blue-700 cursor-pointer text-white rounded-md">view</span>
                    </td>
                </tr>
                )
               })}
            </tbody>
          </table>
       </div>
         
        </div>
    )
}

export default PurchaseValue