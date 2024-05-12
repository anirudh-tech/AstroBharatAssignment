import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { BASE_URL } from "../../config/constant";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_URL,
    credentials: "include", // Include cookies in requests
  }),
  tagTypes: ['Astrologers'],
  endpoints: (builder) => ({
    getAstrollogers: builder.query({
      query: () => '/astrologers',
      providesTags: ['Astrologers']
    }),
    adminLogin: builder.mutation({
      query: (data) => ({
        url: "/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Astrologers']
    }),
    addAstrologer: builder.mutation({
      query: (data) => ({
        url: "/astrologers/register",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ['Astrologers']
    }),
    updateAstrologer: builder.mutation({
      query: (data) => ({
        url: `/astrologers/${data._id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ['Astrologers']
    })
  }),
});

export const { useAdminLoginMutation, useGetAstrollogersQuery,useAddAstrologerMutation, useUpdateAstrologerMutation } = apiSlice;
