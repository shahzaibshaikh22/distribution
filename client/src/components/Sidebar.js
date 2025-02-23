import React from 'react'
import { useSelector } from 'react-redux';
import { IoHomeOutline } from "react-icons/io5";
import { TbUserCancel } from "react-icons/tb";
import { useLocation ,Link } from "react-router-dom";
import DropdownMenu from './DropdownMenu';
import { FaCog } from 'react-icons/fa';
import { AiOutlineProduct } from "react-icons/ai";
import { MdOutlineSettingsInputHdmi } from "react-icons/md";
import { PiShoppingCartLight } from "react-icons/pi";
import { AiOutlineStock } from "react-icons/ai";
import { BsCash } from "react-icons/bs";



const Sidebar = () => {
  const { modes,sideBarCollapes } = useSelector((state)=>state.mode);
  const location = useLocation()

  const links = [
    {
      id:1,
      text:'Dashboard',
      icon:<IoHomeOutline size={25}/>,
      path:"/"
    },
    {
      id:2,
      text:'Complaint',
      icon:<TbUserCancel size={25}/>,
      path:'/complaints'
    }
  ]
  const settings = [
    {
      id:1,
      text:'Settings',
      path:"/settings"
    },
    {
      id:2,
      text:'Change Password',
      path:'/changepassword'
    },
    {
      id:3,
      text:'users',
      path:'/users'
    },
    {
      id:4,
      text:'Country',
      path:'/country'
    },
    {
      id:5,
      text:'Region',
      path:'/region'
    },
    {
      id:6,
      text:'City',
      path:'/city'
    },
    {
      id:7,
      text:'Financial Year',
      path:'/financialyear'
    },
    {
      id:8,
      text:'Query',
      path:'/query'
    }
  ]
  const distribution = [
    {
      id:1,
      text:'Builty Form',
      path:"/builtyform"
    },
    {
      id:2,
      text:'Order Booking',
      path:"/orderbooking"
    },
    {
      id:3,
      text:'Load Summary',
      path:"/loadsummary"
    },
    {
      id:4,
      text:'orders',
      path:"/orders"
    },
  ]
  const productLinks = [
    {
      id:1,
      text:'Product Type',
      path:"/product-type"
    },
    {
      id:2,
      text:'Brand',
      path:"/add-brand"
    },
    {
      id:3,
      text:'category',
      path:"/add-category"
    },
    {
      id:4,
      text:'sub category',
      path:"/add-subcategory"
    },
    {
      id:5,
      text:'unit',
      path:"/add-unit"
    },
    {
      id:6,
      text:'new product',
      path:"/add-product"
    },
    {
      id:7,
      text:'product',
      path:"/product"
    },
  ]
  const setupLinks = [
    {
      id:1,
      text:'Vendor',
      path:"/vendor"
    },
    {
      id:2,
      text:'Warehouse',
      path:"/warehouse"
    },
    {
      id:3,
      text:'customers',
      path:"/customers"
    },
    {
      id:4,
      text:'staff category',
      path:"/staff-category"
    },
    {
      id:5,
      text:'add staff',
      path:"/add-staff"
    },
    {
      id:6,
      text:'staffs view',
      path:"/staff-view"
    },
    {
      id:7,
      text:'staff category view',
      path:"/staff-view-category"
    },
    {
      id:8,
      text:'vendor view',
      path:"/vendor-view"
    },
    {
      id:9,
      text:'customer category',
      path:"/add-customer-category"
    },
    {
      id:10,
      text:'customer category view',
      path:"/customer-view-category"
    },
  ]
  const purchaseLinks = [
    {
      id:1,
      text:'Purchase Order',
      path:"/purchase-order"
    },
    {
      id:2,
      text:'Add Purchase',
      path:"/add-purchase"
    },
    {
      id:3,
      text:'Purchase Invoice',
      path:"/purchase-invoice"
    }
  ]
  const inventoryLinks = [
    {
      id:1,
      text:'inventory',
      path:"/get-inventory"
    }
  ]
  const stockLinks = [
    {
      id:1,
      text:'stock value',
      path:"/stockvalue"
    },
    {
      id:2,
      text:'stock adjustment',
      path:"/stockadjustment"
    },
  ]
  const paymentsLink = [
    {
      id:1,
      text:'purchase payments',
      path:"/purchase-payment"
    },

  ]





    return (
      <div className={`${sideBarCollapes === "show" ? 'w-[189px]' : 'w-[80px]'} min-h-screen ${modes === "dark" ? 'bg-darksecondary' : 'bg-white'}  md:block hidden transition-all duration-150 ease-linear`}>
        <div className={` ${sideBarCollapes === "show" ? ' flex-col flex' : 'flex flex-col items-center justify-center'}`}>
          <div className='logo my-2'>
            <div className={`flex items-center relative px-4 h-[4rem] border-b-[1px] ${modes === "dark" ? 'border-gray-300' : 'border-gray-300'}`}>
              <span className='text-5xl italic text-sky-900'>X</span> 
              <div className='flex flex-col gap-0'>
              <span className='text-xl absolute top-5 left-10   text-black font-bold'>enith</span> 
              <span className='text-md absolute top-9  text-black'>servics</span> 
              </div>
            </div>
           
          </div>
          <span className={`text-xs text-left my-1 pl-2 ${modes === "dark" ? "text-white" : 'text-black'}`}>Main Menu</span>
         <div className='flex flex-col gap-2 px-2'>
         {links.map((link)=>{
          return(
            <Link
            to={link.path}
            key={link.id}
            className={`w-full flex items-center gap-5 p-2 rounded-full cursor-pointer 
              ${sideBarCollapes === "show" ? '' : 'justify-center'}
              ${modes === "dark" 
                ? location.pathname === link.path 
                  ? "bg-grayPrimary text-white"  // Active state in dark mode
                  : "text-white hover:bg-darkprimary"  // Default dark mode styles
                : location.pathname === link.path 
                  ? "bg-lightsecondary text-black"  // Active state in light mode
                  : "text-black hover:bg-lightsecondary"  // Default light mode styles
              }
            `}
          >
            <div className="w-6 h-6 flex items-center">
              <div className="flex items-center justify-center w-6 h-6">
                {link.icon}
              </div>
            </div>
            <span className={`text-xs ${sideBarCollapes === "show" ? "block" : "hidden"}`}>
              {link.text}
            </span>
          </Link>

          )
         })}
          <DropdownMenu
          modes={modes}
           links={settings}
           menuText="Settings"
           sideBarCollapes={sideBarCollapes}
           menuIcon={<FaCog size={25}/>}/>

          <DropdownMenu
          modes={modes}
           links={distribution}
           menuText="Distribution"
           sideBarCollapes={sideBarCollapes}
           menuIcon={<FaCog size={25}/>}/>

           {/* product */}
           <DropdownMenu
           modes={modes}
           links={productLinks}
           menuText="Product"
           sideBarCollapes={sideBarCollapes}
           menuIcon={<AiOutlineProduct size={25}/>}/>

           {/* setup */}
           <DropdownMenu
           modes={modes}
           links={setupLinks}
           menuText="Setup"
           sideBarCollapes={sideBarCollapes}
           menuIcon={<MdOutlineSettingsInputHdmi size={25}/>}/>

            <DropdownMenu
           modes={modes}
           links={purchaseLinks}
           menuText="Purchase"
           sideBarCollapes={sideBarCollapes}
           menuIcon={<PiShoppingCartLight  size={25}/>}/>

            <DropdownMenu
           modes={modes}
           links={inventoryLinks}
           menuText="Inventory"
           sideBarCollapes={sideBarCollapes}
           menuIcon={<PiShoppingCartLight  size={25}/>}/>

            <DropdownMenu
           modes={modes}
           links={stockLinks}
           menuText="Stocks"
           sideBarCollapes={sideBarCollapes}
           menuIcon={<AiOutlineStock  size={25}/>}/>

            <DropdownMenu
           modes={modes}
           links={paymentsLink}
           menuText="Payments"
           sideBarCollapes={sideBarCollapes}
           menuIcon={<BsCash  size={25}/>}/>
            {/* product */}
          {/* <DropdownMenu links={dropdownlinks}/> */}
         </div>
        </div>
      </div>
    );
  };

export default Sidebar
