import React from 'react'
import { useSelector } from 'react-redux';
import { IoHomeOutline } from "react-icons/io5";
import { TbUserCancel } from "react-icons/tb";
import { setSideCollapes } from '../redux/features/slices/modeSlice';
import { useDispatch } from 'react-redux';

const PhoneMenu = () => {
  const { modes,sideBarCollapes } = useSelector((state)=>state.mode);

  const links = [
    {
      id:1,
      text:'Dashboard',
      icon:<IoHomeOutline size={25}/>
    },
    {
      id:2,
      text:'Complaint',
      icon:<TbUserCancel size={25}/>
    }
  ]

  const dispatch = useDispatch()
  const handleSideBar = () => {
    dispatch(setSideCollapes())
  }

    return (
      <div className={`fixed  top-0 left-0 md:hidden block z-50 w-[50%] h-screen 
      ${modes === "dark" ? 'bg-darksecondary' : 'bg-white'} transition-all duration-150 ease-linear
      ${sideBarCollapes === "show" ? 'translate-x-0 ' : 'translate-x-[-150%] '}
      `}>
        <span onClick={handleSideBar} className='absolute flex items-center justify-center top-5 w-6 h-6 rounded-full drop-shadow-md z-50 right-5 font-bold cursor-pointer text-xl'>x</span>
        <div className='flex flex-col'>
          <div className='logo my-2'>
            <div className={`flex items-center relative px-4 h-[4rem] border-b-[1px] ${modes === "dark" ? 'border-gray-300' : 'border-gray-300'}`}>
              <span className='text-5xl italic text-sky-900'>X</span> 
              <div className='flex flex-col gap-0'>
              <span className='text-xl absolute top-5 left-10   text-black font-bold'>enith</span> 
              <span className='text-md absolute top-9  text-black'>servics</span> 
              </div>
            </div>
          </div>
         <div className='flex flex-col gap-2 px-2'>
         {links.map((link)=>{
          return(
            <div key={link.id} className={`w-full hover:font-semibold  flex items-center gap-5 p-2 rounded-full ${modes === "dark" ? 'hover:bg-darkprimary text-white' : 'hover:bg-lightsecondary text-black'} cursor-pointer`}>
            <div className='w-8 h-8  flex items-center'>
              <div className='flex items-center w-8 h-8'>
                {link.icon}
              </div>
            </div>
            <span className=''>{link.text}</span>
          </div>
          )
         })}
         </div>
        </div>
      </div>
    );
  };

export default PhoneMenu
