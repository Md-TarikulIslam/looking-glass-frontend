import { baseApi } from "../api/baseApi";

const serverAlertingApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createServerAlerting: builder.mutation({
      query: (data) => ({
        url: "/serverAlertings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["serverAlerting"],
    }),
    serverAlerting: builder.query({
      query: () => ({
        url: "/serverAlertings",
        method: "GET",
      }),
      providesTags: ["serverAlerting"],
    }),
    updateServerAlerting: builder.mutation({
      query: ({ data, id }) => ({
        url: `/serverAlertings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["serverAlerting"],
    }),
    deleteServerAlerting: builder.mutation({
      query: (id) => ({
        url: `/serverAlertings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["serverAlerting"],
    }),
  }),
});

export const {
  useCreateServerAlertingMutation,
  useServerAlertingQuery,
  useUpdateServerAlertingMutation,
  useDeleteServerAlertingMutation,
} = serverAlertingApi;
