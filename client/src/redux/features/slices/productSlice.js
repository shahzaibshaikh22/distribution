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
    warehouses:[],
    purchaseOrderLength:0,
    purchaseOrders:[],
    inventory:null,
    purchaseReturn:[],
    orderReturn:[]
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
    setPonoLength:(state,action)=>{
      state.purchaseOrderLength = action.payload
    },
    setPurchaseOrders:(state,action)=>{
      state.purchaseOrders = action.payload
    },
    setInventory:(state,action)=>{
      state.inventory = action.payload
    },
    setPurchaseReturn:(state,action)=>{
      state.purchaseReturn = action.payload
    },
    setOrderReturn:(state,action)=>{
      state.orderReturn = action.payload
    },
  },
});

export const {setPonoLength,setPurchaseOrders,setInventory, setProducts,setProductType,setBrands, setUnits, setCategory,setSubCategory,setVendors,setWarehouses,setPurchaseReturn, setOrderReturn} = ProductSlice.actions;
export default ProductSlice.reducer