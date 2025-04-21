import { baseApi } from "../../api/baseApi";
const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    login: builder.mutation({
      query: (userInfo) => ({
        url: "/auth/login",
        method: "POST",
        body: userInfo,
      }),
    }),
    getMe: builder.query({
      query: () => ({
        url: "/user-management/user/get-me",
        method: "GET",
      }),
      invalidatesTags: ["user"],
    }),
    updateUser: builder.mutation({
      query: (usersData) => ({
        url: `/users/update-user`,
        method: "PATCH",
        body: usersData,
      }),
      invalidatesTags: ["user"],
    }),
  }),
});

export const { useLoginMutation, useGetMeQuery, useUpdateUserMutation } =
  authApi;
