import React, { useState, useRef, useEffect } from "react";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import TopBar from "../../components/TopBar";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField"
import { useGetVendorQuery } from "../../redux/features/apiSlices/setup/vendor"
import { useGetWarehouseQuery } from "../../redux/features/apiSlices/setup/warehouse"
import { setProducts, setVendors, setWarehouses,setPonoLength } from "../../redux/features/slices/productSlice"
import { useDispatch } from "react-redux";
import { FaChevronDown, FaTrashAlt } from "react-icons/fa";
import { useGetProductsQuery } from "../../redux/features/apiSlices/product/productApiSlice";
import { useGetPurchaseOrderQuery, usePurchaseOrderMutation } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice";


const Purchase = () => {
    const { modes } = useSelector((state) => state.mode);
    const { vendors, warehouses, products, purchaseOrderLength} = useSelector((state) => state.product);
    const [selectedVendor, setSelectedVendor] = useState("");
      const [selectedWarehouse, setSelectedWarehouse] = useState("");
      const [pono, setPono] = useState(`pono-000`)
      const [vehicleno, setVehicleNo] = useState("");
      const [paymentType, setPaymentType] = useState(0);
      const [show, setShow] = useState(false)

      // const [dcno, setDcNo] = useState("");
      const [selectedProducts, setSelectedProducts] = useState([]);
      const [totalAmount, setTotalAmount] = useState();
      const [showInvoice, setShowInvoice] = useState(false);
      const invoiceRef = useRef();
    const dispatch = useDispatch()
    

    const { data: productData } = useGetProductsQuery();
 
    // fetch brands 
    const { data: vendorData } = useGetVendorQuery();
    // fetch brands 
        // fetch brands 
        const { data: productsData } = useGetProductsQuery();
        // fetch brands 

    // fetch brands 
    const { data: warehouseData } = useGetWarehouseQuery();
    // fetch brands 

    // fetch brands 
    const { data: ponoData } = useGetPurchaseOrderQuery();
    // fetch brands 

    const handleProductSelect = (e) => {
      setShow(true);
        const productId = e.target.value;
        if (!productId) return;
        const product = products.find((p) => p._id === productId);
        setSelectedProducts((prev) => {
          const existing = prev.find((p) => p._id === product._id);
          if (existing) return prev;
          return [...prev, { ...product, quantity: 1, total: product.costprice,price:product.costprice }];
        });
      };
    
      const updateQuantity = (id, increment) => {
        setSelectedProducts((prev) =>
          prev.map((p) =>
            p._id === id
              ? {
                  ...p,
                  quantity: Math.max(1, p.quantity + increment),
                  total: p.costprice * Math.max(1, p.quantity + increment),
                }
              : p
          )
        );
      };
    
      const deleteProduct = (id) => {
        setSelectedProducts((prev) => prev.filter((p) => p._id !== id));
      };
    
      useEffect(() => {
        setTotalAmount(selectedProducts.reduce((sum, p) => sum + p.total, 0));
      }, [selectedProducts,totalAmount]);
    
      const printInvoice = () => {
        window.print();
      };
    
      const downloadPDF = () => {
        const input = invoiceRef.current;
        html2canvas(input).then((canvas) => {
          const imgData = canvas.toDataURL("image/png");
          const pdf = new jsPDF("p", "mm", "a4");
          const imgWidth = 210;
          const imgHeight = (canvas.height * imgWidth) / canvas.width;
          pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
          pdf.save("invoice.pdf");
        });
      };
    
      const orderData = {
        vendor: selectedVendor, // This should be a valid ObjectId
        warehouse: selectedWarehouse, // This should be a valid ObjectId
        vehicleno,
        paymentType,
        pono,
        products: selectedProducts.map((p) => ({
          product: p._id.toString(), // Ensuring only product ID is sent
          quantity: p.quantity,
          price:p.price,
          total: p.total,
        })),
        totalAmount,
      };
    
      const [purchaseOrder] = usePurchaseOrderMutation()
    
      const handlePurchaseOrder = async (e) => {
        try {
          e.preventDefault();
          const res = await purchaseOrder(orderData)
      
          if (res.data.msg) {
            alert("Purchase Order Created Successfully!");
          }
          if (res.data.err) {
            alert(res.data.err);
          }
        } catch (error) {
          console.error("Error Creating Purchase Order:", error);
          alert("Failed to create purchase order. Please check the data.");
        }
      };
    useEffect(() => {
      if (productsData) {
          dispatch(setProducts(productsData.products));
      }
  }, [productsData, dispatch]);
    useEffect(() => {
        if (vendorData) {
            dispatch(setVendors(vendorData.vendor));
            
        }
    }, [vendorData, dispatch]);
  
    useEffect(() => {
        if (warehouseData) {
            dispatch(setWarehouses(warehouseData.warehouse));
        }
    }, [warehouseData, dispatch]);

    useEffect(() => {
      if (ponoData) {
          dispatch(setPonoLength(ponoData.length + 1));          
          setPono(`pono-000${purchaseOrderLength}`)
      }
  }, [ponoData,purchaseOrderLength, dispatch]);


  if(vendors){
    console.log(vendors);
  }



    return (
        <div className="w-full px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                {/* <SectionBar sectionHeading="Purchase Order" /> */}
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative mt-4 rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Purchase Order</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>
                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>
                <div className={`w-full Container h-auto  mb-4 px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Purchase Order Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form className='py-4'>
                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="producttype">Warehouse</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select 
                                         value={selectedWarehouse} name="warehouse" 
                                         onChange={(e) => setSelectedWarehouse(e.target.value)}
                                         className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            <option value="">Select Warehouse</option>
                                            {warehouses?.map((item) => (
                                                <option key={item._id} value={item.warehouse}>
                                                    {item.warehouse}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="producttype">Vendors</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select
                                        value={selectedVendor} 
                                        name="vendor" onChange={(e) => setSelectedVendor(e.target.value)} 
                                        className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                            <option value="">Select Vendor</option>
                                            {vendors?.map((vendor) => (
                                                <option key={vendor._id} value={vendor.vendor}>
                                                    {vendor.vendor}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                            <InputField
                                onChangeFunction={(e)=>setVehicleNo(e.target.value)} 
                                placeholderText="Vehicle No"
                                LabelText="Vehicle No:"
                                inputName="vehicleno"
                                inputType="text" />

                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold"  htmlFor="pono">Po No:</label>
                                <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                                <input
                                value={pono}
                                type="text"
                                readOnly
                                placeholder="pono-000"
                                name="pono"
                                className='bg-transparent w-full'/>
                                </div>
                                </div>

                            {/* <InputField
                                value={pono}
                                onChangeFunction={(e)=>setPono(e.target.value)}
                                placeholderText="pono-000"
                                LabelText="Po No:"
                                inputName="pono"
                                inputType="text" /> */}
                        </div>

                      <div className="divider w-full h-[1px] bg-gray-300 mb-4 " />
                        <div className='flex md:flex-row flex-col md:gap-20 w-full md:my-4  items-center justify-between '>
                          
                        <div className='flex md:flex-row flex-col w-full   justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="producttype">Products</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select 
                                         onChange={handleProductSelect} 
                                         name="product"
                                         className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                             <option value="">Select a Product</option>
                                            {products?.map((product) => (
                                                <option key={product._id} value={product._id}>
                                                    {product.productname}
                                                </option>
                                            ))}
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                        </div>
                        <div className='flex md:flex-row flex-col w-full   justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold" htmlFor="producttype">Products</label>
                                <div className="inputBorder w-full py-2 rounded-md max-w-xs">
                                    <div className="relative full w-full">
                                        <select 
                                         name="paymentType"
                                         onChange={(e)=>setPaymentType(e.target.value)}
                                         className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                             <option value="">Select payment type</option>
                                             <option value="cash">Cash</option>
                                             <option value="credit">Credit</option>
                                            
                                        </select>
                                        <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                            <FaChevronDown />
                                        </div>
                                    </div>
                                </div>
                        </div>
                       
                   
                       
                        </div>

                       
                    </form>
                </div>
              {
                show && (
                  <>
                       <div className="p-6 bg-white shadow rounded-lg">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-100">
                                    <th className="py-3 text-xs px-4">Product</th>
                                    <th className="py-3 text-xs px-4">product Name</th>
                                    <th className="py-3 text-xs px-4">Quantity</th>
                                    <th className="py-3 text-xs px-4">Price</th>
                                    <th className="py-3 text-xs px-4">Remome</th>
          
                                </tr>
                            </thead>
                            <tbody>
                            {selectedProducts.map((p) => (
                                <tr key={p._id} className="border-t">
                                <td className="p-2">
                                    <img className="w-8 h-8 rounded-md" src={`http://localhost:5000/uploads/${p.image}`} alt="" />
                                </td>
                                <td className="p-2">{p.productname}</td>
                                <td className="p-2">
                                    <button type="button" onClick={() => updateQuantity(p._id, -1)}>-</button>
                                    <span className="px-2">{p.quantity}</span>
                                    <button type="button" onClick={() => updateQuantity(p._id, 1)}>+</button>
                                </td>
                                <td className="p-2">Rs. {p.total}</td>
                                <td className="p-2">
                                    <button type="button" onClick={() => deleteProduct(p._id)}><FaTrashAlt className="text-red-600"/></button>
                                </td>
                                </tr>
                            ))}
                            </tbody>
                        </table>
                    </div>
                </div>
                <div className="bg-white p-6 roundedn-md mt-2">
                    <h3 className="text-lg font-semibold">Summary</h3>
                    <h3 className="mt-2 text-md font-bold">Total Amount: Rs.{totalAmount}</h3>
                    <div className='flex md:flex-row flex-col  w-full my-4 '>
                            <div />
                            <button 
                            onClick={handlePurchaseOrder}
                            type="submit" 
                            className='px-8 bg-blue-700 text-sm py-2 rounded-full text-white'>Add New</button>
                            <button type="button" onClick={() => setShowInvoice(true)} className='px-8 md:ml-2 bg-blue-700 text-sm py-2 rounded-full text-white'>View Invoice</button>
                        </div>
                </div>
                  </>
                )
              }
            </div>
            
      {showInvoice && (
        <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div ref={invoiceRef} className="bg-white w-full border border-2 border-gray-500 max-w-5xl mx-auto p-6 rounded-lg  ">
            <h2 className="text-xl font-bold text-center mb-4">Invoice</h2>
            <p><strong>Vendor:</strong> {selectedVendor}</p>
            <p><strong>Warehouse:</strong> {selectedWarehouse}</p>
            <p><strong>Vehicle No:</strong> {vehicleno}</p>
            <table className="w-full mt-2">
              <thead>
                <tr className="bg-gray-200 ">
                  <th>Product</th>
                  <th>Qty</th>
                  <th>Price</th>
                </tr>
              </thead>
              <tbody>
                {selectedProducts.map((p) => (
                  <tr className="text-center mb-4 p-2 border-b border-[1px]" key={p._id}>
                    <td>{p.productname}</td>
                    <td>{p.quantity}</td>
                    <td>Rs. {p.total}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <h3 className="mt-2 text-lg font-bold text-right">Total: Rs.{totalAmount}</h3>
            <button onClick={printInvoice} className="mr-2 bg-blue-500 text-white text-xs px-4 py-2">Print</button>
            <button onClick={downloadPDF} className="bg-green-500 text-white text-xs px-4 py-2">Download PDF</button>
            <button onClick={()=>setShowInvoice(false)} className="bg-gray-500 ml-2 text-white text-xs px-4 py-2">close</button>
          </div>
        </div>
      )}

        </div>
    );
};

export default Purchase;



