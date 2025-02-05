import { apiSlice } from "../apiSlice";
const uniturl = `http://localhost:5000/api/v1/unit`;

export const UnitApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addUnit:builder.mutation({
        query:(unit)=>({
            url:`${uniturl}/add-unit`,
            method:'POST',
            body:unit
        }),
        invalidatesTags: ['units']
       }),

       getUnits:builder.query({
        query:()=>({
            url:`${uniturl}/get-unit`,
            method:'GEt',
        }),
        providesTags: ['units']
       }),
    }),
    
})

export const { useAddUnitMutation, useGetUnitsQuery } = UnitApiSlice