import { baseApi } from "../api/baseApi";

const serverApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServer: builder.mutation({
      query: (data) => ({
        url: "/servers",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["server"],
    }),
    servers: builder.query({
      query: () => ({
        url: "/servers",
        method: "GET",
      }),
      providesTags: ["server"],
    }),
    updateServer: builder.mutation({
      query: ({ data, id }) => ({
        url: `/servers/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["server"],
    }),
    deleteServer: builder.mutation({
      query: (id) => ({
        url: `/servers/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["server"],
    }),
  }),
});

export const {
  useCreateServerMutation,
  useServersQuery,
  useUpdateServerMutation,
  useDeleteServerMutation,
} = serverApi;
