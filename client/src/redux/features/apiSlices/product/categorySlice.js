import { apiSlice } from "../apiSlice";
const categoryurl = `http://localhost:5000/api/v1/category`;

export const CategoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addCategory:builder.mutation({
        query:(category)=>({
            url:`${categoryurl}/add-category`,
            method:'POST',
            body:category
        }),
        invalidatesTags: ['categories']
       }),

       getCategory:builder.query({
        query:()=>({
            url:`${categoryurl}/get-category`,
            method:'GET',
        }),
        providesTags: ['categories']
       }),
    }),
    
})

export const { useAddCategoryMutation, useGetCategoryQuery } = CategoryApiSlice