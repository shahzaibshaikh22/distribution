import react, { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useGetInventoryQuery } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice"
import { setInventory } from "../../redux/features/slices/productSlice"
import TopBar from "../../components/TopBar"

const Inventory = () =>{
    const { inventory } = useSelector((state)=>state.product)
    const dispatch = useDispatch()
    const {data:inventoryData} = useGetInventoryQuery()
    
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
                <th className="py-3 text-xs px-4">Price</th>
              </tr>
            </thead>
            <tbody>
            {inventory && inventory.map((inv)=>{
               return(
                <tr>
                    <td>
                        <img className="w-8 h-8 object-contain rounded-md" src={`http://localhost:5000/uploads/${inv.product.image}`} alt="" />
                    </td>
                    <td>{inv.product.productname}</td>
                    <td>{inv.product.brand}</td>
                    <td>{inv.product.category}</td>
                    <td>{inv.quantity}</td>
                    <td>{inv.product.costprice}</td>
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