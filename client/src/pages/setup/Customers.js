import React,{useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import InputField from "../../components/InputField";
import { useCreateCustomerMutation } from "../../redux/features/apiSlices/setup/customer";



const Customers = () => {

    const [username, setUsername] = useState("")
    const [address, setAddress] = useState("")
    const [phone, setPhone] = useState("")
    const [nten, setNten] = useState("")

    const data = {
        username,
        address,
        phone,
        nten
    }
    const [createcustomer, {isLoading}] = useCreateCustomerMutation()

    const handleCreateCustomer = async (e) =>{
        e.preventDefault()
        const res = await createcustomer(data)
        if(res.data.msg){
            alert(res.data.msg)
        }
    }

    

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
                    <form onSubmit={handleCreateCustomer} className=' py-4'>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            <InputField
                                value={username}
                                onChangeFunction={(e)=>setUsername(e.target.value)}
                                placeholderText="username"
                                LabelText="Username:"
                                inputName="username"
                                inputType="text" />
                            <InputField
                                value={address}
                                onChangeFunction={(e)=>setAddress(e.target.value)}
                                placeholderText="address"
                                LabelText="Address:"
                                inputName="address"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            <InputField
                                value={phone}
                                onChangeFunction={(e)=>setPhone(e.target.value)}
                                placeholderText="phone"
                                LabelText="Phone:"
                                inputName="phone"
                                inputType="number" />
                            <InputField
                                value={nten}
                                onChangeFunction={(e)=>setNten(e.target.value)}
                                placeholderText="nten"
                                LabelText="NTEN:"
                                inputName="nten"
                                inputType="text" />
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-20  w-full md:max-w-[50%] my-4  md:items-center md:justify-center '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>
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
