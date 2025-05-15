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
      query: () => ({
        url: "/logs/email-logs",
        method: "GET",
      }),
      providesTags: ["logs"],
    }),
    smsLogs: builder.query({
      query: () => ({
        url: "/logs/sms-logs",
        method: "GET",
      }),
      providesTags: ["logs"],
    }),
    cronLogs: builder.query({
      query: () => ({
        url: "/logs/cron-logs",
        method: "GET",
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
