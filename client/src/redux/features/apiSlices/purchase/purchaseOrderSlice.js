import { apiSlice } from "../apiSlice";
const purchaseOrderUrl = `http://localhost:5000/api/v1/purchase`;

export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       purchaseOrder:builder.mutation({
        query:(data)=>({
            url:`${purchaseOrderUrl}/order`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['purchaseorders']
       }),
       getPurchaseOrder:builder.query({
        query:()=>({
            url:`${purchaseOrderUrl}/order`,
            method:'GET',
        }),
        providesTags: ['purchaseorders']
       }),
       AddpurchaseOrder:builder.mutation({
        query:(data)=>({
            url:`${purchaseOrderUrl}/add-order`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['addpurchaseorders']


       }),
       getInventory:builder.query({
        query:()=>({
            url:`${purchaseOrderUrl}/get-inventory`,
            method:'GET',
        }),
        providesTags: ['inventory']
       }),
       dltInvItem:builder.mutation({
        query:(data)=>({
            url:`${purchaseOrderUrl}/dlt-invitem`,
            method:'DELETE',
            body:data
        }),
        providesTags: ['inventory']
       }),
       getPurOrByVendor:builder.query({
        query:(vendor)=>({
            url:`${purchaseOrderUrl}/vendor-orders/${vendor}`,
            method:'GET',
        }),
        providesTags: ['purchaseorders']
       }),
       getAllTotal:builder.query({
        query:()=>({
            url:`${purchaseOrderUrl}/get-total`,
            method:'GET',
        }),
        providesTags: ['addpurchaseorders']
       }),
       purchaseReturn:builder.mutation({
        query:(data)=>({
            url:`http://localhost:5000/api/v1/return/purchase-return`,
            method:'POST',
            body:data
        }),
        providesTags: ['purchasereturns']


       }),
       getPurchaseReturn:builder.query({
        query:()=>({
            url:`http://localhost:5000/api/v1/return/get-purchase-return`,
            method:'GET',
        }),
        providesTags: ['purchasereturns']
       }),
    }),
    
})

export const {usePurchaseReturnMutation, useGetAllTotalQuery, useLazyGetPurOrByVendorQuery,usePurchaseOrderMutation,useGetPurchaseOrderQuery, useAddpurchaseOrderMutation, useGetInventoryQuery, useDltInvItemMutation,useGetPurchaseReturnQuery} = ProductApiSlice