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
       getProducts:builder.query({
        query:()=>({
            url:`${producturl}/get-products`,
            method:'GET',
        }),
        providesTags: ['products']
       }),
       deleteProduct:builder.mutation({
        query:(id)=>({
            url:`${producturl}/delete-product/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['products']
       }),
       updateProduct:builder.mutation({
        query:({formData,id})=>({
            url:`${producturl}/update-product/${id}`,
            method:'PUT',
            body:formData    
        }),
        invalidatesTags: ['products']
       }),

    }),
    
})

export const { useAddProductMutation, useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } = ProductApiSlice