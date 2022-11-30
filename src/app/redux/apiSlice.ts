import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Define a service using a base URL and expected endpoints
export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://backend.aptoslaunch.io/",
  }),
  endpoints: (builder) => ({
    getUserInfo: builder.mutation({
      query: (address) => ({
        url: "purchase-record/get-user-info/",
        method: "POST",
        body: { userAddress: address },
      }),
      transformResponse: (res) => {
        return res;
      },
    }),
    claimtALT: builder.mutation({
      query: (address) => ({
        url: "purchase-record/claim-talt",
        method: "POST",
        body: { userAddress: address },
      }),
      transformResponse: (res) => {
        return res;
      },
    }),
    taltToAlt: builder.mutation({
      query: ({ address, txid }) => ({
        url: "talt-to-alt/convert-to-alt",
        method: "POST",
        body: { userAddress: address, txid: txid },
      }),
      transformResponse: (res) => {
        console.log(res);
        return res;
      },
    }),
  }),
});

export const {
  useGetUserInfoMutation,
  useClaimtALTMutation,
  useTaltToAltMutation,
} = api;
