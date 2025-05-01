import { ProductType, SingleProductType } from "@/static-data/types";
import { Product } from "@prisma/client";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productApi = createApi({
  reducerPath: "productApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),
  tagTypes: ["Product"],
  endpoints: (builder) => ({
    createProduct: builder.mutation({
      query: (formdata) => ({
        url: "/product/product-queries",
        method: "POST",
        body: formdata,
      }),
      invalidatesTags: ["Product"],
    }),
    getAllProduct: builder.query<ProductType, number>({
      query: (page) => ({
        url: `/product/product-queries?page=${page}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getSearchProduct: builder.query<
      ProductType,
      { page: number; query: string }
    >({
      query: ({ page, query }) => ({
        url: `/product/search-product?page=${page}&search=${query}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getProductByBrand: builder.query<{ relatedProduct: Product[] }, string>({
      query: (brand) => ({
        url: `/product/related-product/${brand}`,
        method: "GET",
      }),
      providesTags: ["Product"],
    }),
    getSingleProduct: builder.query<SingleProductType, string>({
      query: (id) => ({
        url: `/product/product-queries/${id}`,
        method: "GET",
      }),
    }),
    deleteSingleProduct: builder.mutation({
      query: (id) => ({
        url: `/product/product-queries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Product"],
    }),
    updateProduct: builder.mutation({
      query: (formdata) => {
        const id = formdata.get("id");
        const cleanId = decodeURIComponent(id).replace(/^"|"$/g, "");
        return {
          url: `/product/product-queries/${cleanId}`,
          method: "PUT",
          body: formdata,
        };
      },
      invalidatesTags: ["Product"],
    }),
  }),
});

export const {
  useCreateProductMutation,
  useGetAllProductQuery,
  useGetSingleProductQuery,
  useGetSearchProductQuery,
  useUpdateProductMutation,
  useDeleteSingleProductMutation,
  useGetProductByBrandQuery,
} = productApi;
