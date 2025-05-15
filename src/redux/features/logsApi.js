import { baseApi } from "../api/baseApi";

const logsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    activityLogs: builder.query({
      query: (params) => ({
        url: "/logs/activity-logs",
        method: "GET",
        params: params,
      }),
      providesTags: ["logs"],
    }),

    emailLogs: builder.query({
      query: (params) => ({
        url: "/logs/email-logs",
        method: "GET",
        params: params,
      }),
      providesTags: ["logs"],
    }),
    smsLogs: builder.query({
      query: (params) => ({
        url: "/logs/sms-logs",
        method: "GET",
        params: params,
      }),
      providesTags: ["logs"],
    }),
    cronLogs: builder.query({
      query: (params) => ({
        url: "/logs/cron-logs",
        method: "GET",
        params: params,
      }),
      providesTags: ["logs"],
    }),
  }),
});

export const {
  useActivityLogsQuery,
  useEmailLogsQuery,
  useSmsLogsQuery,
  useCronLogsQuery,
} = logsApi;
