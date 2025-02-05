import React from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useSelector } from "react-redux";




const Purchase = () => {
    const { modes } = useSelector((state) => state.mode);
  

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Purchase" />
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Brands</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>
                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

                <div className={`w-full Container h-auto  mb-4 px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Purchase Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form  className=' py-4'>


                        <div className='flex md:flex-row flex-col md:gap-20  w-full md:max-w-[43%] my-4  md:items-center md:justify-center '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>Add New</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Purchase;
