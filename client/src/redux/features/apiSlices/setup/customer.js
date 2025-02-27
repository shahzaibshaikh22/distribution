import { apiSlice } from "../apiSlice";
const customerurl = `http://localhost:5000/api/v1/customer`;

export const CustomerApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createCustomer:builder.mutation({
        query:(data)=>({
            url:`${customerurl}/add`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['customers']
       }),
       createCustomerCategory:builder.mutation({
        query:(category)=>({
            url:`${customerurl}/add-category`,
            method:'POST',
            body:category
        }),
        invalidatesTags: ['customercategories']


       }),

       getCustomers:builder.query({
        query:()=>({
            url:`${customerurl}/get`,
            method:'GET',
        }),
        providesTags: ['customers']
       }),
       getCustomersCategory:builder.query({
        query:()=>({
            url:`${customerurl}/get-category`,
            method:'GET',
        }),
        providesTags: ['customercategories']
       }),
       deleteCustomerCategory:builder.mutation({
        query:(id)=>({
            url:`${customerurl}/delete-category/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['customercategories']
       }),
       deleteCustomer:builder.mutation({
        query:(id)=>({
            url:`${customerurl}/delete-customer/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['customers']
       }),
       updateCustomerCategory:builder.mutation({
        query:({id,category})=>({
            url:`${customerurl}/update-customer-category/${id}`,
            method:'PUT',
            body:{category}
        }),
        invalidatesTags: ['customercategories']
       }),
       updateCustomer:builder.mutation({
        query:({id,data})=>({
            url:`${customerurl}/update-customer/${id}`,
            method:'PUT',
            body:data
        }),
        invalidatesTags: ['customers']
       }),
    }),
    
})

export const {useDeleteCustomerMutation,useUpdateCustomerMutation, useCreateCustomerMutation,useUpdateCustomerCategoryMutation, useGetCustomersQuery, useCreateCustomerCategoryMutation,useGetCustomersCategoryQuery,useDeleteCustomerCategoryMutation } = CustomerApiSlice