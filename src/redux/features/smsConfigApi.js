import { baseApi } from "../api/baseApi";

const smsConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    smsConfigs: builder.query({
      query: (params) => ({
        url: "/settings/sms-config",
        method: "GET",
        params: params,
      }),
      providesTags: ["smsConfigs"],
    }),

    updateSmsConfig: builder.mutation({
      query: ({ data, id }) => ({
        url: `/settings/update-sms-config/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["smsConfigs"],
    }),
  }),
});

export const { useSmsConfigsQuery, useUpdateSmsConfigMutation } = smsConfigApi;
