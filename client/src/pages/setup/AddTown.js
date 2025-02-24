import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { useCreateTownMutation, useGetTownsQuery } from "../../redux/features/apiSlices/setup/town"
import { setTowns } from "../../redux/features/slices/setup";




const AddTown = () => {
    const [townname, setTownName] = useState("")
    const dispatch = useDispatch()
    const { towns } = useSelector((state)=>state.setup)

    // handle town
    const [addtown, {isLoading}] = useCreateTownMutation()


  const {data:townsData} = useGetTownsQuery()


const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await addtown({townname})
    if(res){
        if(res.data.err){
            alert(res.data.err)
        }else if(res.data.msg){
            alert(res.data.msg)
            setTownName("")
        }
    }

}

useEffect(()=>{
    if(townsData){
        dispatch(setTowns(townsData))                
    }
  },[dispatch,townsData])



    

    return (
        <div className="w-full flex px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Town" secRedirect={"/add-town"}  view="/view-town" />
                {/* form section */}

                <div className={`w-full bg-white rounded-md h-auto px-10 `}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Town Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className='w-full max-w-3xl mx-auto '>
                        <div className='flex md:flex-row w-full  flex-col md:gap-20  md:my-4 '>
                            <InputField
                                value={townname}
                                onChangeFunction={(e)=>setTownName(e.target.value)}
                                placeholderText="Town Name"
                                LabelText="Town Name:"
                                inputName="townname"
                                inputType="text" />
                            <InputField
                                placeholderText="code"
                                value={towns?.length + 1}
                                readOnly
                                onChangeFunction={(e)=>e.target.value}
                                LabelText="Code:"
                                inputName="address"
                                inputType="text" />
                        </div>
                       
                        <div className='flex items-center justify-end w-full pb-4'>
                            <div />
                            <button type="submit" className='bg-blue-700 px-10 py-2 rounded-full text-white'>add</button>
                            <button onClick={()=>setTownName("")} type="button" className='bg-blue-700 md:ml-4 ml-0 px-10 py-2 rounded-full text-white'>Add New</button>
                        </div>
                    </form>
                </div>
               
            </div>
            
        </div>
    );
};

export default AddTown;
