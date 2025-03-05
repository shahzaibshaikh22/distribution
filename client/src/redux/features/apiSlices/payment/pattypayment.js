import { apiSlice } from "../apiSlice";
const paymenturl = `http://localhost:5000/api/v1/patty`;

export const PattyPaymentApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createPattyPayment:builder.mutation({
        query:(data)=>({
            url:`${paymenturl}/add`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['journalpayments']
       }),
       getPattyPayment:builder.query({
        query:()=>({
            url:`${paymenturl}/get`,
            method:'GET',
        }),
        providesTags: ['journalpayments']
       }),
    }),
    
})

export const { useCreatePattyPaymentMutation, useGetPattyPaymentQuery } = PattyPaymentApiSlice