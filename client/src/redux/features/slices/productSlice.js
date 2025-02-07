import { createSlice } from '@reduxjs/toolkit';

const ProductSlice = createSlice({
  name: 'product',
  initialState: {
    products:[],
    productType:[],
    brands:[],
    units:[],
    category:[],
    subCategory:[],
    vendors:[],
    warehouses:[]
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
    setVendors:(state,action)=>{
      state.vendors = action.payload
    },
    setWarehouses:(state,action)=>{
      state.warehouses = action.payload
    },
  },
});

export const { setProducts,setProductType,setBrands, setUnits, setCategory,setSubCategory,setVendors,setWarehouses} = ProductSlice.actions;
export default ProductSlice.reducer