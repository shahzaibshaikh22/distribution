import React,{useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField";
import { useAddVendorMutation } from "../../redux/features/apiSlices/setup/vendor";



const Vendor = () => {
  const { modes } = useSelector((state)=>state.mode);

  const [data, setData] = useState({
    name:"",
    phone:"",
    email:"",
    address:"",
    mobile:"",
    fax:"",
    gst:"",
    ntn:"",
    contactperson:"",
    designation:"",
    openingbalance:0
  });

  const handleChange = (e)=>{
    setData({...data,[e.target.name]:e.target.value})
  }

// product type submition
const [addVendor, {isLoading}] = useAddVendorMutation()

const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const res = await addVendor(data)
    setData({
        name:"",
        phone:"",
        email:"",
        address:"",
        mobile:"",
        fax:"",
        gst:"",
        ntn:"",
        contactperson:"",
        designation:"",
        openingbalance:0
      })
    
    if(res){
        if(res.data.err){
            alert(res.data.err)
        }else if(res.data.msg){
            alert(res.data.msg)
        }
    }    
}

    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Vendor" secRedirect="/vendor" view="/vendor-view" />
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Vendor</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>

                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

                <div className={`w-full Container h-auto md:mb-0 mb-4  px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Vendor Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className=' py-4'>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            {/* product type  */}
                            <InputField
                                value={data.name}
                                onChangeFunction={handleChange}
                                placeholderText="vendor name"
                                LabelText="Vendor Name"
                                inputName="name"
                                inputType="text" />
                            <InputField
                                value={data.address}
                                onChangeFunction={handleChange}
                                placeholderText="vendor address"
                                LabelText="Vendor Address"
                                inputName="address"
                                inputType="text" />
                            {/* product type  */}
                        </div>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            {/* product type  */}
                            <InputField
                                value={data.phone}
                                onChangeFunction={handleChange}
                                placeholderText="vendor phone"
                                LabelText="Vendor Phone:"
                                inputName="phone"
                                inputType="text" />
                            <InputField
                                value={data.mobile}
                                onChangeFunction={handleChange}
                                placeholderText="Mobile"
                                LabelText="Mobile:"
                                inputName="mobile"
                                inputType="text" />
                            {/* product type  */}
                        </div>
                        <div className='flex md:flex-row w-full   flex-col md:gap-20  md:my-4 '>
                            {/* product type  */}
                            <InputField
                                value={data.gst}
                                onChangeFunction={handleChange}
                                placeholderText="Gst No"
                                LabelText="Gst NO:"
                                inputName="gst"
                                inputType="text" />
                            <InputField
                                value={data.fax}
                                onChangeFunction={handleChange}
                                placeholderText="Fax No"
                                LabelText="Fax NO:"
                                inputName="fax"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full   flex-col md:gap-20  md:my-4 '>
                            {/* product type  */}
                            <InputField
                                value={data.ntn}
                                onChangeFunction={handleChange}
                                placeholderText="Ntn No"
                                LabelText="Ntn NO:"
                                inputName="ntn"
                                inputType="text" />
                            <InputField
                                value={data.contactperson}
                                onChangeFunction={handleChange}
                                placeholderText="Contact Person"
                                LabelText="Contact Person:"
                                inputName="contactperson"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full   flex-col md:gap-20  md:my-4 '>
                            {/* product type  */}
                            <InputField
                                value={data.designation}
                                onChangeFunction={handleChange}
                                placeholderText="Designation"
                                LabelText="Designation:"
                                inputName="designation"
                                inputType="text" />
                            <InputField
                                value={data.email}
                                onChangeFunction={handleChange}
                                placeholderText="Email"
                                LabelText="Email:"
                                inputName="email"
                                inputType="email" />
                        </div>
                        <div className='flex md:flex-row w-full   flex-col md:gap-20  md:my-4 '>
                            {/* product type  */}
                            <InputField
                                value={data.openingbalance}
                                onChangeFunction={handleChange}
                                placeholderText="Opening Balance"
                                LabelText="Opening Balance:"
                                inputName="openingbalance"
                                inputType="number" />
                              <div className='flex md:flex-row flex-col w-full justify-between  md:my-0 my-2  md:gap-20'>
                                <label className="font-semibold"  htmlFor="code">Code</label>
                                <div className="inputBorder w-full p-2 rounded-md max-w-xs ">
                                <input
                                placeholder="0"
                                readOnly
                                className='bg-transparent w-full'/>
                                </div>
                                </div>
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-20  w-full md:max-w-[50%] my-4  md:items-center md:justify-center '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>{isLoading ? "Processing" : "Add New"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Vendor;
