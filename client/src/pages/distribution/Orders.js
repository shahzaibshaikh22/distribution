import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteBookingMutation, useGetBookingsQuery } from "../../redux/features/apiSlices/booking/orderBooking";
import { setBookings } from "../../redux/features/slices/bookings";
import { FaTrashAlt } from "react-icons/fa";
import { IoClose } from "react-icons/io5";

const Orders = () => {
    const { bookings } = useSelector((state) => state.booking);
    const dispatch = useDispatch();
    const { data: bookingData } = useGetBookingsQuery();
    const [selectedOrder, setSelectedOrder] = useState(null);

    useEffect(() => {
        if (bookingData) {
            dispatch(setBookings(bookingData));
        }
    }, [bookingData, dispatch]);

    // Order View Handler
    const handleViewOrder = (order) => {
        setSelectedOrder(order);
    };

    const handlePrint = () => {
        window.print();
    };
    const [dltbooking] = useDeleteBookingMutation()
    const handleDlt = async (id)=>{
        const res = await dltbooking(id)
        if(res.data.msg){
           alert(res.data.msg)
        }
    }

    return (
        <div className="w-full px-4">
            <div className="w-full">
                <TopBar />
                <SectionBar sectionHeading="Orders" />
            </div>

            {/* Orders Table */}
            <div className="w-full bg-lightsecondary rounded-md p-4 mb-2">
                <table className="w-full min-w-full rounded-md border border-gray-200">
                    <thead className="bg-gray-100 text-gray-800">
                        <tr>
                            <th className="py-3 text-xs px-4">Customer</th>
                            <th className="py-3 text-xs px-4">Product Qty</th>
                            <th className="py-3 text-xs px-4">Total Amount</th>
                            <th className="py-3 text-xs px-4">Delivery Charges</th>
                            <th className="py-3 text-xs px-4">Extra Charges</th>
                            <th className="py-3 text-xs px-4">Net Payable Amount</th>
                            <th className="py-3 text-xs px-4">Status</th>
                            <th className="py-3 text-xs px-4">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings?.map((b) => (
                            <tr key={b._id} className="border-b border-gray-400">
                                <td className="py-3 text-xs px-4 text-center">{b.customer}</td>
                                <td className="py-3 text-xs px-4 text-center">{b.totalQuantity}</td>
                                <td className="py-3 text-xs px-4 text-center">{b.totalAmount}</td>
                                <td className="py-3 text-xs px-4 text-center">{b.deliveryCharges}</td>
                                <td className="py-3 text-xs px-4 text-center">{b.extraCharges}</td>
                                <td className="py-3 text-xs px-4 text-center">{b.netPayableAmount}</td>
                                <td className="py-3 text-xs px-4 text-center">{b.status}</td>
                                <td className="py-3 text-xs px-4 text-center flex items-center gap-1 justify-center">
                                    <span
                                        onClick={() => handleViewOrder(b)}
                                        className="bg-blue-700 px-2 py-1 rounded-sm text-white cursor-pointer"
                                    >
                                        View
                                    </span>
                                    <span onClick={()=>handleDlt(b._id.toString())} className="bg-red-700 px-4 py-[6px] rounded-sm text-white cursor-pointer">
                                        <FaTrashAlt />
                                    </span>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Order Details Modal */}
            {selectedOrder && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg  w-full max-w-7xl mx-auto relative">
                        {/* Close Button */}
                        <button
                            onClick={() => setSelectedOrder(null)}
                            className="absolute top-3 right-3 text-gray-600 hover:text-black"
                        >
                            <IoClose size={24} />
                        </button>
                      

                        <h2 className="text-lg font-bold text-center mb-4">Order Details</h2>

                        {/* Order Details Table */}
                        <table className="w-full border-collapse border border-gray-200 mb-4">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-sm">Customer Name</th>
                                    <th className="border px-4 py-2 text-sm">Product Quantity</th>
                                    <th className="border px-4 py-2 text-sm">Total Amount</th>
                                    <th className="border px-4 py-2 text-sm">Payment Type</th>
                                    <th className="border px-4 py-2 text-sm">Delivery Charges</th>
                                    <th className="border px-4 py-2 text-sm">Extra Charges</th>
                                    <th className="border px-4 py-2 text-sm">Net Payable Amount</th>
                                    <th className="border px-4 py-2 text-sm">Status</th>
                                </tr>
                            </thead>
                            <tr>
                                <td className="text-center text-sm py-2">{selectedOrder.customer}</td>
                                <td className="text-center text-sm py-2">{selectedOrder.totalQuantity}</td>
                                <td className="text-center text-sm py-2">{selectedOrder.totalAmount}</td>
                                <td className="text-center text-sm py-2">{selectedOrder.paymentType}</td>
                                <td className="text-center text-sm py-2">{selectedOrder.deliveryCharges}</td>
                                <td className="text-center text-sm py-2">{selectedOrder.extraCharges}</td>
                                <td className="text-center text-sm py-2">{selectedOrder.netPayableAmount}</td>
                                <td className="text-center text-sm py-2">{selectedOrder.status}</td>
                            </tr>
                        </table>

                        {/* Products List */}
                        <h3 className="text-lg font-semibold mb-2">Products</h3>
                        <table className="w-full border border-gray-200">
                            <thead className="bg-gray-100">
                                <tr>
                                    <th className="border px-4 py-2 text-sm">Product</th>
                                    <th className="border px-4 py-2 text-sm">Product Name</th>
                                    <th className="border px-4 py-2 text-sm">Quantity</th>
                                    <th className="border px-4 py-2 text-sm">Brand</th>
                                    <th className="border px-4 py-2 text-sm">Category</th>
                                    <th className="border px-4 py-2 text-sm">Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {selectedOrder.products.map((product) => (
                                    <tr key={product.product._id}>
                                        <td className="border px-4 text-center py-2 text-sm">
                                           <div className="flex items-center justify-center">
                                           <img className="w-10 h-10 object-contain" src={`http://localhost:5000/uploads/${product.product.image}`} alt="" />
                                           </div>
                                        </td>
                                        <td className="border px-4 text-center py-2 text-sm">{product.product.productname}</td>
                                        <td className="border px-4 text-center py-2 text-sm">{product.quantity}</td>
                                        <td className="border px-4 text-center py-2 text-sm">{product.product.brand}</td>
                                        <td className="border px-4 text-center py-2 text-sm">{product.product.category}</td>
                                        <td className="border px-4 text-center py-2 text-sm">{product.product.costprice}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        <button
                            onClick={() => handlePrint()}
                            className="bg-green-600 text-white px-4 py-2 rounded-md mt-4"
                        >
                            Print
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Orders;
