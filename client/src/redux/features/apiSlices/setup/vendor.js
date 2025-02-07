import { apiSlice } from "../apiSlice";
const vendorurl = `http://localhost:5000/api/v1/vendor`;

export const VendorApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addVendor:builder.mutation({
        query:(vendor)=>({
            url:`${vendorurl}/add-vendor`,
            method:'POST',
            body:vendor
        }),
        invalidatesTags: ['vendor']
       }),

       getVendor:builder.query({
        query:()=>({
            url:`${vendorurl}/get-vendor`,
            method:'GET',
        }),
        providesTags: ['vendor']
       }),
    }),
    
})

export const { useAddVendorMutation,useGetVendorQuery } = VendorApiSlice