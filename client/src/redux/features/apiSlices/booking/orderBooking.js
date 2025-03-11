import { apiSlice } from "../apiSlice";
const bookingurl = `http://localhost:5000/api/v1/order-booking`;

export const BrandApiSlice = apiSlice.injectEndpoints({
    endpoints: (builder) => ({
        createBooking: builder.mutation({
            query: (data) => ({
                url: `${bookingurl}/new-order`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['bookings']
        }),
        getBookings: builder.query({
            query: () => ({
                url: `${bookingurl}/get-bookings`,
                method: 'GEt',
            }),
            providesTags: ['bookings']
        }),
        deleteBooking: builder.mutation({
            query: (id) => ({
                url: `${bookingurl}/delete-booking/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['bookings']
        }),
        statusDelivered: builder.mutation({
            query: (id) => ({
                url: `${bookingurl}/booking-delivered/${id}`,
                method: 'PUT',
            }),
            invalidatesTags: ['bookings']
        }),
        OrderSummary: builder.mutation({
            query: (data) => ({
                url: `${bookingurl}/booking-summary`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['bookings']
        }),
        getCustomerBookings: builder.query({
            query: (customer) => ({
                url: `${bookingurl}/get-customer-order/${customer}`,
                method: 'GET',
            }),
            providesTags: ['customerdues']
        }),
        OrderReturn: builder.mutation({
            query: (data) => ({
                url: `${bookingurl}/return`,
                method: 'POST',
                body: data
            }),
            invalidatesTags: ['orderbookingsreturns']
        }),
        getOrderReturn: builder.query({
            query: () => ({
                url: `${bookingurl}/get-order-return`,
                method: 'GET',
            }),
            providesTags: ['orderbookingsreturns']
        }),
        deleteOrderReturn: builder.mutation({
            query: (id) => ({
                url: `${bookingurl}/delete/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['orderbookingreturns']
        }),


    }),

})

export const { useLazyGetCustomerBookingsQuery, useOrderSummaryMutation, useCreateBookingMutation, useGetBookingsQuery, useDeleteBookingMutation, useStatusDeliveredMutation, useOrderReturnMutation, useGetOrderReturnQuery, useDeleteOrderReturnMutation } = BrandApiSlice