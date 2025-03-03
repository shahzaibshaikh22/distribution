import { apiSlice } from "../apiSlice";
const paymenturl = `http://localhost:5000/api/v1/payment-recieve`;

export const CustomerPaymentApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       recieveCustomerPayment:builder.mutation({
        query:(data)=>({
            url:`${paymenturl}/recieve-customer-payment`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['recievecustomerpays']
       }),
       getCustomerPayment:builder.query({
        query:(customer)=>({
            url:`${paymenturl}/get-customer-payment/${customer}`,
            method:'GET',
        }),
        providesTags: ['recievecustomerpays']
       }),
    }),
    
})

export const { useRecieveCustomerPaymentMutation, useLazyGetCustomerPaymentQuery } = CustomerPaymentApiSlice