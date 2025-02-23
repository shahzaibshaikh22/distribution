import { createSlice } from '@reduxjs/toolkit';

const customerSlice = createSlice({
  name: 'customer',
  initialState: {
    customers:[],
  },
  reducers: {
    setCustomers:(state,action)=>{
      state.customers = action.payload
    },
    setCustomerCaty:(state,action)=>{
      state.customerCategories = action.payload
    },

  },
});

export const { setCustomers, setCustomerCaty} = customerSlice.actions;
export default customerSlice.reducer