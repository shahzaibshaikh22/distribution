import React, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useDltInvItemMutation, useGetInventoryQuery } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice"
import { setInventory } from "../../redux/features/slices/productSlice"
import TopBar from "../../components/TopBar"
import { FaTrashAlt } from "react-icons/fa"

const Inventory = () =>{
    const { inventory } = useSelector((state)=>state.product)
    const dispatch = useDispatch()
    const {data:inventoryData,refetch } = useGetInventoryQuery();

    
    
    // delete product
    const [dltitem] = useDltInvItemMutation();
    
    const handleDeleteItem = async (product)=>{  
        
        const data = {
            inventoryId:"67adc621922fa69a0376a347",
            product
        }      
        const res = await dltitem(data)
        if(res){
            refetch()
        }
    }
    
    useEffect(()=>{
        if(inventoryData){
            dispatch(setInventory(inventoryData))  
        }
    },[inventoryData, dispatch])

    return(
        <div className="w-full">
            <TopBar/>
       <div className="w-full bg-white rounded-md my-4 p-6">
       <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 text-xs px-4">Product</th>
                <th className="py-3 text-xs px-4">Name</th>
                <th className="py-3 text-xs px-4">Brand</th>
                <th className="py-3 text-xs px-4">Category</th>
                <th className="py-3 text-xs px-4">Stock</th>
                <th className="py-3 text-xs px-4">Distribution Rate</th>
                <th className="py-3 text-xs px-4">Total Price</th>
                <th className="py-3 text-xs px-4">Remove</th>

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
                    <td className="py-3 text-xs px-4">{inv.quantity}</td>
                    <td className="py-3 text-xs px-4">{inv.product.costprice}</td>
                    <td className="py-3 text-xs px-4">{inv.product.costprice * inv.quantity}</td>
                    <td onClick={()=>handleDeleteItem(inv.product._id)} className="py-3 text-xs px-4 cursor-pointer"><FaTrashAlt className="text-red-600" size={20}/></td>
                </tr>
               )
            })} 
            </tbody>
          </table>
       </div>
         
        </div>
    )
}

export default Inventory