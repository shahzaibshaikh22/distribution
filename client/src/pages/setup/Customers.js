import React,{useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import InputField from "../../components/InputField";



const Customers = () => {

    const [username, setUsername] = useState("")

    

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
                    <form  className=' py-4'>
                        <div className='flex md:flex-row w-full md:max-w-[45%] flex-col md:gap-20  md:my-4 '>
                            {/* product type  */}
                            <InputField
                                value={username}
                                onChangeFunction={(e)=>setUsername(e.target.value)}
                                placeholderText="username"
                                LabelText="username"
                                inputName="username"
                                inputType="text" />
                            {/* product type  */}
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-20  w-full md:max-w-[47%] my-4  md:items-center md:justify-center '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>New </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Customers;
