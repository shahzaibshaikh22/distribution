import { apiSlice } from "../apiSlice";
const productUrl = `http://localhost:5000/api/v1/product`

export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addProductType:builder.mutation({
        query:(producttype)=>({
            url:`${productUrl}/type`,
            method:'POST',
            body:producttype
        }),
        invalidatesTags: ['producttypes']
       }),

       getProductType:builder.query({
        query:()=>({
            url:`${productUrl}/type`,
            method:'GET',
        }),
        providesTags: ['producttypes']
       }),
    }),
    
})

export const { useAddProductTypeMutation, useGetProductTypeQuery } = ProductApiSlice