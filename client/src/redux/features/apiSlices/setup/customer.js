import { apiSlice } from "../apiSlice";
const customerurl = `http://localhost:5000/api/v1/customer`;

export const VendorApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createCustomer:builder.mutation({
        query:(data)=>({
            url:`${customerurl}/add`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['customers']
       }),

       getCustomers:builder.query({
        query:()=>({
            url:`${customerurl}/get`,
            method:'GET',
        }),
        providesTags: ['customers']
       }),
    }),
    
})

export const { useCreateCustomerMutation, useGetCustomersQuery } = VendorApiSlice