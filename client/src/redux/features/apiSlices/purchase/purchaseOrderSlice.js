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
        invalidatesTags: ['purchaseorders']
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
    }),
    
})

export const { usePurchaseOrderMutation,useGetPurchaseOrderQuery, useAddpurchaseOrderMutation, useGetInventoryQuery, useDltInvItemMutation} = ProductApiSlice