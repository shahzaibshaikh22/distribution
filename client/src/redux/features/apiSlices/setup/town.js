import { apiSlice } from "../apiSlice";
const townurl = `http://localhost:5000/api/v1/town`;

export const CustomerApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createTown:builder.mutation({
        query:(townname)=>({
            url:`${townurl}/add-town`,
            method:'POST',
            body:townname
        }),
        invalidatesTags: ['towns']
       }),
    //    createCustomerCategory:builder.mutation({
    //     query:(category)=>({
    //         url:`${customerurl}/add-category`,
    //         method:'POST',
    //         body:category
    //     }),
    //     invalidatesTags: ['customers']
    //    }),

       getTowns:builder.query({
        query:()=>({
            url:`${townurl}/get-towns`,
            method:'GET',
        }),
        providesTags: ['towns']
       }),
       updateTown:builder.mutation({
        query:({id,townname})=>({
            url:`${townurl}/update-town/${id}`,
            method:'PUT',
            body:{townname}
        }),
        invalidatesTags: ['towns']
       }),
    //    getCustomersCategory:builder.query({
    //     query:()=>({
    //         url:`${customerurl}/get-category`,
    //         method:'GET',
    //     }),
    //     providesTags: ['customers']
    //    }),
       deleteTown:builder.mutation({
        query:(id)=>({
            url:`${townurl}/delete-town/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['towns']
       }),
    }),
    
})

export const { useCreateTownMutation, useGetTownsQuery, useDeleteTownMutation, useUpdateTownMutation } = CustomerApiSlice