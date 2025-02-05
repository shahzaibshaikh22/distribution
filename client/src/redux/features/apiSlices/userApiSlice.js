import { apiSlice } from "./apiSlice";

export const UserApiSlice = apiSlice.injectEndpoints({
    endpoints:(builder)=>({
    //    getChats:builder.query({
    //     query:(userId)=>({
    //         url:`${chat_url}/${userId}`,
    //         method:'Get',
    //     }),
    //     providesTags: ['conversations']
    //    }),
    //    sendMessage:builder.mutation({
    //     query:(data)=> ({
    //         url: `${chat_url}/messages`,
    //         method:"POST",
    //         body:data
    //     }),
    //     invalidatesTags: ['conversations']
    //     })
    }),
    
})

export const {  } = UserApiSlice