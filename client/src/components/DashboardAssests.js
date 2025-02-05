import React from 'react'
import { useSelector } from 'react-redux'

const DashboardAssests = ({heading,totalAssests}) => {
    const { modes } = useSelector((state)=>state.mode)
  return (
    <div className={`drop-shadow-md w-full h-[335px]  ${modes === "dark" ? 'bg-grayPrimary text-white' : 'bg-white text-black'}  rounded-xl px-2 py-1 flex flex-col gap-1`}>
    <div className="flex items-center justify-center">
      <h3 className="font-semibold">{heading}</h3>
    </div>
   {totalAssests.map((asste)=>{
    return(
        <div key={asste.id} className="flex flex-col py-[3px] gap-1">
        <div className={`flex items-center justify-between ${modes === "dark" ? 'bg-darkprimary text-white' : 'bg-lightsecondary text-black'} px-4  rounded-full`}>
          <h5 className="text-[10px]">{asste.assetsType}</h5>
          <span className='text-sm'>0</span>
        </div>
      </div>
    )
   })}
  </div>
  )
}

export default DashboardAssests
