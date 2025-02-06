import React, { useEffect } from 'react'
import "./App.css";
import { Routes, Route, BrowserRouter } from 'react-router-dom'
import { useSelector } from 'react-redux';
import Sidebar from './components/Sidebar';
import Overview from './components/Overview';
import PhoneMenu from './components/PhoneMenu';
import Complaints from './pages/Complaints';
import Users from './components/Users';
import Settings from './pages/settings/Settings';
import ChangePassword from './pages/settings/ChangePassword';
import Country from './pages/settings/Country';
import Region from './pages/settings/Region';
import Query from './pages/settings/Query';
import City from './pages/settings/City';

import FinancialYear from './pages/settings/FinancialYear';
import BuiltyForm from './pages/distribution/BuiltyForm';
import OrderBooking from './pages/distribution/OrderBooking';
import LoadSummary from './pages/distribution/LoadSummary';
import ProductTypes from './pages/product/ProductTypes';
import BrandName from './pages/product/BrandName';
import CategoryName from './pages/product/CategoryName';
import SubCategory from './pages/product/SubCategory';
import Units from './pages/product/Units';
import Product from './pages/product/Product';
import Purchase from './pages/purchase/Purchase';
import Vendor from './pages/setup/Vendor';
import ViewProducts from './pages/product/ViewProducts';

const App = () => {
  const { modes } = useSelector((state)=>state.mode)
  useEffect(() => {
    document.body.style.backgroundColor = modes === "dark" ? "#222222" : "#EDEDED";
  }, [modes]);
  return (
        <BrowserRouter>
  <main className={`w-full bg-transparent transition-all duration-150 ease-linear flex`}>
     <div className='w-full  flex gap-1'>
      <div className='sidebar'>
        <Sidebar/>
      </div>
      <div className='content w-full'>
          <Routes>
            <Route path="/" element={  <Overview/>}/>
            <Route path="/complaints" element={<Complaints/>}/>
            {/* settings routes */}
            <Route path="/changepassword" element={  <ChangePassword/>}/>
            <Route path="/settings" element={  <Settings/>}/>
            <Route path="/users" element={  <Users/>}/>
            <Route path="/country" element={  <Country/>}/>
            <Route path="/region" element={  <Region/>}/>
            <Route path="/city" element={  <City/>}/>
            <Route path="/financialyear" element={ <FinancialYear/> }/>
            <Route path="/query" element={ <Query/> }/>
             {/* settings routes */}

            {/* distribution routes */}
            <Route path="/builtyform" element={ <BuiltyForm/> }/>
            <Route path="/orderbooking" element={ <OrderBooking/> }/>
            <Route path="/loadsummary" element={ <LoadSummary/> }/>
            {/* distribution routes */}

            {/* Products Route */}
            <Route path="/product-type" element={ <ProductTypes/> }/>
            <Route path="/add-brand" element={ <BrandName/> }/>
            <Route path="/add-category" element={ <CategoryName/> }/>
            <Route path="/add-subcategory" element={ <SubCategory/> }/>
            <Route path="/add-unit" element={ <Units/> }/>
            <Route path="/add-product" element={ <Product/> }/>
            <Route path="/product" element={ <ViewProducts/> }/>
            {/* Products Route */}

            {/* setup */}
            <Route path="/vendor" element={ <Vendor/> }/>
            {/* setup */}

            {/* [purchase] */}
            <Route path="/purchase" element={ <Purchase/> }/>
            {/* [purchase] */}
          </Routes>
      </div>
    </div>
    <PhoneMenu/>
   </main>
        </BrowserRouter>
  )
}

export default App
