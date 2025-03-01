import React, { useRef } from "react";

const PaymentVoucher = ({purchaseOrderNo}) => {
  const componentRef = useRef();

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      ref={componentRef}
      className="w-full bg-white z-20 p-8 rounded-md shadow-lg border border-gray-200 print:shadow-none print:border print:fixed print:top-0 print:left-0 print:right-0 print:mx-auto "
    >
      <div className="w-full h-full max-w-[700px] mx-auto print:pb-20">
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
                <p>Voucher Number <br /></p>
                <p>Puchase Order Number  <br /></p>
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
          <p><strong>Name:</strong> Shahzaib</p>
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
          <li>Total Amount Rs- <strong> 10000 </strong></li>
          <li>Amount Paid Rs- <strong> 5000 </strong></li>
          <li>Remaining Amount Rs- <strong> 5000 </strong></li>
          <li>Transaction Date: <strong> Date </strong></li>
          <li>Transaction ID: <strong> 212474642429874 </strong></li>
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
  );
};

export default PaymentVoucher;
