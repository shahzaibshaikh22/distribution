import React, { useState, useEffect } from "react";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useAddpurchaseOrderMutation, useGetPurchaseOrderQuery } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice";
import { setPurchaseOrders } from "../../redux/features/slices/productSlice";

const AddPurchase = () => {
    const { modes } = useSelector((state) => state.mode);
    const [vendor, setVendor] = useState("");
    const [warehouse, setWarehouse] = useState("");
    const [vehicleno, setVehicleno] = useState("");
    const [dcno, setDcno] = useState("");
    const [pono, setPono] = useState("");
    const [totalAmount, setTotalAmount] = useState("");
    const { purchaseOrders } = useSelector((state) => state.product);
    const [searchpo, setSearchPo] = useState("");
    const [filteredPurchaseOrder, setFilteredPurchaseOrder] = useState(null);
    const [quantities, setQuantities] = useState({});

    const { data: purchaseOrderData } = useGetPurchaseOrderQuery();
    const dispatch = useDispatch();

    const handleQuantityChange = (e, productId) => {
        const { value } = e.target;
        setQuantities((prev) => ({
            ...prev,
            [productId]: value ? Number(value) : 0, // Ensure it updates correctly
        }));
    };
    


    useEffect(() => {
        if (purchaseOrderData) {
            dispatch(setPurchaseOrders(purchaseOrderData));
        }
    }, [purchaseOrderData, dispatch]);

    

    // const addPurchaseData = {
    //     vendor, 
    //     warehouse,
    //     vehicleno,
    //     pono,
    //     dcno,
    //     products: filteredPurchaseOrder?.products?.map((p) => ({
    //         product: p.product._id.toString(),
    //         price:p.price,
    //         quantity: quantities[p.product._id] || p.quantity,  // Use updated quantity
    //         total: p.total,
    //     })),
    //     totalAmount,
    //   };
    const addPurchaseData = {
        vendor, 
        warehouse,
        vehicleno,
        pono,
        dcno,
        products: filteredPurchaseOrder?.products?.map((p) => ({
            product: p.product._id.toString(),
            price:p.price,
            quantity: quantities[p.product._id] ?? p.quantity,  
            total: (quantities[p.product._id] ?? p.quantity) * p.price, 
        })),
        totalAmount: filteredPurchaseOrder?.products?.reduce(
            (sum, p) => sum + ((quantities[p.product._id] ?? p.quantity) * p.price || 0), 
            0
        ),
    };
    
    // Debugging 
    
    const handleSearch = () => {
        const foundOrder = purchaseOrders.find((order) => order.pono === searchpo); 
               console.log(addPurchaseData);
               
        if (foundOrder) {
            setFilteredPurchaseOrder(foundOrder);
            setPono(foundOrder.pono);
            setWarehouse(foundOrder.warehouse);
            setVendor(foundOrder.vendor);
            setTotalAmount(foundOrder.totalAmount);
            setVehicleno(foundOrder.vehicleno);
        } else {
            setFilteredPurchaseOrder(null); // Reset previous state if not found
            setPono("");
            setWarehouse("");
            setVendor("");
            setTotalAmount("");
            setVehicleno("");
        }
    };
    

   

      const [addpurchaseorder, {isLoading}] = useAddpurchaseOrderMutation();
const handleAddPurchaseOrder = async ()=>{
    const res = await addpurchaseorder(addPurchaseData);
    if(res){
        console.log(res);
    }
}

    return (
        <div className="w-full px-4">
            <div className="w-full">
                <TopBar />
                <div className={`w-full md:px-10 mainContainerForm mt-4 relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Add Purchase</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0" />
                    </div>
                </div>
                <div className="w-full bg-white p-4">
                    <div className="w-full flex flex-col gap-4 items-center justify-center">
                        <h3 className="text-md">Search Purchase Order</h3>
                        <div className="inputBorder w-full p-2 rounded-md max-w-xs">
                            <input
                                value={searchpo}
                                onChange={(e) => setSearchPo(e.target.value)}
                                type="text"
                                placeholder="Enter PO No"
                                name="pono"
                                className='bg-transparent w-full'
                            />
                        </div>
                        <button className="bg-blue-500 text-white px-8 py-2 rounded-full" onClick={handleSearch}>Search</button>
                    </div>
                </div>

              {filteredPurchaseOrder&&(
                  <div className="w-full p-4 rounded-md bg-white">
                  <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                      <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                          <label className="font-semibold" htmlFor="pono">Purchase Order No:</label>
                          <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                              <input
                                  value={pono}
                                  type="text"
                                  readOnly
                                  placeholder="pono-000"
                                  name="pono"
                                  className='bg-transparent w-full' />
                          </div>
                      </div>

                      <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                          <label className="font-semibold" htmlFor="dcno">Dc Challan No:</label>
                          <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                              <input
                                  onChange={(e)=>setDcno(e.target.value)}
                                  value={dcno}
                                  type="text"
                                  placeholder="Enter dc challan no"
                                  name="dcno"
                                  className='bg-transparent w-full' />
                          </div>
                      </div>
                  </div>
                  <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                      <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                          <label className="font-semibold" htmlFor="vendor">Vendor:</label>
                          <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                              <input
                                  value={vendor}
                                  type="text"
                                  readOnly
                                  placeholder="vendor"
                                  name="venor"
                                  className='bg-transparent w-full' />
                          </div>
                      </div>

                      <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                          <label className="font-semibold" htmlFor="warehouse">Warehouse:</label>
                          <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                              <input
                                  value={warehouse}
                                  type="text"
                                  readOnly
                                  placeholder="Warehouse"
                                  name="warehouse"
                                  className='bg-transparent w-full' />
                          </div>
                      </div>
                      <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                          <label className="font-semibold" htmlFor="vehicleno">Vehicle No:</label>
                          <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                              <input
                                  value={vehicleno}
                                  type="text"
                                  readOnly
                                  placeholder="vehicleno"
                                  name="vehicleno"
                                  className='bg-transparent w-full' />
                          </div>
                      </div>
                  </div>
                  <div className="grid grid-cols-4 gap-4">
                  {
    filteredPurchaseOrder?.products?.map((product) => (
        <div key={product.product._id} className='flex flex-col w-full justify-between md:my-0 my-2 gap-2'>
            <label className="font-semibold" htmlFor={`quantity-${product.product._id}`}>
                {product.product.productname}
            </label>
            <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                <input
                    value={quantities[product.product._id] ?? product.quantity}
                    onChange={(e) => handleQuantityChange(e, product.product._id)}
                    type="number"
                    placeholder="Enter Quantity"
                    name="quantity"
                    className='bg-transparent w-full' 
                />
            </div>
        </div>
    ))
}

                  </div>
                  {filteredPurchaseOrder&&(
                  <button className="bg-blue-500 px-4 py-2 rounded-full" onClick={handleAddPurchaseOrder}>{isLoading ? "adding..." : "Add Order"}</button>

                  )}

              </div>
              )}

                <div className="w-full bg-white p-4 rounded-md">
                    <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0" />

                    {filteredPurchaseOrder ? (
                        <div className="w-full p-4 overflow-x-auto">
                            <h3 className="text-md mb-4 font-semibold">Purchase Order Details</h3>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className=" text-sm p-2">PO No</th>
                                        <th className=" text-sm p-2">Vendor</th>
                                        <th className=" text-sm p-2">Warehouse</th>
                                        <th className=" text-sm p-2">Products</th>
                                        <th className=" text-sm p-2">Total Amount</th>
                                        <th className=" text-sm p-2">Date</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr className="bg-gray-100">
                                        <td className=" text-sm p-2">{filteredPurchaseOrder.pono}</td>
                                        <td className=" text-sm p-2">{filteredPurchaseOrder.vendor}</td>
                                        <td className=" text-sm p-2">{filteredPurchaseOrder.warehouse}</td>
                                        <td className=" text-sm p-2">{filteredPurchaseOrder.products.length}</td>
                                        <td className=" text-sm p-2">{filteredPurchaseOrder.totalAmount}</td>
                                        <td className=" text-sm p-2">{new Date(filteredPurchaseOrder.createdAt).toLocaleString()}</td>
                                    </tr>
                                </tbody>
                            </table>

                            <h3 className="text-md mb-4 font-semibold mt-2">Products</h3>
                            <table className="w-full text-left border-collapse">
                                <thead>
                                    <tr className="bg-gray-200">
                                        <th className=" text-sm p-2">product</th>
                                        <th className=" text-sm p-2">Product Name</th>
                                        <th className=" text-sm p-2">Category</th>
                                        <th className=" text-sm p-2">Brand</th>
                                        <th className=" text-sm p-2">price</th>
                                        <th className=" text-sm p-2">Order Qty</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        filteredPurchaseOrder.products.map((product) => {
                                            return (
                                                <tr key={product._id} className="bg-gray-100">
                                                    <td className=" text-sm p-2">
                                                        <img className="w-8 h-8 rounded-md" src={`http://localhost:5000/uploads/${product.product.image}`} alt="" />
                                                    </td>
                                                    <td className=" text-sm p-2">{product.product.productname}</td>
                                                    <td className=" text-sm p-2">{product.product.category}</td>
                                                    <td className=" text-sm p-2">{product.product.brand}</td>
                                                    <td className=" text-sm p-2">Rs-{product.product.costprice}</td>
                                                    <td className=" text-sm p-2">{product.quantity}</td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    ) : (
                        <p className="text-gray-500 text-center">No Purchase Order Found</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AddPurchase;
