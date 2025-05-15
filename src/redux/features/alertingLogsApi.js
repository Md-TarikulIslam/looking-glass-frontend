import { baseApi } from "../api/baseApi";

const alertingLogApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    alertingLogs: builder.query({
      query: (params) => ({
        url: "/logs/alert-logs",
        method: "GET",
        params,
      }),
      providesTags: ["alertingLogs"],
    }),
  }),
});

export const { useAlertingLogsQuery } = alertingLogApi;
