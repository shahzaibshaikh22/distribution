import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    PurOrOfVendor:[],
    vendorPayments:[]
  },
  reducers: {
    setPurOrOfVendor:(state,action)=>{
      state.PurOrOfVendor = action.payload
    },
    setVendorPayments:(state,action)=>{
      state.vendorPayments = action.payload
    },
  },
});

export const {setPurOrOfVendor,setVendorPayments } = paymentSlice.actions;
export default paymentSlice.reducer