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
      query: (params) => ({
        url: "/roles",
        method: "GET",
        params,
      }),
      providesTags: ["role"],
    }),
    getRoleById: builder.query({
      query: ({ params, id }) => ({
        url: `/roles/${id}`,
        method: "GET",
        params:params,
      }),
      providesTags: ["role"],
    }),
    updateRole: builder.mutation({
      query: ({ data, id }) => ({
        url: `/roles/${id}`,
        method: "PUT",
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
  useGetRoleByIdQuery,
} = roleApi;
