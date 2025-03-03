import { createSlice } from '@reduxjs/toolkit';

const paymentSlice = createSlice({
  name: 'payment',
  initialState: {
    PurOrOfVendor:[],
    BookingOrdersOfCustomer:[],
    customerBookings:[],
    vendorPayments:[],
    customerPayments:[]
  },
  reducers: {
    setPurOrOfVendor:(state,action)=>{
      state.PurOrOfVendor = action.payload
    },
    setVendorPayments:(state,action)=>{
      state.vendorPayments = action.payload
    },
    setCustomerPayments:(state,action)=>{
      state.customerPayments = action.payload
    },
    setCustomerBookings:(state,action)=>{
      state.customerBookings = action.payload
    },
    setBookingOrdersOfCustomer:(state,action)=>{
      state.BookingOrdersOfCustomer = action.payload
    },
  },
});

export const {setBookingOrdersOfCustomer,setPurOrOfVendor,setVendorPayments,setCustomerBookings,setCustomerPayments } = paymentSlice.actions;
export default paymentSlice.reducer