import React from 'react'
import { LuUserPlus } from "react-icons/lu";
import { FiUsers } from "react-icons/fi";
import { Link } from "react-router-dom"

import { useSelector } from "react-redux"

const SectionBar = ({sectionHeading, secRedirect,view}) => {
  const {modes} = useSelector((state)=> state.mode)
  return (
    <div className={`w-full drop-shadow-md md:px-10 px-4 flex justify-between ${modes === "dark" ? "bg-darksecondary text-white" :"bg-white text-gray-800"} items-center  h-[4rem] my-5  rounded-lg`}>
      <h1 className='md:text-md text-sm font-semibold'>{sectionHeading}</h1>
      <div className='flex items-center gap-5'>
      <Link to={secRedirect} className='flex items-center gap-2'>
      <LuUserPlus size={20} className='text-blue-600'/>
      <span className='text-xs'>Add New</span>
      </Link>
      <Link to={view} className='flex items-center gap-2'>
      <FiUsers size={20} className='text-blue-600'/>
      <span className='text-xs'>Record/view</span>
      </Link>
      </div>
    </div>
  )
}

export default SectionBar
