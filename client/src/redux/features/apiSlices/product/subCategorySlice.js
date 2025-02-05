import { apiSlice } from "../apiSlice";
const subcategoryurl = `http://localhost:5000/api/v1/subcategory`;

export const CategoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addSubCategory:builder.mutation({
        query:(subcategory)=>({
            url:`${subcategoryurl}/add-subcategory`,
            method:'POST',
            body:subcategory
        }),
        invalidatesTags: ['subcategories']
       }),
       getSubCategory:builder.query({
        query:()=>({
            url:`${subcategoryurl}/get-subcategory`,
            method:'GET',
        }),
        providesTags: ['subcategories']
       }),
    }),
    
})

export const { useAddSubCategoryMutation, useGetSubCategoryQuery } = CategoryApiSlice