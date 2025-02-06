import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    products:[],
    productType:[],
    brands:[],
    units:[],
    category:[],
    subCategory:[]
  },
  reducers: {
    setBrands:(state,action)=>{
      state.brands = action.payload
    },
    setUnits:(state,action)=>{
      state.units = action.payload
    },
    setCategory:(state,action)=>{
      state.category = action.payload
    },
    setSubCategory:(state,action)=>{
      state.subCategory = action.payload
    },
    setProductType:(state,action)=>{
      state.productType = action.payload
    },
    setProducts:(state,action)=>{
      state.products = action.payload
    },
  },
});

export const { setProducts,setProductType,setBrands, setUnits, setCategory,setSubCategory } = ProductSlice.actions;
export default ProductSlice.reducer