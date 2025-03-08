import React, { useState, useEffect, useRef } from "react";
import TopBar from "../../components/TopBar";
import { useDispatch, useSelector } from "react-redux";
import { useAddpurchaseOrderMutation, useGetPurchaseOrderQuery, usePurchaseReturnMutation } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice";
import { setPurchaseOrders } from "../../redux/features/slices/productSlice";
import { FaChevronDown, FaTrashAlt } from "react-icons/fa";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";

const PurchseReturn = () => {
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

    const [selectedProducts, setSelectedProducts] = useState([]);
    const [show, setShow] = useState(false);
    const [showInvoice, setShowInvoice] = useState(false);
    const invoiceRef = useRef();


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

   
    // Debugging 

    const handleSearch = () => {
        const foundOrder = purchaseOrders.find((order) => order.pono === searchpo);

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





    // return products
    const handleProductSelect = (e) => {
        setShow(true);
        const productId = e.target.value;
        if (!productId) return;
        const product = filteredPurchaseOrder?.products.find((p) => p._id.toString() === productId);

        setSelectedProducts((prev) => {
            const existing = prev.find((p) => p._id === product._id);
            if (existing) {
                return prev.map((p) =>
                    p._id === product._id ? { ...p, quantity: p.quantity + 1, total: p.price * (p.quantity + 1) } : p
                );
            }
            return [...prev, { ...product, quantity: 1, total: product.price }];
        });
    };


    // const updateQuantity = (id, increment) => {
    //     setSelectedProducts((prev) =>
    //         prev.map((p) =>
    //             p._id === id
    //                 ? {
    //                     ...p,
    //                     quantity: Math.max(1, p.quantity + increment),
    //                     total: p.price * Math.max(1, p.quantity + increment),
    //                 }
    //                 : p
    //         )
    //     );
    // };
    const updateQuantity = (id, increment) => {
        setSelectedProducts((prev) =>
            prev.map((p) => {
                const maxQuantity = filteredPurchaseOrder?.products.find(prod => prod._id === p._id)?.quantity || 0;
                const newQuantity = Math.max(1, Math.min(p.quantity + increment, maxQuantity));
    
                return p._id === id
                    ? { 
                        ...p, 
                        quantity: newQuantity, 
                        total: p.price * newQuantity 
                    }
                    : p;
            })
        );
    };
    


    const deleteProduct = (id) => {
        setSelectedProducts((prev) => prev.filter((p) => p._id !== id));
    };

    useEffect(() => {
        setTotalAmount(selectedProducts.reduce((sum, p) => sum + p.total, 0));
    }, [selectedProducts]);

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

    const returnData = {
        vendor: filteredPurchaseOrder?.vendor,
        warehouse: filteredPurchaseOrder?.warehouse,
        vehicleno: filteredPurchaseOrder?.vehicleno,
        pono: filteredPurchaseOrder?.pono,
        dcno,
        products: selectedProducts?.map((p) => ({
            product: p._id.toString(), // Ensure correct ID reference
            price: p.price,
            quantity: quantities[p._id] ?? p.quantity,
            total: (quantities[p._id] ?? p.quantity) * p.price,
        })),
        totalAmount: selectedProducts?.reduce(
            (sum, p) => sum + ((quantities[p._id] ?? p.quantity) * p.price || 0),
            0
        ),
    };
    

    
    const [purchaseReturn, { isLoading }] = usePurchaseReturnMutation();
    const handleReturn = async () => {
        const res = await purchaseReturn(returnData);
       console.log(res);
       
    }
    if(selectedProducts){
        console.log(selectedProducts);
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
                        <h3 className="text-lg font-semibold text-gray-600">Search Purchase Order</h3>
                        <div className="addPurchaseDiv max-w-xs">
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


                {
                    filteredPurchaseOrder && (
                        <div className="w-full bg-white p-4">
                            <h3 className="text-md mb-4 font-semibold">Return Products</h3>
                            <form className='py-4 w-full max-w-3xl mx-auto'>
                                <div className='flex  flex-col w-full gap-2'>
                                    <label className="font-semibold" htmlFor="producttype">Products</label>
                                    <div className="inputBorder w-full py-2 rounded-md ">
                                        <div className="relative full w-full">
                                            <select
                                                onChange={handleProductSelect}
                                                name="product"
                                                className="w-full inputBorder text-gray-800 px-4  rounded-md appearance-none cursor-pointer">
                                                <option value="">Select a Product</option>
                                                {filteredPurchaseOrder?.products?.map((product) => (
                                                    <option key={product._id} value={product._id}>
                                                        {product.product.productname}
                                                    </option>
                                                ))}
                                            </select>
                                            <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
                                                <FaChevronDown />
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    )
                }

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
                                                        <img className="w-8 h-8 rounded-md" src={`http://localhost:5000/uploads/${p.product.image}`} alt="" />
                                                    </td>
                                                    <td className="p-2">{p.product.productname}</td>
                                                    <td className="p-2">
                                                        <button type="button" onClick={() => updateQuantity(p._id, -1)}>-</button>
                                                        <span className="px-2">{p.quantity}</span>
                                                        <button type="button" onClick={() => updateQuantity(p._id, 1)}>+</button>
                                                    </td>
                                                    <td className="p-2">Rs. {p.total}</td>
                                                    <td className="p-2">
                                                        <button type="button" onClick={() => deleteProduct(p._id)}><FaTrashAlt className="text-red-600" /></button>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                            <div className="bg-white p-6 roundedn-md mt-2">
                                <h3 className="text-lg font-semibold">Return Summary</h3>
                                <h3 className="mt-2 text-md font-bold">Total Amount: Rs.{totalAmount}</h3>
                                <div className='flex md:flex-row flex-col  w-full my-4 '>
                                    <div />
                                    <button
                                        // onClick={handlePurchaseOrder}
                                        type="submit"
                                        className='px-8 bg-blue-700 text-sm py-2 rounded-full text-white'>Add New</button>
                                    <button type="button"  onClick={() => setShowInvoice(true)}  className='px-8 md:ml-2 bg-blue-700 text-sm py-2 rounded-full text-white'>View Invoice</button>
                                </div>
                            </div>
                        </>
                    )
                }
                {showInvoice && (
                    <div className="fixed w-full inset-0 bg-black bg-opacity-50 flex items-center justify-center">
                        <div ref={invoiceRef} className="bg-white w-full  border-2 border-gray-500 max-w-5xl mx-auto p-6 rounded-lg  ">
                            <h2 className="text-xl font-bold text-center mb-4">Return Invoice</h2>
                            <p><strong>Vendor: {filteredPurchaseOrder?.vendor}</strong> </p>
                            <p><strong>Warehouse: {filteredPurchaseOrder?.warehouse}</strong> </p>
                            <p><strong>Vehicle No: {filteredPurchaseOrder?.vehicleno}</strong> </p>
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
                                            <td>{p.product.productname}</td>
                                            <td>{p.quantity}</td>
                                            <td>Rs. {p.total}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                            <h3 className="mt-2 text-lg font-bold text-right">Total: Rs.{totalAmount}</h3>
                            <button onClick={printInvoice} className="mr-2 bg-blue-500 text-white text-xs px-4 py-2">Print</button>
                            <button onClick={downloadPDF} className="bg-green-500 text-white text-xs px-4 py-2">Download PDF</button>
                            <button onClick={() => setShowInvoice(false)} className="bg-gray-500 ml-2 text-white text-xs px-4 py-2">close</button>
                        </div>
                    </div>
                )}

                <div className="w-full bg-white p-4">
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
                    {filteredPurchaseOrder && (
                        <div className="w-full flex items-end justify-end">
                            <button className="bg-blue-500  mt-2 text-white inline px-4 py-2 rounded-full" onClick={handleReturn}>{isLoading ? "adding..." : "Add Order"}</button>
                        </div>

                    )}
                </div>



            </div>
        </div>
    );
};

export default PurchseReturn;
