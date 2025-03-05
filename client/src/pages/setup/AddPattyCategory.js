import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setPattyCategory } from "../../redux/features/slices/setup";
import { useAddPattyCategoryMutation, useGetPattyCategoryQuery } from "../../redux/features/apiSlices/setup/pattyexpencecategory";




const AddPattyCategory = () => {
    const [category, setCategory] = useState("")
    const dispatch = useDispatch()
    const { pattyExpenceCategory } = useSelector((state)=>state.setup)

    // handle town
    const [addCategory, {isLoading}] = useAddPattyCategoryMutation()


  const {data:categoryData} = useGetPattyCategoryQuery()


const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await addCategory({category})
    if(res){
        if(res.data.err){
            alert(res.data.err)
        }else if(res.data.msg){
            alert(res.data.msg)
            setCategory("")
        }
    }

}

useEffect(()=>{
    if(categoryData){
        dispatch(setPattyCategory(categoryData))                
    }
  },[dispatch,categoryData])



    

    return (
        <div className="w-full flex px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar  sectionHeading="Patty Category" secRedirect="/add-patty-category" view="/patty-category-view" />
                {/* form section */}

                <div className={`w-full bg-white rounded-md h-auto px-10 `}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Patty Category</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className='w-full max-w-3xl mx-auto '>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4 '>
                            <InputField
                                value={category}
                                onChangeFunction={(e)=>setCategory(e.target.value)}
                                placeholderText="Category"
                                LabelText="Category:"
                                inputName="category"
                                inputType="text" />
                            <InputField
                                placeholderText={pattyExpenceCategory?.length + 1}
                                readOnly
                                LabelText="Code:"
                                inputName="code"
                                inputType="text" />
                        </div>
                       
                        <div className='flex items-center justify-end w-full pb-4'>
                            <div />
                            <button type="submit" className='bg-blue-700 px-10 py-2 rounded-full text-white'>add</button>
                            <button onClick={()=>setCategory("")} type="button" className='bg-blue-700 md:ml-4 ml-0 px-10 py-2 rounded-full text-white'>Add New</button>
                        </div>
                    </form>
                </div>
               
            </div>
            
        </div>
    );
};

export default AddPattyCategory;
