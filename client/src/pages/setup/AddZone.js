import React,{useEffect, useState} from "react";
import TopBar from "../../components/TopBar";
import SectionBar from "../../components/SectionBar";
import InputField from "../../components/InputField";
import { useDispatch, useSelector } from "react-redux";
import { setZones } from "../../redux/features/slices/setup";
import { useCreateZoneMutation, useGetZonesQuery } from "../../redux/features/apiSlices/setup/zone";




const AddZone = () => {
    const [zonename, setZonename] = useState("")
    const dispatch = useDispatch()
    const { zones } = useSelector((state)=>state.setup)

    // handle town
    const [addzone, {isLoading}] = useCreateZoneMutation()


  const {data:zoneData} = useGetZonesQuery()


const handleSubmit = async (e)=>{
    e.preventDefault();
    const res = await addzone({zonename})
    if(res){
        if(res.data.err){
            alert(res.data.err)
        }else if(res.data.msg){
            alert(res.data.msg)
            setZonename("")
        }
    }

}

useEffect(()=>{
    if(zoneData){
        dispatch(setZones(zoneData))                
    }
  },[dispatch,zoneData])



    

    return (
        <div className="w-full flex px-4">
            {/* <PhoneMenu/> */}
            <div className="w-full ">
                <TopBar />
                <SectionBar sectionHeading="Town" secRedirect={"/add-zone"}  view="/zone-view" />
                {/* form section */}

                <div className={`w-full bg-white rounded-md h-auto px-10 `}>
                    <div className='w-full '>
                        <h1 className=' pt-6 font-semibold mb-4'>Town Detail</h1>
                        <div className="divider w-full h-[1px] bg-gray-300 " />
                    </div>
                    <form onSubmit={handleSubmit} className='w-full max-w-3xl mx-auto '>
                        <div className='flex md:flex-row w-full  flex-col gap-2  md:my-4 '>
                            <InputField
                                value={zonename}
                                onChangeFunction={(e)=>setZonename(e.target.value)}
                                placeholderText="Zone Name"
                                LabelText="Zone Name:"
                                inputName="zonename"
                                inputType="text" />
                            <InputField
                                placeholderText="code"
                                value={zones?.length + 1}
                                readOnly
                                onChangeFunction={(e)=>e.target.value}
                                LabelText="Code:"
                                inputName="address"
                                inputType="text" />
                        </div>
                       
                        <div className='flex items-center justify-end w-full pb-4'>
                            <div />
                            <button type="submit" className='bg-blue-700 px-10 py-2 rounded-full text-white'>add</button>
                            <button onClick={()=>setZonename("")} type="button" className='bg-blue-700 md:ml-4 ml-0 px-10 py-2 rounded-full text-white'>Add New</button>
                        </div>
                    </form>
                </div>
               
            </div>
            
        </div>
    );
};

export default AddZone;
