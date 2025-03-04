import { apiSlice } from "../apiSlice";
const paymenturl = `http://localhost:5000/api/v1/journal-payment`;

export const JournalPaymentApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createJournalPayment:builder.mutation({
        query:(data)=>({
            url:`${paymenturl}/add`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['journalpayments']
       }),
       getJournalPayment:builder.query({
        query:()=>({
            url:`${paymenturl}/get`,
            method:'GET',
        }),
        providesTags: ['journalpayments']
       }),
    }),
    
})

export const { useCreateJournalPaymentMutation, useGetJournalPaymentQuery } = JournalPaymentApiSlice