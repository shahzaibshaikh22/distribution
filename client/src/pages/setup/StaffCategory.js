import React,{useState, useEffect} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import { useDispatch, useSelector } from "react-redux";
import InputField from "../../components/InputField";
import { useAddStaffCategoryMutation, useGetStaffCategoryQuery } from "../../redux/features/apiSlices/setup/staffCategory";
import { setStaffCaty } from "../../redux/features/slices/setup";



const StaffCategory = () => {
  const { modes } = useSelector((state)=>state.mode);
  const { staffCategories } = useSelector((state)=>state.setup);

  const [category, setCategory] = useState("");

  const dispatch = useDispatch()

// product type submition
const [addStaffCategory, {isLoading}] = useAddStaffCategoryMutation()
const {data:staffCatyData,refetch} = useGetStaffCategoryQuery()


const handleSubmit = async (e)=>{
    e.preventDefault();
    
    const res = await addStaffCategory({category})
    setCategory("")
    refetch()
    
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

useEffect(()=>{
    if(staffCatyData){
        dispatch(setStaffCaty(staffCatyData.category))  
              
    }
  },[dispatch,staffCatyData,refetch])
    

    return (
        <div className="w-full flex  text-white px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Staff Category" />
                {/* form section */}
                <div className={`w-full md:px-10 mainContainerForm relative rounded-xl ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'} h-[4rem]`}>
                    <div className='md:px-0 px-10'>
                        <h1 className='text-center md:text-md text-sm pt-6 font-semibold mb-5'>Staff Category</h1>
                        <div className="divider w-full h-[1px] bg-gray-300   mx-auto left-0" />
                    </div>

                    <div className={`${modes === "dark" ? 'bg-darkprimary' : 'bg-lightprimary'} w-56 absolute formContainer h-16 right-0 top-0 hidden`}>
                    </div>
                </div>

                <div className={`w-full Container h-auto md:mb-0 mb-4  px-10 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-white text-gray-800'}`}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Category Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className='py-4 w-full max-w-3xl mx-auto'>
                        <div className='flex items-center md:flex-row flex-col gap-4 my-2'>
                            {/* product type  */}
                            <InputField
                                value={category}
                                onChangeFunction={(e)=>setCategory(e.target.value)}
                                placeholderText="category"
                                LabelText="Category:"
                                inputName="category"
                                inputType="" />
                            {/* product type  */}
                            <div className='flex flex-col w-full'>
                            <label className="font-semibold"  htmlFor="code">Code</label>
                            <div className="inputBorder w-full p-2 rounded-md ">
                            <input
                            type="text"
                            placeholder={staffCategories?.length + 1}
                            readOnly
                            className='bg-transparent w-full'/>
                            </div>
                            </div>
                        </div>
                        <div className='flex md:flex-row flex-col gap-4 my-2 '>
                            <div />
                            <button type="submit" className='bg-blue-700 md:ml-0 w-40 px-4 py-2 rounded-full text-white'>{isLoading ? "Processing" : "Add New"}</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default StaffCategory;
