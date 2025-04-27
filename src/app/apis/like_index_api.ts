// import { Product } from "@prisma/client";
// import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// type likeType = {
//   message: string[];
// };
// export const likeApi = createApi({
//   reducerPath: "likeApi",
//   baseQuery: fetchBaseQuery({
//     baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
//   }),
//   tagTypes: ["Liked"],
//   endpoints: (builder) => ({
//     createLike: builder.mutation({
//       query: (likeData) => ({
//         url: "/like",
//         method: "POST",
//         body: likeData,
//       }),
//       invalidatesTags: ["Liked"],
//     }),
//     getLikes: builder.query<likeType, null>({
//       query: () => ({
//         url: "/like",
//         method: "GET",
//       }),
//     }),
//     getLikedProducts: builder.query<{ message: Product[] }, null>({
//       query: () => ({
//         url: "/like/liked-product",
//         method: "GET",
//       }),
//       providesTags: ["Liked"],
//     }),
//   }),
// });

// export const {
//   useCreateLikeMutation,
//   useGetLikesQuery,
//   useGetLikedProductsQuery,
// } = likeApi;

import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

type likeType = {
  message: string[];
};

export const likeApi = createApi({
  reducerPath: "likeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),
  tagTypes: ["Liked"],
  endpoints: (builder) => ({
    createLike: builder.mutation({
      query: (likeData) => ({
        url: "/like",
        method: "POST",
        body: likeData,
      }),
      // Invalidate the "Liked" tag so queries that provide it are re-fetched
      invalidatesTags: ["Liked"],
    }),
    getLikes: builder.query<likeType, null>({
      query: () => ({
        url: "/like",
        method: "GET",
      }),
      providesTags: ["Liked"], // Apply tag to getLikes too
    }),
    getLikedProducts: builder.query<{ message: Product[] }, null>({
      query: () => ({
        url: "/like/liked-product",
        method: "GET",
      }),
      providesTags: (result) =>
        result?.message
          ? [
              ...result.message.map((product) => ({
                type: "Liked" as const,
                id: product.id,
              })),
              { type: "Liked", id: "LIST" },
            ]
          : [{ type: "Liked", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateLikeMutation,
  useGetLikesQuery,
  useGetLikedProductsQuery,
} = likeApi;
