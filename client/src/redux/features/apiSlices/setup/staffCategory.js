import { apiSlice } from "../apiSlice";
const setupurl = `http://localhost:5000/api/v1/staff`;

export const staffCategoryApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addStaffCategory:builder.mutation({
        query:(category)=>({
            url:`${setupurl}/add-category`,
            method:'POST',
            body:category
        }),
        invalidatesTags: ['staffCategories']
       }),
       addStaff:builder.mutation({
        query:(data)=>({
            url:`${setupurl}/add-staff`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['staffs']
       }),

       getStaffCategory:builder.query({
        query:()=>({
            url:`${setupurl}/get-staff-category`,
            method:'GET',
        }),
        providesTags: ['staffCategories']
       }),
       getStaff:builder.query({
        query:()=>({
            url:`${setupurl}/get-staff`,
            method:'GET',
        }),
        providesTags: ['staffs']
       }),
       deleteStaffCat:builder.mutation({
        query:(id)=>({
            url:`${setupurl}/dlt-staff-cat/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['staffs']
       }),
       deleteStaff:builder.mutation({
        query:(id)=>({
            url:`${setupurl}/dlt-staff/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['staffs']
       }),
    }),
    
})

export const {useAddStaffMutation, useAddStaffCategoryMutation,useGetStaffCategoryQuery, useGetStaffQuery, useDeleteStaffMutation, useDeleteStaffCatMutation } = staffCategoryApiSlice