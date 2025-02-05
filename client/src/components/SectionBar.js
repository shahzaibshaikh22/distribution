import React from 'react'
import { LuUserPlus } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";

import { useSelector } from "react-redux"

const SectionBar = ({sectionHeading}) => {
  const {modes} = useSelector((state)=> state.mode)
  return (
    <div className={`w-full drop-shadow-md md:px-10 px-4 flex justify-between ${modes === "dark" ? "bg-darksecondary text-white" :"bg-white text-gray-800"} items-center  h-[4rem] my-5  rounded-lg`}>
      <h1 className='md:text-md text-sm font-semibold'>{sectionHeading}</h1>
      <div className='flex items-center gap-5'>
      <button className='flex items-center gap-2'>
      <LuUserPlus size={20} className='text-blue-600'/>
      <span className='text-xs'>Add New</span>
      </button>
      <button className='flex items-center gap-2'>
      <FiUsers size={20} className='text-blue-600'/>
      <span className='text-xs'>Record/view</span>
      </button>
      </div>
    </div>
  )
}

export default SectionBar
