import { apiSlice } from "../apiSlice";
const salemanurl = `http://localhost:5000/api/v1/saleman`;

export const SalemanApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createSaleman:builder.mutation({
        query:(saleman)=>({
            url:`${salemanurl}/add-saleman`,
            method:'POST',
            body:saleman
        }),
        invalidatesTags: ['salemans']
       }),
       getSalemans:builder.query({
        query:()=>({
            url:`${salemanurl}/get-salemans`,
            method:'GET',
        }),
        providesTags: ['salemans']
       }),
       updateSaleman:builder.mutation({
        query:({id,saleman})=>({
            url:`${salemanurl}/update-saleman/${id}`,
            method:'PUT',
            body:{saleman}
        }),
        invalidatesTags: ['salemans']
       }),

       deleteSaleman:builder.mutation({
        query:(id)=>({
            url:`${salemanurl}/delete-saleman/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['salemans']
       }),
    }),
    
})

export const {useCreateSalemanMutation,useGetSalemansQuery,useUpdateSalemanMutation,useDeleteSalemanMutation } = SalemanApiSlice