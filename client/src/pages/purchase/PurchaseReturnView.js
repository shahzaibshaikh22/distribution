import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useGetPurchaseReturnQuery } from '../../redux/features/apiSlices/purchase/purchaseOrderSlice';
import { setPurchaseReturn } from '../../redux/features/slices/productSlice';
import TopBar from '../../components/TopBar';
import { FaTrashAlt, FaEye } from 'react-icons/fa';

const PurchaseReturnView = () => {
    const dispatch = useDispatch()
    const { purchaseReturn } = useSelector((state) => state.product);
    const [selectedReturn, setSelectedReturn] = useState(null)

    const { data: purchaseReturnData } = useGetPurchaseReturnQuery()

    const handleSelectView = (purchasereturn) => {  
        setSelectedReturn(purchasereturn);
    };



    useEffect(() => {
        if (purchaseReturnData) {
            dispatch(setPurchaseReturn(purchaseReturnData))
        }
    }, [purchaseReturnData, dispatch])
    return (
        <div className="w-full px-4">
            <TopBar />
            <div className="w-full bg-white rounded-md my-4 p-6">
                <h3 className='text-lg font-semibold mb-2'>Purchase Return</h3>
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-gray-100">
                            <th className="py-3 text-xs px-4">sr no</th>
                            <th className="py-3 text-xs px-4">Vendor</th>
                            <th className="py-3 text-xs px-4">Purchase order no</th>
                            <th className="py-3 text-xs px-4">Warehouse</th>
                            <th className="py-3 text-xs px-4">Vehicle no</th>
                            <th className="py-3 text-xs px-4">Total Amount</th>
                            <th className="py-3 text-xs px-4">Date</th>
                            <th className="py-3 text-xs px-4">Action</th>

                        </tr>
                    </thead>
                    <tbody>
                        {purchaseReturn && purchaseReturn.map((r, index) => {
                            return (
                                <tr key={r._id} className="border-b p-1 hover:bg-lightsecondary">
                                    <td className="py-3 text-xs px-4">{index + 1}</td>
                                    <td className="py-3 text-xs px-4">{r.vendor}</td>
                                    <td className="py-3 text-xs px-4">{r.pono}</td>
                                    <td className="py-3 text-xs px-4">{r.warehouse}</td>
                                    <td className="py-3 text-xs px-4">{r.vehicleno}</td>
                                    <td className="py-3 text-xs px-4">{r.totalAmount}</td>
                                    <td className="py-3 text-xs px-4">{r.createdAt}</td>
                                    <td className=" flex items-center gap-2 px-4 py-2">

                                        <button className="text-white bg-blue-600 px-3 py-2 text-xs rounded-md">
                                            <FaEye onClick={() => handleSelectView(r)} />
                                        </button>
                                        <button className="text-white bg-red-600 px-3 py-2 text-xs rounded-md">
                                            <FaTrashAlt />
                                        </button>
                                    </td>
                                </tr>
                            )
                        })}
                    </tbody>
                </table>    
            </div>
            {/* Modal Popup */}
            {selectedReturn && (
                <div className="fixed z-20 inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
                    <div className="flex gap-2 bg-white w-full md:max-w-5xl  rounded-md">
                        <div className="bg-white p-6 rounded-lg w-full  border-r">
                            <h2 className="font-semibold font-gray-700">Purchase Return Details</h2>
                            <table className="w-full border-collapse border border-gray-300 shadow-md">
                                <tbody>
                                    <tr className="bg-gray-100">
                                        <td className="border p-3 font-semibold text-gray-700">Purchase order No</td>
                                        <td className="border p-3">{selectedReturn.pono}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-3 font-semibold text-gray-700">Vendor Name</td>
                                        <td className="border p-3">{selectedReturn.vendor}</td>
                                    </tr>
                                    <tr>
                                        <td className="border p-3 font-semibold text-gray-700">Warehouse</td>
                                        <td className="border p-3">{selectedReturn.warehouse}</td>
                                    </tr>
                                    <tr className="bg-gray-100">
                                        <td className="border p-3 font-semibold text-gray-700">Total Amount</td>
                                        <td className="border p-3">Rs-{selectedReturn.totalAmount}</td>
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
                                        {selectedReturn.products.map((item) => (
                                            <tr key={item._id} className="text-center">
                                                {item.product.image ? (
                                                    <td className="border p-2">
                                                        <img
                                                            src={`http://localhost:5000/uploads/${item.product.image}`}
                                                            alt={item.product.productname}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    </td>
                                                ) : (
                                                    <td className="border p-2">
                                                        <img
                                                            src={``}
                                                            className="w-12 h-12 object-cover rounded"
                                                        />
                                                    </td>
                                                )}
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
                                    onClick={() => setSelectedReturn(null)}
                                >
                                    Close
                                </button>
                            </div>
                        </div>

                    </div>
                </div>
            )}
        </div>
    )
}

export default PurchaseReturnView
