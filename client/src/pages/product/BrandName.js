import React,{useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useSelector } from "react-redux";
import InputField from "../../components/InputField";
import { useAddBrandMutation } from "../../redux/features/apiSlices/product/brandSlice";



const BrandName = () => {
  const { modes } = useSelector((state)=>state.mode);

  const [brand, setBrand] = useState("");

// product type submition
const [addBrand, {isLoading}] = useAddBrandMutation()

const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const res = await addBrand({brand})
    setBrand("")
    
    if(res){
        if(res.data.err){
            alert(res.data.err)
        }else if(res.data.msg){
            alert(res.data.msg)
        }
    }
    // if(res.data.msg){
    //     alert(res.data.msg)
    // }
    
}

    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Brand Name" />
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm   relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Brands</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>

                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

                <div className={`w-full Container h-auto md:mb-0 mb-4  px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Product Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className=' py-4'>
                        <div className='flex md:flex-row w-full md:max-w-[45%] flex-col md:gap-20  md:my-4 '>
                            {/* product type  */}
                            <InputField
                                value={brand}
                                onChangeFunction={(e)=>setBrand(e.target.value)}
                                placeholderText="jhon player"
                                LabelText="Brand Name"
                                inputName="brand"
                                inputType="text" />
                            {/* product type  */}
                        </div>
                        <div className='flex md:flex-row flex-col md:gap-20  w-full md:max-w-[47%] my-4  md:items-center md:justify-center '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>{isLoading ? "Processing" : "Add New"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default BrandName;
