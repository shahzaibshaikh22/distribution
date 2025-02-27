import { apiSlice } from "../apiSlice";
const paymenturl = `http://localhost:5000/api/v1/payment`;

export const PaymentApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       payToVendor:builder.mutation({
        query:(data)=>({
            url:`${paymenturl}/pay-to-vendor`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['paytovendors']
       }),
       getVendorPayment:builder.query({
        query:(vendor)=>({
            url:`${paymenturl}/get-vendors-payment/${vendor}`,
            method:'GET',
        }),
        providesTags: ['paytovendors']
       }),
    }),
    
})

export const { usePayToVendorMutation, useLazyGetVendorPaymentQuery } = PaymentApiSlice