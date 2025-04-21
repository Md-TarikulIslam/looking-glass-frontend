import { baseApi } from "../api/baseApi";

const monitoringApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createMonitoring: builder.mutation({
      query: (data) => ({
        url: "/monitorings",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["monitoring"],
    }),
    monitorings: builder.query({
      query: () => ({
        url: "/monitorings",
        method: "GET",
      }),
      providesTags: ["monitoring"],
    }),
    updateMonitoring: builder.mutation({
      query: ({ data, id }) => ({
        url: `/monitorings/${id}`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["monitoring"],
    }),
    deleteMonitoring: builder.mutation({
      query: (id) => ({
        url: `/monitorings/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["monitoring"],
    }),
  }),
});

export const {
  useCreateMonitoringMutation,
  useMonitoringsQuery,
  useUpdateMonitoringMutation,
  useDeleteMonitoringMutation,
} = monitoringApi;
