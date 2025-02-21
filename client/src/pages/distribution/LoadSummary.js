import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import { useGetBookingsQuery,useOrderSummaryMutation } from "../../redux/features/apiSlices/booking/orderBooking";
import { useDispatch, useSelector } from "react-redux";
import { setBookings } from "../../redux/features/slices/bookings";

const LoadSummary = () => {
  const dispatch = useDispatch();
  const { bookings } = useSelector((state) => state.booking);
  const [bono, setBono] = useState("");
  const { data: orderData } = useGetBookingsQuery();
  const [responsiblePerson,setResponsiblePerson] = useState("")
  const [driverName,setDriverName] = useState("")
  const [vehicleNo,setVehicleNo] = useState("")

  useEffect(() => {
    if (orderData) {
      dispatch(setBookings(orderData));
    }
  }, [dispatch, orderData]);

  let filteredOrder;
  let summayData;
  if (bookings) {
    filteredOrder = bookings.find((o) => o.bono === bono);
  }
  if(filteredOrder){
    summayData = {
      orderId:filteredOrder._id.toString(),
      responsiblePerson,
      driverName,
      vehicleNo
  
    }
  }
  const [savesummary, {isLoading}] = useOrderSummaryMutation()
  const handleSaveSummary = async ()=>{
    const res = await savesummary(summayData)
    if(res.data.msg){
      alert(res.data.msg);
    }
    if(res.data.err){
      alert(res.data.err);
    }
  } 

  return (
    <div className="w-full px-4">
      <div className="w-full print:hidden">
        <TopBar />
        <div className="bg-white px-6 py-4 rounded-md my-4 flex items-center justify-between">
          <h1>Order Summary</h1>
        </div>
      </div>
      <div className="w-full bg-white p-6 rounded-md">
        <div className="w-full flex flex-col gap-4 items-center justify-center">
          <h3 className="text-lg font-semibold text-gray-600">Search Booking Order</h3>
          <div className="addPurchaseDiv max-w-xs">
            <input
              value={bono}
              onChange={(e) => setBono(e.target.value)}
              type="text"
              placeholder="Enter PO No"
              name="pono"
              className='bg-transparent w-full border p-2 rounded-md'
            />
          </div>
          <button className="bg-blue-500 text-white px-8 py-2 rounded-full">Search</button>
        </div>
      </div>
      {filteredOrder && (
        <div className="print:p-20 p-0 mb-4 ">
          <div id="orderSummary" className="w-full print:border-[2px] print:border-gray-300 print:fixed print:top-0 print:left-0  print:z-50 bg-white p-6 rounded-md mt-6 shadow-md print:shadow-none">
          <div className="w-full flex items-center justify-between">
          <h2 className="text-xl font-bold mb-4 block print:hidden">Order Details</h2>
          <span onClick={()=>window.print()} className="bg-green-500 cursor-pointer text-white px-4 py-2 rounded-md">Print</span>
          </div>
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
              <h3 className="text-lg font-semibold">Order Summary</h3>
            </div>

            {/* Process Order Details */}
            <div className="flex justify-between my-4">
              <div>
                <p>Booking Order NO <br /> {filteredOrder.bono}</p>
              </div>
              <div className="text-right">
                <p>BO Released Date <br /> {new Date().toLocaleDateString()}</p>
              </div>
            </div>
          </div>

          <hr className="my-4 print:block hidden"/>
          {/* print header */}
          <div className="flex md:flex-row flex-col mt-2 mb-4 items-center md:gap-10 gap-2">
            <div className="w-full">
              <label className="my-4 font-semibold md:text-md text-xs" htmlFor="person">Responsible Person</label>
              <div className="w-full border-[2px] border-gray-200 rounded-md mt-2">
                <input type="text" value={responsiblePerson} name="responsiblePerson" onChange={(e)=>setResponsiblePerson(e.target.value)} placeholder="Responsible person" className="w-full p-2" />
              </div>
            </div>
            <div className="w-full">
              <label className="my-4 font-semibold md:text-md text-xs" htmlFor="person">Driver Name</label>
              <div className="w-full border-[2px] border-gray-200 rounded-md mt-2">
                <input type="text" value={driverName}  name="driverName" onChange={(e)=>setDriverName(e.target.value)} placeholder="Driver Name" className="w-full p-2" />
              </div>
            </div>
            <div className="w-full">
              <label className="my-4 font-semibold md:text-md text-xs" htmlFor="person">Vehicle No</label>
              <div className="w-full border-[2px] border-gray-200 rounded-md mt-2">
                <input type="text"  value={vehicleNo}  name="vehicleNo" onChange={(e)=>setVehicleNo(e.target.value)} placeholder="Vehicle No" className="w-full p-2" />
              </div>
            </div>

          </div>
          <hr className="my-4 print:block hidden"/>
            <div className="w-full overflow-x-scroll ">
            <table className="w-full text-sm  text-center ">
            <thead>
              <tr className="bg-gray-100 print:bg-gray-100">
                <th className="print:border border-gray-300 px-4 py-2">Order No</th>
                <th className="print:border border-gray-300 px-4 py-2">Customer</th>
                <th className="print:border border-gray-300 px-4 py-2">Status</th>
                <th className="print:border border-gray-300 px-4 py-2">Total Quantity</th>
                <th className="print:border border-gray-300 px-4 py-2">Total Amount</th>
                <th className="print:border border-gray-300 px-4 py-2">Net Payable</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-200">
                <td className="print:border border-gray-300 px-4 py-2">{filteredOrder.bono}</td>
                <td className="print:border border-gray-300 px-4 py-2">{filteredOrder.customer}</td>
                <td className="print:border border-gray-300 px-4 py-2">{filteredOrder.status}</td>
                <td className="print:border border-gray-300 px-4 py-2">{filteredOrder.totalQuantity}</td>
                <td className="print:border border-gray-300 px-4 py-2">${filteredOrder.totalAmount}</td>
                <td className="print:border border-gray-300 px-4 py-2">${filteredOrder.netPayableAmount}</td>
              </tr>
            </tbody>
          </table>
          <h3 className="text-lg font-bold mt-6">Product Details</h3>
          <table className="w-full text-sm  text-center  mt-4">
            <thead>
              <tr className="bg-gray-100">
                <th className="print:border border-gray-300 px-4 py-2">Product</th>
                <th className="print:border border-gray-300 px-4 py-2">Product Name</th>
                <th className="print:border border-gray-300 px-4 py-2">Brand</th>
                <th className="print:border border-gray-300 px-4 py-2">Category</th>
                <th className="print:border border-gray-300 px-4 py-2">Quantity</th>
                <th className="print:border border-gray-300 px-4 py-2">Price</th>
                <th className="print:border border-gray-300 px-4 py-2">Total</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrder.products.map((product, index) => (
                <tr className="border-b border-gray-200" key={index}>
                  <td className="print:border flex items-center justify-center px-4 py-2">
                    <img src={`http://localhost:5000/uploads/${product.product.image}`} alt={product.product.productname} className="w-10 h-10 object-contain" />
                  </td>
                  <td className="print:border border-gray-300 px-4 py-2">{product.product.productname}</td>
                  <td className="print:border border-gray-300 px-4 py-2">{product.product.brand}</td>
                  <td className="print:border border-gray-300 px-4 py-2">{product.product.category}</td>
                  <td className="print:border border-gray-300 px-4 py-2">{product.quantity}</td>
                  <td className="print:border border-gray-300 px-4 py-2">${product.price}</td>
                  <td className="print:border border-gray-300 px-4 py-2">${product.totalAmount}</td>
                </tr>
              ))}
            </tbody>
          </table>
            </div>
          <div><button onClick={handleSaveSummary}>save summary</button></div>
          <div className=" justify-between mt-6 text-sm print:flex hidden">
            <p>PO Generate by: <br /> Production Officer</p>
            <p>Issued by: <br /> Dispensing/Warehouse Officer</p>
            <p>Received by: <br /> Production Officer</p>
            <p>Checked by: <br /> QA Officer</p>
          </div>
        </div>
        </div>
      )}

    </div>
  );
};

export default LoadSummary;
