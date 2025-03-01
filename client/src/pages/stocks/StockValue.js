import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetInventoryQuery } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice"
import { setInventory } from "../../redux/features/slices/productSlice"
import TopBar from "../../components/TopBar"

const StockValue = () =>{
    const { inventory } = useSelector((state)=>state.product)
    const dispatch = useDispatch()
    const {data:inventoryData } = useGetInventoryQuery();

let stockValuePrice;
    if(inventory){
        stockValuePrice = inventory.reduce((sum, inv) => sum + inv.product.costprice * inv.quantity, 0);
    }



    
    useEffect(()=>{
        if(inventoryData){
            dispatch(setInventory(inventoryData))  
        }
    },[inventoryData, dispatch])

    return(
        <div className="w-full px-4">
            <TopBar/>
       <div className="w-full bg-white rounded-md my-4 p-6">
        <div className="w-full flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-700">Stocks</h1>
            <div className="total bg-gray-100 px-4 py-2 rounded-md mb-4">
                <h3 className="text-gray-800 font-semibo">Stock Value <span className="font-semibold">Rs:{stockValuePrice}</span></h3>
            </div>
        </div>
        <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0 mb-4" />
       <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 text-xs px-4">Product</th>
                <th className="py-3 text-xs px-4">Name</th>
                <th className="py-3 text-xs px-4">Brand</th>
                <th className="py-3 text-xs px-4">Category</th>
                <th className="py-3 text-xs px-4">Sub-Category</th>
                <th className="py-3 text-xs px-4">Unit</th>
                <th className="py-3 text-xs px-4">Barcode</th>
                <th className="py-3 text-xs px-4">HScode</th>
                <th className="py-3 text-xs px-4">Stock</th>
                <th className="py-3 text-xs px-4">Distribution Rate</th>
                <th className="py-3 text-xs px-4">Total Price</th>
              </tr>
            </thead>
            <tbody>
            {inventory && inventory.map((inv)=>{
               return(
                <tr key={inv.product._id} className="border-b p-1">
                    <td className="py-3 text-xs px-4">
                        <img className="w-10 h-10 object-contain  rounded-md" src={`http://localhost:5000/uploads/${inv.product.image}`} alt="" />
                    </td>
                    <td className="py-3 text-xs px-4">{inv.product.productname}</td>
                    <td className="py-3 text-xs px-4">{inv.product.brand}</td>
                    <td className="py-3 text-xs px-4">{inv.product.category}</td>
                    <td className="py-3 text-xs px-4">{inv.product.subcategory}</td>
                    <td className="py-3 text-xs px-4">{inv.product.unit}</td>
                    <td className="py-3 text-xs px-4">{inv.product.barcode}</td>
                    <td className="py-3 text-xs px-4">{inv.product.hscode}</td>
                    <td className="py-3 text-xs px-4">{inv.quantity}</td>
                    <td className="py-3 text-xs px-4">{inv.product.costprice}</td>
                    <td className="py-3 text-xs px-4">{inv.product.costprice * inv.quantity}</td>
                </tr>
               )
            })} 
            </tbody>
          </table>
       </div>
         
        </div>
    )
}

export default StockValue