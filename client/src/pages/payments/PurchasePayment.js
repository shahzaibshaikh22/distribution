import React, { useEffect, useState,useRef } from "react";
import TopBar from "../../components/TopBar";
import { useGetVendorQuery } from "../../redux/features/apiSlices/setup/vendor";
import { useDispatch, useSelector } from "react-redux";
import { setVendors } from "../../redux/features/slices/productSlice";
import { useGetAllTotalQuery, useLazyGetPurOrByVendorQuery } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice";
import { setPurOrOfVendor, setVendorPayments } from "../../redux/features/slices/payment";
import { useLazyGetVendorPaymentQuery, usePayToVendorMutation } from "../../redux/features/apiSlices/payment/paytovendor";

const PurchasePayment = () => {
  const { PurOrOfVendor, vendorPayments } = useSelector((state) => state.payment);
  const { data: vendorData } = useGetVendorQuery();
  const { data: totalData, refetch } = useGetAllTotalQuery();
  const [getOrders, { data: orderData, error, isLoading }] = useLazyGetPurOrByVendorQuery();
  const [getVendorPayment, { data: vendorPaymentData }] = useLazyGetVendorPaymentQuery();
  const [paytovendor, { isLoading: isPaying }] = usePayToVendorMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [phonePay, setPhonePay] = useState(false);
  const [isVoucher, setIsVoucher] = useState(false);
  const [voucher, setVoucher] = useState(null);

  const [data, setData] = useState({
    pono: "",
    vendor: "",
    payamount: 0,
    totalamount: 0,
    account: "",
  });
  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  const dispatch = useDispatch();
  const { vendors } = useSelector((state) => state.product);

  // Fetch vendors and set them in Redux store
  useEffect(() => {
    if (vendorData) {
      dispatch(setVendors(vendorData));
    }
  }, [vendorData, dispatch]);

  // Update purchase orders in Redux store when orderData changes
  useEffect(() => {
    if (orderData) {
      dispatch(setPurOrOfVendor(orderData));
    }
  }, [orderData, dispatch]);

  // Sync form data with selected order
  useEffect(() => {
    if (selectedOrder) {
      setData((prevData) => ({
        ...prevData,
        pono: selectedOrder.purchseOrderNo,
        vendor: selectedOrder.vendor,
        totalamount: selectedOrder.totalAmount,
      }));
    }
  }, [selectedOrder]);

  const handleFetchOrders = (vendor) => {
    getOrders(vendor);
    getVendorPayment(vendor)
  };

  const handleSelectView = (order) => {
    setSelectedOrder(order);
  };

  // Handle payment submission
  const handlePayAmount = async () => {
    try {
      const res = await paytovendor(data).unwrap(); // unwrap to handle success/error directly
      if (res?.msg) {
        alert(res.msg);
        // Reset form and selected order after successful payment
        setData({
          pono: "",
          vendor: "",
          payamount: 0,
          account: "",
        });
        setSelectedOrder(null);
        // Refetch totals and vendor orders to update UI
        refetch(); // Refetch total data
        if (data.vendor) {
          handleFetchOrders(data.vendor); // Refetch vendor-specific orders
        }
      }
    } catch (err) {
      alert("Payment failed: " + (err?.data?.msg || "Something went wrong"));
    }
  };

  // Calculate grand total for vendor-specific orders
  const grandTotal = PurOrOfVendor?.reduce((sum, order) => sum + order.totalAmount, 0) || 0;

  const totalPayAmount = vendorPayments?.reduce((total, item) => total + item.payamount, 0);

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (vendorPaymentData) {
      dispatch(setVendorPayments(vendorPaymentData));
    }
  }, [vendorPaymentData, dispatch]);

  const handlePhonePay = ()=>{
    setPhonePay(true)
    setSelectedOrder(null)
  }
  const handleVoucher = (voucher)=>{
    setIsVoucher(true)
    setVoucher(voucher)
  }

  return (
    <div className="w-full px-4">
      <TopBar />
      <div className="w-full bg-white rounded-md my-4 p-6">
        <div className="flex items-center justify-between">
          <h1 className="font-semibold text-gray-700">Vendors</h1>
          <h1 className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md">
            Overall Amount: Rs-{totalData?.grandTotal || 0}
          </h1>
        </div>
        <div className="divider w-full h-[1px] bg-gray-300  mx-auto left-0 mb-4 mt-2" />
        <div className="w-full rounded-md  bg-white text-gray-800 overflow-x-auto">
          <table className="w-full text-left ">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 text-xs px-4">Vendor Name</th>
                <th className="py-3 text-xs px-4">Address</th>
                <th className="py-3 text-xs px-4">Phone</th>
                <th className="py-3 text-xs px-4">Email</th>
                <th className="py-3 text-xs px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {vendors?.map((v) => (
                <tr key={v._id} className="border-b p-1">
                  <td className="py-3 text-xs px-4">{v.name}</td>
                  <td className="py-3 text-xs px-4">{v.address}</td>
                  <td className="py-3 text-xs px-4">{v.phone}</td>
                  <td className="py-3 text-xs px-4">{v.email}</td>
                  <td className="py-3 text-xs px-4">
                    <span
                      onClick={() => handleFetchOrders(v.name)}
                      className="px-4 py-2 bg-blue-700 cursor-pointer text-white rounded-md"
                    >
                      view
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {orderData && (
        <div className="w-full bg-white rounded-md my-4 p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold font-gray-700">Purchase Orders</h1>
            <h1 className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md">
              Overall Amount: Rs-{grandTotal}
            </h1>
          </div>
          <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0 my-2" />
          <div className="w-full rounded-md  bg-white text-gray-800 overflow-x-auto">
            <table className="w-full text-left border-collapse">
              <thead>
                <tr className="bg-gray-100">
                  <th className="py-3 text-xs px-4">Vendor Name</th>
                  <th className="py-3 text-xs px-4">Purchase Order No</th>
                  <th className="py-3 text-xs px-4">Total Amount</th>
                  <th className="py-3 text-xs px-4">Date</th>
                  <th className="py-3 text-xs px-4">Action</th>
                </tr>
              </thead>
              <tbody>
                {PurOrOfVendor?.map((order) => (
                  <tr key={order._id} className="border-b p-1">
                    <td className="py-3 text-xs px-4 col-span-1">{order.vendor}</td>
                    <td className="py-3 text-xs px-4 col-span-1">{order.purchseOrderNo}</td>
                    <td className="py-3 text-xs px-4 col-span-1">{order.totalAmount}</td>
                    <td className="py-3 text-xs px-4 col-span-1">{new Date(order.createdAt).toLocaleString()}</td>
                    <td className="py-3 text-xs px-4 col-span-1">
                      <span
                        onClick={() => handleSelectView(order)}
                        className="px-4 py-2 bg-blue-700 cursor-pointer text-white rounded-md"
                      >
                        view
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Modal Popup */}
      {selectedOrder && (
        <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="flex gap-2 bg-white w-full md:max-w-5xl max-w-3xl rounded-md">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl border-r">
              <h2 className="font-semibold font-gray-700">Order Details</h2>
              <table className="w-full border-collapse border border-gray-300 shadow-md">
                <tbody>
                  <tr className="bg-gray-100">
                    <td className="border p-3 font-semibold text-gray-700">Purchase order No</td>
                    <td className="border p-3">{selectedOrder.purchseOrderNo}</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold text-gray-700">Vendor Name</td>
                    <td className="border p-3">{selectedOrder.vendor}</td>
                  </tr>
                  <tr>
                    <td className="border p-3 font-semibold text-gray-700">Payment Type</td>
                    <td className="border p-3">{selectedOrder.paymentType}</td>
                  </tr>
                  <tr className="bg-gray-100">
                    <td className="border p-3 font-semibold text-gray-700">Total Amount</td>
                    <td className="border p-3">Rs-{selectedOrder.totalAmount}</td>
                  </tr>
                </tbody>
              </table>
              <h3 className="text-lg font-semibold text-gray-700 mt-6">Products</h3>
              <div className="max-h-40 overflow-y-auto border p-3 mt-2">
                <table className="w-full border-collapse border border-gray-300 text-sm">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="border p-2">Image</th>
                      <th className="border p-2">Product Name</th>
                      <th className="border p-2">Brand</th>
                      <th className="border p-2">Category</th>
                      <th className="border p-2">Cost Price</th>
                      <th className="border p-2">Quantity</th>
                    </tr>
                  </thead>
                  <tbody>
                    {selectedOrder.products.map((item) => (
                      <tr key={item._id} className="text-center">
                        <td className="border p-2">
                          <img
                            src={`http://localhost:5000/uploads/${item.product.image}`}
                            alt={item.product.productname}
                            className="w-12 h-12 object-cover rounded"
                          />
                        </td>
                        <td className="border p-2">{item.product.productname}</td>
                        <td className="border p-2">{item.product.brand}</td>
                        <td className="border p-2">{item.product.category}</td>
                        <td className="border p-2">{item.product.costprice}</td>
                        <td className="border p-2">{item.quantity}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
             <div className="flex items-center gap-4">
             <button
                className="mt-6 md:w-full w-[100px] bg-gray-400 text-white py-2 rounded "
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
             <button
                className="md:hidden block mt-6 w-full bg-blue-700 text-white py-2 rounded "
                onClick={handlePhonePay}
              >
                Pay Amount
              </button>
             </div>
            </div>

            <div className="md:flex hidden flex-col gap-2 p-6 w-full text-gray-700">
              <h1 className="text-xl font-bold mb-4">Pay Amount</h1>
              <div className="flex flex-col w-full justify-between gap-2 my-2">
                <label className="font-semibold" htmlFor="account">
                  Select Account
                </label>
                <div className="inputBorder w-full p-2 rounded-md">
                  <select
                    onChange={handleChange}
                    value={data.account}
                    className="w-full"
                    name="account"
                    id="account"
                  >
                    <option value="">select account</option>
                    <option value="hand in cash">hand in cash</option>
                    <option value="account 1">account 1</option>
                    <option value="account 2">account 2</option>
                  </select>
                </div>
              </div>
              <div className="flex flex-col w-full justify-between gap-2 my-2">
                <label className="font-semibold" htmlFor="payamount">
                  Amount
                </label>
                <div className="inputBorder w-full p-2 rounded-md">
                  <input
                    value={data.payamount}
                    onChange={handleChange}
                    type="number"
                    placeholder="Enter Amount"
                    name="payamount"
                    className="bg-transparent w-full"
                  />
                </div>
              </div>
              <button
                onClick={handlePayAmount}
                disabled={isPaying}
                className={`w-full py-2 rounded text-white ${isPaying ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
                  }`}
              >
                {isPaying ? "Processing..." : "Pay now"}
              </button>
            </div>
          </div>
        </div>
      )}

      {phonePay &&(
           <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="flex gap-2 bg-white w-full md:max-w-5xl max-w-3xl rounded-md">
         <div className="flex flex-col gap-2 p-6 w-full text-gray-700">
         <h1 className="text-xl font-bold mb-4">Pay Amount</h1>
         <div className="flex flex-col w-full justify-between gap-2 my-2">
           <label className="font-semibold" htmlFor="account">
             Select Account
           </label>
           <div className="inputBorder w-full p-2 rounded-md">
             <select
               onChange={handleChange}
               value={data.account}
               className="w-full"
               name="account"
               id="account"
             >
               <option value="">select account</option>
               <option value="hand in cash">hand in cash</option>
               <option value="account 1">account 1</option>
               <option value="account 2">account 2</option>
             </select>
           </div>
         </div>
         <div className="flex flex-col w-full justify-between gap-2 my-2">
           <label className="font-semibold" htmlFor="payamount">
             Amount
           </label>
           <div className="inputBorder w-full p-2 rounded-md">
             <input
               value={data.payamount}
               onChange={handleChange}
               type="number"
               placeholder="Enter Amount"
               name="payamount"
               className="bg-transparent w-full"
             />
           </div>
         </div>
         <div className="flex items-center gap-4">
         <button
           onClick={handlePayAmount}
           className={`w-full py-2 rounded text-white bg-blue-700 
             }`}
         >
           {isPaying ? "Processing..." : "Pay now"}
         </button>
         <button
           onClick={()=>setPhonePay(false)}
           className={`w-full py-2 rounded text-white  bg-gray-400`}
         >
           close
         </button>
         </div>
       </div>
       </div>
       </div>
      )}

      {vendorPaymentData && (
        <div className="w-full bg-white rounded-md my-4 p-6">
          <div className="flex items-center justify-between">
            <h1 className="font-semibold font-gray-700">Payed History</h1>
            <h1 className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md">
             Amount: Rs-{totalPayAmount}
            </h1>
          </div>
          <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0 my-2" />
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 text-xs px-4">Vendor Name</th>
                <th className="py-3 text-xs px-4">Purchase Order No</th>
                <th className="py-3 text-xs px-4">Amount</th>
                <th className="py-3 text-xs px-4">Account</th>
                <th className="py-3 text-xs px-4">Date</th>
                <th className="py-3 text-xs px-4">Invoice</th>
              </tr>
            </thead>
            <tbody>
              {vendorPayments?.map((order) => (
                <tr key={order._id} className="border-b p-1">
                  <td className="py-3 text-xs px-4">{order.vendor}</td>
                  <td className="py-3 text-xs px-4">{order.pono}</td>
                  <td className="py-3 text-xs px-4">Rs-{order.payamount}</td>
                  <td className="py-3 text-xs px-4">{order.account}</td>
                  <td className="py-3 text-xs px-4">{new Date(order.createdAt).toLocaleString()}</td>
                  <td className="py-3 text-xs px-4">
                  <span
                        onClick={()=>handleVoucher(order)}
                        className="px-4 py-2 bg-blue-700 cursor-pointer text-white rounded-md"
                      >
                        view
                      </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {isVoucher &&(
           <div
           ref={componentRef}
           className="w-full  h-screen print:bg-white bg-gray-50 z-20 p-8 rounded-md shadow-lg border border-gray-200 print:shadow-none print:border fixed top-0 left-0 right-0 mx-auto "
         >
          
           <div className="w-full h-full max-w-[700px] mx-auto print:pb-20">
           <span className="float-right font-bold text-xl cursor-pointer print:hidden" onClick={()=>setIsVoucher(false)}>x</span>
                    {/* print header */}
                    <div className="w-full print:block hidden">
                 <div className="mb-4 flex justify-between items-center">
                   {/* <img src="logo.png" alt="Company Logo" className="w-32" /> */}
                   <div className={`flex items-center relative px-4 h-[4rem]`}>
                   <span className='text-5xl italic text-sky-900'>X</span> 
                   <div className='flex flex-col gap-0'>
                   <span className='text-xl absolute top-5 left-10   text-black font-bold'>enith</span> 
                   <span className='text-md absolute top-9  text-black'>servics</span> 
                   </div>
                 </div>
                   <h5 className="text-xl font-bold text-center">
                     HZINS International (Pvt.) Ltd.<br /> Hyderabad
                   </h5>
                 </div>
                 <hr className="mb-4 print:block hidden"/>
     
                 <div className="text-center">
                   <h3 className="text-lg font-semibold">Payment Voucher</h3>
                 </div>
     
                 {/* Process Order Details */}
                 <div className="flex justify-between my-4">
                   <div>
                     <p>Voucher Number <strong>{voucher.voucherno}</strong> <br /></p>
                     <p>Puchase Order Number <strong>{voucher.pono} </strong> <br /></p>
                   </div>
                   <div className="text-right">
                     <p>Payment Released Date <br /> {new Date().toLocaleDateString()}</p>
                   </div>
                 </div>
               </div>
     
               <hr className="my-4 print:block hidden"/>
               {/* print header */}
           
           {/* Payment To */}
           <div className="mb-6">
             <h4 className="font-semibold text-lg text-gray-800 mb-2">Payment To:</h4>
             <div className="border border-gray-300 rounded-md p-4 bg-gray-50">
               <p><strong>Name:</strong> {voucher.vendor}</p>
               <p><strong>Address:</strong> Address</p>
               <p><strong>Phone:</strong> 03173883816</p>
               <p><strong>Email:</strong> Shahzaibb@gmail.com</p>
             </div>
           </div>
           
           {/* Payment Details */}
           <div className="mb-6">
             <h4 className="font-semibold text-lg text-gray-800 mb-2">Payment Method:</h4>
             <ul className="list-none space-y-1">
               <li>Payment Type: <strong> Credit </strong></li>
               <li>Total Amount Rs- <strong> {voucher.totalamount} </strong></li>
               <li>Amount Paid Rs- <strong> {voucher.payamount} </strong></li>
               <li>Remaining Amount Rs- <strong>{voucher.remainingamount}  </strong></li>
               <li>Transaction Date: <strong> {new Date(voucher.createdAt).toLocaleString()} </strong></li>
               <li>Transaction ID: <strong> {voucher._id} </strong></li>
             </ul>
           </div>
           
           {/* Customer Service */}
           <p className="text-sm text-gray-600 mt-4">
             If you have any questions regarding this payment, please contact our customer service, <strong>03155484511</strong>.
           </p>
           
           {/* Signature */}
           <div className="mt-6 border-t pt-4 text-right">
             <p className="italic">Signature</p>
             <p className="font-semibold mt-2">Authorized Person</p>
             <p className="text-sm text-gray-600">Authorized Signatory</p>
           </div>
           
           {/* Print Button */}
           <button
             onClick={handlePrint}
             className="mt-6 px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition block mx-auto print:hidden"
           >
             Print
           </button>
           </div>
         </div>
      )}
    </div>
  );
};

export default PurchasePayment;