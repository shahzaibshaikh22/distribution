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

    }),
    
})

export const { usePurchaseOrderMutation,useGetPurchaseOrderQuery, useAddpurchaseOrderMutation} = ProductApiSlice