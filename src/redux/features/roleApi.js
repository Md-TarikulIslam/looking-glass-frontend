import { baseApi } from "../api/baseApi";

const roleApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createRole: builder.mutation({
      query: (data) => ({
        url: "/roles",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
    roles: builder.query({
      query: () => ({
        url: "/roles",
        method: "GET",
      }),
      providesTags: ["role"],
    }),
    updateRole: builder.mutation({
      query: ({ data, id }) => ({
        url: `/roles/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["role"],
    }),
    deleteRole: builder.mutation({
      query: (id) => ({
        url: `/roles/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["role"],
    }),
  }),
});

export const {
  useCreateRoleMutation,
  useRolesQuery,
  useUpdateRoleMutation,
  useDeleteRoleMutation,
} = roleApi;
