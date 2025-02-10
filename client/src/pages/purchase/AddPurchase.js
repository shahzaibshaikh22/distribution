import React, { useState, useRef, useEffect } from "react";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useGetPurchaseOrderQuery } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice";
import { setPurchaseOrders } from "../../redux/features/slices/productSlice";


const AddPurchase = () => {
    const { modes } = useSelector((state) => state.mode);
    const { vendors, warehouses, products, purchaseOrders} = useSelector((state) => state.product);
    const [searchpo, setSearchPo] = useState("");

    const { data: purchaseOrderData} = useGetPurchaseOrderQuery();
    const dispatch = useDispatch()


    useEffect(() => {
      if (purchaseOrderData) {
          dispatch(setPurchaseOrders(purchaseOrderData));
      }
  }, [purchaseOrderData, dispatch]);

  const handleSearch = ()=>{
    
  const filterPurchaseOrder = purchaseOrders.filter((order)=>order.pono === searchpo);

  console.log(filterPurchaseOrder);
  }


  


    return (
        <div className="w-full px-4">
            <div className="w-full ">
                <TopBar />
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Add Purchase</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>
                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>
             <div className="w-full bg-white rounded-md mt-4 p-4">
               <div className="w-full flex flex-col gap-4 items-center justify-center">
               <h3>search purchase order</h3>
               <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                    <input
                    value={searchpo}
                    onChange={(e)=>setSearchPo(e.target.value)}
                    type="text"
                    placeholder="enter po no"
                    name="pono"
                    className='bg-transparent w-full'/>
                </div>
                <button onClick={handleSearch}>search</button>
               </div>
             </div>

             <div className="w-full bg-white p-4 rounded-md">
                
             </div>
            </div>
        </div>
    );
};

export default AddPurchase;



