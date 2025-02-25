import { apiSlice } from "../apiSlice";
const zoneurl = `http://localhost:5000/api/v1/zone`;

export const ZoneApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       createZone:builder.mutation({
        query:(townname)=>({
            url:`${zoneurl}/add-zone`,
            method:'POST',
            body:townname
        }),
        invalidatesTags: ['zones']
       }),
       getZones:builder.query({
        query:()=>({
            url:`${zoneurl}/get-zones`,
            method:'GET',
        }),
        providesTags: ['zones']
       }),
       updateZone:builder.mutation({
        query:({id,townname})=>({
            url:`${zoneurl}/update-zone/${id}`,
            method:'PUT',
            body:{townname}
        }),
        invalidatesTags: ['zones']
       }),

       deleteZone:builder.mutation({
        query:(id)=>({
            url:`${zoneurl}/delete-zone/${id}`,
            method:'DELETE',
        }),
        invalidatesTags: ['zones']
       }),
    }),
    
})

export const { useCreateZoneMutation, useGetZonesQuery, useDeleteZoneMutation, useUpdateZoneMutation } = ZoneApiSlice