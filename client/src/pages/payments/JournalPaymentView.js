import React, { useEffect, useState,useRef } from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import { useDeleteCustomerCategoryMutation, useGetCustomersCategoryQuery, useUpdateCustomerCategoryMutation } from "../../redux/features/apiSlices/setup/customer";
import { setJournalPayments } from "../../redux/features/slices/payment";
import { FaTrashAlt, FaPencilAlt } from "react-icons/fa";
import InputField from "../../components/InputField";
import { useGetJournalPaymentQuery } from "../../redux/features/apiSlices/payment/journalpayment";



const HournalPaymentView = () => {
    const { journalPayments } = useSelector((state) => state.payment);
    const [updateCustomerCat] = useUpdateCustomerCategoryMutation()
    const componentRef = useRef();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedPayment, setSelectedPayment] = useState(null);
    const [category, setCategory] = useState("");
    const [code, setCode] = useState("");

    const dispatch = useDispatch()

    // product type submition
    const { data: journalpaymentData, refetch } = useGetJournalPaymentQuery()
    const [dltCusCat] = useDeleteCustomerCategoryMutation()


    // const handleDelete = async (id)=>{

    //     const res = await dltCusCat(id)
    //     if(res.data.msg){
    //         alert(res.data.msg)
    //         refetch()
    //     }
    // }

    useEffect(() => {
        if (journalpaymentData) {
            dispatch(setJournalPayments(journalpaymentData))

        }
    }, [dispatch, journalpaymentData, refetch])

    const handleSelectedPayment = (payment)=>{
        setSelectedPayment(payment)
        setIsModalOpen(true)
    }
    const handlePrint = () => {
        window.print();
      };

    //   const handleEdit = (category) => {
    //     setSelectedCategory(category);
    //     setCategory(category.category);
    //     setCode(category.code);
    //     setIsModalOpen(true);

    //   };
    //   const handleUpdate = async () => {
    //     if (selectedCategory) {
    //       await updateCustomerCat({ id: selectedCategory._id.toString(), category });
    //       setIsModalOpen(false);
    //       refetch()
    //     }
    //   };


    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Journal Payments" />
                {/* form section */}
                <div className="w-full my-4 rounded-md p-6 bg-white text-gray-800">
                    <table className="w-full text-sm ">
                        <thead className="text-left">
                            <tr className="bg-gray-100 print:bg-gray-100">
                                <th className="print:border border-gray-300 px-4 py-2">#Serial No</th>
                                <th className="print:border border-gray-300 px-4 py-2">Payment Type</th>
                                <th className="print:border border-gray-300 px-4 py-2">Amount</th>
                                <th className="print:border border-gray-300 px-4 py-2">Voucher No</th>
                                <th className="print:border border-gray-300 px-4 py-2">Date</th>
                                <th className="print:border border-gray-300 px-4 py-2">Invoice</th>

                            </tr>
                        </thead>
                        <tbody>
                            {journalPayments?.map((payment) => {
                                return (
                                    <tr key={payment._id} className="border-b border-gray-200  hover:bg-lightprimary">
                                        <td className="print:border border-gray-300 px-4 py-2">{payment.voucherno}</td>
                                        <td className="print:border border-gray-300 px-4 py-2">{payment.paymentType}</td>
                                        <td className="print:border border-gray-300 px-4 py-2">{payment.amount}</td>
                                        <td className="print:border border-gray-300 px-4 py-2">{payment.voucherno}</td>
                                        <td className="print:border border-gray-300 px-4 py-2">{new Date(payment.createdAt).toLocaleString()}</td>
                                        <td className="py-3 text-xs px-4 col-span-1">
                                            <span
                                                onClick={() => handleSelectedPayment(payment)}
                                                className="px-4 py-2 bg-blue-700 cursor-pointer text-white rounded-md"
                                            >
                                                view
                                            </span>
                                        </td>
                                        {/* <td className=" flex items-center gap-2 px-4 py-2">
                                    <button onClick={() => handleDelete(cat._id.toString())} className="text-white bg-red-600 px-3 py-2 text-xs rounded-md">
                                    <FaTrashAlt />
                                    </button>
                                    <button onClick={() => handleEdit(cat)} className="text-white bg-blue-600 px-3 py-2 text-xs rounded-md">
                                    <FaPencilAlt />
                                    </button>
                                  </td> */}

                                    </tr>
                                )
                            })}
                        </tbody>
                    </table>
                </div>

                {/* {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white flex flex-col  items-center gap-2 p-6 rounded-md shadow-md md:w-[40%] w-[80%] text-black">
              <h2 className="text-lg font-bold mb-4">Edit Town</h2>
             <InputField
              value={category}
              onChangeFunction={(e)=>setCategory(e.target.value)}
              placeholderText="Category"
              LabelText="Category:"
              inputName="category"
              inputType="text"
             />
             <InputField
                    placeholderText="code"
                  value={code}
                  readOnly
                  onChangeFunction={(e)=>e.target.value}
                  LabelText="Code:"
                  inputName="address"
                  inputType="text"
             />
              <div className="flex justify-end gap-2">
                <button className="bg-gray-400 px-4 py-2 rounded" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button className="bg-blue-600 text-white px-4 py-2 rounded" onClick={handleUpdate}>Update</button>
              </div>
            </div>
          </div>
        )} */}
            </div>
            {isModalOpen &&(
           <div
           ref={componentRef}
           className="w-full text-black  h-screen print:bg-white bg-gray-50 z-20 p-8 rounded-md shadow-lg border border-gray-200 print:shadow-none print:border fixed top-0 left-0 right-0 mx-auto "
         >
          
           <div className="w-full h-full max-w-[700px] mx-auto print:pb-20">
           <span className="float-right font-bold text-xl text-black cursor-pointer print:hidden" onClick={()=>setIsModalOpen(false)}>x</span>
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
                   <h3 className="text-lg font-semibold">Journal Voucher</h3>
                 </div>
     
                 {/* Process Order Details */}
                 <div className="flex justify-between my-4">
                   <div>
                     <p>Voucher Number <strong>{selectedPayment.voucherno}</strong> <br /></p>
                     {/* <p>Puchase Order Number <strong>{selectedPayment.bono} </strong> <br /></p> */}
                   </div>
                   <div className="text-right">
                     <p>Payment Released Date <br /> {new Date().toLocaleDateString()}</p>
                   </div>
                 </div>
               </div>
     
               <hr className="my-4 print:block hidden"/>
               {/* print header */}
           
           {/* Payment To */}
           <table className="w-full text-left text-black">
             <thead>
                <tr className="bg-gray-100">
                    <th  className="py-3 text-xs px-4">Account</th>
                    <th  className="py-3 text-xs px-4">Payment Type</th>
                    <th  className="py-3 text-xs px-4">Amount</th>
                    <th  className="py-3 text-xs px-4">Voucher No</th>
                    <th  className="py-3 text-xs px-4">Date</th>
                </tr>
             </thead>
             <tbody>
                <tr className="border-b p-1">
                    <td className="py-3 text-xs px-4">{selectedPayment.account}</td>
                    <td className="py-3 text-xs px-4">{selectedPayment.paymentType}</td>
                    <td className="py-3 text-xs px-4">{selectedPayment.amount}</td>
                    <td className="py-3 text-xs px-4">{selectedPayment.voucherno}</td>
                    <td className="py-3 text-xs px-4">{new Date(selectedPayment.createdAt).toLocaleString()}</td>
                </tr>
             </tbody>
           </table>
           
           {/* Payment Details */}
           {/* <div className="mb-6">
             <h4 className="font-semibold text-lg text-gray-800 mb-2">Payment Method:</h4>
             <ul className="list-none space-y-1">
               <li>Payment Type: <strong> Credit </strong></li>
               <li>Total Amount Rs- <strong> {voucher.totalamount} </strong></li>
               <li>Recieved Amount Rs- <strong> {voucher.recieveamount} </strong></li>
               <li>Remaining Amount Rs- <strong>{voucher.remainingamount}  </strong></li>
               <li>Transaction Date: <strong> {new Date(voucher.createdAt).toLocaleString()} </strong></li>
               <li>Transaction ID: <strong> {voucher._id} </strong></li>
             </ul>
           </div> */}
           
           {/* Customer Service */}
           <p className="text-sm  mt-4">
             If you have any questions regarding this payment, please contact our customer service, <strong>03155484511</strong>.
           </p>
           
           {/* Signature */}
           <div className="mt-6 border-t pt-4 text-right">
             <p className="italic">Signature</p>
             <p className="font-semibold mt-2">Authorized Person</p>
             <p className="text-sm ">Authorized Signatory</p>
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

export default HournalPaymentView;
