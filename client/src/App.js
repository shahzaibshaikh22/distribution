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
import PurchaseOrder from './pages/purchase/PurchaseOrder';
import Vendor from './pages/setup/Vendor';
import Warehouse from './pages/setup/Warehouse';
import ViewProducts from './pages/product/ViewProducts';
import AddPurchase from './pages/purchase/AddPurchase';
import PurchaseInvoice from './pages/purchase/PurchaseInvoice';
import Inventory from './pages/Inventory/Inventory';
import StockValue from './pages/stocks/StockValue';
import StockAdjustment from './pages/stocks/StockAdjustment';
import Customers from './pages/setup/Customers';
import Orders from './pages/distribution/Orders';
import PurchasePayment from './pages/payments/PurchasePayment';
import StaffCategory from './pages/setup/StaffCategory';
import Staff from './pages/setup/Staff';
import StaffView from './pages/setup/StaffView';
import StaffCategoryView from './pages/setup/StaffCategoryView';
import VendorView from './pages/setup/VendorView';
import CustomerCategory from './pages/setup/CustomerCategory';
import CustomerCategoryView from './pages/setup/CustomerCategoryView';
import AddTown from './pages/setup/AddTown';
import TownsView from './pages/setup/TownsView';
import WarehouseView from './pages/setup/WarehouseView';
import AddZone from './pages/setup/AddZone';
import ZoneView from './pages/setup/ZoneView';
import AddSaleman from './pages/setup/AddSaleman';
import SalemanView from './pages/setup/SalemanView';

const App = () => {
  const { modes,sideBarCollapes } = useSelector((state) => state.mode)
  useEffect(() => {
    document.body.style.backgroundColor = modes === "dark" ? "#222222" : "#EDEDED";
  }, [modes]);
  return (
    <BrowserRouter>
      <main className={`w-full bg-transparent transition-all duration-150 ease-linear flex`}>
        <div className='w-full'>
          <div className='sidebar '>
            <Sidebar/>
          </div>
          <div className={`content w-full ${sideBarCollapes  === "show" ? "md:pl-[11.6rem]" : "md:pl-[4.8rem]"}`}>
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/complaints" element={<Complaints />} />
              {/* settings routes */}
              <Route path="/changepassword" element={<ChangePassword />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/users" element={<Users />} />
              <Route path="/country" element={<Country />} />
              <Route path="/region" element={<Region />} />
              <Route path="/city" element={<City />} />
              <Route path="/financialyear" element={<FinancialYear />} />
              <Route path="/query" element={<Query />} />
              {/* settings routes */}

              {/* distribution routes */}
              <Route path="/builtyform" element={<BuiltyForm />} />
              <Route path="/orderbooking" element={<OrderBooking />} />
              <Route path="/loadsummary" element={<LoadSummary />} />
              <Route path="/orders" element={<Orders />} />
              {/* distribution routes */}

              {/* Products Route */}
              <Route path="/product-type" element={<ProductTypes />} />
              <Route path="/add-brand" element={<BrandName />} />
              <Route path="/add-category" element={<CategoryName />} />
              <Route path="/add-subcategory" element={<SubCategory />} />
              <Route path="/add-unit" element={<Units />} />
              <Route path="/add-product" element={<Product />} />
              <Route path="/product" element={<ViewProducts />} />
              {/* Products Route */}

              {/* setup */}
              <Route path="/vendor" element={<Vendor />} />
              <Route path="/warehouse" element={<Warehouse />} />
              <Route path="/customers" element={<Customers />} />
              <Route path="/staff-category" element={<StaffCategory />} />
              <Route path="/add-staff" element={<Staff />} />
              <Route path="/staff-view" element={<StaffView />} />
              <Route path="/vendor-view" element={<VendorView />} />
              <Route path="/staff-view-category" element={<StaffCategoryView />} />
              <Route path="/add-customer-category" element={<CustomerCategory />} />
              <Route path="/customer-view-category" element={<CustomerCategoryView />} />
              <Route path="/add-town" element={<AddTown />} />
              <Route path="/add-zone" element={<AddZone />} />
              <Route path="/town-view" element={<TownsView />} />
              <Route path="/zone-view" element={<ZoneView />} />
              <Route path="/warehouse-view" element={<WarehouseView />} />
              <Route path="/saleman-view" element={<SalemanView />} />
              <Route path="/add-saleman" element={<AddSaleman />} />
              {/* setup */}

              {/* [purchase] */}
              <Route path="/purchase-order" element={<PurchaseOrder />} />
              <Route path="/add-purchase" element={<AddPurchase />} />
              <Route path="/purchase-invoice" element={<PurchaseInvoice />} />
              {/* [purchase] */}

              {/* inventory */}
              <Route path="/get-inventory" element={<Inventory />} />
              {/* inventory */}

              {/* stocks */}
              <Route path="/stockvalue" element={<StockValue />} />
              <Route path="/stockadjustment" element={<StockAdjustment />} />
              {/* stocks */}

              {/* order booking */}
              <Route path="/orderbooking" element={<OrderBooking />} />
              {/* order booking */}

              {/* payments */}
              <Route path="/purchase-payment" element={<PurchasePayment />} />
              {/* payments */}
            </Routes>
          </div>
        </div>
        <PhoneMenu />
      </main>
    </BrowserRouter>
  )
}

export default App
