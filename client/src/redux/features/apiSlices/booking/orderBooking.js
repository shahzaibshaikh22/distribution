import { apiSlice } from "../apiSlice";
const bookingurl = `http://localhost:5000/api/v1/order-booking`;

export const BrandApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createBooking:builder.mutation({
        query:(data)=>({
            url:`${bookingurl}/new-order`,
            method:'POST',
            body:data
        }),
        invalidatesTags: ['bookings']
       }),

    //    getBrands:builder.query({
    //     query:()=>({
    //         url:`${brandurl}/get-brand`,
    //         method:'GEt',
    //     }),
    //     providesTags: ['brands']
    //    }),
    }),
    
})

export const { useCreateBookingMutation } = BrandApiSlice