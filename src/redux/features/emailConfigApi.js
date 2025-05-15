import { baseApi } from "../api/baseApi";

const emailConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    emailConfigs: builder.query({
      query: (params) => ({
        url: "/settings/email-config",
        method: "GET",
        params: params,
      }),
      providesTags: ["emailConfigs"],
    }),
    // contacts: builder.query({
    //   query: (params) => ({
    //     url: "/contacts",
    //     method: "GET",
    //     params: params,
    //   }),
    //   providesTags: ["contacts"],
    // }),
    updateEmailConfig: builder.mutation({
      query: ({ data, id }) => ({
        url: `/settings/update-email-config/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["emailConfigs"],
    }),
  }),
});

export const { useEmailConfigsQuery, useUpdateEmailConfigMutation } =
  emailConfigApi;
