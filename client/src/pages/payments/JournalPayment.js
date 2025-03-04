import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import {  useAddStaffMutation, useGetStaffCategoryQuery } from "../../redux/features/apiSlices/setup/staffCategory";
import {setStaffCaty } from "../../redux/features/slices/setup"
import { useCreateJournalPaymentMutation } from "../../redux/features/apiSlices/payment/journalpayment"



const JournalPayment = () => {
  const { modes } = useSelector((state)=>state.mode);
  const { staffCategories } = useSelector((state)=>state.setup);
  const dispatch = useDispatch()

  const {data:staffCatyData} = useGetStaffCategoryQuery();

  const [data, setData] = useState({
    paymentType:"",
    amount:"",
    account:"",
    description:"",
  });
  const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }

// product type submition
const [createPayment, {isLoading}] = useCreateJournalPaymentMutation()

const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await createPayment(data).unwrap()
    if(res.msg){
       alert(res.msg)
    }
}

const handleReset = ()=>{
    setData(
        {
            paymentType:"",
            amount:"",
            account:"",
            description:"",
          }
    )
}

useEffect(()=>{
    if(staffCatyData){
        dispatch(setStaffCaty(staffCatyData.category))        
    }
  },[dispatch,staffCatyData])

    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Staff"  secRedirect="/add-staff" view="/vendor-view" />
                {/* form section */}

                <div className={`w-full Container rounded-md h-auto md:mb-0 mb-4  px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>staff Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className='py-4 w-full max-w-3xl mx-auto'>
                        <div className='flex items-center md:flex-row flex-col gap-4 my-2 '>
                            <InputField
                                value={data.amount}
                                onChangeFunction={handleChange}
                                placeholderText="Amount"
                                LabelText="Amount:"
                                inputName="amount"
                                inputType="number" />
                            <InputField
                                value={data.description}
                                onChangeFunction={handleChange}
                                placeholderText="description"
                                LabelText="description:"
                                inputName="description"
                                inputType="text" />
                        </div>
                        <div className='flex items-center md:flex-row flex-col gap-4 my-2 '>
                        
                            <div className='flex flex-col w-full gap-2'>
                                <label className="font-semibold"  htmlFor="account">Account</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                <select className="w-full" name="account" onChange={handleChange} id="account">
                                    <option value="">select account</option>
                                    <option value="hand in cash">hand in cash</option>
                                    <option value="account 1">account 1</option>
                                    
                                </select>
                                </div>
                                </div>
                                <div className='flex flex-col w-full gap-2'>
                                <label className="font-semibold"  htmlFor="paymentType">paymentType</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                <select className="w-full" name="paymentType" onChange={handleChange} id="paymentType">
                                    <option value="">select payment type</option>
                                    <option value="hand in cash">select payment type</option>
                                    <option value="credit">credit</option>
                                    <option value="debit">debit</option>
                                </select>
                                </div>
                                </div>
                        </div>
                        <div className='flex items-center md:flex-row flex-colmy-2'>
                            <div />
                            <button type="submit" className='disButton'>{isLoading ? "Adding..." : "Add"}</button>
                            <button onClick={handleReset} type="button" className='disButton ml-2'>Add New</button>
                        </div>
                    </form>
                </div>
               
            </div>
            
        </div>
    );
};

export default JournalPayment;
