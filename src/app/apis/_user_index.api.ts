import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL_API as string,
  }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (userData) => {
        return {
          url: "/user/register",
          method: "POST",
          body: userData,
        };
      },
    }),
    verifyRegisterEmail: builder.mutation({
      query: (userData) => ({
        url: "/user/verify-register-email",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: userData,
      }),
    }),
    getAllUser: builder.query({
      query: (userData) => ({
        url: "/user/user-queries",
        method: "GET",
      }),
      providesTags: ["Users"],
    }),
    deleteAUser: builder.mutation({
      query: (id) => ({
        url: `/user/user-queries/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Users"],
    }),
    forgotPassword: builder.mutation({
      query: (userdDetails) => ({
        url: `/user/forgot-password`,
        method: "POST",
        body: { email: userdDetails },
      }),
      invalidatesTags: ["Users"],
    }),
    handleResetPassword: builder.mutation({
      query: (userdDetails) => ({
        url: `/user/verify-forgot-password`,
        method: "POST",
        body: { token: userdDetails },
      }),
      invalidatesTags: ["Users"],
    }),
    updateAUser: builder.mutation({
      query: ({ id, role }) => ({
        url: `/user/user-queries/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: { role },
      }),
      invalidatesTags: ["Users"],
    }),
    newPassword: builder.mutation({
      query: ({ password, email }) => ({
        url: `/user/new-password`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: { password, email },
      }),
      invalidatesTags: ["Users"],
    }),
  }),
});

export const {
  useCreateUserMutation,
  useVerifyRegisterEmailMutation,
  useGetAllUserQuery,
  useDeleteAUserMutation,
  useUpdateAUserMutation,
  useForgotPasswordMutation,
  useHandleResetPasswordMutation,
  useNewPasswordMutation,
} = userApi;
