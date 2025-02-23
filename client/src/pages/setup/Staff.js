import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import {  useAddStaffMutation, useGetStaffCategoryQuery, useGetStaffQuery } from "../../redux/features/apiSlices/setup/staffCategory";
import {setStaffCaty, setStaff } from "../../redux/features/slices/setup"



const Staff = () => {
  const { modes } = useSelector((state)=>state.mode);
  const { staffCategories } = useSelector((state)=>state.setup);
  const dispatch = useDispatch()

  const {data:staffCatyData} = useGetStaffCategoryQuery();



  const [data, setData] = useState({
    name:"",
    address:"",
    email:"",
    category:"",
    phone:"",
    mobile:"",
    openingbalance:0,
    nic:"",
  });
  const handleChange = (e)=>{
    setData({...data, [e.target.name]:e.target.value})
  }

// product type submition
const [addStaff, {isLoading}] = useAddStaffMutation()

const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const res = await addStaff(data)
  
    
    if(res){
        if(res.data.err){
            alert(res.data.err)
        }else if(res.data.msg){
            alert(res.data.msg)
        }
    }

    
}

const handleReset = ()=>{
    setData(
        {
            name:"",
            address:"",
            email:"",
            category:"",
            phone:"",
            mobile:"",
            openingbalance:0,
            nic:"",
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
                <SectionBar sectionHeading="Staff" />
                {/* form section */}

                <div className={`w-full Container rounded-md h-auto md:mb-0 mb-4  px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>staff Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className=' py-4'>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            <InputField
                                value={data.name}
                                onChangeFunction={handleChange}
                                placeholderText="Name"
                                LabelText="Name:"
                                inputName="name"
                                inputType="text" />
                            <InputField
                                value={data.address}
                                onChangeFunction={handleChange}
                                placeholderText="Address"
                                LabelText="Address:"
                                inputName="address"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            <InputField
                                value={data.email}
                                onChangeFunction={handleChange}
                                placeholderText="Email"
                                LabelText="Email:"
                                inputName="email"
                                inputType="email" />
                            <InputField
                                value={data.phone}
                                onChangeFunction={handleChange}
                                placeholderText="Phone"
                                LabelText="Phone:"
                                inputName="phone"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            <InputField
                                value={data.mobile}
                                onChangeFunction={handleChange}
                                placeholderText="Mobile"
                                LabelText="Mobile:"
                                inputName="mobile"
                                inputType="text" />
                            <InputField
                                value={data.nic}
                                onChangeFunction={handleChange}
                                placeholderText="NIC"
                                LabelText="NIC:"
                                inputName="nic"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            <InputField
                                value={data.openingbalance}
                                onChangeFunction={handleChange}
                                placeholderText="Opening Balance"
                                LabelText="Opening Balance:"
                                inputName="openingbalance"
                                inputType="number" />
                            <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold"  htmlFor="category">Category</label>
                                <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                                <select className="w-full" name="category" onChange={handleChange} id="category">
                                    <option value="">select Category</option>
                                    {staffCategories?.map((cat)=>{
                                        return(
                                            <option key={cat._id} value={cat.category}>{cat.category}</option>
                                        )
                                    })}
                                </select>
                                </div>
                                </div>
                        </div>
                        <div className='flex items-center justify-end w-full my-4 '>
                            <div />
                            <button type="submit" className='bg-blue-700 px-10 py-2 rounded-full text-white'>{isLoading ? "Adding..." : "Add"}</button>
                            <button onClick={handleReset} type="button" className='bg-blue-700 md:ml-4 ml-0 px-10 py-2 rounded-full text-white'>Add New</button>
                        </div>
                    </form>
                </div>
               
            </div>
            
        </div>
    );
};

export default Staff;
