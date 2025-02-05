import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

const baseQuery = fetchBaseQuery({ baseUrl:"", credentials: 'include' })


export const apiSlice = createApi({ 
    baseQuery,
    tagTypes:[],
    endpoints: (builder) => ({})
});