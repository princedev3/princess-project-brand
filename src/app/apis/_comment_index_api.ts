import { CreatedComment, SliderCommentType } from "@/static-data/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const commentApi = createApi({
  reducerPath: "commentApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),
  tagTypes: ["COMMENT"],
  endpoints: (builder) => ({
    createComment: builder.mutation({
      query: (commentData) => ({
        url: "/comment",
        method: "POST",
        body: commentData,
      }),

      invalidatesTags: [{ type: "COMMENT", id: "LIST" }],
    }),
    deleteComment: builder.mutation({
      query: ({ id, userId }) => ({
        url: `/comment/${id}?userId=${userId}`,
        method: "DELETE",
      }),

      invalidatesTags: [{ type: "COMMENT", id: "LIST" }],
    }),
    getCommentForSider: builder.query<
      { sliderComment: SliderCommentType[] },
      null
    >({
      query: () => ({
        url: "/comment/slider",
        method: "GET",
      }),
      providesTags: (result) =>
        result
          ? [
              { type: "COMMENT", id: "SLIDER" },
              { type: "COMMENT", id: "LIST" },
            ]
          : [{ type: "COMMENT", id: "SLIDER" }],
    }),
    getAllComment: builder.query<
      { createdComment: CreatedComment[]; averageRating: number },
      string
    >({
      query: (productId) => ({
        url: `/comment?productId=${productId}`,
      }),

      providesTags: (result) =>
        result
          ? [
              ...result.createdComment.map(({ id }) => ({
                type: "COMMENT" as const,
                id,
              })),
              { type: "COMMENT", id: "LIST" },
            ]
          : [{ type: "COMMENT", id: "LIST" }],
    }),
  }),
});

export const {
  useCreateCommentMutation,
  useGetAllCommentQuery,
  useDeleteCommentMutation,
  useGetCommentForSiderQuery,
} = commentApi;
