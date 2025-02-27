import React, { useEffect, useState } from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import InputField from "../../components/InputField";
import { useCreateCustomerMutation, useGetCustomersCategoryQuery, useGetCustomersQuery } from "../../redux/features/apiSlices/setup/customer";
import { useGetTownsQuery } from "../../redux/features/apiSlices/setup/town";
import { useGetZonesQuery } from "../../redux/features/apiSlices/setup/zone";
import { useGetSalemansQuery } from "../../redux/features/apiSlices/setup/saleman";
import { useGetBrandsQuery } from "../../redux/features/apiSlices/product/brandSlice";
import { useDispatch, useSelector } from "react-redux";
import { setBrands } from "../../redux/features/slices/productSlice";
import { setCustomerCaty, setCustomers, setSalemans, setTowns, setZones } from "../../redux/features/slices/setup";



const Customers = () => {
    const dispatch = useDispatch()
    const { brands } = useSelector((state)=>state.product)
    const { towns,zones,customerCategories,salemans,customers } = useSelector((state)=>state.setup)

    const {data:townData} = useGetTownsQuery();
    const {data:zoneData} = useGetZonesQuery();
    const {data:salesmanData} = useGetSalemansQuery();
    const {data:customercategoryData} = useGetCustomersCategoryQuery();
    const {data:brandData} = useGetBrandsQuery();
    const {data:customersData} = useGetCustomersQuery();

 



    const [data, setData] = useState({
        name:"",
        address:"",
        town:"",
        zone:"",
        salesman:"",
        productcompany:"",
        customercategory:"",
        phone:"",
        mobile:"",
        email:"",
        gst:"",
        ntn:"",
        designation:"",
        contactperson:"",
        openingbalance:0,
        ratetype:"",
    })
    const handleChange = (e)=>{
        setData({...data,[e.target.name]: e.target.value})
    }

    const [createcustomer, { isLoading }] = useCreateCustomerMutation()
    const handleCreateCustomer = async (e) => {
        e.preventDefault();

        try {
            const res = await createcustomer(data);
            if (res.data.msg) {
                alert(res.data.msg)
            }
          

        } catch (error) {
            alert("Failed to create customer. Please try again!");
        }
    };

    useEffect(()=>{
        if(townData){
            dispatch(setTowns(townData))
        }
    },[dispatch,townData])

    useEffect(()=>{
        if(zoneData){
            dispatch(setZones(zoneData))
        }
    },[dispatch,zoneData])

    useEffect(()=>{
        if(customercategoryData){
            dispatch(setCustomerCaty(customercategoryData))
        }
    },[dispatch,customercategoryData])
    useEffect(()=>{
        if(salesmanData){
            dispatch(setSalemans(salesmanData))
            
        }
    },[dispatch,salesmanData])

    useEffect(()=>{
        if(brandData){
            dispatch(setBrands(brandData.brands))
        }
    },[dispatch,brandData])
    useEffect(()=>{
        if(customersData){
            dispatch(setCustomers(customersData))
        }
    },[dispatch,customersData])


    return (
        <div className="w-full flex px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Customers" />
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl  h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Customers</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>

                    <div className={` w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

                <div className={`w-full Container h-auto md:mb-0 mb-4  px-10 `}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Customers Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleCreateCustomer} className='w-full max-w-3xl mx-auto'>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                            <InputField
                                value={data.name}
                                onChangeFunction={handleChange}
                                placeholderText="Customer Name"
                                LabelText="Customer Name:"
                                inputName="name"
                                inputType="text" />
                            <InputField
                                value={data.address}
                                onChangeFunction={handleChange}
                                placeholderText="address"
                                LabelText="Address:"
                                inputName="address"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                            <InputField
                                value={data.phone}
                                onChangeFunction={handleChange}
                                placeholderText="phone"
                                LabelText="Phone:"
                                inputName="phone"
                                inputType="text" />
                            <InputField
                                value={data.mobile}
                                onChangeFunction={handleChange}
                                placeholderText="Mobile"
                                LabelText="Mobile:"
                                inputName="mobile"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                            <InputField
                                value={data.ntn}
                                onChangeFunction={handleChange}
                                placeholderText="NTN NO"
                                LabelText="NTN NO:"
                                inputName="ntn"
                                inputType="text" />
                            <InputField
                                value={data.gst}
                                onChangeFunction={handleChange}
                                placeholderText="GST NO"
                                LabelText="GST NO:"
                                inputName="gst"
                                inputType="text" />
                        </div>   
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                        <InputField
                                value={data.contactperson}
                                onChangeFunction={handleChange}
                                placeholderText="contact person"
                                LabelText="Contact person:"
                                inputName="contactperson"
                                inputType="text" />
                            <InputField
                                value={data.designation}
                                onChangeFunction={handleChange}
                                placeholderText="Designation"
                                LabelText="Designation:"
                                inputName="designation"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                        <InputField
                                value={data.email}
                                onChangeFunction={handleChange}
                                placeholderText="email"
                                LabelText="email:"
                                inputName="email"
                                inputType="email" />
                            <InputField
                                value={data.openingbalance}
                                onChangeFunction={handleChange}
                                placeholderText="openingbalance"
                                LabelText="openingbalance:"
                                inputName="openingbalance"
                                inputType="number" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="town">Town</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="town" id="town">
                                        <option value="">select town</option>
                                        {towns?.map((t)=>{
                                        return(
                                            <option key={t._id} value={t.townname}>{t.townname}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="town">Zone</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="zone" id="zone">
                                        <option value="">select zone</option>
                                        {zones?.map((z)=>{
                                        return(
                                            <option key={z._id} value={z.zonename}>{z.zonename}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="customercategory">Customer Category</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="customercategory" id="customercategory">
                                        <option value="">select Customer Category</option>
                                        {customerCategories?.map((c)=>{
                                        return(
                                            <option key={c._id} value={c.category}>{c.category}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="productcompany">Brand</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="productcompany" id="productcompany">
                                        <option value="">select brand</option>
                                       {brands?.map((b)=>{
                                        return(
                                            <option key={b._id} value={b.brand}>{b.brand}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="salesman">salesman</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="salesman" id="salesman">
                                        <option value="">select Customer Category</option>
                                        {salemans?.map((s)=>{
                                        return(
                                            <option key={s._id} value={s.saleman}>{s.saleman}</option>
                                        )
                                       })}
                                    </select>
                                </div>
                            </div>
                            <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="code">Code</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <input
                                    placeholder={customers?.length + 1}
                                    readOnly
                                    className='bg-transparent w-full'/>
                                    </div>
                            </div>
                        </div>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4'>
                        <div className='flex flex-col w-full justify-between gap-2 my-2 '>
                                <label className="font-semibold"  htmlFor="ratetype">Rate Type</label>
                                <div className="inputBorder w-full p-2 rounded-md  ">
                                    <select onChange={handleChange} className="w-full" name="ratetype" id="ratetype">
                                        <option value="">select rate type</option>
                                        <option value="retail">retail</option>
                                        <option value="net rate">net rate</option>
                                        <option value="trade price">trade price</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                        
                        <div className='flex items-center md:flex-row flex-col my-2 '>
                            <div />
                            <button type="submit" className='disButton'>
                                {isLoading ? "processing" : 'Add New'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Customers;
