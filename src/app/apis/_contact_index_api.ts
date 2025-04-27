import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const contactApi = createApi({
  reducerPath: "contactApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),

  endpoints: (builder) => ({
    createMessage: builder.mutation({
      query: (message) => ({
        url: "/contact",
        method: "POST",
        body: message,
      }),
    }),
  }),
});

export const { useCreateMessageMutation } = contactApi;
