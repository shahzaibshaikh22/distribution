import { apiSlice } from "../apiSlice";
const brandurl = `http://localhost:5000/api/v1/brand`;

export const BrandApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addBrand:builder.mutation({
        query:(brand)=>({
            url:`${brandurl}/add-name`,
            method:'POST',
            body:brand
        }),
        invalidatesTags: ['brands']
       }),

       getBrands:builder.query({
        query:()=>({
            url:`${brandurl}/get-brand`,
            method:'GEt',
        }),
        providesTags: ['brands']
       }),
    }),
    
})

export const { useAddBrandMutation,useGetBrandsQuery } = BrandApiSlice