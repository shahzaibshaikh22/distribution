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
        invalidatesTags: ['StaffCategory']
       }),
       addStaff:builder.mutation({
        query:(data)=>({
            url:`${setupurl}/add-staff`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['Staffs']
       }),

       getWarehouse:builder.query({
        query:()=>({
            url:`${setupurl}/get-warehouse`,
            method:'GET',
        }),
        providesTags: ['StaffCategories']
       }),
    }),
    
})

export const {useAddStaffMutation, useAddStaffCategoryMutation,useGetWarehouseQuery } = staffCategoryApiSlice