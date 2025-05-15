import { baseApi } from "../api/baseApi";

const twitterConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    twitterConfigs: builder.query({
      query: (params) => ({
        url: "/settings/twitter-config",
        method: "GET",
        params: params,
      }),
      providesTags: ["twitterConfigs"],
    }),

    updateTwitterConfig: builder.mutation({
      query: ({ data, id }) => ({
        url: `/settings/update-twitter-config/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["twitterConfigs"],
    }),
  }),
});

export const { useTwitterConfigsQuery, useUpdateTwitterConfigMutation } = twitterConfigApi;
