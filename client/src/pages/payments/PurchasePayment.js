import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { useGetVendorQuery } from "../../redux/features/apiSlices/setup/vendor";
import { useDispatch, useSelector } from "react-redux";
import { setVendors } from "../../redux/features/slices/productSlice";
import { useGetAllTotalQuery, useLazyGetPurOrByVendorQuery } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice";
import { setPurOrOfVendor, setVendorPayments } from "../../redux/features/slices/payment";
import { useLazyGetVendorPaymentQuery, usePayToVendorMutation } from "../../redux/features/apiSlices/payment/paytovendor";

const PurchasePayment = () => {
  const { PurOrOfVendor,vendorPayments } = useSelector((state) => state.payment);
  const { data: vendorData } = useGetVendorQuery();
  const { data: totalData, refetch } = useGetAllTotalQuery();
  const [getOrders, { data: orderData, error, isLoading }] = useLazyGetPurOrByVendorQuery();
  const [getVendorPayment, { data: vendorPaymentData}] = useLazyGetVendorPaymentQuery();
  const [paytovendor, { isLoading: isPaying }] = usePayToVendorMutation();
  const [selectedOrder, setSelectedOrder] = useState(null);

  const [data, setData] = useState({
    pono: "",
    vendor: "",
    payamount: 0,
    account: "",
  });

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

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (vendorPaymentData) {
      dispatch(setVendorPayments(vendorPaymentData));
    }
  }, [vendorPaymentData, dispatch]);

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
        <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0 mb-4 mt-2" />
        <table className="w-full text-left border-collapse">
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

      {orderData && (
        <div className="w-full bg-white rounded-md my-4 p-6">
          <div className="flex items-center justify-between">
            <h1>Purchase Orders</h1>
            <h1 className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md">
              Overall Amount: Rs-{grandTotal}
            </h1>
          </div>
          <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0 my-2" />
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 text-xs px-4">Vendor Name</th>
                <th className="py-3 text-xs px-4">Purchase Order No</th>
                <th className="py-3 text-xs px-4">Total Amount</th>
                <th className="py-3 text-xs px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {PurOrOfVendor?.map((order) => (
                <tr key={order._id} className="border-b p-1">
                  <td className="py-3 text-xs px-4">{order.vendor}</td>
                  <td className="py-3 text-xs px-4">{order.purchseOrderNo}</td>
                  <td className="py-3 text-xs px-4">{order.totalAmount}</td>
                  <td className="py-3 text-xs px-4">
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
      )}

      {/* Modal Popup */}
      {selectedOrder && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="flex gap-2 bg-white w-full max-w-5xl rounded-md">
            <div className="bg-white p-6 rounded-lg w-full max-w-xl border-r">
              <h2 className="text-xl font-bold mb-4 text-gray-700">Order Details</h2>
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
              <button
                className="mt-6 w-full bg-red-500 text-white py-2 rounded hover:bg-red-600"
                onClick={() => setSelectedOrder(null)}
              >
                Close
              </button>
            </div>

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
              <button
                onClick={handlePayAmount}
                disabled={isPaying}
                className={`w-full py-2 rounded text-white ${
                  isPaying ? "bg-gray-400" : "bg-blue-700 hover:bg-blue-800"
                }`}
              >
                {isPaying ? "Processing..." : "Pay now"}
              </button>
            </div>
          </div>
        </div>
      )}

{vendorPayments && (
        <div className="w-full bg-white rounded-md my-4 p-6">
          <div className="flex items-center justify-between">
            <h1>Purchase Orders</h1>
            <h1 className="px-2 py-1 bg-gray-200 text-gray-800 rounded-md">
              Overall Amount: Rs-{grandTotal}
            </h1>
          </div>
          <div className="divider w-full h-[1px] bg-gray-300 mx-auto left-0 my-2" />
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-100">
                <th className="py-3 text-xs px-4">Vendor Name</th>
                <th className="py-3 text-xs px-4">Purchase Order No</th>
                <th className="py-3 text-xs px-4"> Amount</th>
              </tr>
            </thead>
            <tbody>
              {vendorPayments?.map((order) => (
                <tr key={order._id} className="border-b p-1">
                  <td className="py-3 text-xs px-4">{order.vendor}</td>
                  <td className="py-3 text-xs px-4">{order.purchseOrderNo}</td>
                  <td className="py-3 text-xs px-4">{order.totalAmount}</td>
                  </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default PurchasePayment;