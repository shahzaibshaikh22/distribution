import { createSlice } from '@reduxjs/toolkit';

const setupSlice = createSlice({
  name: 'setup',
  initialState: {
    staffCategories:[],
    customerCategories:[],
    customers:[],
    staffs:[],
    towns:[],
    zones:[],
    salemans:[],

  },
  reducers: {
    setStaffCaty:(state,action)=>{
      state.staffCategories = action.payload
    },
    setCustomerCaty:(state,action)=>{
      state.customerCategories = action.payload
    },
    setStaff:(state,action)=>{
      state.staffs = action.payload
    },
    setTowns:(state,action)=>{
      state.towns = action.payload
    },
    setZones:(state,action)=>{
      state.zones = action.payload
    },
    setSalemans:(state,action)=>{
      state.salemans = action.payload
    },
    setCustomers:(state,action)=>{
      state.customers = action.payload
    },
  },
});

export const { setStaffCaty, setStaff,setCustomerCaty,setTowns,setZones,setSalemans,setCustomers } = setupSlice.actions;
export default setupSlice.reducer