import { createSlice } from '@reduxjs/toolkit';

const setupSlice = createSlice({
  name: 'setup',
  initialState: {
    staffCategories:[],
    customerCategories:[],
    staffs:[]

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
  },
});

export const { setStaffCaty, setStaff,setCustomerCaty } = setupSlice.actions;
export default setupSlice.reducer