import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const newsletterApi = createApi({
  reducerPath: "newsletterApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),
  endpoints: (builder) => ({
    createNewsLetter: builder.mutation({
      query: (newsLetterData) => ({
        url: "/newsletter",
        method: "POST",
        body: newsLetterData,
      }),
    }),
  }),
});

export const { useCreateNewsLetterMutation } = newsletterApi;
