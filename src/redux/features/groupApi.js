import { baseApi } from "../api/baseApi";

const groupApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createGroup: builder.mutation({
      query: (data) => ({
        url: "/groups",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["group"],
    }),
    groups: builder.query({
      query: (params) => ({
        url: "/groups",
        method: "GET",
        params,
      }),
      providesTags: ["group"],
    }),
    updateGroup: builder.mutation({
      query: ({ data, id }) => ({
        url: `/groups/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["group"],
    }),
    deleteGroup: builder.mutation({
      query: (id) => ({
        url: `/groups/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["group"],
    }),
  }),
});

export const {
  useCreateGroupMutation,
  useGroupsQuery,
  useUpdateGroupMutation,
  useDeleteGroupMutation,
} = groupApi;
