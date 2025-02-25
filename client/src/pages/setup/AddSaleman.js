import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setSalemans, setZones } from "../../redux/features/slices/setup";
import { useCreateSalemanMutation, useGetSalemansQuery } from "../../redux/features/apiSlices/setup/saleman";




const AddSaleman = () => {
    const [saleman, setSaleman] = useState("")
    const dispatch = useDispatch()
    const { salemans } = useSelector((state)=>state.setup)

    // handle town
    const [addsaleman, {isLoading}] = useCreateSalemanMutation()


  const {data:salemanData} = useGetSalemansQuery()


const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await addsaleman({saleman})
    if(res){
        if(res.data.err){
            alert(res.data.err)
        }else if(res.data.msg){
            alert(res.data.msg)
            setSaleman("")
        }
    }

}

useEffect(()=>{
    if(salemanData){
        dispatch(setSalemans(salemanData))                
    }
  },[dispatch,salemanData])



    

    return (
        <div className="w-full flex px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Saleman" secRedirect={"/add-saleman"}  view="/saleman-view" />
                {/* form section */}

                <div className={`w-full bg-white rounded-md h-auto px-10 `}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Saleman Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className='w-full max-w-3xl mx-auto '>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            <InputField
                                value={saleman}
                                onChangeFunction={(e)=>setSaleman(e.target.value)}
                                placeholderText="Saleman Name"
                                LabelText="Saleman Name:"
                                inputName="saleman"
                                inputType="text" />
                            <InputField
                                placeholderText="code"
                                value={salemans?.length + 1}
                                readOnly
                                onChangeFunction={(e)=>e.target.value}
                                LabelText="Code:"
                                inputName="address"
                                inputType="text" />
                        </div>
                       
                        <div className='flex items-center justify-end w-full pb-4'>
                            <div />
                            <button type="submit" className='disButton'>add</button>
                            <button onClick={()=>setSaleman("")} type="button" className='bg-blue-700 md:ml-4 ml-0 px-10 py-2 rounded-full text-white'>Add New</button>
                        </div>
                    </form>
                </div>
               
            </div>
            
        </div>
    );
};

export default AddSaleman;
