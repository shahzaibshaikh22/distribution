import React, { useState } from 'react'
import { FaBars, FaSearch } from 'react-icons/fa'
import ToggleMode from './ToggleMode';
import { FiUsers } from "react-icons/fi";
import { AiOutlineBell } from "react-icons/ai";
import { BsChevronDown } from "react-icons/bs";
import { GoSignOut } from "react-icons/go";


import { useDispatch, useSelector } from 'react-redux';
import { setSideCollapes } from '../redux/features/slices/modeSlice';

const TopBar = () => {
  const [isLogout, setIsLogout] = useState(false)
  const { modes } = useSelector((state) => state.mode)
  const dispatch = useDispatch()
  const handleSideBar = () => {
    dispatch(setSideCollapes())
  }

  const handleLogout = () => {
    setIsLogout(!isLogout)
  }

  return (
    <>
       <nav className={`w-full relative transition-all duration-150 ease-linear drop-shadow-md h-[4rem] ${modes === "dark" ? 'bg-darksecondary ' : 'bg-white'} rounded-md relative`}>
      <div className='w-full h-full relative flex items-center justify-between px-5'>
        <div className='flex'>
          <FaBars className={`${modes === "dark" ? 'text-white' : 'text-black'}`} onClick={handleSideBar} />
        </div>
        <div className='relative items-center md:flex hidden justify-center  h-full w-[277px]'>
          <FaSearch className={`absolute left-4 top-6 ${modes === "dark" ? 'text-white' : 'text-black'}`} />
          <input type="text" className={`pl-10 ${modes === "dark" ? 'bg-darkprimary placeholder:text-white text-white' : 'bg-lightsecondary placeholder:text-black text-black'} px-4 py-2 rounded-full w-full`} placeholder='search here' />
        </div>

        <div className='flex items-center h-full justify-center gap-4'>
          <div className='flex items-center gap-4'>
            <ToggleMode />
            <AiOutlineBell className={`${modes === "dark" ? ' text-white' : ' text-black'}`} size={20} />
            <FiUsers className={`${modes === "dark" ? ' text-white' : ' text-black'}`} size={20} />
            <div onClick={handleLogout} className='flex gap-2 items-center'>
              <div className='w-10 h-10 rounded-full border-[1px] border-gray-400'>
                <img className='w-full h-full rounded-full object-cover' src="./images/user.png" alt="" />
              </div>
              <BsChevronDown onClick={handleLogout} className={`${modes === "dark" ? ' text-white' : ' text-black'}`} />
            </div>
          </div>
        </div>
        
      </div>
    </nav>
    {isLogout && (
      <div onClick={handleLogout}
        className={`fixed z-50  cursor-pointer drop-shadow-md flex gap-4 items-center w-40 p-3 rounded-md top-16 right-4 ${modes === "dark" ? 'bg-darksecondary text-white' : 'bg-lightsecondary text-black'}`}>
        <GoSignOut size={20} />
        <span>Logout</span>
      </div>
    )}

    </>
     )
}

export default TopBar
