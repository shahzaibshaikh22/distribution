import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import {setPattyCategory, } from "../../redux/features/slices/setup"
import { useCreateJournalPaymentMutation } from "../../redux/features/apiSlices/payment/journalpayment"
import { useGetPattyCategoryQuery } from "../../redux/features/apiSlices/setup/pattyexpencecategory"
import { useCreatePattyPaymentMutation } from "../../redux/features/apiSlices/payment/pattypayment";



const PattyPayment = () => {
  const { modes } = useSelector((state)=>state.mode);
  const { pattyExpenceCategory } = useSelector((state)=>state.setup);
  const dispatch = useDispatch()

  const {data:pattyCatyData} = useGetPattyCategoryQuery();

  const [data, setData] = useState({
    category:"",
    amount:"",
    account:"",
    description:"",
  });
  const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }

// product type submition
const [createPayment, {isLoading}] = useCreatePattyPaymentMutation()

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
            category:"",
            amount:"",
            account:"",
            description:"",
          }
    )
}

useEffect(()=>{
    if(pattyCatyData){
        dispatch(setPattyCategory(pattyCatyData))        
    }
  },[dispatch,pattyCatyData])

    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Journal Payments"   secRedirect="/journal-payment" view="/journal-payment-view" />
                {/* form section */}

                <div className={`w-full Container rounded-md h-auto md:mb-0 mb-4  px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Journal Payments Details</h1>
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
                                <label className="font-semibold"  htmlFor="category">category</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                <select className="w-full" name="category" onChange={handleChange} id="category">
                                    <option value="">select category</option>
                                    {pattyExpenceCategory?.map((cate)=>{
                                        return(
                                            <option key={cate._id} value={cate.category}>{cate.category}</option>
                                        )
                                    })}
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

export default PattyPayment;
