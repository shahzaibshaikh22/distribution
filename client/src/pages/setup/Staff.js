import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import {  useAddStaffMutation, useGetStaffCategoryQuery } from "../../redux/features/apiSlices/setup/staffCategory";
import {setStaffCaty } from "../../redux/features/slices/setup"



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
                        <div className='flex items-center md:flex-row flex-col gap-4 my-2 '>
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
                        <div className='flex items-center md:flex-row flex-col gap-4 my-2 '>
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
                        <div className='flex items-center md:flex-row flex-col gap-4 my-2 '>
                            <InputField
                                value={data.openingbalance}
                                onChangeFunction={handleChange}
                                placeholderText="Opening Balance"
                                LabelText="Opening Balance:"
                                inputName="openingbalance"
                                inputType="number" />
                            <div className='flex flex-col w-full gap-2'>
                                <label className="font-semibold"  htmlFor="category">Category</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
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

export default Staff;
