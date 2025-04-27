import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const couponApi = createApi({
  reducerPath: "couponApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),
  tagTypes: ["COUPON"],
  endpoints: (builder) => ({
    createCoupon: builder.mutation({
      query: (couponData) => ({
        url: `/coupon`,
        method: "POST",
        body: couponData,
      }),
      invalidatesTags: ["COUPON"],
    }),
    getCoupon: builder.query({
      query: () => ({
        url: `/coupon`,
        method: "GET",
      }),
      providesTags: ["COUPON"],
    }),
    deleteCoupon: builder.mutation({
      query: (id) => ({
        url: `/coupon/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["COUPON"],
    }),
  }),
});

export const {
  useCreateCouponMutation,
  useGetCouponQuery,
  useDeleteCouponMutation,
} = couponApi;
