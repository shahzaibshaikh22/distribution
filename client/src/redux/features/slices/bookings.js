import { createSlice } from '@reduxjs/toolkit';

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings:[],
    bookOrderNo:0
  },
  reducers: {
    setBookings:(state,action)=>{
      state.bookings = action.payload
    },
    setBookingOrderLength:(state,action)=>{
      state.bookOrderNo = action.payload
    },
  },
});

export const { setBookings,setBookingOrderLength } = bookingSlice.actions;
export default bookingSlice.reducer