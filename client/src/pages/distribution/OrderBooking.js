import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import InputField from "../../components/InputField";
import { useGetInventoryQuery } from "../../redux/features/apiSlices/purchase/purchaseOrderSlice";
import { useDispatch, useSelector } from "react-redux";
import { setInventory } from "../../redux/features/slices/productSlice";
import { FaPlus, FaTrashAlt } from "react-icons/fa";
import { useCreateBookingMutation, useGetBookingsQuery } from "../../redux/features/apiSlices/booking/orderBooking";
import { setBookingOrderLength } from "../../redux/features/slices/bookings";
import { useGetCustomersQuery } from "../../redux/features/apiSlices/setup/customer";
import { setCustomers } from "../../redux/features/slices/setup";

const OrderBooking = () => {
  const dispatch = useDispatch()
  const { bookOrderNo } = useSelector((state) => state.booking)
  const { customers } = useSelector((state) => state.setup)
  const [bono, setBono] = useState(`bono-000`)
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [customer, setCustomer] = useState("");
  const [paymentType, setPaymentType] = useState("");
  const [deliveryCharges, setDeliveryCharges] = useState("");
  const [changeAmount, setChangeAmount] = useState("");
  const [extraCharges, setExtraCharges] = useState("");
  const [selectedProducts, setSelectedProducts] = useState([]);

  const { data: productsData } = useGetInventoryQuery()
  const { data: bookingData } = useGetBookingsQuery()
  const { data: customerData } = useGetCustomersQuery()

  useEffect(() => {
    if (productsData) {
      dispatch(setInventory(productsData))
    }
  }, [dispatch, productsData])
  useEffect(() => {
    if (customerData) {
      dispatch(setCustomers(customerData))
      console.log(customerData);
      
    }
  }, [dispatch, customerData])


  // create new booking
  const [createbooking, { isLoading }] = useCreateBookingMutation()
  let productTotal;
  if (selectedProducts) {
    productTotal = selectedProducts.reduce((sum, inv) => sum + inv.product.costprice * inv.quantity, 0);
  }
  const orderData = {
    customer,
    bono,
    totalQuantity: selectedProducts.length,
    totalAmount: productTotal,
    products: selectedProducts.map((product) => ({
      product: product.product._id.toString(),
      quantity: product.quantity,
      price: product.product.costprice,
      totalAmount: product.product.costprice * product.quantity,
    })),
    netPayableAmount: productTotal,
    paymentType,
    deliveryCharges,
    changeAmount,
    extraCharges,
  };
  const handleCreateBooking = async () => {
    const res = await createbooking(orderData)
    if (res.data.msg) {
      alert(res.data.msg)
    }
    if (res.data.err) {
      alert(res.data.msg)
    }
  }


  const filteredProducts = productsData?.filter((product) =>
    product.product.productname.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const addProductToTable = (product) => {
    const exists = selectedProducts.find((p) => p._id === product._id);
    if (!exists) {
      setSelectedProducts([...selectedProducts, { ...product, quantity: 1 }]);
    }
  };

  const removeProductFromTable = (id) => {
    setSelectedProducts(selectedProducts.filter((product) => product._id !== id));
  };

  const updateQuantity = (id, change) => {
    setSelectedProducts(
      selectedProducts.map((product) =>
        product._id === id
          ? { ...product, quantity: Math.max(1, product.quantity + change) }
          : product
      )
    );
  };

  useEffect(() => {
    if (bookingData) {      
      dispatch(setBookingOrderLength(bookingData.length + 1))
      setBono(`bono-000${bookOrderNo}`)
    }
  }, [dispatch, bookingData,bookOrderNo])



  return (
    <div className="w-full px-4">
      <TopBar />
      <SectionBar sectionHeading="Order Booking" />
      <div className="w-full rounded-md bg-white h-auto px-10 pb-4">
        <h1 className="text-center pt-6 font-semibold mb-4">Order Booking Details</h1>
        <div className="divider w-full h-[1px] bg-gray-300 " />

        <form className='w-full max-w-3xl mx-auto '>
          <div  className='flex md:flex-row w-full items-center flex-col gap-2 md:my-4 '>
            <InputField placeholderText="Date" LabelText="Date:" inputName="date" inputType="date" />
            {/* <input type="text" placeholder="Booking Order No" readOnly value={bookingOrderNo} /> */}
            <div className='flex  flex-col w-full justify-between gap-2  md:my-0 my-2  '>
              <label className="font-semibold" htmlFor="bono">Order No:</label>
              <div className="inputBorder w-full p-2 rounded-md  ">
                <input
                  value={bono}
                  readOnly
                  type="text"
                  placeholder="Booking Order No"
                  className='bg-transparent w-full' />
              </div>
            </div>
           
            
          </div>
          <div  className='flex  w-full  flex-col gap-2 md:my-4 '>
              <label className="font-semibold" htmlFor="bono">Customer:</label>
             
            <div className="inputBorder w-full p-2 rounded-md  ">
            <select className="w-full" onChange={(e) => setCustomer(e.target.value)} name="customer" id="customer">
              <option value="">Select customer</option>
              {customers?.map((c)=>{
                return(
                  <option key={c._id} value={c.name}>{c.name}</option>
                )
              })}
              {/* <option value="Bilal">Bilal</option>
              <option value="Ahmed">Ahmed</option> */}
            </select>
              </div>
            </div>
            <button
              onClick={(e) => {
                e.preventDefault();
                setIsModalOpen(true);
              }}
              type="button"
              className="disButton"
            >
              View Products
            </button>
         
        </form>

        <div className="w-full bg-white shadow-md mt-4 rounded-md p-4 mb-2">
          <table className="w-full min-w-full rounded-md ">
            <thead className="bg-gray-100 text-gray-800">
              <tr>
                <th className="py-3 text-xs px-4">Product</th>
                <th className="py-3 text-xs px-4">Product Name</th>
                <th className="py-3 text-xs px-4">Quantity</th>
                <th className="py-3 text-xs px-4">Sale Price</th>
                <th className="py-3 text-xs px-4">Total Amount</th>
                <th className="py-3 text-xs px-4">Action</th>
              </tr>
            </thead>
            <tbody>
              {selectedProducts.map((product) => (
                <tr key={product._id} className="border-b border-gray-300">
                  <td className="py-3 text-xs px-4 text-center">Image</td>
                  <td className="py-3 text-xs px-4 text-center">{product.product.productname}</td>
                  <td className="py-3 text-xs px-4 text-center flex items-center justify-center">
                    <button onClick={() => updateQuantity(product._id, -1)} className="px-2 py-1 bg-gray-300 rounded">-</button>
                    <span className="mx-2">{product.quantity}</span>
                    <button onClick={() => updateQuantity(product._id, 1)} className="px-2 py-1 bg-gray-300 rounded">+</button>
                  </td>
                  <td className="py-3 text-xs px-4 text-center">Rs {product.product.costprice}</td>
                  <td className="py-3 text-xs px-4 text-center">Rs {product.product.costprice * product.quantity}</td>
                  <td className="py-3 text-xs px-4 text-center">
                    <button className=" px-2 py-1 text-red-500 rounded-md" onClick={() => removeProductFromTable(product._id)}>
                      <FaTrashAlt size={20} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex flex-col items-end justify-end w-full  mx-auto gap-y-4 gap-4 pt-2 ">
          <div className="bg-white border-2 border-lightprimary rounded-full max-w-xl w-full px-4 py-2  flex items-end justify-between">
            <h3>Product Quantity</h3>
            <span>{selectedProducts?.length}</span>
          </div>
          <div className="bg-white border-2 border-lightprimary rounded-full max-w-xl w-full px-4 py-2 flex items-center justify-between">
            <h3>Net Payable Amount Rs:</h3>
            <span>Rs: {productTotal}</span>
          </div>
          <div className="bg-white border-2 border-lightprimary rounded-full max-w-xl w-full px-4 py-2 flex items-center justify-between">
            <h3>Total Amount Rs:</h3>
            <span>Rs: {productTotal}</span>
          </div>
          <div className="bg-white border-2 border-lightprimary rounded-full max-w-xl w-full px-4 py-2 flex items-center justify-between">
            <select className="w-full" onChange={(e) => setPaymentType(e.target.value)} name="paymentType" id="">
              <option value="">select payment type</option>
              <option value="cash">Cash</option>
              <option value="card">Card</option>
            </select>
          </div>
          <div className="bg-white border-2 border-lightprimary rounded-full max-w-xl w-full px-4 py-2 flex items-center justify-between">
            <input className="w-full" type="number" value={deliveryCharges} onChange={(e) => setDeliveryCharges(e.target.value)} name="deliverycharges" placeholder="Enter Delivery Charges" />
          </div>
          <div className="bg-white border-2 border-lightprimary rounded-full max-w-xl w-full px-4 py-2 flex items-center justify-between">
            <input className="w-full" type="number" value={changeAmount} onChange={(e) => setChangeAmount(e.target.value)} name="changeamount" placeholder="Change Amount" />
          </div>
          <div className="bg-white border-2 border-lightprimary rounded-full max-w-xl w-full px-4 py-2 flex items-center justify-between">
            <input className="w-full" type="number" value={extraCharges} onChange={(e) => setExtraCharges(e.target.value)} name="extracharges" placeholder="Extra Charges" />
          </div>
          <div className="flex  gap-4">
            <button onClick={handleCreateBooking} className="disButton">
              {isLoading ? "processing" : "Add New"}
            </button>
            <button className="disButton">Save Sale</button>
          </div>
        </div>


        {isModalOpen && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-[90%] max-w-lg">
              <h2 className="text-xl font-semibold mb-4">Select Products</h2>
              <input type="text" placeholder="Search products..." className="w-full p-2 bg-lightsecondary rounded-md mb-4" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
              <ul className="max-h-60 overflow-y-auto">
                {filteredProducts.map((product) => (
                  <li key={product._id} className="py-2 border-b flex justify-between items-center">
                    <span>{product.product.productname} - Rs {product.product.costprice}</span>
                    <button className="bg-lightprimary text-white px-2 py-1 rounded-md" onClick={() => addProductToTable(product)}>
                      <FaPlus size={15} />
                    </button>
                  </li>
                ))}
              </ul>
              <div className="flex justify-end mt-4">
                <button className="bg-red-500 text-white px-4 py-2 rounded-md" onClick={() => setIsModalOpen(false)}>
                  Close
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default OrderBooking;
