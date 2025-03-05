import { apiSlice } from "../apiSlice";
const pattyCategoryurl = `http://localhost:5000/api/v1/patty`;


export const PattyCategoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addPattyCategory:builder.mutation({
        query:(category)=>({
            url:`${pattyCategoryurl}/add-category`,
            method:'POST',
            body:category
        }),
        invalidatesTags: ['pattyexpences']
       }),

       getPattyCategory:builder.query({
        query:()=>({
            url:`${pattyCategoryurl}/get-category`,
            method:'GET',
        }),
        providesTags: ['pattyexpences']
       }),
       updatePattyCategory:builder.mutation({
        query:({id,category})=>({
            url:`${pattyCategoryurl}/update-category/${id}`,
            method:'PUT',
            body:{category}
        }),
        invalidatesTags: ['pattyexpences']
       }),
       deleteCategory:builder.mutation({
        query:(id)=>({
            url:`${pattyCategoryurl}/delete-category/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['pattyexpences']
       }),
    })
    
})

export const { useAddPattyCategoryMutation, useGetPattyCategoryQuery, useUpdatePattyCategoryMutation, useDeleteCategoryMutation } = PattyCategoryApiSlice