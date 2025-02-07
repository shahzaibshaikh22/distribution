import { apiSlice } from "../apiSlice";
const warehouseurl = `http://localhost:5000/api/v1/warehouse`;

export const WarehouseApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
       addWarehouse:builder.mutation({
        query:(warehouse)=>({
            url:`${warehouseurl}/add-warehouse`,
            method:'POST',
            body:warehouse
        }),
        invalidatesTags: ['warehouses']
       }),

       getWarehouse:builder.query({
        query:()=>({
            url:`${warehouseurl}/get-warehouse`,
            method:'GET',
        }),
        providesTags: ['warehouses']
       }),
    }),
    
})

export const { useAddWarehouseMutation,useGetWarehouseQuery } = WarehouseApiSlice