import { baseApi } from "../../api/baseApi";

const loginApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/auth/login",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["login"],
    }),
    logoutUser: builder.mutation({
      query: (refreshToken) => ({
        url: "/auth/logout",
        method: "POST",
        body: refreshToken,
      }),
      invalidatesTags: ["logout"],
    }),
  }),
});

export const { useLoginUserMutation , useLogoutUserMutation} = loginApi;
