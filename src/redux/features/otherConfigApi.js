import { baseApi } from "../api/baseApi";

const otherConfigApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    otherConfigs: builder.query({
      query: (params) => ({
        url: "/settings/other-config",
        method: "GET",
        params: params,
      }),
      providesTags: ["otherConfigs"],
    }),

    updateOtherConfig: builder.mutation({
      query: ({ data, id }) => ({
        url: `/settings/update-other-config/${id}`,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: ["otherConfigs"],
    }),
  }),
});

export const { useOtherConfigsQuery, useUpdateOtherConfigMutation } = otherConfigApi;
