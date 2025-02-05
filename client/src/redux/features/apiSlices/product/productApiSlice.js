import { apiSlice } from "../apiSlice";
const producturl = `http://localhost:5000/api/v1/product`;

export const ProductApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addProduct:builder.mutation({
        query:(formData)=>({
            url:`${producturl}/add-product`,
            method:'POST',
            body:formData
        }),
        invalidatesTags: ['products']
       }),
    }),
    
})

export const { useAddProductMutation } = ProductApiSlice